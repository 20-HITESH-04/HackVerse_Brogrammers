"use client";
import { useState, useRef } from "react";
import { Navbar } from "../../../Components/user/Navbar";
import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
import CarUploadForm from "../../../Components/Car_Insurance/CarDamage";
import GetGeolocation from "@/Components/Car_Insurance/Geologiocal";
import OcrUpload from "@/Components/Car_Insurance/ocrUpload";

export default function CarInsurance() {
  const [isVerified, setIsVerified] = useState(false);
  const analysisRef = useRef(null);

  const handleSignatureVerification = (verificationResult) => {
    console.log("Signature Verified:", verificationResult);
    if (verificationResult) {
      setIsVerified(true);
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      alert("Signature verification failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Navbar with margin bottom */}
      <div className="mb-8">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 space-y-6">
        {/* OCR Upload section */}
        <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Document Verification
          </h2>
          <OcrUpload />
        </div>

        {/* Signature Capture */}
        <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Signature Verification
          </h2>
          <SignatureCapture onSave={handleSignatureVerification} />
        </div>

        {/* Car Damage Upload */}
        {!isVerified && (
          <div 
            ref={analysisRef} 
            className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Car Damage Assessment
            </h2>
            <CarUploadForm />
          </div>
        )}

        {/* Geolocation */}
        <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Location Verification
          </h2>
          <GetGeolocation />
        </div>
      </div>
    </div>
  );
}
