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
        <div key={item.id} className="border-b pb-4">
          <p className="font-semibold text-base">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
      ))}
    </div>
  );
};


export default function NotificationsPage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center space-y-3 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Updates & Announcements
          </h1>
          <p className="text-lg text-muted-foreground">
            Find all official notifications, circulars, and press releases here.
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
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
                        {renderNotificationList('Notification')}
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
                        {renderNotificationList('Press Release')}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}
