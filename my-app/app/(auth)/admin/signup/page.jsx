'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { LockKeyhole, Mail, UserPlus, ShieldCheck, KeyRound } from 'lucide-react';

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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Admin key validation
    if (formData.adminKey !== 'ADMIN2024') {
      alert('Invalid admin registration key!');
      return;
    }

    // Implement admin signup logic
    console.log('Admin Signup', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <Image 
            src="/images/logo.svg" 
            alt="FinTech Logo" 
            width={100} 
            height={100} 
            className="mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <ShieldCheck className="mr-2 text-green-600" size={32} />
            Admin Signup
          </h2>
          <p className="text-gray-500 mt-2">Create Admin Account</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserPlus className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2"
                placeholder="Enter email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700">
              Admin Registration Key
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                name="adminKey"
                id="adminKey"
                required
                value={formData.adminKey}
                onChange={handleInputChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2"
                placeholder="Enter admin registration key"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Admin Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}