"use client";

import { useRef, useState } from "react";

export default function SignatureCapture({ onSave }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState("#000000"); // Default black
    const [penSize, setPenSize] = useState(2); // Default size
    const [saving, setSaving] = useState(false); // Loading state

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = penColor; // Set pen color
        ctx.lineWidth = penSize; // Set pen size
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const saveSignature = async () => {
        setSaving(true);
        const canvas = canvasRef.current;
        const signatureData = canvas.toDataURL("image/png"); // Convert to base64

        try {
            const response = await fetch("/api/signature-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ signature: signatureData }), // Send base64 data
            });

            const result = await response.json();

            if (result.status === "Yes") {
                onSave(signatureData); // Save if verified
                alert("Signature verified successfully!");
            } else {
                alert("Signature verification failed. Try again!");
            }
        } catch (error) {
            alert("Error verifying the signature. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg border w-full">
            <h2 className="text-xl font-bold mb-4">Sign Below</h2>

            {/* Canvas for Signature */}
            <canvas
                ref={canvasRef}
                className="border rounded-lg w-full h-40 bg-gray-100 cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />

            {/* Pen Options */}
            <div className="flex gap-4 mt-4">
                <label className="flex items-center gap-2">
                    <span>Pen Color:</span>
                    <input
                        type="color"
                        value={penColor}
                        onChange={(e) => setPenColor(e.target.value)}
                    />
                </label>

                <label className="flex items-center gap-2">
                    <span>Pen Size:</span>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={penSize}
                        onChange={(e) => setPenSize(e.target.value)}
                    />
                </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={saveSignature}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Signature"}
                </button>

                <button
                    onClick={clearCanvas}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}