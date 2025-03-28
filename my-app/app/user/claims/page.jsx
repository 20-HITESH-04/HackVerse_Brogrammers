'use client';

import React from 'react';
import { Navbar } from '../../../Components/user/Navbar';
import { Sidebar } from '../../../Components/user/Sidebar';

const MOCK_CLAIMS = [
    { id: 'CLM001', date: '2025-03-28', type: 'Car Insurance', customerName: 'John Doe', amount: 5000, status: 'Pending', urgency: 'High' },
    { id: 'CLM002', date: '2025-03-27', type: 'Health Insurance', customerName: 'Jane Smith', amount: 3000, status: 'Accepted', urgency: 'Medium' },
    { id: 'CLM003', date: '2025-03-26', type: 'Home Insurance', customerName: 'Alice Brown', amount: 7000, status: 'Rejected', urgency: 'Low' },
    { id: 'CLM004', date: '2025-03-25', type: 'Travel Insurance', customerName: 'Bob Wilson', amount: 2500, status: 'Pending', urgency: 'High' },
    { id: 'CLM005', date: '2025-03-24', type: 'Life Insurance', customerName: 'Emma Johnson', amount: 10000, status: 'Accepted', urgency: 'Medium' }
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Accepted': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function ClaimsPage() {
    return (
        <div className="flex min-h-screen bg-blue-50">
            {/* Sidebar with fixed width */}
            <div className="w-64">
                <Sidebar />
            </div>
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-20">
                    <div className="bg-white rounded-lg shadow-md p-5">
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-blue-100 text-left">
                                    <th className="p-3 border-b-2 border-blue-300">Claim ID</th>
                                    <th className="p-3 border-b-2 border-blue-300">Date</th>
                                    <th className="p-3 border-b-2 border-blue-300">Type</th>
                                    <th className="p-3 border-b-2 border-blue-300">Amount</th>
                                    <th className="p-3 border-b-2 border-blue-300">Status</th>
                                    <th className="p-3 border-b-2 border-blue-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_CLAIMS.map((claim) => (
                                    <tr key={claim.id} className="border-b">
                                        <td className="p-3">{claim.id}</td>
                                        <td className="p-3">{claim.date}</td>
                                        <td className="p-3">{claim.type}</td>
                                        <td className="p-3">${claim.amount}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded ${getStatusColor(claim.status)}`}>
                                                {claim.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
