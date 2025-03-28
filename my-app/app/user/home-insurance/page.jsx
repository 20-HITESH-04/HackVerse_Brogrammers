"use client";
import { useState, useRef } from "react";
import { Navbar } from "../../../Components/user/Navbar";
import { Sidebar } from "../../../Components/user/Sidebar";
// import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
import HomeUploadForm from "../../../Components/Car_Insurance/LivePhotoCapture";
import GetGeolocation from "@/Components/Car_Insurance/Geologiocal";
// import OcrUpload from "@/Components/Car_Insurance/ocrUpload";
import { FileText, Pen, Home, MapPin } from 'lucide-react';

export default function HomeInsurance() {
  const [isVerified, setIsVerified] = useState(false);
  const analysisRef = useRef(null);

  // const handleSignatureVerification = (verificationResult) => {
  //   console.log("Signature Verified:", verificationResult);
  //   if (verificationResult) {
  //     setIsVerified(true);
  //     setTimeout(() => {
  //       analysisRef.current?.scrollIntoView({ behavior: "smooth" });
  //     }, 300);
  //   } else {
  //     alert("Signature verification failed. Please try again.");
  //   }
  // };

  const StepCard = ({ title, description, children, icon: Icon }) => (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out mb-8">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      {/* <Sidebar />  */}
      <div className="flex-1">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-15">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Home Insurance Claim Process
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete each step carefully to process your home insurance claim efficiently.
            </p>
          </div>

          {/* <StepCard
            title="Document Verification"
            icon={FileText}
            description="Upload and verify your important documents to ensure a smooth claim process."
          >
            <OcrUpload />
          </StepCard> */}

          {/* <StepCard
            title="Signature Verification"
            icon={Pen}
            description="Sign and verify to authenticate your insurance claim request."
          >
            <SignatureCapture onSave={handleSignatureVerification} />
          </StepCard> */}

          {!isVerified && (
            <StepCard
              title="Home Damage Assessment"
              icon={Home}
              description="Upload clear images of your home's damage for accurate evaluation."
              ref={analysisRef}
            >
              <HomeUploadForm />
            </StepCard>
          )}

          <StepCard
            title="Location Verification"
            icon={MapPin}
            description="Allow access to your current location for accurate claim processing."
          >
            <GetGeolocation />
          </StepCard>
        </div>
      </div>
    </div>
  );
}
