// src/app/(admin)/admin/layout.js
import React from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Navbar } from '@/components/admin/Navbar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex flex-col h-screen pt-16">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-10 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}