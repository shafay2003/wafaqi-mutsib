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

export type AdminNavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: ('Administrator' | 'Editor' | 'Viewer')[];
};


export const adminNavLinks: AdminNavLink[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home, roles: ['Administrator', 'Editor', 'Viewer'] },
  { href: '/admin/media', label: 'Media Gallery', icon: GalleryVertical, roles: ['Administrator', 'Editor'] },
  { href: '/admin/notifications', label: 'Notifications', icon: Newspaper, roles: ['Administrator', 'Editor'] },
  { href: '/admin/success-stories', label: 'Success Stories', icon: Award, roles: ['Administrator', 'Editor'] },
  { href: '/admin/publications', label: 'Publications', icon: BookOpen, roles: ['Administrator', 'Editor'] },
  { href: '/admin/pages', label: 'Pages', icon: FileText, roles: ['Administrator', 'Editor'] },
  { href: '/admin/users', label: 'Users', icon: Users, roles: ['Administrator'] },
  { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['Administrator'] },
];
