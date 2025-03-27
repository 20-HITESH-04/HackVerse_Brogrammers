"use client";

import { useState } from "react";
import { User, Mail, Lock, Image, Upload, ArrowRight } from "lucide-react";

const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signature, setSignature] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e, setState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fullName || !email || !password || !signature || !photo) {
      alert("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("signature", signature.file);
      formData.append("photo", photo.file);

      const response = await fetch("http://localhost:3001/api/user/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
      }

      alert("User added successfully!");
      setFullName("");
      setEmail("");
      setPassword("");
      setSignature(null);
      setPhoto(null);
    } catch (error) {
      alert(`Error adding user: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-start justify-center p-4 pt-10">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        <div className="w-1/2 bg-blue-600 p-10 flex flex-col justify-center text-white relative">
          <h2 className="text-3xl font-bold mb-4">Create New User Account</h2>
          <p className="text-lg mb-6">
            Fill out the form with accurate information to create a new user account.
          </p>
          <div className="flex items-center text-lg">
            <ArrowRight className="mr-3" />
            <span>Secure and Simple Registration</span>
          </div>
        </div>

        <div className="w-1/2 p-6 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-blue-800 font-semibold mb-1">Full Name</label>
              <div className="flex items-center border-2 border-blue-200 rounded-lg focus-within:border-blue-500">
                <span className="pl-3 text-blue-500"><User className="w-5 h-5" /></span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  required
                  className="w-full p-2 pl-2 outline-none text-blue-800 placeholder-blue-300 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-1">Email Address</label>
              <div className="flex items-center border-2 border-blue-200 rounded-lg focus-within:border-blue-500">
                <span className="pl-3 text-blue-500"><Mail className="w-5 h-5" /></span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full p-2 pl-2 outline-none text-blue-800 placeholder-blue-300 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-800 font-semibold mb-1">Password</label>
              <div className="flex items-center border-2 border-blue-200 rounded-lg focus-within:border-blue-500">
                <span className="pl-3 text-blue-500"><Lock className="w-5 h-5" /></span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create strong password"
                  required
                  className="w-full p-2 pl-2 outline-none text-blue-800 placeholder-blue-300 bg-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-blue-800 font-semibold mb-1">Signature</label>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setSignature)}
                    required
                    className="hidden"
                    id="signature-upload"
                  />
                  <label htmlFor="signature-upload" className="cursor-pointer flex flex-col items-center text-blue-500 hover:text-blue-700">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">{signature ? "Change Signature" : "Upload Signature"}</span>
                  </label>
                  {signature && <img src={signature.preview} alt="Signature Preview" className="mt-4 mx-auto h-20 object-contain rounded-md shadow-md" />}
                </div>
              </div>

              <div className="w-1/2">
                <label className="block text-blue-800 font-semibold mb-1">Profile Photo</label>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setPhoto)}
                    required
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center text-blue-500 hover:text-blue-700">
                    <Image className="w-8 h-8 mb-2" />
                    <span className="text-sm">{photo ? "Change Photo" : "Upload Photo"}</span>
                  </label>
                  {photo && <img src={photo.preview} alt="Photo Preview" className="mt-4 mx-auto h-20 w-20 object-cover rounded-full shadow-md" />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-bold ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"} transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {isSubmitting ? "Registering..." : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
