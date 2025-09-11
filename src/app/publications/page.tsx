import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { publications } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications & Resources',
  description: 'Access annual reports, research papers, laws, regulations, and other publications from the Wafaqi Mohtasib.',
};

const renderPublicationList = (category: string) => {
  const filtered = publications.filter(p => p.category === category);
  if (filtered.length === 0) {
    return <p className="text-muted-foreground p-4 text-center">No publications found in this category.</p>;
  }
  return (
    <div className="space-y-4">
      {filtered.map(pub => (
        <div key={pub.id} className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-semibold text-base">{pub.title}</p>
            <p className="text-sm text-muted-foreground">Published on: {pub.date}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={pub.url} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default function PublicationsPage() {
  const categories = [...new Set(publications.map(p => p.category))];
  
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center space-y-3 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Publications & Resources
          </h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive library of official documents and research materials.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
              ))}
            </TabsList>

            {categories.map(cat => (
              <TabsContent key={cat} value={cat}>
                <Card>
                  <CardHeader>
                    <CardTitle>{cat}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderPublicationList(cat)}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
