'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    // You can easily add more items here if needed
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white shadow-md flex flex-col">
            <nav className="flex-grow pt-5">
                <ul>
                    {SIDEBAR_ITEMS.map((item) => {
                        // Check if the current pathname exactly matches the item's href 
                        // or if it starts with the item's href (for nested routes)
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <li key={item.text} className="px-5">
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center py-3 px-3 rounded transition
                                        ${isActive
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'hover:bg-blue-50 text-gray-700'
                                        }
                                    `}
                                >
                                    <item.icon
                                        className={`mr-3 
                                            ${isActive ? 'text-blue-800' : ''}
                                        `}
                                        size={20}
                                    />
                                    <span>{item.text}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}