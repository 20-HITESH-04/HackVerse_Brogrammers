const express = require("express");
const multer = require("multer");
const { verifySignature } = require("../controllers/signatureController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Define routes
router.post("/verify", upload.single("image"), verifySignature);

module.exports = router;
