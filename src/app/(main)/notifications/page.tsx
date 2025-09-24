'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/context/NotificationsContext";
import { Download, Bell, Calendar, Search, FileText, Megaphone, AlertCircle } from "lucide-react";
import { usePageRefresh } from "@/hooks/use-page-refresh";
import { useState } from "react";

const RenderNotificationList = ({ type, searchTerm }: { type: string; searchTerm: string }) => {
  const { notifications } = useNotifications();
  const filtered = notifications.filter(n => 
    n.type === type && 
    (n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     n.date.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No {type.toLowerCase()}s found</h3>
        <p className="text-gray-600">
          {searchTerm ? "Try adjusting your search terms." : `No ${type.toLowerCase()}s available at the moment.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-6">
      {filtered.map((item, index) => (
        <Card key={item.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 group">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <Badge 
                    variant={type === 'Notification' ? 'default' : type === 'Circular' ? 'secondary' : 'outline'} 
                    className="mt-1"
                  >
                    {type}
                  </Badge>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Published: {item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Type: {item.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button 
                  variant="default" 
                  className="bg-green-600 hover:bg-green-700 group-hover:bg-blue-600 transition-all" 
                  asChild
                >
                  <a href={item.url} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function NotificationsPage() {
  usePageRefresh();
  const { notifications } = useNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const types = [...new Set(notifications.map(n => n.type))];

  const typeStats = types.map(type => ({
    name: type,
    count: notifications.filter(n => n.type === type).length,
    icon: type === 'Notification' ? Bell : type === 'Circular' ? AlertCircle : Megaphone
  }));

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl">
          <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/30">
            <Bell className="h-3 w-3 mr-1" />
            Latest Updates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Notifications & Announcements
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
            Stay informed with our latest official notifications, circulars, press releases, and important announcements.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="text-center border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="inline-flex p-2 rounded-full bg-green-600 mb-2">
              <Bell className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-800 mb-1">{notifications.length}</div>
            <div className="text-sm text-green-600 font-medium">Total Updates</div>
          </CardContent>
        </Card>
        {typeStats.map((type, index) => (
          <Card key={type.name} className="text-center border-0 shadow-md bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="pt-6">
              <div className="inline-flex p-2 rounded-full bg-gray-600 mb-2">
                <type.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{type.count}</div>
              <div className="text-sm text-gray-600 font-medium">{type.name}s</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Megaphone className="h-6 w-6 text-blue-600" />
            </div>
            Official Communications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue={types[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 bg-gray-100">
              {types.map((type) => {
                const count = notifications.filter(n => n.type === type).length;
                return (
                  <TabsTrigger 
                    key={type} 
                    value={type}
                    className="text-xs md:text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600"
                  >
                    {type}s
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            {types.map((type) => (
              <TabsContent key={type} value={type} className="mt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type}s</h3>
                  <p className="text-gray-600">
                    Browse and download official {type.toLowerCase()}s from the Wafaqi Mohtasib Secretariat.
                  </p>
                </div>
                <RenderNotificationList type={type} searchTerm={searchTerm} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Subscription CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="h-6 w-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Stay Updated</h3>
          </div>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Subscribe to our notification service to receive instant updates about new announcements and important notices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="/contact">Subscribe to Updates</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:notifications@mohtasib.gov.pk">Email Alerts</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
