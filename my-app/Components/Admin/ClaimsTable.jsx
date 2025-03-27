// src/components/admin/ClaimsTable.jsx
'use client';

import React from 'react';

const MOCK_CLAIMS = [
    {
        id: 'CLM001',
        type: 'Car Insurance',
        customerName: 'John Doe',
        amount: 5000,
        status: 'Pending',
        urgency: 'High',
        date: new Date()
    },
    // Add more mock claims...
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Accepted': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export function ClaimsTable() {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-5 border-b">
                <h2 className="text-xl font-semibold">Recent Claims</h2>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Claim ID</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_CLAIMS.map((claim) => (
                        <tr key={claim.id} className="border-b">
                            <td className="p-3">{claim.id}</td>
                            <td className="p-3">{claim.type}</td>
                            <td className="p-3">{claim.customerName}</td>
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
    );
}