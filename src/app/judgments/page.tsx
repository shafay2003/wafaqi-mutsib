import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { judgments } from "@/lib/placeholder-data";
import type { Metadata } from 'next';
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
    title: 'Judgments',
    description: 'Access important judgments and decisions made by the Wafaqi Mohtasib.',
};

export default function JudgmentsPage() {
    return (
        <div className="flex flex-col gap-4">
            <header className="text-left space-y-1.5">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Important Judgments
                </h1>
                <p className="text-sm text-muted-foreground">
                    A collection of landmark decisions and orders.
                </p>
            </header>

            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div className="flex-1 space-y-1">
                        <CardTitle>Judgment Archive</CardTitle>
                        <CardDescription>Browse or search for judgments.</CardDescription>
                    </div>
                     <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search judgments..."
                        className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {judgments.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-sm">{item.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Case No: {item.caseNo} | Date: {item.date}</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={item.url} download>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
