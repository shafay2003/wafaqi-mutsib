import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications & Press Releases',
  description: 'Stay updated with the latest notifications, circulars, and press releases from the Wafaqi Mohtasib.',
};

const renderNotificationList = (type: string) => {
  const filtered = notifications.filter(n => n.type === type);
  if (filtered.length === 0) {
    return <p className="text-muted-foreground p-4 text-center">No {type.toLowerCase()}s found.</p>;
  }
  return (
    <div className="space-y-4">
      {filtered.map(item => (
        <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
          <p className="font-medium text-sm">{item.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
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
                        <CardTitle className="text-lg">Notifications & Circulars</CardTitle>
                        <CardDescription className="text-sm">Official announcements and directives.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderNotificationList('Notification')}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="press-releases">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Press Releases</CardTitle>
                        <CardDescription className="text-sm">Media briefings and public statements.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderNotificationList('Press Release')}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
