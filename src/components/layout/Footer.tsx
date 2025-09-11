import Link from 'next/link';
import { Phone, Mail, Twitter, Facebook, Youtube } from 'lucide-react';
import { Logo } from '@/components/icons';

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Youtube, href: '#', name: 'YouTube' },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container px-4 md:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-10 w-10 text-primary" />
              <span className="font-headline text-lg">Wafaqi Mohtasib</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Providing transparent and speedy justice against administrative injustices.
            </p>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Helpline</p>
                <a href="tel:1056" className="text-muted-foreground hover:text-primary">1056</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/complaint" className="text-muted-foreground hover:text-primary">File Complaint</Link></li>
                <li><Link href="/track-complaint" className="text-muted-foreground hover:text-primary">Track Status</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/publications" className="text-muted-foreground hover:text-primary">Annual Reports</Link></li>
                <li><Link href="/publications" className="text-muted-foreground hover:text-primary">Laws & Regulations</Link></li>
                <li><Link href="/notifications" className="text-muted-foreground hover:text-primary">Notifications</Link></li>
                <li><Link href="/media-gallery" className="text-muted-foreground hover:text-primary">Media Gallery</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">Our Mission</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">Organizational Structure</Link></li>
                <li><Link href="/success-stories" className="text-muted-foreground hover:text-primary">Success Stories</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
             <h3 className="font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map(social => (
                  <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wafaqi Mohtasib Secretariat. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
