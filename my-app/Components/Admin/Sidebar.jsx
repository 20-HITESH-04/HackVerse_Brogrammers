// src/components/admin/Sidebar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    CreditCard,
    Shield,
    UserPlus,
    User

} from 'lucide-react';

const SIDEBAR_ITEMS = [
    {
        icon: LayoutDashboard,
        text: 'Dashboard',
        href: '/admin'
    },
    {
        icon: UserPlus,
        text: 'Add User',
        href: '/admin/addUser'
    },


];

export function Sidebar() {
    return (
        <div className="w-64 bg-white shadow-md flex flex-col">
            <nav className="flex-grow pt-5">
                <ul>
                    {SIDEBAR_ITEMS.map((item) => (
                        <li key={item.text} className="px-5">
                            <Link
                                href={item.href}
                                className="flex items-center py-3 px-3 hover:bg-blue-50 rounded text-gray-700 transition"
                            >
                                <item.icon className="mr-3" size={20} />
                                <span>{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}