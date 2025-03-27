import os
import io
import base64
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify
from doctr.models import ocr_predictor
from doctr.io import DocumentFile

# Set environment variables
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["USE_TORCH"] = "1"

# Initialize Flask app
app = Flask(__name__)

# Load OCR model
model = ocr_predictor(det_arch="db_resnet50", reco_arch="crnn_vgg16_bn", pretrained=True)

@app.route('/ocr', methods=['POST'])
def ocr_api():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Read the image file
        image_bytes = image_file.read()
        
        # Convert bytes to DocumentFile
        single_img_doc = DocumentFile.from_images(image_bytes)
        
        # Perform OCR
        result = model(single_img_doc)
        
        # Extract text
        extracted_text = []
        for page in result.pages:
            for block in page.blocks:
                for line in block.lines:
                    line_text = " ".join(word.value for word in line.words)
                    extracted_text.append(line_text)
        
        # Generate OCR visualization
        try:
            synthetic_pages = result.synthesize()
        except Exception:
            synthetic_pages = None
        
        image_base64 = None
        if synthetic_pages:
            buffer = io.BytesIO()
            plt.figure(figsize=(10, 10))
            plt.imshow(synthetic_pages[0])
            plt.axis("off")
            plt.savefig(buffer, format='png', bbox_inches="tight", dpi=300)
            buffer.seek(0)
            plt.close()
            image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        return jsonify({'extracted_text': extracted_text, 'image_base64': image_base64})
    
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)