import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Bike, Ship, Plane, Building2 } from 'lucide-react';

const AVAILABLE_INSURANCES = [
    {
        id: 1,
        type: 'Travel Insurance',
        icon: Plane,
        description: 'Comprehensive coverage for international trips',
        startingFrom: '$50/month'
    },
    {
        id: 2,
        type: 'Marine Insurance',
        icon: Ship,
        description: 'Protection for boats and marine vessels',
        startingFrom: '$100/month'
    },
    {
        id: 3,
        type: 'Motorcycle Insurance',
        icon: Bike,
        description: 'Complete coverage for two-wheelers',
        startingFrom: '$75/month'
    },
    {
        id: 4,
        type: 'Commercial Insurance',
        icon: Building2,
        description: 'Insurance for business and commercial properties',
        startingFrom: '$250/month'
    }
];

export function AvailableInsurances() {
    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Available Insurances</h2>
            <div className="grid md:grid-cols-4 gap-4">
                {AVAILABLE_INSURANCES.map((insurance) => (
                    <Card key={insurance.id} className="w-full">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <insurance.icon className="h-8 w-8 text-blue-600" />
                            </div>
                            <CardTitle className="mt-2">{insurance.type}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">
                                {insurance.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-blue-600">
                                    {insurance.startingFrom}
                                </span>
                                <Button variant="outline">More Info</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}