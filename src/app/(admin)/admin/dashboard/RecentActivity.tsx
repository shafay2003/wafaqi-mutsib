
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUsers } from '@/context/UsersContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FilePenLine, MessageSquareQuote, BookOpen } from 'lucide-react';
import { usePublications } from '@/context/PublicationsContext';
import { useFaqs } from '@/context/FaqContext';

export default function RecentActivity() {
  const { users } = useUsers();
  const { publications } = usePublications();
  const { faqs } = useFaqs();

  const recentActivities = [
     {
      id: 'act-1',
      user: users[0]?.name || 'Admin',
      description: 'Added a new FAQ.',
      time: '15 minutes ago',
      icon: FilePenLine
    },
    {
      id: 'act-2',
      user: users[1]?.name || 'Editor',
      description: 'Submitted feedback on the website.',
      time: '2 hours ago',
      icon: MessageSquareQuote
    },
    {
      id: 'act-3',
      user: 'System',
      description: `A new publication "${publications[0]?.title}" was added.`,
      time: '1 day ago',
      icon: BookOpen
    },
  ];


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
                {activity.time} by {activity.user}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
