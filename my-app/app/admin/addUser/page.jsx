"use client";

import { useState } from "react";
import { User, Mail, Lock, Image, Upload } from "lucide-react";

const AddUser = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signature, setSignature] = useState("");
    const [photo, setPhoto] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileUpload = (e, setState) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setState(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Existing validation logic
        if (!fullName || !email || !password || !signature || !photo) {
            console.error("All fields are required.");
            setIsSubmitting(false);
            return;
        }

        if (password.length < 6) {
            console.error("Password must be at least 6 characters long.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    signature,
                    photo,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to register user");
            }

            console.log("User added successfully:", data);
            // Reset form
            setFullName("");
            setEmail("");
            setPassword("");
            setSignature("");
            setPhoto("");
        } catch (error) {
            console.error("Error adding user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-blue-600 p-6 text-center">
                    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                        <User className="w-8 h-8" />
                        User Registration
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Full Name Input */}
                    <div className="relative">
                        <label className="block text-blue-800 font-semibold mb-2">Full Name</label>
                        <div className="flex items-center border-2 border-blue-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <span className="pl-3 text-blue-500">
                                <User className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                                className="w-full p-3 pl-2 outline-none text-blue-800 placeholder-blue-300"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <label className="block text-blue-800 font-semibold mb-2">Email Address</label>
                        <div className="flex items-center border-2 border-blue-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <span className="pl-3 text-blue-500">
                                <Mail className="w-5 h-5" />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full p-3 pl-2 outline-none text-blue-800 placeholder-blue-300"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label className="block text-blue-800 font-semibold mb-2">Password</label>
                        <div className="flex items-center border-2 border-blue-200 rounded-lg focus-within:border-blue-500 transition-all">
                            <span className="pl-3 text-blue-500">
                                <Lock className="w-5 h-5" />
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                required
                                className="w-full p-3 pl-2 outline-none text-blue-800 placeholder-blue-300"
                            />
                        </div>
                    </div>

                    {/* Signature Upload */}
                    <div>
                        <label className="block text-blue-800 font-semibold mb-2">Signature</label>
                        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, setSignature)}
                                required
                                className="hidden"
                                id="signature-upload"
                            />
                            <label 
                                htmlFor="signature-upload" 
                                className="cursor-pointer flex flex-col items-center text-blue-500 hover:text-blue-700"
                            >
                                <Upload className="w-10 h-10 mb-2" />
                                <span className="text-sm">
                                    {signature ? "Change Signature" : "Upload Signature"}
                                </span>
                            </label>
                            {signature && (
                                <img 
                                    src={signature} 
                                    alt="Signature Preview" 
                                    className="mt-4 mx-auto h-24 object-contain rounded-md shadow-md"
                                />
                            )}
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className="block text-blue-800 font-semibold mb-2">Profile Photo</label>
                        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, setPhoto)}
                                required
                                className="hidden"
                                id="photo-upload"
                            />
                            <label 
                                htmlFor="photo-upload" 
                                className="cursor-pointer flex flex-col items-center text-blue-500 hover:text-blue-700"
                            >
                                <Image className="w-10 h-10 mb-2" />
                                <span className="text-sm">
                                    {photo ? "Change Photo" : "Upload Photo"}
                                </span>
                            </label>
                            {photo && (
                                <img 
                                    src={photo} 
                                    alt="Photo Preview" 
                                    className="mt-4 mx-auto h-24 w-24 object-cover rounded-full shadow-md"
                                />
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full py-3 rounded-lg text-white font-bold 
                            ${isSubmitting 
                                ? "bg-blue-400 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                            } 
                            transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                        `}
                    >
                        {isSubmitting ? "Registering..." : "Add User"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;