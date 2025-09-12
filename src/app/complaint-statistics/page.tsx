"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { complaintStats, monthlyStats } from "@/lib/placeholder-data";

export default function ComplaintStatisticsPage() {

    return (
        <div className="flex flex-col gap-8">
            <header className="text-left space-y-1.5">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Complaint Statistics
                </h1>
                <p className="text-sm text-muted-foreground max-w-3xl">
                    Statistical overview of complaints handled by the Wafaqi Mohtasib.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complaintStats.map(stat => (
                    <Card key={stat.label}>
                        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>
            
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Complaint Overview - 2024</CardTitle>
                        <CardDescription>Number of complaints received vs. resolved each month.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyStats} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))'
                                  }}
                                />
                                <Legend />
                                <Bar dataKey="received" fill="hsl(var(--primary))" name="Received" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="resolved" fill="hsl(var(--secondary-foreground))" name="Resolved" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
