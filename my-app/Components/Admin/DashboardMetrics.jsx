// src/components/admin/DashboardMetrics.jsx
import React from 'react';

export function DashboardMetrics() {
    const metrics = [
        {
            title: 'Claims (24h)',
            value: '15',
            icon: '📋'
        },
        {
            title: 'Avg. Processing Time',
            value: '3.5 days',
            icon: '⏱️'
        },
        {
            title: 'Total Claim Value',
            value: '$250,000',
            icon: '💰'
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-5 mb-10">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="bg-white p-5 rounded-lg shadow flex items-center"
                >
                    <div className="mr-4 text-3xl">{metric.icon}</div>
                    <div>
                        <h3 className="text-gray-500 text-sm">{metric.title}</h3>
                        <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}