import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import h5py
import numpy as np
import io
from flask import Flask, request, jsonify

# ============================
# 1. Define and Load the Model
# ============================
class SignatureModel(nn.Module):
    def __init__(self):
        super(SignatureModel, self).__init__()
        self.mobilenet = models.mobilenet_v2(pretrained=False)
        self.mobilenet.classifier = nn.Linear(1280, 128)  # Output a 128-dimensional feature vector

    def forward(self, x):
        return self.mobilenet(x)

def load_model_from_h5(filename="signature_model.h5"):
    """Loads model weights from an .h5 file"""
    model = SignatureModel()
    with h5py.File(filename, "r") as h5f:
        state_dict = {key: torch.tensor(np.array(h5f[key])) for key in h5f.keys()}
    model.load_state_dict(state_dict)
    model.eval()
    return model

# Load model and move to device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = load_model_from_h5().to(device)

# ============================
# 2. Define Image Preprocessing
# ============================
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),  # Convert to 3 channels
    transforms.Resize((224, 224)),  # Resize for MobileNetV2
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

def preprocess_image(image_bytes):
    """Loads and preprocesses an image for MobileNetV2"""
    image = Image.open(io.BytesIO(image_bytes))
    image = transform(image).unsqueeze(0).to(device)  # Add batch dimension
    return image

# ============================
# 3. Signature Matching Logic
# ============================
def get_embedding(image_bytes):
    """Extracts the embedding vector from an image"""
    image_tensor = preprocess_image(image_bytes)
    with torch.no_grad():
        embedding = model(image_tensor)
    return embedding

def cosine_similarity(emb1, emb2):
    """Calculates cosine similarity between two embeddings"""
    return F.cosine_similarity(emb1, emb2).item()

def verify_signatures(image1_bytes, image2_bytes, threshold=0.9):
    """Verifies if two signatures match based on cosine similarity"""
    emb1 = get_embedding(image1_bytes)
    emb2 = get_embedding(image2_bytes)
    similarity = cosine_similarity(emb1, emb2)
    return similarity, similarity > threshold

# ============================
# 4. Flask API Implementation
# ============================
app = Flask(__name__)

@app.route("/verify_signature", methods=["POST"])
def verify_signature_api():
    """API endpoint to verify signature similarity"""
    if "image1" not in request.files or "image2" not in request.files:
        return jsonify({"error": "Please upload two signature images"}), 400

    image1_bytes = request.files["image1"].read()
    image2_bytes = request.files["image2"].read()

    similarity, match = verify_signatures(image1_bytes, image2_bytes)
    
    result = {
        "similarity_score": round(similarity, 4),
        "match": match,
        "message": "✅ Signatures Match!" if match else "❌ Signatures Do Not Match!"
    }
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5002, debug=True)
