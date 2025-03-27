"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, MessageSquare } from 'lucide-react';

const SIDEBAR_ITEMS = [
    { name: 'Dashboard', icon: Home, href: '/user' },
    { name: 'Claims', icon: FileText, href: '/user/claims' },
    { name: 'AI Chatbot', icon: MessageSquare, href: '/user/chatbot' }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r p-4 hidden md:block">
            <nav>
                <ul className="space-y-2">
                    {SIDEBAR_ITEMS.map((item) => {
                        // Check if the current pathname exactly matches the item's href 
                        // or if it starts with the item's href (for nested routes)
                        const isActive = pathname === item.href ||
                            (item.href !== '/user' && pathname.startsWith(item.href));

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center space-x-3 p-2 rounded-lg transition-colors
                                        ${isActive
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'hover:bg-blue-50 text-gray-700'
                                        }
                                    `}
                                >
                                    <item.icon
                                        className={`
                                            h-5 w-5 
                                            ${isActive ? 'text-blue-800' : 'text-blue-600'}
                                        `}
                                    />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}