// Multer for handling file uploads in-memory
const FormData = require("form-data");
const axios = require("axios");
const multer = require("multer");

// Multer for handling file uploads in-memory
const upload = multer();

const verifySignature = async (req, res) => {
    try {
        // Check if both images are uploaded
        if (!req.files || !req.files.image1 || !req.files.image2) {
            return res.status(400).json({ error: "Please upload two signature images" });
        }

        const image1 = req.files.image1[0];
        const image2 = req.files.image2[0];

        // Use FormData instead of base64 encoding
        const formData = new FormData();
        formData.append("image1", image1.buffer, image1.originalname);
        formData.append("image2", image2.buffer, image2.originalname);

        // Send images to Flask API for verification
        const apiResponse = await axios.post("http://127.0.0.1:5002/verify_signature", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.json(apiResponse.data);
    } catch (error) {
        console.error("Error in signature verification:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { verifySignature, upload };
