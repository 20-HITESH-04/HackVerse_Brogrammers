'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { LockKeyhole, Mail, UserPlus, KeyRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.adminKey !== 'ADMIN2024') {
      setError('Invalid admin registration key!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/admin/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      console.log('Admin Signup Success:', response.data);

      // Redirect to admin signin on successful signup
      router.push('/admin/signin');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
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
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Signup</CardTitle>
            <p className="text-gray-500 mt-1 text-sm">Create an Admin Account</p>
          </CardHeader>

          <CardContent>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

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
                    placeholder="Enter email"
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
                    placeholder="Enter password"
                    className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="adminKey" className="text-gray-700 font-medium">Admin Registration Key</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="password"
                    name="adminKey"
                    id="adminKey"
                    required
                    value={formData.adminKey}
                    onChange={handleInputChange}
                    placeholder="Enter admin registration key"
                    className="pl-10 bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all">
                Create Admin Account
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4 pb-4">
                Already have an account? <Link href="/admin/signin" className="text-blue-600 hover:underline">Sign in</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}