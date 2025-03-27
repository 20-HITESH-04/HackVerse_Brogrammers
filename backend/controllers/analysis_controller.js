const axios = require("axios");
const Analysis = require("../models/analysis");
const path = require("path");
const fs = require("fs");
const FormData = require('form-data');

// 🚀 **Upload Multiple Images**
exports.uploadImages = async (req, res) => {
  if (!req.files) return res.status(400).json({ error: "No files uploaded!" });

  const imagePaths = req.files.map((file) => file.path);
  res.json({ message: "Images uploaded successfully!", imagePaths });
};


exports.analyzeImages = async (req, res) => {
  try {
    const { userId, carBrand, carModel } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    console.log("Received Data:");
    console.log("User ID:", userId);
    console.log("Car Brand:", carBrand);
    console.log("Car Model:", carModel);
    console.log("Images:", images);
   
    if (!userId || !carBrand || !carModel || images.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Increase timeout and configure axios
    const axiosInstance = axios.create({
      timeout: 60000, // 60 seconds
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    // Create FormData for multi-part file upload
    const formData = new FormData();
    
    // Append car details
    formData.append('carBrand', carBrand);
    formData.append('carModel', carModel);

    // Append image files
    images.forEach((imagePath, index) => {
      const imageBuffer = fs.readFileSync(imagePath);
      formData.append('images', imageBuffer, {
        filename: path.basename(imagePath),
        contentType: 'image/jpeg'
      });
    });

    // Send request with detailed error handling
    const response = await axiosInstance.post("http://127.0.0.1:5000/analyze", formData, {
      headers: {
        ...formData.getHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });

    // Process response from ML server
    const { detected_parts, repair_estimate } = response.data;
   
    // Create analysis record
    const newAnalysis = new Analysis({
      userId,
      carBrand,
      carModel,
      images,
      detectedParts: detected_parts,
      repairEstimate: repair_estimate,
      severity: repair_estimate.severity,
    });

    await newAnalysis.save();

    res.json({ message: "Analysis completed!", analysis: newAnalysis });
  } catch (error) {
    console.error("Full Error:", error);
    
    // More detailed error response
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
      
      return res.status(error.response.status).json({
        error: "Server processing error",
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      
      return res.status(500).json({
        error: "No response from analysis server",
        details: "The server did not respond to the request"
      });
    } else {
      // Something happened in setting up the request
      console.error("Error Message:", error.message);
      
      return res.status(500).json({
        error: "Request setup error",
        details: error.message
      });
    }
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













// const axios = require("axios");
// const Analysis = require("../models/analysis");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");

// // Set up storage for uploaded images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Ensure this folder exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // 🚀 **Upload Multiple Images**
// exports.uploadImages = upload.array("images", 10); // Allow up to 10 images

// exports.analyzeImages = async (req, res) => {
//   try {
//     const { userId, carBrand, carModel } = req.body;
//     const images = req.files.map((file) => file.path);

//     if (!userId || !carBrand || !carModel || images.length === 0) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     let finalResult = { detectedParts: {}, repairEstimate: { total_repair_cost: 0 }, severity: "minor" };
//     let analyzedImagePaths = [];
//     let detectedPartsSet = new Set(); // To prevent duplicate parts being counted

//     for (const image of images) {
//       const response = await axios.post("http://127.0.0.1:5000/analyze", {
//         image_path: image,
//         car_brand: carBrand,
//         car_model: carModel,
//       });

//       const { detected_parts, repair_estimate, analyzed_image } = response.data; // ML model should return analyzed image path
      
//       // Store analyzed image paths
//       if (analyzed_image) {
//         analyzedImagePaths.push(analyzed_image);
//       }

//       // Merge detection results without double-counting
//       for (const part in detected_parts) {
//         if (!detectedPartsSet.has(part)) {
//           detectedPartsSet.add(part);
//           finalResult.detectedParts[part] = detected_parts[part];
//         }
//       }

//       // Merge repair estimates
//       finalResult.repairEstimate.total_repair_cost += repair_estimate.total_repair_cost;

//       // Determine overall severity (take the worst case)
//       if (repair_estimate.severity === "severe") {
//         finalResult.severity = "severe";
//       } else if (repair_estimate.severity === "normal" && finalResult.severity !== "severe") {
//         finalResult.severity = "normal";
//       }
//     }

//     // Store result in DB
//     const newAnalysis = new Analysis({
//       userId,
//       carBrand,
//       carModel,
//       images,
//       analyzedImages: analyzedImagePaths,
//       detectedParts: finalResult.detectedParts,
//       repairEstimate: finalResult.repairEstimate,
//       severity: finalResult.severity,
//     });

//     await newAnalysis.save();

//     res.json({ message: "Analysis completed!", analysis: newAnalysis });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // 🚀 **Fetch Analysis Results**
// exports.getAnalysisResults = async (req, res) => {
//   try {
//     const analysis = await Analysis.findById(req.params.id);
//     if (!analysis) return res.status(404).json({ error: "Analysis not found" });

//     res.json(analysis);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
