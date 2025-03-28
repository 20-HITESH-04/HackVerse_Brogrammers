"use client";
import { useState, useRef } from "react";
import { Navbar } from "../../../Components/user/Navbar";
import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
import CarUploadForm from "../../../Components/Car_Insurance/CarDamage";
import GetGeolocation from "@/Components/Car_Insurance/Geologiocal";
import OcrUpload from "@/Components/Car_Insurance/ocrUpload";
import { FileText, Pen, Car, MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-15">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Car Insurance Claim Process
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete each step carefully to process your car insurance claim efficiently.
          </p>
        </div>

        <StepCard
          title="Document Verification"
          icon={FileText}
          description="Accurate document verification is crucial to validate your insurance claim. Upload and verify your important documents to ensure a smooth claim process."
        >
          <OcrUpload />
        </StepCard>

        <StepCard
          title="Signature Verification"
          icon={Pen}
          description="Your digital signature serves as a legal confirmation of your claim details. Carefully sign and verify to authenticate your insurance claim request."
        >
          <SignatureCapture onSave={handleSignatureVerification} />
        </StepCard>

        {!isVerified && (
          <StepCard
            title="Car Damage Assessment"
            icon={Car}
            description="Comprehensive damage assessment helps determine the extent of coverage. Upload clear, detailed images of your vehicle's damage for accurate evaluation."
            ref={analysisRef}
          >
            <CarUploadForm />
          </StepCard>
        )}

        <StepCard
          title="Location Verification"
          icon={MapPin}
          description="Precise location verification helps validate the context of your insurance claim. Allow access to your current location for accurate claim processing."
        >
          <GetGeolocation />
        </StepCard>
      </div>
    </div>
  );
}


// "use client";
// import { useState, useRef } from "react";
// import { Navbar } from "../../../Components/user/Navbar";
// import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
// import CarUploadForm from "../../../Components/Car_Insurance/CarDamage";
// import GetGeolocation from "@/Components/Car_Insurance/Geologiocal";
// import OcrUpload from "@/Components/Car_Insurance/ocrUpload";

// export default function CarInsurance() {
//   const [isVerified, setIsVerified] = useState(false);
//   const analysisRef = useRef(null);

//   const handleSignatureVerification = (verificationResult) => {
//     console.log("Signature Verified:", verificationResult);
//     if (verificationResult) {
//       setIsVerified(true);
//       setTimeout(() => {
//         analysisRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 300);
//     } else {
//       alert("Signature verification failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-blue-50">
//       {/* Navbar with margin bottom */}
//       <div className="mb-8">
//         <Navbar />
//       </div>

//       <div className="container mx-auto px-4 space-y-6">
//         {/* OCR Upload section */}
//         <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Document Verification
//           </h2>
//           <OcrUpload />
//         </div>

//         {/* Signature Capture */}
//         <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Signature Verification
//           </h2>
//           <SignatureCapture onSave={handleSignatureVerification} />
//         </div>

//         {/* Car Damage Upload */}
//         {!isVerified && (
//           <div
//             ref={analysisRef}
//             className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6"
//           >
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Car Damage Assessment
//             </h2>
//             <CarUploadForm />
//           </div>
//         )}

//         {/* Geolocation */}
//         <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Location Verification
//           </h2>
//           <GetGeolocation />
//         </div>
//       </div>
//     </div>
//   );
// }
