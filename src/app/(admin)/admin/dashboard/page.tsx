
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, ImageIcon, Newspaper, Award } from "lucide-react";
import Link from 'next/link';
import RecentActivity from './RecentActivity';
import { mediaItems } from "@/lib/placeholder-data";
import { notifications } from "@/lib/placeholder-data";
import { successStories } from "@/lib/placeholder-data";
import { publications } from "@/lib/placeholder-data";

export default function AdminDashboard() {
  const contentTypes = [
    { name: "Media Gallery", icon: ImageIcon, count: mediaItems.length, href: "/admin/media" },
    { name: "Notifications", icon: Newspaper, count: notifications.length, href: "/admin/notifications" },
    { name: "Success Stories", icon: Award, count: successStories.length, href: "/admin/success-stories" },
    { name: "Publications", icon: FileText, count: publications.length, href: "/admin/publications" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome! Here's a summary of your website's content and recent activity.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="lg:col-span-2">
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Content Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentTypes.map((type) => (
                <Card key={type.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">{type.name}</CardTitle>
                    <type.icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{type.count}</div>
                    <p className="text-xs text-muted-foreground">items</p>
                    <Link href={type.href} className="text-sm font-medium text-primary hover:underline mt-4 inline-block">
                      Manage &rarr;
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
        </section>
        <aside>
          <RecentActivity />
        </aside>
      </div>
    </div>
  );
}
