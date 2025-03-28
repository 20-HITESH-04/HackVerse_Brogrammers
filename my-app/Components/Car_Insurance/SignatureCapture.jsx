"use client";

import { useState } from "react";

export default function SignatureUpload({ onSave }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadSignature = async () => {
        if (!selectedFile) {
            alert("Please select a signature image to upload.");
            return;
        }
        
        setSaving(true);
        const userId = localStorage.getItem("_id");
        
        if (!userId) {
            alert("User ID not found");
            setSaving(false);
            return;
        }
        
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("userId", userId);

        console.log("Sending data to backend:", [...formData.entries()]);
        
        try {
            const response = await fetch("http://localhost:3001/api/signature/verify", { // ✅ Corrected API URL
                method: "POST",
                body: formData,
            });
            
            const result = await response.json();
            console.log("API Response:", result); // ✅ Debugging response

            if (result.match) { // ✅ Correct condition
                // onSave();
                alert(`✅ Success: ${result.message} (Score: ${result.similarity_score})`);
            } else {
                alert(`❌ Failed: ${result.message} (Score: ${result.similarity_score})`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error verifying the signature. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg border w-full">
            <h2 className="text-xl font-bold mb-4">Upload Your Signature</h2>
            
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />
            
            <div className="flex gap-4 mt-4">
                <button
                    onClick={uploadSignature}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={saving}
                >
                    {saving ? "Uploading..." : "Upload Signature"}
                </button>
            </div>
        </div>
    );
}
