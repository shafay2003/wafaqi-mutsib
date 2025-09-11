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
    <div className="flex flex-col gap-8">
        <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Get in Touch</h1>
          <p className="text-sm text-muted-foreground">
            We are here to help. Find the contact details for our head office and regional centers below.
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {regionalOffices.map((office) => (
              <Card key={office.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{office.name}</CardTitle>
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

        <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">Our Locations</h2>
            {mapImage && (
                <div className="w-full border rounded-lg overflow-hidden">
                    <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    data-ai-hint={mapImage.imageHint}
                    />
                </div>
            )}
        </section>
    </div>
  );
}
