"use client";

import { useRef, useState, useEffect } from "react";

export default function CarDamageDetection({ onDetect }) {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch user ID and token from localStorage when the component mounts
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");
        if (storedUserId) setUserId(storedUserId);
        if (storedToken) setToken(storedToken);
    }, []);

    const handleImageUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);

        // Show image previews
        const previews = selectedFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const uploadImages = async () => {
        if (files.length === 0) {
            alert("Please upload at least one image.");
            return null;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            const uploadResponse = await fetch("http://localhost:3001/api/uploadImages", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Send token for authentication
                },
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            if (!uploadResponse.ok) {
                throw new Error(uploadResult.error || "Failed to upload images");
            }

            return uploadResult.imagePaths; // Return uploaded image paths for analysis
        } catch (error) {
            alert(`Error uploading images: ${error.message}`);
            setLoading(false);
            return null;
        }
    };

    const analyzeImages = async (uploadedImages) => {
        try {
            const analysisResponse = await fetch("http://localhost:3001/api/analyzeImages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token in request
                },
                body: JSON.stringify({
                    userId,
                    carBrand,
                    carModel,
                    images: uploadedImages,
                }),
            });

            const analysisResult = await analysisResponse.json();
            if (!analysisResponse.ok) {
                throw new Error(analysisResult.error || "Failed to analyze images");
            }

            onDetect(analysisResult); // Pass results to parent component
        } catch (error) {
            alert(`Error analyzing images: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const detectDamage = async () => {
        if (!userId || !carBrand || !carModel) {
            alert("Please fill in all details.");
            return;
        }

        const uploadedImages = await uploadImages();
        if (uploadedImages) {
            await analyzeImages(uploadedImages);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg border w-full">
            <h2 className="text-xl font-bold mb-4">Upload Car Images</h2>

            <input type="file" accept="image/*" multiple className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current.click()} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Select Images
            </button>

            {/* User Input Fields */}
            <div className="mt-4 w-full">
                <input type="text" placeholder="Car Brand" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} className="w-full p-2 border rounded mb-2" />
                <input type="text" placeholder="Car Model" value={carModel} onChange={(e) => setCarModel(e.target.value)} className="w-full p-2 border rounded mb-2" />
            </div>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-4 mt-4">
                {imagePreviews.map((src, index) => (
                    <div key={index} className="relative">
                        <img src={src} alt={`Car ${index}`} className="w-32 h-32 object-cover rounded-lg border" />
                        <button onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full">
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={detectDamage} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
                {loading ? "Detecting..." : "Detect Damage"}
            </button>
        </div>
    );
}
