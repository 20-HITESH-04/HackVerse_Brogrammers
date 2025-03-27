const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  images: [{ type: String, required: true }], // Image URLs
  detectedParts: Object, // Damage detection results
  repairEstimate: Object, // Cost estimation
  severity: String, // Minor/Normal/Severe
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
