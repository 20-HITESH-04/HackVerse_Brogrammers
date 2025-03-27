const express = require("express");
const multer = require("multer");
const analysisController = require("../controllers/analysis_controller");

const router = express.Router();

// Set up storage for images (you can use cloud storage later)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("images", 5), analysisController.uploadImages);
router.post("/analyze", analysisController.analyzeImages);
router.get("/results/:id", analysisController.getAnalysisResults);
module.exports = router;
