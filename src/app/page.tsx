import Link from 'next/link'
import {
  FileText,
  Search,
  Book,
  Bell,
  BarChart,
  Briefcase,
  Gavel,
  ShieldCheck,
  Users,
  Landmark,
  FileInput
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
import { successStories, notifications, complaintStats } from '@/lib/placeholder-data'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function Dashboard() {

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col gap-8 md:gap-12">
        <section className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden flex items-center justify-center text-center text-primary-foreground p-4">
           {heroImage &&
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10 brightness-50"
              data-ai-hint={heroImage.imageHint}
              priority
            />
           }
            <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Upholding Justice, Ensuring Accountability
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80">
                  Your platform for transparent and speedy resolution of grievances against federal government agencies in Pakistan.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link href="/complaint">File a Complaint</Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/track-complaint">Track Your Complaint</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted transition-colors">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">File a Complaint</h3>
                <p className="text-sm text-muted-foreground mb-4">Lodge your grievance against any federal agency.</p>
                <Button variant="outline" asChild><Link href="/complaint">Submit Now</Link></Button>
            </Card>
            <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted transition-colors">
                <Search className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Track Your Status</h3>
                <p className="text-sm text-muted-foreground mb-4">Check the real-time status of your submitted complaint.</p>
                 <Button variant="outline" asChild><Link href="/track-complaint">Track Now</Link></Button>
            </Card>
            <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted transition-colors">
                <Book className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Publications</h3>
                <p className="text-sm text-muted-foreground mb-4">Access annual reports, laws, and research papers.</p>
                 <Button variant="outline" asChild><Link href="/publications">Explore</Link></Button>
            </Card>
             <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted transition-colors">
                <Bell className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest official announcements.</p>
                 <Button variant="outline" asChild><Link href="/notifications">View Updates</Link></Button>
            </Card>
        </section>

         <section>
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Complaint Statistics at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complaintStats.map(stat => (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-6">
                <Button asChild>
                    <Link href="/complaint-statistics">View Detailed Statistics</Link>
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
                        <Card key={story.id} className="flex flex-col md:flex-row items-center gap-6 p-4 hover:shadow-lg transition-shadow">
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
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  )
}
