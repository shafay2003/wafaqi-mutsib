import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FilePenLine,
  SearchCheck,
  LifeBuoy,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { successStories, notifications } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  
  const quickLinks = [
    { title: "File a New Complaint", description: "Submit your grievance against a federal agency.", icon: FilePenLine, href: "/complaint", cta: "File Now" },
    { title: "Track Your Complaint", description: "Check the status of your previously filed complaint.", icon: SearchCheck, href: "/track-complaint", cta: "Track Now" },
    { title: "Children's Complaints", description: "A dedicated portal for our younger citizens.", icon: LifeBuoy, href: "/complaint", cta: "Visit Portal" },
    { title: "Overseas Pakistanis", description: "Special assistance for Pakistanis living abroad.", icon: Users, href: "/complaint", cta: "Get Help" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover -z-10"
                priority
                data-ai-hint={heroImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-black/50 -z-10" />
          <div className="container px-4 md:px-6 z-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-headline">
                Ensuring Administrative Justice for All
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200">
                The Wafaqi Mohtasib of Pakistan is dedicated to providing swift and fair resolution of public complaints against Federal Government agencies.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/complaint">
                    <FilePenLine className="mr-2 h-5 w-5" /> File a Complaint
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="quick-links" className="py-12 md:py-20 lg:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <Card key={link.title} className="flex flex-col transition-transform transform hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <link.icon className="w-8 h-8 text-primary" />
                      <CardTitle className="font-headline">{link.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground flex-grow">{link.description}</p>
                    <Button asChild className="mt-4 w-full">
                       <Link href={link.href}>{link.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="success-stories" className="py-12 md:py-20 lg:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Success Stories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real stories of how the Wafaqi Mohtasib has made a difference in people's lives.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {successStories.slice(0, 3).map((story, index) => {
                 const storyImage = PlaceHolderImages.find(p => p.id === `success-${index + 1}`);
                 return (
                  <Card key={story.id} className="overflow-hidden">
                    {storyImage && (
                      <Image
                        src={storyImage.imageUrl}
                        alt={storyImage.description}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={storyImage.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">{story.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{story.summary}</p>
                       <Button asChild variant="link" className="px-0 mt-2">
                        <Link href="/success-stories">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/success-stories">View All Success Stories</Link>
                </Button>
            </div>
          </div>
        </section>

         <section id="notifications" className="py-12 md:py-20 lg:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12">Latest Updates & Notifications</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline">Notifications</h3>
                <div className="space-y-4">
                  {notifications.filter(n => n.type === 'Notification').slice(0, 3).map(item => (
                    <Link href="/notifications" key={item.id}>
                      <div className="p-4 border rounded-lg hover:bg-secondary transition-colors">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline">Press Releases</h3>
                <div className="space-y-4">
                  {notifications.filter(n => n.type === 'Press Release').slice(0, 2).map(item => (
                    <Link href="/notifications" key={item.id}>
                      <div className="p-4 border rounded-lg hover:bg-secondary transition-colors">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg">
                  <Link href="/notifications">View All Updates</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
