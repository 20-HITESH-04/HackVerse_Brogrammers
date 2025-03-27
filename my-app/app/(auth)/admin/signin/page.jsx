'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSignin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    // Implement admin signin logic
    console.log('Admin Signin', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Image 
            src="/images/logo.svg" 
            alt="FinTech Logo" 
            width={100} 
            height={100} 
            className="mx-auto mb-6"
          />
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <ShieldCheck className="mr-2 text-green-600" size={32} />
            Admin Login
          </CardTitle>
          <p className="text-gray-500 mt-2">Secure Admin Access</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter admin email"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter admin password"
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Admin Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}