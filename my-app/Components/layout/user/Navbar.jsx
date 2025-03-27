import React from 'react';
import { Bell, User, Settings } from 'lucide-react';
import { Button } from '../../ui/button';
import Image from 'next/image';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Image src="/tez_claim_logo.png" alt="Logo" width={40} height={40} />
                <h1 className="text-xl font-bold text-blue-600">TezClaim</h1>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                </Button>
            </div>
        </nav>
    );
}
