"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "../../../Components/user/Navbar";
import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
import CarUploadForm from "../../../Components/Car_Insurance/CarDamage";
import GetGeolocation from "@/Components/Car_Insurance/Geologiocal";

export default function CarInsurance() {
    const [isVerified, setIsVerified] = useState(false);
    const analysisRef = useRef(null);

    const handleSignatureVerification = (verificationResult) => {
        console.log("Signature Verified:", verificationResult);
        if (verificationResult) {
            setIsVerified(true);
            setTimeout(() => {
                analysisRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 300); // Small delay for better transition
        } else {
            alert("Signature verification failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-blue-50">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-col items-center justify-center flex-grow p-6">
                {/* Signature Capture (always on screen) */}
                <div className="w-full max-w-lg mt-40 p-6 bg-white shadow-lg rounded-lg">
                    <SignatureCapture onSave={handleSignatureVerification} />
                </div>

                {/* Scrolls to this section after verification */}
                {!isVerified && (
                    <div ref={analysisRef} className="w-full max-w-lg mt-80 p-6 bg-gray-100 shadow-lg rounded-lg border">
                        <CarUploadForm />
                    </div>
                )}

                {/* Scrolls to this section after verification */}
                {!isVerified && (
                    <div ref={analysisRef} className="w-full max-w-lg mt-80 p-6 bg-gray-100 shadow-lg rounded-lg border">
                        <GetGeolocation />
                    </div>
                )}
            </div>
        </div>
    );
}
