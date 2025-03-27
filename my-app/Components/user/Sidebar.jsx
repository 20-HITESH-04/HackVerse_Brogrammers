import React from 'react';
import Link from 'next/link';
import { Home, FileText, MessageSquare } from 'lucide-react';

const SIDEBAR_ITEMS = [
    { name: 'Dashboard', icon: Home, href: '/user/home' },
    { name: 'Claims', icon: FileText, href: '/user/claims' },
    { name: 'AI Chatbot', icon: MessageSquare, href: '/user/chatbot' }
];

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r p-4 hidden md:block">
            <nav>
                <ul className="space-y-2">
                    {SIDEBAR_ITEMS.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <item.icon className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
