'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LockKeyhole, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';

export default function UserSignin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/user/login', formData);
      console.log('User Signin Success:', response.data);
      // Handle success (e.g., store token, redirect)
    } catch (err) {
      console.error('Signin Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signin failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 relative">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-lg shadow-xl p-6 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <CardHeader className="text-center pb-4">
            <Image
              src="/tez_claim_logo.png"
              alt="FinTech Logo"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <CardTitle className="text-2xl font-bold text-gray-800">User Login</CardTitle>
            <p className="text-gray-500 mt-1 text-sm">Access your FinTech account</p>
          </CardHeader>

          <CardContent>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSignin} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all">
                Sign In
              </Button>
            </form>
          </CardContent>
          {/* 
          <p className="text-center text-sm text-gray-600 mt-4 pb-4">
            Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p> */}
        </Card>
      </div>
    </div>
  );
}




// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { LockKeyhole, Mail } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function UserSignin() {
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSignin = (e) => {
//     e.preventDefault();
//     console.log('User Signin', formData);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
//       <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6">
//         <CardHeader className="text-center pb-4">
//           <Image
//             src="/tez_claim_logo.png"
//             alt="FinTech Logo"
//             width={100}
//             height={100}
//             className="mx-auto mb-4"
//           />
//           <CardTitle className="text-2xl font-bold text-gray-800">User Login</CardTitle>
//           <p className="text-gray-500 mt-1 text-sm">Access your FinTech account</p>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSignin} className="space-y-5">
//             <div className="space-y-1">
//               <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <Input
//                   type="email"
//                   name="email"
//                   id="email"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Enter your email"
//                   className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
//               <div className="relative">
//                 <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <Input
//                   type="password"
//                   name="password"
//                   id="password"
//                   required
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="Enter your password"
//                   className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all">
//               Sign In
//             </Button>
//           </form>
//         </CardContent>

//         {/* <p className="text-center text-sm text-gray-600 mt-4 pb-4">
//           Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
//         </p> */}
//       </Card>
//     </div>
//   );
// }