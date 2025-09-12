import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Metadata } from 'next';
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: 'News & Events Gallery',
  description: 'Photos and videos from events, seminars, and awareness campaigns by the Wafaqi Mohtasib.',
};

const mediaItems = [
  {
    id: 'media-1',
    title: 'Seminar on Administrative Justice',
    description: 'The Hon\'ble Wafaqi Mohtasib addressing a seminar in Islamabad.',
    type: 'Photo',
    date: '2024-07-15'
  },
  {
    id: 'media-2',
    title: 'Press Conference Highlights',
    description: 'Key points from the recent press conference on annual performance.',
    type: 'Video',
    date: '2024-07-12'
  },
  {
    id: 'media-3',
    title: 'Awareness Campaign Launch',
    description: 'Launch event for the nationwide awareness campaign on citizen rights.',
    type: 'Photo',
    date: '2024-07-10'
  },
  {
    id: 'media-4',
    title: 'International Collaboration Meeting',
    description: 'Meeting with delegates from the International Ombudsman Institute.',
    type: 'Photo',
    date: '2024-07-05'
  },
  {
    id: 'media-5',
    title: 'How to File a Complaint',
    description: 'An instructional video guiding users through the complaint process.',
    type: 'Video',
    date: '2024-07-01'
  },
   {
    id: 'media-6',
    title: 'Open Kachehri in Lahore',
    description: 'Photos from the public hearing session held in Lahore.',
    type: 'Photo',
    date: '2024-06-28'
  },
  {
    id: 'media-7',
    title: 'Visit to a Regional Office',
    description: 'The Mohtasib inspecting the facilities at the Peshawar regional office.',
    type: 'Photo',
    date: '2024-06-20'
  },
  {
    id: 'media-8',
    title: 'Annual Report 2023 Launch',
    description: 'Official launch ceremony of the Annual Report 2023.',
    type: 'Video',
    date: '2024-06-15'
  },
  {
    id: 'media-9',
    title: 'Children\'s Rights Symposium',
    description: 'A symposium focused on protecting the rights of children, with various stakeholders.',
    type: 'Photo',
    date: '2024-06-10'
  },
  {
    id: 'media-10',
    title: 'Training Workshop for Staff',
    description: 'Investigation officers attending a workshop on modern investigative techniques.',
    type: 'Photo',
    date: '2024-06-05'
  },
  {
    id: 'media-11',
    title: 'Interview with PTV World',
    description: 'The Wafaqi Mohtasib discusses the role of the institution on national television.',
    type: 'Video',
    date: '2024-05-30'
  },
  {
    id: 'media-12',
    title: 'One Window Desk Inauguration',
    description: 'Inauguration of the One Window Facilitation Desk at Sialkot Airport.',
    type: 'Photo',
    date: '2024-05-25'
  },
];


export default function MediaGalleryPage() {
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
