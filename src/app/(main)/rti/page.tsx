import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { rtiDocs } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Right to Information (RTI)',
    description: 'Information proactively disclosed under the Right of Access to Information Act 2017.',
};

export default function RTIPage() {
    return (
        <div className="flex flex-col gap-4">
            <header className="text-left space-y-1.5">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Right to Information (RTI)
                </h1>
                <p className="text-sm text-muted-foreground max-w-3xl">
                    In compliance with the Right of Access to Information Act 2017, the Wafaqi Mohtasib's office proactively discloses information to ensure transparency and accountability.
                </p>
            </header>

            <Card>
                <CardHeader className="flex-col items-start">
                    <CardTitle>Proactive Disclosure</CardTitle>
                    <CardDescription className="text-sm mt-1">Documents and information disclosed under Section 5 of the RTI Act.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {rtiDocs.map(doc => (
                             <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-sm">{doc.title}</p>
                                    <p className="text-xs text-muted-foreground">Category: {doc.category}</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={doc.url} download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card className="mt-8">
                <CardHeader className="flex-col items-start">
                    <CardTitle>Designated Official</CardTitle>
                    <CardDescription className="text-sm mt-1">Contact person for RTI requests.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                   <p><span className="font-semibold">Name:</span> [Name of the Official]</p>
                   <p><span className="font-semibold">Designation:</span> [Designation]</p>
                   <p><span className="font-semibold">Email:</span> [email@mohtasib.gov.pk]</p>
                   <p><span className="font-semibold">Phone:</span> [Phone Number]</p>
                </CardContent>
            </Card>
        </div>
    );
}
