// src/app/(admin)/admin/page.js
import React from 'react';
import { DashboardMetrics } from '@/components/admin/DashboardMetrics';
import { ClaimsTable } from '@/components/admin/ClaimsTable';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
            <DashboardMetrics />
            <ClaimsTable />
        </div>
    );
}