import { Facebook, Phone, Twitter, Youtube, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "../icons";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-card-foreground border-t">
        <div className="container px-4 md:px-8 py-12">
            <div className="grid gap-10 lg:grid-cols-4">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2.5 font-semibold">
                        <Logo className="h-10 w-10 text-primary" />
                        <span className="font-semibold text-lg text-gray-800">Wafaqi Mohtasib</span>
                    </Link>
                    <p className="text-muted-foreground text-sm">Providing transparent and speedy justice against administrative injustices.</p>
                     <div className="flex items-center gap-3 pt-2">
                        <Phone className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold text-sm text-gray-800">Helpline</p>
                            <a href="tel:1056" className="text-muted-foreground hover:text-primary text-sm font-medium">1056</a>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4 tracking-tight text-gray-800">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/complaint" className="text-muted-foreground hover:text-primary">
                                File Complaint
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-complaint" className="text-muted-foreground hover:text-primary">
                                Track Status
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                                FAQs
                                </Link>
                            </li>
                             <li>
                                <Link href="/tenders-and-vacancies" className="text-muted-foreground hover:text-primary">
                                Career
                                </Link>
                            </li>
                             <li>
                                <Link href="/feedback" className="text-muted-foreground hover:text-primary">
                                Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-4 tracking-tight text-gray-800">Resources</h3>
                        <ul className="space-y-2 text-sm">
                             <li>
                                <Link href="/publications" className="text-muted-foreground hover:text-primary">
                                Annual Reports
                                </Link>
                            </li>
                            <li>
                                <Link href="/publications" className="text-muted-foreground hover:text-primary">
                                Laws & Regulations
                                </Link>
                            </li>
                            <li>
                                <Link href="/notifications" className="text-muted-foreground hover:text-primary">
                                Notifications
                                </Link>
                            </li>
                             <li>
                                <Link href="/media-gallery" className="text-muted-foreground hover:text-primary">
                                Media Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-4 tracking-tight text-gray-800">About</h3>
                        <ul className="space-y-2 text-sm">
                             <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary">
                                Our Mission
                                </Link>                            </li>
                             <li>
                                <Link href="/international-collaborations" className="text-muted-foreground hover:text-primary">
                                Int. Collaborations
                                </Link>
                            </li>
                             <li>
                                <Link href="/success-stories" className="text-muted-foreground hover:text-primary">
                                Success Stories
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                 <div className="space-y-4">
                    <h3 className="font-semibold tracking-tight text-gray-800">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Youtube className="h-5 w-5" />
                            <span className="sr-only">YouTube</span>
                        </Link>
                         <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                         <Link href="#" className="text-muted-foreground hover:text-primary">
                            <MessageCircle className="h-5 w-5" />
                            <span className="sr-only">WhatsApp</span>
                        </Link>
                    </div>
                 </div>
            </div>

            <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Wafaqi Mohtasib Secretariat. All rights reserved.</p>
                 <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary">Terms of Service</Link>
                    <Link href="#" className="hover:text-primary">Sitemap</Link>
                </div>
            </div>
        </div>
    </footer>
  );
}
