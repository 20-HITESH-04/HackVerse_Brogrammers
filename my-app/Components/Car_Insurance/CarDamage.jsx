"use client";

import { useRef, useState } from "react";

export default function CarDamageDetection({ onDetect }) {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...imageFiles]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const detectDamage = async () => {
        if (images.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`image_${index}`, image);
            });

            const response = await fetch("/api/car-damage-detection", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            onDetect(result);
        } catch (error) {
            alert("Error detecting car damage. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg border w-full">
            <h2 className="text-xl font-bold mb-4">Upload Car Images</h2>

            <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
            />
            <button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
                Select Images
            </button>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-4 mt-4">
                {images.map((src, index) => (
                    <div key={index} className="relative">
                        <img src={src} alt={`Car ${index}`} className="w-32 h-32 object-cover rounded-lg border" />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={detectDamage}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? "Detecting..." : "Detect Damage"}
            </button>
        </div>
    );
}