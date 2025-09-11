import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from 'next';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { regionalOffices } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Find contact information for the Wafaqi Mohtasib head office and regional offices across Pakistan.',
};

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-pakistan');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Get in Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We are here to help. Find the contact details for our head office and regional centers below.
          </p>
        </header>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionalOffices.map((office) => (
              <Card key={office.name}>
                <CardHeader>
                  <CardTitle className="font-headline">{office.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-muted-foreground hover:text-primary">{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary break-all">{office.email}</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold text-center font-headline mb-8">Our Locations</h2>
            {mapImage && (
                <div className="w-full border rounded-lg p-4 bg-secondary/30 overflow-hidden">
                    <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain rounded-md"
                    data-ai-hint={mapImage.imageHint}
                    />
                </div>
            )}
        </section>
      </div>
    </div>
  );
}
