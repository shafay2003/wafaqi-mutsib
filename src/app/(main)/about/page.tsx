
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { usePages } from "@/context/PagesContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Scale, Users, FileText, Clock, CheckCircle, Globe } from "lucide-react";

export default function AboutPage() {
  const orgChartImage = PlaceHolderImages.find(p => p.id === 'org-chart');
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const { pages, loading } = usePages();

  const keyStats = [
    { icon: FileText, label: "Cases Resolved", value: "2+ Million", color: "bg-blue-500" },
    { icon: Users, label: "Citizens Served", value: "10+ Million", color: "bg-green-500" },
    { icon: Clock, label: "Years of Service", value: "40+", color: "bg-purple-500" },
    { icon: Globe, label: "Regional Offices", value: "15+", color: "bg-orange-500" },
  ];

  const coreValues = [
    {
      title: "Independence",
      description: "Operating with complete autonomy to ensure impartial investigation and resolution of complaints.",
      icon: Scale
    },
    {
      title: "Accessibility",
      description: "Providing free and easy access to justice for all citizens without discrimination.",
      icon: Users
    },
    {
      title: "Transparency", 
      description: "Maintaining open and transparent processes in all investigations and decisions.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <header className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            quality={95}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12">
          <div className="text-white max-w-2xl">
            <Badge className="mb-4 bg-green-600/90 text-white border-0">Established 1983</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              About The Wafaqi Mohtasib
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Pakistan's Premier Ombudsman Institution - Upholding Administrative Justice and Protecting Citizens' Rights
            </p>
          </div>
        </div>
      </header>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {keyStats.map((stat, index) => (
          <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className={`inline-flex p-3 rounded-full ${stat.color} mb-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* History & Establishment - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-full shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                History & Establishment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {pages.about}
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Legal Foundation</h4>
                    <p className="text-green-800 text-sm">
                      Established through President's Order No. 1 of 1983, the Wafaqi Mohtasib operates under 
                      constitutional mandate to investigate complaints against federal government agencies.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Jurisdiction</h5>
                      <p className="text-gray-700 text-sm">
                        Federal ministries, divisions, departments, and agencies fall under our oversight.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Free Service</h5>
                      <p className="text-gray-700 text-sm">
                        All services provided completely free of cost to ensure access for all citizens.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Core Values - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="h-full shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                Core Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {coreValues.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                      <value.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Organizational Structure */}
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            Organizational Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            The Wafaqi Mohtasib Secretariat operates under a well-defined hierarchical structure designed 
            to ensure efficient case management, thorough investigations, and timely resolution of complaints. 
            Our organization is headed by the Wafaqi Mohtasib and supported by experienced professionals 
            across various departments.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Leadership</h4>
              <p className="text-green-800 text-sm">Wafaqi Mohtasib & Senior Management</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Investigation Wing</h4>
              <p className="text-blue-800 text-sm">Investigation Officers & Legal Advisors</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Support Services</h4>
              <p className="text-purple-800 text-sm">Administrative & Technical Staff</p>
            </div>
          </div>

          {orgChartImage && (
            <div className="w-full border rounded-xl p-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-inner">
              <Image
                src={orgChartImage.imageUrl}
                alt={orgChartImage.description}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-lg shadow-sm"
                data-ai-hint={orgChartImage.imageHint}
                quality={90}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
