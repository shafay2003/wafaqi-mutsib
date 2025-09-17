
'use client';

import Link from 'next/link'
import {
  FileText,
  Search,
  Gavel,
  ArrowRight,
  Smile,
  Plane
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { complaintStats } from '@/lib/placeholder-data'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Badge } from '@/components/ui/badge'
import { useMedia } from '@/context/MediaContext';
import { useNotifications } from '@/context/NotificationsContext';
import { useSuccessStories } from '@/context/SuccessStoriesContext';


export default function Dashboard() {
  const { mediaItems } = useMedia();
  const { notifications } = useNotifications();
  const { successStories } = useSuccessStories();

  return (
    <div className="flex flex-col gap-12 md:gap-16">
        <section className="relative rounded-xl overflow-hidden">
          <Carousel 
            className="w-full"
            plugins={[ Autoplay({ delay: 5000, stopOnInteraction: true }) ]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {mediaItems.slice(0, 5).map((item, index) => {
                let itemImage;
                if (item.id === 'media-13') {
                  itemImage = PlaceHolderImages.find(p => p.id === 'aoa-china-meeting');
                } else {
                  itemImage = PlaceHolderImages.find(p => p.id === `media-${(index % 6) + 1}`);
                }
                
                return (
                  <CarouselItem key={item.id}>
                    <div className="relative h-[450px] md:h-[500px]">
                      {itemImage && (
                        <Image
                          src={itemImage.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          data-ai-hint={itemImage.imageHint}
                          priority={index === 0}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 text-white z-10 max-w-3xl">
                        <Badge variant={item.type === 'Video' ? 'destructive' : 'secondary'} className="mb-2">{item.type}</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight !leading-tight text-white/95 line-clamp-3">{item.title}</h2>
                        <p className="text-white/80 mt-2">{item.date}</p>
                      </div>

                       {item.type === 'Video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/80 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                          </div>
                      )}
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
          </Carousel>
        </section>

         <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">A Simple Path to Resolution</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A simple, transparent, and fair process to ensure your voice is heard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-primary/10 text-primary rounded-full p-4 flex items-center justify-center h-20 w-20">
                <FileText className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">1. Submit Complaint</h3>
              <p className="text-muted-foreground">File your grievance easily through our online portal, by post, or in person.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
               <div className="bg-primary/10 text-primary rounded-full p-4 flex items-center justify-center h-20 w-20">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">2. Investigation</h3>
              <p className="text-muted-foreground">We thoroughly investigate your case, gathering facts and hearing all sides.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
               <div className="bg-primary/10 text-primary rounded-full p-4 flex items-center justify-center h-20 w-20">
                <Gavel className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">3. Resolution</h3>
              <p className="text-muted-foreground">We work towards a just resolution, ensuring relief is provided and accountability is upheld.</p>
            </div>
          </div>
        </section>

        <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Key Services</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Specialized portals to address specific needs and communities.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                    <FileText className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">File a Complaint</h3>
                    <p className="text-sm text-muted-foreground mb-4">Lodge your grievance against any federal agency.</p>
                    <Button variant="secondary" asChild><Link href="/complaint">Submit Now</Link></Button>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow border-t-4 border-t-primary/70">
                    <Search className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Track Your Status</h3>
                    <p className="text-sm text-muted-foreground mb-4">Check the real-time status of your submitted complaint.</p>
                    <Button variant="secondary" asChild><Link href="/track-complaint">Track Now</Link></Button>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow border-t-4 border-t-primary/70">
                    <Smile className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Children's Complaints</h3>
                    <p className="text-sm text-muted-foreground mb-4">A child-friendly space for our youngest citizens to be heard.</p>
                    <Button variant="secondary" asChild><Link href="/childrens-complaints">Visit Portal</Link></Button>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow border-t-4 border-t-primary/70">
                    <Plane className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Overseas Pakistanis</h3>
                    <p className="text-sm text-muted-foreground mb-4">Dedicated support for Pakistanis living abroad.</p>
                    <Button variant="secondary" asChild><Link href="/overseas-pakistanis">Visit Portal</Link></Button>
                </Card>
            </div>
        </section>

         <section>
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Complaint Statistics at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complaintStats.map(stat => (
                    <Card key={stat.label}>
                        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/complaint-statistics">View Detailed Statistics</Link>
                </Button>
            </div>
        </section>

        <section>
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Photo & Video Gallery</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A glimpse into our activities, events, and initiatives.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {mediaItems.slice(0, 6).map((item, index) => {
                    let itemImage;
                    if (item.id === 'media-13') {
                      itemImage = PlaceHolderImages.find(p => p.id === 'aoa-china-meeting');
                    } else {
                       itemImage = PlaceHolderImages.find(p => p.id === `media-${(index % 6) + 1}`);
                    }
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
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                     <Badge variant={item.type === 'Video' ? 'destructive' : 'secondary'}>{item.type}</Badge>
                                     <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <h3 className="font-semibold text-base leading-snug flex-grow">{item.title}</h3>
                            </div>
                        </Card>
                    );
                })}
            </div>
            <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/media-gallery">View Full Gallery</Link>
                </Button>
            </div>
        </section>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Success Stories</h2>
            <div className="grid gap-6">
                {successStories.map((story, index) => {
                    const storyImage = PlaceHolderImages.find(p => p.id === `success-${(index % 3) + 1}`);
                    return (
                        <Card key={story.id} className="flex flex-col md:flex-row items-center gap-6 p-4 hover:shadow-md transition-shadow">
                            {storyImage && <Image src={storyImage.imageUrl} alt={storyImage.description} width={150} height={100} className="rounded-lg object-cover w-full md:w-[150px]" data-ai-hint={storyImage.imageHint} />}
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1">{story.title}</h3>
                                <p className="text-sm text-muted-foreground">{story.summary}</p>
                            </div>
                        </Card>
                    )
                })}
            </div>
             <div className="text-center mt-6">
                <Button variant="outline" asChild>
                    <Link href="/success-stories">Read More Success Stories</Link>
                </Button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Recent Updates</h2>
            <Card>
              <CardHeader>
                <CardTitle>Notifications & Press Releases</CardTitle>
                 <CardDescription>Stay informed with our latest announcements.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.slice(0, 5).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-sm py-3">{item.title}</TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground py-3">{item.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 <Button variant="outline" asChild className="mt-4 w-full">
                    <Link href="/notifications">View All Updates</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  )
}
