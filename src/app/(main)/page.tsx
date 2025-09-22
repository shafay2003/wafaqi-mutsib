

'use client';

import Link from 'next/link'
import {
  FileText,
  Search,
  Gavel,
  Smile,
  Plane,
  Video,
  Camera,
  ShieldCheck,
  Users,
  FileInput,
  Landmark,
  Pause,
  Play
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
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Badge } from '@/components/ui/badge'
import { useMedia } from '@/context/MediaContext';
import { useNotifications } from '@/context/NotificationsContext';
import { useSuccessStories } from '@/context/SuccessStoriesContext';
import React, { useState, useEffect, useCallback } from 'react';
import { useKeyPersonnel } from '@/context/KeyPersonnelContext'


export default function Dashboard() {
  const { mediaItems } = useMedia();
  const { notifications } = useNotifications();
  const { successStories } = useSuccessStories();
  const { keyPersonnel } = useKeyPersonnel();

  const photoItems = mediaItems.filter(item => item.type === 'Photo');
  const videoItems = mediaItems.filter(item => item.type === 'Video');

  const complaintStats = [
    { label: 'Received (YTD)', value: '125,342', change: '+15.2% from last year', icon: FileInput },
    { label: 'Resolved (YTD)', value: '119,876', change: '+18.1% from last year', icon: ShieldCheck },
    { label: 'In-Process', value: '5,466', change: '-5.7% from last month', icon: Users },
    { label: 'Resolution Rate', value: '95.6%', change: '+2.4% from last year', icon: Landmark },
  ];
  
  const [api, setApi] = useState<CarouselApi>()
  const [isPlaying, setIsPlaying] = useState(true)

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const togglePlay = useCallback(() => {
    if (!api || !autoplayPlugin.current) return;
    const autoplay = autoplayPlugin.current;
    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  }, [api, isPlaying]);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
       if (api.plugins().autoplay) {
         setIsPlaying(api.plugins().autoplay.isPlaying());
       }
    };
    
    api.on("select", onSelect);
    api.on("autoplay:play", () => setIsPlaying(true));
    api.on("autoplay:stop", () => setIsPlaying(false));
    
    return () => {
      api.off("select", onSelect);
      api.off("autoplay:play", () => setIsPlaying(true));
      api.off("autoplay:stop", () => setIsPlaying(false));
    }
  }, [api]);
  
  return (
    <>
      <div className="flex flex-col gap-12 md:gap-16">
        <section className="relative rounded-xl overflow-hidden max-h-[600px]">
          <Carousel
            setApi={setApi}
            className="w-full h-full"
            plugins={[autoplayPlugin.current]}
            opts={{ loop: true }}
          >
            <CarouselContent className="h-full">
              {mediaItems.slice(0, 5).map((item, index) => {
                const itemImageSrc = item.imageUrl || PlaceHolderImages.find(p => p.id === item.id)?.imageUrl;
                
                return (
                  <CarouselItem key={item.id} className="h-full">
                    <Dialog>
                      <DialogTrigger asChild>
                         <div className="cursor-pointer h-full">
                          <div className="relative bg-muted h-full">
                            {itemImageSrc && (
                              <Image
                                src={itemImageSrc}
                                alt={item.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                quality={95}
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
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                          <DialogDescription>{item.date} | {item.type}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {item.type === 'Video' && item.imageUrl ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                               <video src={item.imageUrl} controls className="w-full h-full" autoPlay>
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          ) : itemImageSrc && (
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={itemImageSrc}
                                alt={item.title}
                                fill
                                className="object-contain"
                                quality={95}
                              />
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <Button size="icon" variant="outline" className="relative" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="sr-only">{isPlaying ? "Pause slides" : "Play slides"}</span>
              </Button>
              <CarouselPrevious className="relative translate-y-0 left-0 right-0 top-0" />
              <CarouselNext className="relative translate-y-0 left-0 right-0 top-0" />
            </div>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Leadership</h2>
             <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Get to know the dedicated individuals leading the Wafaqi Mohtasib Secretariat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {keyPersonnel.map((person) => {
                const personImage = person.imageUrl || PlaceHolderImages.find(p => p.id === person.imageId)?.imageUrl;
                return (
                  <div key={person.id}>
                     <Link href={`/profile/${person.id}`} className="p-1 h-full block group">
                      <Card className="text-center p-6 flex flex-col items-center h-full group-hover:shadow-lg transition-shadow">
                        {personImage && (
                          <Image
                            src={personImage}
                            alt={`Portrait of ${person.name}`}
                            width={120}
                            height={120}
                            className="rounded-full mb-4 border-4 border-muted object-cover aspect-square transition-transform group-hover:scale-105"
                            data-ai-hint="man portrait"
                            quality={95}
                          />
                        )}
                        <h3 className="font-semibold text-lg">{person.name}</h3>
                        <p className="text-primary text-sm font-medium">{person.title}</p>
                        <p className="text-muted-foreground text-sm mt-4 flex-grow line-clamp-3">{person.summary}</p>
                      </Card>
                    </Link>
                  </div>
                )
              })}
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
              <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3"><Camera /> Photo Gallery</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A glimpse into our activities, events, and initiatives.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {photoItems.slice(0, 3).map((item, index) => {
                    const itemImageSrc = item.imageUrl || PlaceHolderImages.find(p => p.id === item.id)?.imageUrl;

                    return (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <Card className="overflow-hidden group flex flex-col cursor-pointer">
                              {itemImageSrc ? (
                              <div className="relative aspect-video">
                                  <Image
                                      src={itemImageSrc}
                                      alt={item.title}
                                      fill
                                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                                      quality={90}
                                  />
                              </div>
                              ) : (
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                  <p className="text-xs text-muted-foreground">No image</p>
                                </div>
                              )}
                              <div className="p-4 flex flex-col flex-grow">
                                  <div className="flex items-center justify-between mb-2">
                                       <Badge variant='secondary'>{item.type}</Badge>
                                       <p className="text-xs text-muted-foreground">{item.date}</p>
                                  </div>
                                  <h3 className="font-semibold text-base leading-snug flex-grow line-clamp-2">{item.title}</h3>
                              </div>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                           <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>{item.date} | {item.type}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                              {itemImageSrc && (
                                  <div className="relative aspect-video rounded-lg overflow-hidden">
                                      <Image
                                          src={itemImageSrc}
                                          alt={item.title}
                                          fill
                                          className="object-contain"
                                          quality={95}
                                      />
                                  </div>
                              )}
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    );
                })}
            </div>
            <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/media-gallery">View Full Photo Gallery</Link>
                </Button>
            </div>
        </section>

        <section>
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3"><Video /> Video Highlights</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Watch highlights from our events, press briefings, and informational content.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {videoItems.slice(0, 3).map((item, index) => {
                    const itemImageSrc = item.imageUrl || PlaceHolderImages.find(p => p.id === item.id)?.imageUrl;
                    
                    return (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <Card className="overflow-hidden group flex flex-col cursor-pointer">
                              {itemImageSrc ? (
                              <div className="relative aspect-video">
                                  <Image
                                      src={itemImageSrc}
                                      alt={item.title}
                                      fill
                                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                                      quality={90}
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                                  </div>
                              </div>
                              ) : (
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                                </div>
                              )}
                              <div className="p-4 flex flex-col flex-grow">
                                  <div className="flex items-center justify-between mb-2">
                                       <Badge variant='destructive'>{item.type}</Badge>
                                       <p className="text-xs text-muted-foreground">{item.date}</p>
                                  </div>
                                  <h3 className="font-semibold text-base leading-snug flex-grow line-clamp-2">{item.title}</h3>
                              </div>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                           <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>{item.date} | {item.type}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                              {item.type === 'Video' && item.imageUrl ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                                   <video src={item.imageUrl} controls className="w-full h-full" autoPlay>
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              ) : itemImageSrc && (
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                  <Image
                                      src={itemImageSrc}
                                      alt={item.title}
                                      fill
                                      className="object-contain"
                                      quality={95}
                                  />
                                </div>
                              )}
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    );
                })}
            </div>
            <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/media-gallery">View All Media</Link>
                </Button>
            </div>
        </section>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Success Stories</h2>
            <div className="space-y-4">
                {successStories.slice(0,3).map((story, index) => {
                    const storyImage = story.imageUrl || PlaceHolderImages.find(p => p.id === `success-${(index % 3) + 1}`)?.imageUrl;
                    const storyImageHint = PlaceHolderImages.find(p => p.id === `success-${(index % 3) + 1}`)?.imageHint;
                    return (
                        <Card key={story.id} className="flex flex-col md:flex-row items-center gap-6 p-4 hover:shadow-md transition-shadow">
                            {storyImage && <Image src={storyImage} alt={story.title} width={150} height={100} className="rounded-lg object-cover w-full md:w-[150px]" data-ai-hint={storyImageHint} quality={90} />}
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1">{story.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{story.summary}</p>
                                <Link href="/success-stories" className="text-xs text-primary font-semibold mt-2 inline-block">Read more &rarr;</Link>
                            </div>
                        </Card>
                    )
                })}
            </div>
             <div className="text-left mt-6">
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
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {notifications.slice(0, 5).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-sm py-3 px-4">
                            <Link href="/notifications" className="hover:underline line-clamp-2">
                                {item.title}
                            </Link>
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground py-3 px-4">{item.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 <div className="p-4 border-t">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/notifications">View All Updates</Link>
                    </Button>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
    </>
  );
}
