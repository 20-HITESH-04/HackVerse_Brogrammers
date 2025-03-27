"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function OcrUpload({ onVerify }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length === 0) {
                setError("Invalid file type. Please upload a valid image.");
                return;
            }

            setFile(acceptedFiles[0]);
            setError(""); // Reset error when a valid file is uploaded
            console.log("File selected:", acceptedFiles[0]); // ✅ Debugging
        },
    });

    const handleProceed = async () => {
        if (!file) {
            alert("Please upload an image before proceeding.");
            return;
        }

        setIsLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("image", file); // ✅ Sending as 'image' instead of 'file'

        console.log("Sending image to backend:", file.name); // ✅ Debugging

        try {
            const response = await fetch("http://localhost:3001/api/ocr/process", { // ✅ Corrected API URL
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("OCR API Response:", result); // ✅ Debugging API Response

            if (result.valid) { // ✅ Correct condition
                alert(`✅ Document Verified: ${result.message}`);
                onVerify(); // ✅ Trigger next step
            } else {
                setError(`❌ Document Not Valid: ${result.message}`);
            }
        } catch (error) {
            console.error("OCR API Error:", error);
            setError("Error verifying the document. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg border w-full">
            <h2 className="text-xl font-bold mb-4">Upload Insurance Document</h2>

            {/* Drag and Drop File Upload */}
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded-lg p-10 w-full h-40 flex items-center justify-center text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
                <input {...getInputProps()} />
                <p className="text-gray-600 text-lg font-medium">
                    Drag & drop your insurance document here, or click to select
                </p>
            </div>

            {file && <p className="mt-4 text-green-600 font-semibold text-lg">{file.name}</p>}

            {/* Proceed Button */}
            {file && (
                <button
                    onClick={handleProceed}
                    className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? "Verifying..." : "Proceed"}
                </button>
            )}

            {/* Error Message */}
            {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        </div>
    );
}
