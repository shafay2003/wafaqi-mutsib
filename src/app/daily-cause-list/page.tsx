import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dailyCauseList } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Cause List',
  description: 'View the list of cases scheduled for hearing today at the Wafaqi Mohtasib.',
};

export default function DailyCauseListPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center space-y-3 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Daily Cause List
          </h1>
          <p className="text-lg text-muted-foreground">
            Cases scheduled for hearing on {today}.
          </p>
        </header>
        
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Case No.</TableHead>
                  <TableHead>Complainant</TableHead>
                  <TableHead>Agency</TableHead>
                  <TableHead className="text-right">Hearing Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyCauseList.map((item) => (
                  <TableRow key={item.caseNo}>
                    <TableCell className="font-medium">{item.caseNo}</TableCell>
                    <TableCell>{item.complainant}</TableCell>
                    <TableCell>{item.agency}</TableCell>
                    <TableCell className="text-right">{item.hearingTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
