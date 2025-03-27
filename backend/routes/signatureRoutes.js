const express = require("express");
const { verifySignature, upload } = require("../controllers/signatureController");

const router = express.Router();

// Route: Verify signatures
router.post("/verify", upload.fields([{ name: "image1" }, { name: "image2" }]), verifySignature);

module.exports = router;
