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
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <header className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">About The Wafaqi Mohtasib</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A commitment to upholding administrative accountability and safeguarding citizen rights against governmental maladministration.
            </p>
          </header>

          <section className="space-y-12">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>The mission of the Wafaqi Mohtasib is to provide an effective and efficient mechanism for protecting the rights of the people, ensuring adherence to the rule of law, and promoting good governance. We are dedicated to providing speedy relief to citizens who have suffered from maladministration by any agency of the Federal Government.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">History & Establishment</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>The institution of Wafaqi Mohtasib (Ombudsman) was established in Pakistan on January 24, 1983, through the Establishment of the Office of Wafaqi Mohtasib (Ombudsman) Order, 1983 (President's Order No. 1 of 1983). It is an independent and impartial body, accountable to the President and the Parliament, that provides a check on the executive branch of the government.</p>
                <p>Since its inception, the institution has played a crucial role in redressing grievances and has resolved millions of cases, providing relief to the common man without any cost.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Core Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {functions.map((func, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{func}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Organizational Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">The Wafaqi Mohtasib Secretariat is headed by the Wafaqi Mohtasib, who is assisted by a team of secretaries, investigation officers, and administrative staff. The structure is designed to ensure efficient case management and investigation.</p>
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
          </section>
        </div>
      </div>
    </div>
  );
}
