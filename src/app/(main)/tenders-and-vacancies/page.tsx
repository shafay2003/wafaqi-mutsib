import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Briefcase } from "lucide-react";
import { tenders, vacancies } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tenders & Vacancies',
    description: 'Find information about tenders, job openings, and other opportunities at the Wafaqi Mohtasib.',
};

const renderTenderList = () => (
    <div className="space-y-4">
      {tenders.map(item => (
        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground">Published: {item.publishDate} | Deadline: {item.deadline}</p>
          </div>
          <Button variant="outline" size="sm" asChild className="mt-2 sm:mt-0">
            <a href={item.url} download>
              <Download className="mr-2 h-4 w-4" />
              Download Document
            </a>
          </Button>
        </div>
      ))}
    </div>
);

const renderVacancyList = () => (
     <div className="space-y-4">
      {vacancies.map(item => (
        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground">Location: {item.location} | Deadline: {item.deadline}</p>
          </div>
          <Button variant="outline" size="sm" asChild className="mt-2 sm:mt-0">
            <a href={item.url}>
              <Briefcase className="mr-2 h-4 w-4" />
              View Details
            </a>
          </Button>
        </div>
      ))}
    </div>
);


export default function TendersAndVacanciesPage() {
  return (
    <div className="flex flex-col gap-4">
      <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Opportunities
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore procurement tenders and career vacancies at the Wafaqi Mohtasib.
          </p>
      </header>
        
      <Tabs defaultValue="tenders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tenders">Tenders</TabsTrigger>
                <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
            </TabsList>
            <TabsContent value="tenders">
                <Card>
                    <CardHeader>
                        <CardTitle>Procurement Tenders</CardTitle>
                        <CardDescription>Current tender notices for goods and services.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderTenderList()}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="vacancies">
                <Card>
                    <CardHeader>
                        <CardTitle>Career Opportunities</CardTitle>                        <CardDescription>Join our team and contribute to public service.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderVacancyList()}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
