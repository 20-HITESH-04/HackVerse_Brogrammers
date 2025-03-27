"use client";

import React, { useState, useEffect } from "react";

const CarUploadForm = () => {
  const [carBrand, setCarBrand] = useState(""); 
  const [carModel, setCarModel] = useState("");
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
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
    
    files.forEach((file, index) => {
      formData.append("images", file);  // Note: changed from 'image' to 'images'
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
      } else {
        alert(result.message || "Failed to analyze car.");
      }
    } catch (error) {
      console.error("Error submitting car details:", error);
      alert("Something went wrong!");
    }
  };
  
  return (
    <div style={{
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center"
    }}>
      <h2>Analyze Your Car</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Car Brand"
          value={carBrand}
          onChange={(e) => setCarBrand(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Car Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ margin: "10px 0" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Analyze Car
        </button>
      </form>
    </div>
  );
};

export default CarUploadForm;