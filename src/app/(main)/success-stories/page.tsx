'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSuccessStories } from "@/context/SuccessStoriesContext";

export default function SuccessStoriesPage() {
  const { successStories } = useSuccessStories();

  return (
    <div className="flex flex-col gap-4">
      <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Impact & Success Stories
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Discover how the Wafaqi Mohtasib's interventions have brought positive change and justice to countless individuals across Pakistan.
          </p>
      </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
             {successStories.map((story, index) => {
                 const storyImage = PlaceHolderImages.find(p => p.id === `success-${(index % 3) + 1}`);
                 return (
                    <Card key={story.id} className="overflow-hidden flex flex-col">
                        {storyImage && (
                        <div className="flex-shrink-0">
                             <Image
                                src={storyImage.imageUrl}
                                alt={storyImage.description}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                                data-ai-hint={storyImage.imageHint}
                            />
                        </div>
                        )}
                        <div className="flex flex-col flex-grow">
                            <CardHeader>
                                <CardTitle>{story.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-xs">{story.summary}</CardDescription>
                            </CardContent>
                        </div>
                    </Card>
                 );
            })}
        </div>
    </div>
  );
}
