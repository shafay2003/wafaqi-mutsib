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
import type { MediaItem } from '@/context/MediaContext';
import { useNotifications } from '@/context/NotificationsContext';
import { useSuccessStories } from '@/context/SuccessStoriesContext';
import { usePageRefresh } from '@/hooks/use-page-refresh';
import React, { useState, useEffect, useCallback } from 'react';
import { useKeyPersonnel } from '@/context/KeyPersonnelContext';


export default function Dashboard() {
  const refreshTrigger = usePageRefresh(); // This will trigger re-renders when page becomes visible
  
  const { mediaItems, refreshFromStorage } = useMedia();
  
  // Refresh data when page visibility changes - removed refreshFromStorage from dependencies to prevent infinite loops
  React.useEffect(() => {
    console.log('Home page - Refresh triggered:', refreshTrigger);
    refreshFromStorage();
  }, [refreshTrigger]);
  const { notifications } = useNotifications();
  const { successStories } = useSuccessStories();
  const { keyPersonnel } = useKeyPersonnel();

  const photoItems = mediaItems.filter(item => item.type === 'Photo');
  const videoItems = mediaItems.filter(item => item.type === 'Video');
  
  console.log('Home page - Total media items:', mediaItems.length);
  console.log('Home page - Video items:', videoItems.length);
  console.log('Home page - Photo items:', photoItems.length);
  
  // Check if our uploaded video exists
  const shafayVideo = mediaItems.find(item => item.title === 'shafay');
  console.log('Shafay video found:', !!shafayVideo, shafayVideo ? {id: shafayVideo.id, type: shafayVideo.type, hasUrl: !!shafayVideo.imageUrl} : 'NOT FOUND');
  
  // Debug video items in detail
  videoItems.forEach((video, index) => {
    console.log(`Video ${index + 1}:`, {
      id: video.id,
      title: video.title,
      type: video.type,
      hasUrl: !!video.imageUrl,
      urlType: video.imageUrl?.startsWith('data:') ? 'data-url' : 
               video.imageUrl?.startsWith('local:') ? 'local-storage' :
               video.imageUrl?.startsWith('session:') ? 'session-storage' :
               video.imageUrl?.startsWith('indexeddb:') ? 'indexeddb-ref' : 'other',
      urlLength: video.imageUrl?.length || 0,
      url: video.imageUrl ? video.imageUrl.substring(0, 50) + (video.imageUrl?.length > 50 ? '...' : '') : 'NO URL'
    });
  });

  const pinnedItems = mediaItems.filter(item => item.isPinned);
  
  // Default placeholder items if no media items are available
  const defaultSliderItems: MediaItem[] = [
    {
      id: 'default-1',
      title: 'Welcome to Wafaqi Mohtasib Portal',
      description: 'Your gateway to federal ombudsman services in Pakistan',
      date: new Date().toLocaleDateString(),
      type: 'Photo',
      imageUrl: '/images/ombudsman-logo.png',
      isPinned: false
    },
    {
      id: 'default-2', 
      title: 'File Your Complaints Online',
      description: 'Easy and efficient complaint filing system for citizens',
      date: new Date().toLocaleDateString(),
      type: 'Photo',
      imageUrl: '/images/ombudsman-logo.png',
      isPinned: false
    },
    {
      id: 'default-3',
      title: 'Transparency and Accountability',
      description: 'Ensuring government accountability through effective oversight',
      date: new Date().toLocaleDateString(),
      type: 'Photo', 
      imageUrl: '/images/ombudsman-logo.png',
      isPinned: false
    }
  ];
  
  const sliderItems = pinnedItems.length > 0 
    ? pinnedItems 
    : mediaItems.length > 0 
      ? mediaItems.slice(0, 5)
      : defaultSliderItems;

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
  
  // Debug logging
  console.log('📊 Homepage Debug - Media Items:', {
    totalMediaItems: mediaItems.length,
    pinnedItems: pinnedItems.length,
    sliderItemsLength: sliderItems.length,
    sliderItems: sliderItems.map(item => ({ id: item.id, title: item.title, type: item.type }))
  });

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-4">
        {/* Hero Slider Section - Always show */}
        <section className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-8 pb-0 w-full mx-auto">
          {sliderItems.length > 0 ? (
            <Carousel
              setApi={setApi}
              className="w-full h-full min-h-[500px] max-h-[700px] overflow-hidden rounded-xl"
              plugins={[autoplayPlugin.current]}
              opts={{ loop: true }}
            >
              <CarouselContent className="-ml-0">
                {sliderItems.map((item, index) => {
                  const itemImageSrc = item.type === 'Video'
                    ? (item.thumbnailUrl || item.imageUrl || '/images/placeholder-video.png')
                    : (item.imageUrl || '/images/placeholder-image.png');
                  return (
                    <CarouselItem key={item.id} className="pl-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer h-full w-full">
                            <div className="relative bg-gray-200 h-full aspect-[16/7] flex items-center justify-center overflow-hidden rounded-xl">
                              {itemImageSrc ? (
                                <Image
                                  src={itemImageSrc}
                                  alt={item.title}
                                  fill
                                  className="object-cover w-full h-full"
                                  priority={index === 0}
                                  quality={95}
                                  sizes="100vw"
                                />
                              ) : null}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white z-10">
                                <Badge
                                  variant={item.type === 'Video' ? 'destructive' : 'secondary'}
                                  className="mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1"
                                >
                                  {item.type}
                                </Badge>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight !leading-tight text-white drop-shadow-lg line-clamp-2 md:line-clamp-3 mb-2">
                                  {item.title}
                                </h2>
                                <p className="text-white/90 text-base sm:text-lg mt-2 md:mt-3 drop-shadow max-w-2xl">{item.date}</p>
                              </div>
                              {item.type === 'Video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="bg-black/50 rounded-full p-3 md:p-4 backdrop-blur-sm hover:bg-black/70 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                                    </svg>
                                  </div>
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
                                 <video 
                                   src={item.imageUrl} 
                                   controls 
                                   className="w-full h-full object-contain" 
                                   preload="metadata"
                                   onError={(e) => console.error('Video load error:', e, 'URL:', item.imageUrl)}
                                   onLoadStart={() => console.log('Video load started:', item.title)}
                                   onCanPlay={() => console.log('Video can play:', item.title)}
                                 >
                                   Your browser does not support the video tag.
                                 </video>
                              </div>
                            ) : itemImageSrc && (
                              <div className="relative aspect-video rounded-lg overflow-hidden flex items-center justify-center">
                                <Image
                                  src={itemImageSrc}
                                  alt={item.title}
                                  fill
                                  className="object-contain max-h-full max-w-full"
                                  quality={95}
                                />
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            {/* Mobile-friendly navigation - positioned within bounds */}
            <CarouselPrevious className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 bg-black/30 border-white/20 backdrop-blur-sm text-white hover:bg-black/50 hover:scale-105 transition-all duration-200" />
            <CarouselNext className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 bg-black/30 border-white/20 backdrop-blur-sm text-white hover:bg-black/50 hover:scale-105 transition-all duration-200" />
            {/* Mobile-friendly controls - positioned within bounds */}
            <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 z-20 flex gap-2">
              <Button
                size="sm" 
                variant="outline" 
                className="h-10 w-10 sm:h-12 sm:w-12 bg-black/30 border-white/20 backdrop-blur-sm text-white hover:bg-black/50 hover:scale-105 transition-all duration-200"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5" />}
                <span className="sr-only">{isPlaying ? "Pause slides" : "Play slides"}</span>
              </Button>
            </div>
          </Carousel>
          ) : (
            <div className="h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center aspect-[20/8] rounded-xl min-h-[450px]">
              <div className="text-center p-8">
                <div className="mb-4">
                  <img 
                    src="/images/ombudsman-logo.png" 
                    alt="Ombudsman Logo" 
                    className="w-20 h-20 mx-auto mb-4"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Wafaqi Mohtasib</h2>
                <p className="text-gray-700">Federal Ombudsman of Pakistan</p>
              </div>
            </div>
          )}
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
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      quality={95}
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
                                      {itemImageSrc.startsWith('data:') || itemImageSrc.startsWith('local:') || itemImageSrc.startsWith('session:') || itemImageSrc.startsWith('indexeddb:') ? (
                                        <img
                                          src={itemImageSrc}
                                          alt={item.title}
                                          className="w-full h-full object-contain"
                                        />
                                      ) : (
                                        <Image
                                            src={itemImageSrc}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            quality={95}
                                        />
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
                                  {item.type === 'Video' ? (
                                    itemImageSrc && itemImageSrc.startsWith('data:video') ? (
                                      // Video with data URL - show thumbnail
                                      <video 
                                        src={itemImageSrc} 
                                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                        preload="metadata"
                                        muted
                                        onError={() => console.error('Video thumbnail error for:', item.title)}
                                      />
                                    ) : (
                                      // Video still loading from IndexedDB or no data - show placeholder
                                      <div className="w-full h-full bg-gray-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                        <div className="text-center">
                                          <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                          </svg>
                                          <p className="text-sm text-gray-500">Loading...</p>
                                        </div>
                                      </div>
                                    )
                                  ) : (itemImageSrc && (itemImageSrc.startsWith('data:') || itemImageSrc.startsWith('local:') || itemImageSrc.startsWith('session:'))) ? (
                                    // For custom storage URLs
                                    <img
                                        src={itemImageSrc}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                  ) : (
                                    // For external URLs
                                    <Image
                                        src={itemImageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        quality={95}
                                    />
                                  )}
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
                              {item.type === 'Video' ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                                  {item.isLoading ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                      <div className="text-white text-center">
                                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                                        <p className="text-sm">Loading video...</p>
                                      </div>
                                    </div>
                                  ) : item.loadError ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                      <div className="text-white text-center">
                                        <p className="text-sm">Failed to load video</p>
                                        <p className="text-xs text-gray-400 mt-1">Video may have been removed or corrupted</p>
                                      </div>
                                    </div>
                                  ) : item.imageUrl ? (
                                    <video 
                                      src={item.imageUrl} 
                                      controls 
                                      className="w-full h-full object-contain" 
                                      preload="metadata"
                                      onError={(e) => {
                                        console.error('Home page video load error:', e);
                                        console.error('Video URL type:', item.imageUrl?.startsWith('data:') ? 'data-url' : 'other');
                                        console.error('Video URL length:', item.imageUrl?.length);
                                      }}
                                      onLoadStart={() => console.log('Home page video load started:', item.title)}
                                      onCanPlay={() => console.log('Home page video can play:', item.title)}
                                      onLoadedData={() => console.log('Home page video data loaded:', item.title)}
                                    >
                                      Your browser does not support the video tag.
                                    </video>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                      <div className="text-white text-center">
                                        <p className="text-sm">No Video</p>
                                        <p className="text-xs text-gray-400 mt-1">Video content not available</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : itemImageSrc && (
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                  {itemImageSrc.startsWith('data:') || itemImageSrc.startsWith('local:') || itemImageSrc.startsWith('session:') || itemImageSrc.startsWith('indexeddb:') ? (
                                    <img
                                      src={itemImageSrc}
                                      alt={item.title}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <Image
                                        src={itemImageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                        quality={95}
                                    />
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
