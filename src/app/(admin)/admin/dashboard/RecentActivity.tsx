
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { recentActivities } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
        <CardDescription>A log of recent user interactions on the site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/avatars/${activity.user.slice(0, 1)}.png`} alt="Avatar" />
              <AvatarFallback>{activity.user.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {activity.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
