import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Gallery',
  description: 'Photos and videos from events, seminars, and awareness campaigns by the Wafaqi Mohtasib.',
};

const mediaItems = [
  {
    id: 'media-1',
    title: 'Seminar on Administrative Justice',
    description: 'The Hon\'ble Wafaqi Mohtasib addressing a seminar in Islamabad.',
    type: 'Photo'
  },
  {
    id: 'media-2',
    title: 'Press Conference Highlights',
    description: 'Key points from the recent press conference on annual performance.',
    type: 'Video'
  },
  {
    id: 'media-3',
    title: 'Awareness Campaign Launch',
    description: 'Launch event for the nationwide awareness campaign on citizen rights.',
    type: 'Photo'
  },
  {
    id: 'media-4',
    title: 'International Collaboration Meeting',
    description: 'Meeting with delegates from the International Ombudsman Institute.',
    type: 'Photo'
  },
  {
    id: 'media-5',
    title: 'How to File a Complaint',
    description: 'An instructional video guiding users through the complaint process.',
    type: 'Video'
  },
   {
    id: 'media-6',
    title: 'Open Kachehri in Lahore',
    description: 'Photos from the public hearing session held in Lahore.',
    type: 'Photo'
  }
];


export default function MediaGalleryPage() {
  return (
    <div className="flex flex-col gap-4">
      <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Media Gallery
          </h1>
          <p className="text-sm text-muted-foreground">
            A glimpse into our activities, events, and initiatives.
          </p>
      </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {mediaItems.map((item, index) => {
                 const itemImage = PlaceHolderImages.find(p => p.id === `media-${(index % 3) + 1}`);
                 return (
                    <Card key={item.id} className="overflow-hidden group">
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
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                    </Card>
                 );
            })}
        </div>
    </div>
  );
}
