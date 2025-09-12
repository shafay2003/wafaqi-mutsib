import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Handshake, Globe } from "lucide-react";
import { internationalAffiliations } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'International Collaborations',
  description: 'Learn about the Wafaqi Mohtasib\'s affiliations and collaborations with international ombudsman institutions and organizations.',
};

export default function InternationalCollaborationsPage() {
  const collaborationImage = PlaceHolderImages.find(p => p.id === 'media-4');

  return (
    <div className="flex flex-col gap-8">
        <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">International Collaborations</h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Fostering global partnerships to strengthen administrative justice and share best practices in ombudsmanship.
          </p>
        </header>
        
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                 <Card>
                    <CardHeader className="flex-col items-start">
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-6 w-6" />
                            Our Global Network
                        </CardTitle>
                        <CardDescription className="mt-1">
                            The Wafaqi Mohtasib is an active member of the international ombudsman community, engaging in dialogue and cooperation to enhance its effectiveness and learn from global experiences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {internationalAffiliations.map((item) => (
                                <li key={item.name} className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/30">
                                    <Handshake className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                         <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-2 inline-block">
                                            Visit Website
                                        </a>
                                    </div>
                                </li>
                             ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-1">
                <Card className="overflow-hidden">
                    {collaborationImage && (
                        <Image
                        src={collaborationImage.imageUrl}
                        alt={collaborationImage.description}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        data-ai-hint={collaborationImage.imageHint}
                        />
                    )}
                    <CardHeader className="flex-col items-start">
                        <CardTitle>Strengthening Ties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">
                           Delegations, joint seminars, and knowledge-exchange programs are integral to our international engagement strategy. These activities help us adopt and implement the highest standards of ombudsmanship.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

    </div>
  );
}
