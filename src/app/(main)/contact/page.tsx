
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Clock, Globe, Building, Users, Headphones } from "lucide-react";
import { useRegionalOffices } from "@/context/RegionalOfficesContext";
import { usePages } from "@/context/PagesContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactPage() {
  const { regionalOffices } = useRegionalOffices();
  const { pages, loading } = usePages();
  
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our helpline for immediate assistance",
      contact: "+92-51-9201715",
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Send us your queries via email",
      contact: "complaints@mohtasib.gov.pk",
      color: "bg-blue-500"
    },
    {
      icon: Building,
      title: "Visit in Person",
      description: "Visit our head office for direct assistance",
      contact: "Islamabad Head Office",
      color: "bg-purple-500"
    },
    {
      icon: Globe,
      title: "Online Portal",
      description: "File complaints through our online system",
      contact: "24/7 Available",
      color: "bg-orange-500"
    }
  ];

  const officeHours = [
    { day: "Monday - Thursday", time: "9:00 AM - 5:00 PM" },
    { day: "Friday", time: "9:00 AM - 1:00 PM" },
    { day: "Saturday - Sunday", time: "Closed" }
  ];
  
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/30">
            Get Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Contact Us
          </h1>
          {loading ? (
            <Skeleton className="h-6 w-3/4 bg-white/20" />
          ) : (
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              {pages.contact} We're here to assist you with your concerns and provide the support you need.
            </p>
          )}
        </div>
      </header>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className={`inline-flex p-4 rounded-full ${method.color} mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
              <p className="font-semibold text-sm text-gray-800">{method.contact}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Head Office - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                Head Office
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-600 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-900 text-lg mb-2">
                      Wafaqi Mohtasib Secretariat
                    </h3>
                    <p className="text-green-800 mb-4 leading-relaxed">
                      1st Floor, Pakistan Secretariat<br />
                      Islamabad 44000, Pakistan
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-green-600" />
                        <a href="tel:+92-51-9201715" className="text-green-800 hover:text-green-900 font-medium">
                          +92-51-9201715
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-green-600" />
                        <a href="mailto:complaints@mohtasib.gov.pk" className="text-green-800 hover:text-green-900 font-medium break-all">
                          complaints@mohtasib.gov.pk
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Headphones className="h-4 w-4" />
                    Complaint Helpline
                  </h4>
                  <p className="text-blue-800 font-bold">+92-51-9201715</p>
                  <p className="text-blue-700 text-xs mt-1">Free of charge</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Online Portal
                  </h4>
                  <p className="text-purple-800 text-sm">24/7 Online Filing</p>
                  <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700" asChild>
                    <a href="/complaint">File Complaint</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Office Hours - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="h-full shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-800">{schedule.day}</span>
                    <span className="text-gray-600 font-semibold">{schedule.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Holiday Notice</h4>
                <p className="text-yellow-800 text-sm">
                  Office remains closed on all national and religious holidays as notified by the Government of Pakistan.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Regional Offices */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Regional Offices</h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Our regional offices across Pakistan provide localized support and services to citizens in their respective areas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionalOffices.map((office) => (
            <Card 
              key={office.id}
              className="transition-all duration-300 hover:shadow-lg hover:border-green-300 border-2 group"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-900 group-hover:text-green-700 transition-colors">
                  {office.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{office.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-green-600 text-sm font-medium transition-colors">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-green-600 text-sm font-medium break-all transition-colors">
                    {office.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
