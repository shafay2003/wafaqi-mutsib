
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
                 let itemImage;
                 if (item.id === 'media-13') {
                   itemImage = PlaceHolderImages.find(p => p.id === 'aoa-china-meeting');
                 } else {
                   itemImage = PlaceHolderImages.find(p => p.id === `media-${(index % 6) + 1}`);
                 }
                 return (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                          <Card className="overflow-hidden group flex flex-col cursor-pointer">
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
                              <div className="p-6 flex flex-col flex-grow">
                                  <div className="flex-grow">
                                      <div className="flex items-center justify-between mb-2">
                                          <Badge variant={item.type === 'Video' ? 'destructive' : 'secondary'}>{item.type}</Badge>
                                          <p className="text-xs text-muted-foreground">{item.date}</p>
                                      </div>
                                      <h3 className="font-semibold text-lg leading-snug mb-2 line-clamp-2">{item.title}</h3>
                                      <CardDescription className="text-sm line-clamp-3">{item.description}</CardDescription>
                                  </div>
                              </div>
                          </Card>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl">
                          <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>{item.date} | {item.type}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                              {itemImage && (
                                  <div className="relative aspect-video rounded-lg overflow-hidden">
                                      <Image
                                          src={itemImage.imageUrl}
                                          alt={item.title}
                                          fill
                                          className="object-contain"
                                      />
                                      {item.type === 'Video' && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                                      </div>
                                  )}
                                  </div>
                              )}
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                      </DialogContent>
                    </Dialog>
                 );
            })}
        </div>
    </div>
  );
}
