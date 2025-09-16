'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/context/NotificationsContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const RenderNotificationList = ({ type }: { type: string }) => {
  const { notifications } = useNotifications();
  const filtered = notifications.filter(n => n.type === type);
  if (filtered.length === 0) {
    return <p className="text-muted-foreground p-4 text-center">No {type.toLowerCase()}s found.</p>;
  }
  return (
    <div className="space-y-4">
      {filtered.map(item => (
        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
          <div className="mb-2 sm:mb-0">
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={item.url} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
};


export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Updates & Announcements
          </h1>
          <p className="text-sm text-muted-foreground">
            Find all official notifications, circulars, and press releases here.
          </p>
      </header>
        
      <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
            </TabsList>
            <TabsContent value="notifications">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications & Circulars</CardTitle>
                        <CardDescription>Official announcements and directives.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RenderNotificationList type='Notification' />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="press-releases">
                <Card>
                    <CardHeader>
                        <CardTitle>Press Releases</CardTitle>
                        <CardDescription>Media briefings and public statements.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RenderNotificationList type='Press Release' />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
