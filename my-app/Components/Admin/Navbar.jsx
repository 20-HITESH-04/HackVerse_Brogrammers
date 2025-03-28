'use client';

import React from 'react';
import { Bell, User, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center 
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
        shadow-lg">
            <div className="flex items-center space-x-4">
                <Image
                    src="/tez_claim_logo.png"
                    alt="TezClaim Logo"
                    width={40}
                    height={40}
                    className="rounded-md"
                />
                <h1 className="text-xl font-bold text-white">TezClaim</h1>
            </div>
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 hover:text-blue-100"
                >
                    <Bell className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 hover:text-blue-100"
                >
                    <Settings className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 hover:text-blue-100"
                >
                    <User className="h-5 w-5" />
                </Button>
            </div>
        </nav>
    );
}