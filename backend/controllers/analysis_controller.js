const axios = require("axios");
const Analysis = require("../models/analysis");
const path = require("path");
const fs = require("fs");

// 🚀 **Upload Multiple Images**
exports.uploadImages = async (req, res) => {
  if (!req.files) return res.status(400).json({ error: "No files uploaded!" });

  const imagePaths = req.files.map((file) => file.path);
  res.json({ message: "Images uploaded successfully!", imagePaths });
};


exports.analyzeImages = async (req, res) => {
  try {
    const { userId, carBrand, carModel, images } = req.body;
    if (!userId || !carBrand || !carModel || !images || images.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let finalResult = { detectedParts: {}, repairEstimate: { total_repair_cost: 0 }, severity: "minor" };
    let analyzedImagePaths = [];
    let detectedPartsSet = new Set(); // To prevent duplicate parts being counted

    for (const image of images) {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        image_path: image,
        car_brand: carBrand,
        car_model: carModel,
      });

      const { detected_parts, repair_estimate, analyzed_image } = response.data; // ML model should return analyzed image path
      
      // Store analyzed image paths
      if (analyzed_image) {
        analyzedImagePaths.push(analyzed_image);
      }

      // Merge detection results without double-counting
      for (const part in detected_parts) {
        if (!detectedPartsSet.has(part)) {
          detectedPartsSet.add(part);
          finalResult.detectedParts[part] = detected_parts[part]; // Count each part only once
        }
      }

      // Merge repair estimates
      finalResult.repairEstimate.total_repair_cost += repair_estimate.total_repair_cost;

      // Determine overall severity (take the worst case)
      if (repair_estimate.severity === "severe") {
        finalResult.severity = "severe";
      } else if (repair_estimate.severity === "normal" && finalResult.severity !== "severe") {
        finalResult.severity = "normal";
      }
    }

    // Store result in DB
    const newAnalysis = new Analysis({
      userId,
      carBrand,
      carModel,
      images, // Original uploaded images
      analyzedImages: analyzedImagePaths, // Store the processed images
      detectedParts: finalResult.detectedParts,
      repairEstimate: finalResult.repairEstimate,
      severity: finalResult.severity,
    });

    await newAnalysis.save();

    res.json({ message: "Analysis completed!", analysis: newAnalysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// 🚀 **Fetch Analysis Results**
exports.getAnalysisResults = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ error: "Analysis not found" });

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
