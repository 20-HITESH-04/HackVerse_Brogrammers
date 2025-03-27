const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");
const User = require("../models/User"); // Assuming a User model with a signaturePath field

// Multer for handling file uploads
const upload = multer({ dest: "uploads/" });

const verifySignature = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch stored signature path from database
        const user = await User.findById(userId);
        if (!user || !user.signaturePath) {
            return res.status(404).json({ error: "Stored signature not found" });
        }

        const storedSignaturePath = user.signaturePath;
        const uploadedImage = req.file;

        if (!uploadedImage) {
            return res.status(400).json({ error: "Please upload a signature image" });
        }

        // Prepare form data for Flask API
        const formData = new FormData();
        formData.append("image1", fs.createReadStream(storedSignaturePath));
        formData.append("image2", fs.createReadStream(uploadedImage.path));

        // Send images to Flask API for verification
        const apiResponse = await axios.post("http://127.0.0.1:5002/verify_signature", formData, {
            headers: formData.getHeaders(),
        });

        // Cleanup: Delete the uploaded temporary file
        fs.unlinkSync(uploadedImage.path);

        return res.json(apiResponse.data);
    } catch (error) {
        console.error("Error in signature verification:", error.message);
        
        // Cleanup in case of error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { verifySignature, upload };