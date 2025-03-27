import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CarFront, Home, HeartPulse } from 'lucide-react';

const INSURANCE_TYPES = [
    {
        id: 1,
        type: 'Car Insurance',
        Icon: CarFront,
        coverage: '$50,000',
        premium: '$150/month',
        validUntil: 'Dec 31, 2024'
    },
    {
        id: 2,
        type: 'Home Insurance',
        Icon: Home,
        coverage: '$250,000',
        premium: '$200/month',
        validUntil: 'Jun 30, 2024'
    },
    {
        id: 3,
        type: 'Health Insurance',
        Icon: HeartPulse,
        coverage: '$100,000',
        premium: '$300/month',
        validUntil: 'Sep 15, 2024'
    }
];

export function MyInsurances() {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">My Insurances</h2>
            <div className="grid gap-4">
                {INSURANCE_TYPES.map((insurance) => (
                    <Card key={insurance.id} className="w-full p-4 rounded-lg shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium flex items-center">
                                <insurance.Icon className="mr-2 h-6 w-6 text-blue-600" />
                                {insurance.type}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500">Coverage</p>
                                    <p className="font-bold text-gray-900">{insurance.coverage}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Premium</p>
                                    <p className="font-bold text-gray-900">{insurance.premium}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-gray-500">Valid Until</p>
                                    <p className="font-bold text-gray-900">{insurance.validUntil}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-3">
                                <Button variant="outline" className="flex-1 py-2 text-sm font-semibold border-gray-300 hover:bg-gray-100">View Details</Button>
                                <Button className="flex-1 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700">Claim Insurance</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
