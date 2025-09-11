import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FilePenLine,
  SearchCheck,
  LifeBuoy,
  Users,
  ChevronRight,
  Newspaper,
  Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { successStories, notifications } from '@/lib/placeholder-data';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  
  const quickLinks = [
    { title: "File a New Complaint", description: "Submit your grievance against a federal agency.", icon: FilePenLine, href: "/complaint", cta: "File Now" },
    { title: "Track Your Complaint", description: "Check the status of your previously filed complaint.", icon: SearchCheck, href: "/track-complaint", cta: "Track Now" },
    { title: "Children's Complaints", description: "A dedicated portal for our younger citizens.", icon: LifeBuoy, href: "/complaint", cta: "Visit Portal" },
    { title: "Overseas Pakistanis", description: "Special assistance for Pakistanis living abroad.", icon: Users, href: "/complaint", cta: "Get Help" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center text-center text-white">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
          <div className="container px-4 md:px-6 z-10 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-shadow-lg">
              Administrative Justice for All
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200 text-shadow">
              The Wafaqi Mohtasib of Pakistan provides swift and fair resolution of public complaints against Federal Government agencies.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold text-lg shadow-lg backdrop-blur-sm border border-primary/50">
                <Link href="/complaint">
                  <FilePenLine className="mr-2 h-6 w-6" /> File a Complaint
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 font-bold text-lg shadow-lg">
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="quick-links" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <Card key={link.title} className="bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/90 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                       <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-lg">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground text-sm flex-grow mb-4">{link.description}</p>
                    <Link href={link.href} className="font-semibold text-sm text-primary inline-flex items-center group-hover:underline">
                      {link.cta} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="success-stories" className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Success Stories</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Real stories of how the Wafaqi Mohtasib has made a difference in people's lives.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {successStories.slice(0, 3).map((story, index) => {
                 const storyImage = PlaceHolderImages.find(p => p.id === `success-${index + 1}`);
                 return (
                  <Card key={story.id} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    {storyImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={storyImage.imageUrl}
                          alt={storyImage.description}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          data-ai-hint={storyImage.imageHint}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">{story.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{story.summary}</p>
                       <Button asChild variant="link" className="px-0 font-semibold">
                        <Link href="/success-stories">Read Full Story <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
             <div className="text-center mt-16">
                <Button asChild size="lg">
                  <Link href="/success-stories">View All Success Stories</Link>
                </Button>
            </div>
          </div>
        </section>

         <section id="notifications" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-16">Latest Updates</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8">
                {notifications.slice(0, 4).map(item => (
                  <Link href="/notifications" key={item.id} className="block group">
                    <Card className="transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50 group-hover:-translate-y-1">
                      <CardContent className="p-6 flex items-center gap-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {item.type === 'Notification' ? <Newspaper className="h-6 w-6 text-primary" /> : <Megaphone className="h-6 w-6 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-lg leading-snug">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.date} &bull; {item.type}</p>
                        </div>
                        <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
             <div className="text-center mt-16">
                <Button asChild size="lg" variant="outline">
                  <Link href="/notifications">Browse All Updates</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
