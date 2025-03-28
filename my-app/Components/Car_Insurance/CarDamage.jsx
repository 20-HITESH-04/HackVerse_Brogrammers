"use client";

import React, { useState, useEffect } from "react";
import CarDamageAnalysisResults from "./CarDamageAnalysisResults";

const CarUploadForm = () => {
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Ensure this only runs on the client-side
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem("_id") || "";
      const storedToken = localStorage.getItem("token") || "";
      
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !carBrand.trim() || !carModel.trim() || files.length === 0) {
      alert("Please fill in all details.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("carBrand", carBrand);
    formData.append("carModel", carModel);

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:3001/api/damage-analysis/analyze", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Car Analysis Response:", result);

      if (response.ok) {
        alert("Car analyzed successfully!");
        setAnalysisResult(result);
      } else {
        alert(result.message || "Failed to analyze car.");
      }
    } catch (error) {
      console.error("Error submitting car details:", error);
      alert("Something went wrong!");
    }
  };

  // Prevent server-side rendering
  if (!isClient) return null;

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Analyze Your Car</h2>
        
        <div>
          <label htmlFor="carBrand" className="block mb-2 font-medium">Car Brand</label>
          <input
            id="carBrand"
            type="text"
            value={carBrand}
            onChange={(e) => setCarBrand(e.target.value)}
            placeholder="Enter car brand"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="carModel" className="block mb-2 font-medium">Car Model</label>
          <input
            id="carModel"
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            placeholder="Enter car model"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="damageImages" className="block mb-2 font-medium">Upload Damage Images</label>
          <input
            id="damageImages"
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Analyze Car
        </button>
      </form>

      {/* Conditionally render analysis results */}
      {analysisResult && (
        <div className="mt-8">
          <CarDamageAnalysisResults analysisData={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default CarUploadForm;