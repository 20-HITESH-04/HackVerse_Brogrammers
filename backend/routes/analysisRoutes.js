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
router.post("/analyze", upload.array('images', 5), analysisController.analyzeImages);
router.get("/results/:id", analysisController.getAnalysisResults);

module.exports = router;