"use client"

import { useState } from "react";

export default function OCRPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5001/ocr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract text");
      }

      const data = await response.json();
      setExtractedText(data.extracted_text.join("\n"));
      setImagePreview(`data:image/png;base64,${data.image_base64}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">OCR Image Text Extractor</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md mb-4"
        />
        {imagePreview && <img src={imagePreview} alt="Uploaded" className="mt-4 w-full rounded" />}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Extracting..." : "Extract Text"}
        </button>
        {error && <p className="text-red-600 font-bold mt-4">{error}</p>}
      </div>
      {extractedText && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Extracted Text</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{extractedText}</p>
        </div>
      )}
    </div>
  );
}
