import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Book, ShieldQuestion } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overseas Pakistanis',
  description: 'Dedicated portal for Overseas Pakistanis to address their grievances and find relevant information.',
};

export default function OverseasPakistanisPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-2">
         <h1 className="text-4xl font-bold tracking-tight flex items-center gap-4">
            <Plane className="h-10 w-10 text-primary" />
            <span>Portal for Overseas Pakistanis</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Specialized services and resources to address the unique challenges faced by Pakistanis living abroad.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShieldQuestion className="h-6 w-6 text-primary" />
              <span>Grievance Cell</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Facing issues with a federal agency back home? Our dedicated cell is here to help you.
            </p>
            <Button asChild variant="secondary">
                <Link href="/complaint?category=overseas">Lodge Your Grievance</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <Book className="h-6 w-6 text-primary" />
                <span>Special Handbook</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Download our comprehensive guide on how to effectively use the Ombudsman's services from abroad.
            </p>
             <Button asChild variant="secondary">
                <Link href="#">Download Handbook (PDF)</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <Plane className="h-6 w-6 text-primary" />
                <span>One Window Desks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get on-the-spot assistance at our One Window Facilitation Desks at major international airports in Pakistan.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-secondary/50">
            <CardHeader>
                <CardTitle>One Window Facilitation Desk Services</CardTitle>
                <CardDescription className="mt-1">
                    Our desks at airports provide immediate assistance for issues like lost luggage, immigration concerns, and other travel-related problems. Find our representatives in the international arrival lounges.
                </CardDescription>
            </CardHeader>
        </Card>
      </section>
    </div>
  );
}
