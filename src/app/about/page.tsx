import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from 'next';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the history, mission, and functions of the Wafaqi Mohtasib (Federal Ombudsman) of Pakistan.',
};


export default function AboutPage() {
  const orgChartImage = PlaceHolderImages.find(p => p.id === 'org-chart');

  const functions = [
    "Diagnosing, investigating, redressing and rectifying any injustice done to a person through maladministration.",
    "Cultivating a transparent and accountable public sector culture.",
    "Providing free, fair, and expeditious justice.",
    "Reforming agency procedures to prevent future grievances."
  ];

  return (
    <div className="flex flex-col gap-8">
        <header className="text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">About The Wafaqi Mohtasib</h1>
            <p className="text-muted-foreground max-w-3xl">
              A commitment to upholding administrative accountability and safeguarding citizen rights against governmental maladministration.
            </p>
        </header>

        <main className="grid gap-6 md:gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4 leading-relaxed">
                <p>The mission of the Wafaqi Mohtasib is to provide an effective and efficient mechanism for protecting the rights of the people, ensuring adherence to the rule of law, and promoting good governance. We are dedicated to providing speedy relief to citizens who have suffered from maladministration by any agency of the Federal Government.</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>History & Establishment</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4 leading-relaxed">
                <p>The institution of Wafaqi Mohtasib (Ombudsman) was established in Pakistan on January 24, 1983, through the Establishment of the Office of Wafaqi Mohtasib (Ombudsman) Order, 1983 (President's Order No. 1 of 1983).</p>
                <p>It is an independent and impartial body that provides a check on the executive branch of the government and has resolved millions of cases, providing relief to the common man without any cost.</p>
              </CardContent>
            </Card>
        </main>
        
         <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Organizational Structure</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6 max-w-4xl">The Wafaqi Mohtasib Secretariat is headed by the Wafaqi Mohtasib, who is assisted by a team of secretaries, investigation officers, and administrative staff. The structure is designed to ensure efficient case management and investigation.</p>
                {orgChartImage && (
                <div className="w-full border rounded-lg p-4 bg-secondary/30">
                    <Image
                        src={orgChartImage.imageUrl}
                        alt={orgChartImage.description}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        data-ai-hint={orgChartImage.imageHint}
                    />
                </div>
                )}
            </CardContent>
            </Card>
         </div>
      </div>
  );
}
