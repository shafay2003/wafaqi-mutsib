import {
  Home,
  FileText,
  Newspaper,
  Award,
  BookOpen,
  GalleryVertical,
  Settings,
  Users,
} from 'lucide-react';

export const adminNavLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/media', label: 'Media Gallery', icon: GalleryVertical },
  { href: '/admin/notifications', label: 'Notifications', icon: Newspaper },
  { href: '/admin/success-stories', label: 'Success Stories', icon: Award },
  { href: '/admin/publications', label: 'Publications', icon: BookOpen },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];
