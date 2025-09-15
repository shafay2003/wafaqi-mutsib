import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, BookOpen, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Children\'s Complaints',
  description: 'A special portal for children to voice their complaints and learn about their rights.',
};

export default function ChildrensComplaintsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="text-center space-y-2">
        <Smile className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Children's Complaint Corner
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A safe and friendly place for you to be heard. We are here to listen and help you with your problems.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
              <BookOpen className="h-10 w-10 text-primary" />
              <span>Know Your Rights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Everyone has rights, especially children! Learn about your rights to be safe, healthy, and happy.</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary">
            <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2">
                    <Phone className="h-10 w-10 text-primary" />
                    <span>Talk to Someone</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <p className="text-muted-foreground">If you need to talk to someone urgently, you can call our free helpline.</p>
                 <div className="text-3xl font-bold text-primary">1056</div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col items-center gap-2">
               <Smile className="h-10 w-10 text-primary" />
              <span>Our Promise to You</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We promise to listen carefully, take you seriously, and do our best to find a fair solution for you.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Ready to File a Complaint?</CardTitle>
                <CardDescription className="mt-1">
                    It's okay to speak up. Our simplified complaint form is easy to fill out. You can ask a trusted adult to help you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/complaint?form=child">Use the Children's Complaint Form</Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
