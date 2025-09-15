"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { regionalOffices } from "@/lib/placeholder-data";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Get in Touch</h1>
          <p className="text-sm text-muted-foreground">
            We are here to help. Find the contact details for our head office and regional centers below.
          </p>
        </header>

        <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Regional Offices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionalOffices.map((office) => (
                <Card 
                    key={office.name}
                    className="transition-all duration-200 hover:shadow-lg hover:border-primary"
                >
                    <CardHeader>
                    <CardTitle className="text-base">{office.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-muted-foreground hover:text-primary">{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary break-all">{office.email}</a>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>
    </div>
  );
}
