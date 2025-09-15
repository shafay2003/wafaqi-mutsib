"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dailyCauseList } from "@/lib/placeholder-data";

export default function DailyCauseListPage() {
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    setDisplayDate(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <div className="flex flex-col gap-4">
        <header className="text-left space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Daily Cause List
          </h1>
          <p className="text-sm text-muted-foreground">
            {displayDate ? `Cases scheduled for hearing on ${displayDate}.` : 'Loading...'}
          </p>
        </header>
        
        <Card>
          <CardContent className="p-0">
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
  );
}
