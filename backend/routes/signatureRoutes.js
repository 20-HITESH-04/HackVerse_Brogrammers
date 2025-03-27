const express = require("express");
const { verifySignature, upload } = require("../controllers/signatureController");

const router = express.Router();

// Route: Verify signatures
router.post("/verify", upload.single("image"), verifySignature);

module.exports = router;