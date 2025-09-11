import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { successStories } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories',
  description: 'Read about real-life cases where the Wafaqi Mohtasib provided justice and relief to the people of Pakistan.',
};


export default function SuccessStoriesPage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center space-y-3 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Impact & Success Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how the Wafaqi Mohtasib's interventions have brought positive change and justice to countless individuals across Pakistan.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {successStories.map((story, index) => {
                 const storyImage = PlaceHolderImages.find(p => p.id === `success-${(index % 3) + 1}`);
                 return (
                    <Card key={story.id} className="overflow-hidden flex flex-col md:flex-row">
                        {storyImage && (
                        <div className="md:w-1/3 flex-shrink-0">
                             <Image
                                src={storyImage.imageUrl}
                                alt={storyImage.description}
                                width={400}
                                height={400}
                                className="w-full h-48 md:h-full object-cover"
                                data-ai-hint={storyImage.imageHint}
                            />
                        </div>
                        )}
                        <div className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">{story.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{story.summary}</CardDescription>
                            </CardContent>
                        </div>
                    </Card>
                 );
            })}
        </div>
      </div>
    </div>
  );
}
