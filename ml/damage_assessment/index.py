from flask import Flask, request, jsonify
import os
import traceback
from werkzeug.utils import secure_filename
from vehicle_damage_estimator import VehicleDamageEstimator

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize the damage estimator
estimator = VehicleDamageEstimator("models/best.pt")

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/analyze", methods=["POST"])
def analyze_damage():
    try:
        # Check if images are present
        if "images" not in request.files:
            return jsonify({"error": "No image files provided"}), 400
        
        # Get files and form data
        files = request.files.getlist("images")
        car_brand = request.form.get("carBrand")
        car_model = request.form.get("carModel")
       
        if not files:
            return jsonify({"error": "No image files provided"}), 400
        if not car_brand or not car_model:
            return jsonify({"error": "Car brand and model are required"}), 400
       
        # Process each image
        # Process each image
        results = []
        for file in files:
            if file and allowed_file(file.filename):
                try:
                    # Save file
                    filename = secure_filename(file.filename)
                    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                    file.save(filepath)
                   
                    # Perform analysis
                    result = estimator.estimate_damage(filepath, car_brand, car_model)
                    results.append(result)
                    
                    # Clean up uploaded file immediately
                    if os.path.exists(filepath):
                        os.remove(filepath)
                        
                except Exception as e:
                    app.logger.error(f"Error processing {filename}: {traceback.format_exc()}")
                    return jsonify({
                        "error": f"Error processing {filename}",
                        "details": str(e)
                    }), 500
        
        # Combine results if multiple images
        final_result = {
            'detected_parts': {},
            'repair_estimate': {
                'parts_breakdown': {},
                'total_repair_cost': 0,
                'missing_parts': [],
                'severity': 'minor'
            }
        }
        
        for result in results:
            # Merge detected parts
            for part, count in result['detected_parts'].items():
                final_result['detected_parts'][part] = final_result['detected_parts'].get(part, 0) + count
            
            # Merge repair estimates
            parts_breakdown = result['repair_estimate']['parts_breakdown']
            for part, details in parts_breakdown.items():
                final_result['repair_estimate']['parts_breakdown'][part] = details
            
            final_result['repair_estimate']['total_repair_cost'] += result['repair_estimate']['total_repair_cost']
            final_result['repair_estimate']['missing_parts'].extend(result['repair_estimate'].get('missing_parts', []))
            
            # Update severity to worst case
            if result['repair_estimate']['severity'] == 'severe':
                final_result['repair_estimate']['severity'] = 'severe'
            elif result['repair_estimate']['severity'] == 'normal' and final_result['repair_estimate']['severity'] != 'severe':
                final_result['repair_estimate']['severity'] = 'normal'
        
        return jsonify(final_result)

    except Exception as e:
        # Catch-all for any unexpected errors
        app.logger.error(f"Unexpected global error: {traceback.format_exc()}")
        return jsonify({
            "error": "Unexpected server error", 
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000, threaded=True)  # Disable debug mode for production