// "use client";

// import { useState } from "react";
// import { Navbar } from "../../../Components/user/Navbar";
// import OcrUpload from "../../../components/Car_Insurance/OcrUpload";
// import LivePhotoCapture from "../../../components/Car_Insurance/LivePhotoCapture";
// import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
// import CarDamageDetection from "../../../components/Car_Insurance/CarDamage";

// export default function CarInsurance() {
//     const [isVerified, setIsVerified] = useState(true);
//     const [photo, setPhoto] = useState(null);
//     const [signature, setSignature] = useState(null);
//     const [damageResult, setDamageResult] = useState(null);

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             {/* Navbar at the top */}
//             <Navbar />

//             {/* Main container centered */}
//             <div className="flex flex-col items-center justify-center flex-grow p-6">
//                 <div className="w-full max-w-lg">
//                     <OcrUpload onVerify={() => setIsVerified(true)} />
//                 </div>

//                 {isVerified && (
//                     <div className="w-full max-w-lg mt-6 space-y-6">
//                         <LivePhotoCapture onCapture={(photoData) => setPhoto(photoData)} />
//                         <SignatureCapture onSave={(signatureData) => setSignature(signatureData)} />
//                         <CarDamageDetection onDetect={(result) => setDamageResult(result)} />
//                     </div>
//                 )}

//                 {/* Display Car Damage Result */}
//                 {damageResult && (
//                     <div className="w-full max-w-lg mt-6 p-4 bg-white shadow-lg rounded-lg border">
//                         <h3 className="text-lg font-semibold">Damage Detection Result:</h3>
//                         <p className="text-gray-700 mt-2">{JSON.stringify(damageResult, null, 2)}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../../../Components/user/Navbar";
import SignatureCapture from "../../../components/Car_Insurance/SignatureCapture";
import CarDamageDetection from "../../../components/Car_Insurance/CarDamage";

export default function CarInsurance() {
    const [isVerified, setIsVerified] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [damageResult, setDamageResult] = useState(null);

    const handleSignatureVerification = (verificationResult) => {
        console.log("Signature Verified:", verificationResult);
        if (verificationResult) {
            setIsVerified(true);
        } else {
            alert("Signature verification failed. Please try again.");
        }
    };

    useEffect(() => {
        console.log("isVerified state changed:", isVerified);
    }, [isVerified]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            {/* Navbar at the top */}
            <Navbar />

            <div className="flex flex-col items-center justify-center w-full max-w-lg p-4 bg-white shadow-lg rounded-lg">
                {/* Signature popup */}
                {/* {!isVerified && <SignatureCapture onSave={handleSignatureVerification} />} */}

                {/* Show car image upload only after signature is verified */}
                {!isVerified && !photo && <CarDamageDetection onCapture={setPhoto} onDetect={setDamageResult} />}

                {/* Display Car Damage Result */}
                {damageResult && (
                    <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <h2 className="text-lg font-semibold">Damage Detection Result:</h2>
                        <pre className="text-sm text-gray-700">{JSON.stringify(damageResult, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
