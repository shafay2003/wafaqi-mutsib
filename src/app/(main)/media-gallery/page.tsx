'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { useMedia } from "@/context/MediaContext";

export default function MediaGalleryPage() {
  const { mediaItems } = useMedia();

  return (
    <div className="flex flex-col gap-4">
      <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            News & Events Gallery
          </h1>
          <p className="text-sm text-muted-foreground">
            A glimpse into our activities, events, and initiatives.
          </p>
      </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {mediaItems.map((item, index) => {
                 const itemImage = PlaceHolderImages.find(p => p.id === `media-${(index % 6) + 1}`);
                 return (
                    <Card key={item.id} className="overflow-hidden group flex flex-col">
                        {itemImage && (
                        <div className="relative aspect-video">
                            <Image
                                src={itemImage.imageUrl}
                                alt={itemImage.description}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={itemImage.imageHint}
                            />
                             {item.type === 'Video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                                </div>
                            )}
                        </div>
                        )}
                        <div className="flex flex-col flex-grow p-6">
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant={item.type === 'Video' ? 'destructive' : 'secondary'}>{item.type}</Badge>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <h3 className="font-semibold text-lg leading-snug mb-2">{item.title}</h3>
                                <CardDescription className="text-sm">{item.description}</CardDescription>
                            </div>
                        </div>
                    </Card>
                 );
            })}
        </div>
    </div>
  );
}
