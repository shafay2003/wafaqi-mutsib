
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { usePublications } from "@/context/PublicationsContext";

const PublicationList = ({ category }: { category: string }) => {
  const { publications } = usePublications();
  const filtered = publications.filter(p => p.category === category);

  if (filtered.length === 0) {
    return <p className="text-muted-foreground p-4 text-center">No publications found in this category.</p>;
  }

  return (
    <div className="space-y-4">
      {filtered.map(pub => (
        <div key={pub.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
          <div className="mb-2 sm:mb-0">
            <p className="font-medium text-sm">{pub.title}</p>
            <p className="text-xs text-muted-foreground">Published on: {pub.date}</p>
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
  const categories = ["Annual Reports", "Research Papers", "Laws & Regulations"];
  
  return (
    <div className="flex flex-col gap-4">
        <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Publications & Resources
          </h1>
          <p className="text-sm text-muted-foreground">
            A comprehensive library of official documents and research materials.
          </p>
        </header>

        <Tabs defaultValue="annual-reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat.replace(/\s+/g, '-').toLowerCase()}>{cat}</TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat.replace(/\s+/g, '-').toLowerCase()}>
              <Card>
                <CardHeader>
                  <CardTitle>{cat}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PublicationList category={cat} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
    </div>
  );
}
