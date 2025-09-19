
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { usePages } from "@/context/PagesContext";

export default function AboutPage() {
  const orgChartImage = PlaceHolderImages.find(p => p.id === 'org-chart');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const { pages, loading } = usePages();

  return (
    <div className="flex flex-col gap-8">
        <header className="relative h-48 md:h-64 rounded-xl overflow-hidden">
          {heroImage && (
              <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                  quality={95}
              />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
          <div className="absolute inset-0 flex items-end p-8">
              <div className="text-white">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About The Wafaqi Mohtasib</h1>
                  <p className="text-white/80 mt-2 max-w-3xl">
                    A commitment to upholding administrative accountability and safeguarding citizen rights against governmental maladministration.
                  </p>
              </div>
          </div>
        </header>

        <main className="grid gap-6 md:gap-8 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <Card>
                  <CardHeader>
                    <CardTitle>History & Establishment</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-4 leading-relaxed prose prose-gray max-w-none dark:prose-invert">
                    {loading ? <p>Loading...</p> : <p>{pages.about}</p>}
                  </CardContent>
              </Card>
            </div>
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
                        quality={90}
                    />
                </div>
                )}
            </CardContent>
            </Card>
         </div>
      </div>
  );
}
