"use client";

import { useState, useRef } from "react";

export default function LivePhotoCapture({ onCapture }) {
    const [photo, setPhoto] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(() => alert("Camera access denied!"));
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoData = canvas.toDataURL("image/png");
        setPhoto(photoData);
        onCapture(photoData);
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg border w-full">
            <h2 className="text-xl font-bold mb-4">Capture Live Photo</h2>

            <video ref={videoRef} autoPlay className="w-full h-auto rounded-lg border" />
            <canvas ref={canvasRef} className="hidden" />

            <button
                onClick={startCamera}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
                Start Camera
            </button>

            <button
                onClick={capturePhoto}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Capture Photo
            </button>

            {photo && <img src={photo} alt="Captured" className="mt-4 rounded-lg border" />}
        </div>
    );
}
