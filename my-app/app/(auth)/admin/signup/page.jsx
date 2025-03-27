'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { LockKeyhole, Mail, UserPlus, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.adminKey !== 'ADMIN2024') {
      alert('Invalid admin registration key!');
      return;
    }

    try {
      const response = await axios.post('/api/admin/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      console.log('Admin Signup Success:', response.data);
      alert('Signup successful! Please log in.');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 max-h-full">
        <CardHeader className="text-center pb-4">
          <Image
            src="/tez_claim_logo.png"
            alt="FinTech Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <ShieldCheck className="text-green-600" size={28} /> Admin Signup
          </CardTitle>
          <p className="text-gray-500 mt-1 text-sm">Create an Admin Account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
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
                  className="pl-10 bg-gray-100 focus:ring-green-500 focus:border-green-500"
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
                  className="pl-10 bg-gray-100 focus:ring-green-500 focus:border-green-500"
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
                  className="pl-10 bg-gray-100 focus:ring-green-500 focus:border-green-500"
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
                  className="pl-10 bg-gray-100 focus:ring-green-500 focus:border-green-500"
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
                  className="pl-10 bg-gray-100 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all">
              Create Admin Account
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account? <Link href="/admin/signin" className="text-green-600 hover:underline">Sign in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


