
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen, FileText, Users, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePublications } from "@/context/PublicationsContext";
import { usePageRefresh } from "@/hooks/use-page-refresh";
import { useState } from "react";

const PublicationList = ({ category, searchTerm }: { category: string; searchTerm: string }) => {
  const { publications } = usePublications();
  const filtered = publications.filter(p => 
    p.category === category && 
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.date.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No publications found</h3>
        <p className="text-gray-600">
          {searchTerm ? "Try adjusting your search terms." : `No publications found in this category.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-6">
      {filtered.map((pub, index) => (
        <Card key={pub.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 group">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                      {pub.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Published: {pub.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Category: {pub.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button 
                  variant="default" 
                  className="bg-blue-600 hover:bg-blue-700 group-hover:bg-green-600 transition-all" 
                  asChild
                >
                  <a href={pub.url} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
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

export default function PublicationsPage() {
  usePageRefresh();
  const { publications } = usePublications();
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [...new Set(publications.map(p => p.category))];
  
  const categoryStats = categories.map(category => ({
    name: category,
    count: publications.filter(p => p.category === category).length
  }));

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl">
          <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/30">
            <BookOpen className="h-3 w-3 mr-1" />
            Resource Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Publications & Resources
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
            Access our comprehensive collection of reports, guidelines, research papers, and official documents 
            to stay informed about our work and achievements.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="text-center border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-800 mb-1">{publications.length}</div>
            <div className="text-sm text-blue-600 font-medium">Total Publications</div>
          </CardContent>
        </Card>
        {categoryStats.slice(0, 3).map((category, index) => (
          <Card key={category.name} className="text-center border-0 shadow-md bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-800 mb-1">{category.count}</div>
              <div className="text-sm text-gray-600 font-medium">{category.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            Publication Library
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8 bg-gray-100">
              {categories.map((category) => {
                const count = publications.filter(p => p.category === category).length;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="text-xs md:text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600"
                  >
                    {category}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category} Publications</h3>
                  <p className="text-gray-600">
                    Browse and download publications in the {category.toLowerCase()} category.
                  </p>
                </div>
                <PublicationList category={category} searchTerm={searchTerm} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Need a Specific Document?</h3>
          </div>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact our information desk for assistance with specific documents or resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/contact">Contact Information Desk</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:info@mohtasib.gov.pk">Email Request</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
