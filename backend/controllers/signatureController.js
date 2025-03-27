const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const User = require("../models/user");

const verifySignature = async (req, res) => {
    try {
        console.log("Received request for signature verification");
        console.log("Uploaded file details:", req.file);
        console.log("User ID:", req.body.userId);

        const { userId } = req.body;

        if (!req.file) {
            return res.status(400).json({ status: "Error", message: "No file uploaded" });
        }

        if (!userId) {
            return res.status(400).json({ status: "Error", message: "User ID is required" });
        }

        // Fetch the original signature path from the database
        const user = await User.findById(userId);
        if (!user || !user.signature) {
            return res.status(404).json({ status: "Error", message: "User or signature not found" });
        }

        console.log("Original signature path from DB:", user.signature);

        // Get the path of the uploaded and stored file
        const uploadedFilePath = path.join(__dirname, "../uploads/", req.file.filename);
        const originalSignaturePath = path.join(__dirname, "../uploads/", path.basename(user.signature)); // Ensure the stored path is correct

        console.log("Uploaded file stored at:", uploadedFilePath);
        console.log("Original signature file:", originalSignaturePath);

        // Send both images to the Flask API
        const formData = new FormData();
        formData.append("image1", fs.createReadStream(originalSignaturePath));
        formData.append("image2", fs.createReadStream(uploadedFilePath));

        const response = await axios.post("http://127.0.0.1:5002/verify_signature", formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log("Flask API Response:", response.data);

        return res.json(response.data);

    } catch (error) {
        console.error("Error verifying signature:", error);
        return res.status(500).json({ status: "Error", message: "Internal server error" });
    }
};

module.exports = { verifySignature };
