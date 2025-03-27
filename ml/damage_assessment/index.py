from flask import Flask, request, jsonify
import os
from vehicle_damage_estimator import VehicleDamageEstimator
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize the damage estimator
estimator = VehicleDamageEstimator("models/best.pt")

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/analyze", methods=["POST"])
def analyze_damage():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files["image"]
    car_brand = request.form.get("car_brand")
    car_model = request.form.get("car_model")
    
    if not file or not allowed_file(file.filename):
        return jsonify({"error": "Invalid or missing image file"}), 400
    if not car_brand or not car_model:
        return jsonify({"error": "Car brand and model are required"}), 400
    
    # Save file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    
    # Perform analysis
    try:
        result = estimator.estimate_damage(filepath, car_brand, car_model)
        return jsonify(result)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
