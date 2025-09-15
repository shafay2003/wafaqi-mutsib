'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2, CheckCircle } from 'lucide-react';

type StatusHistoryItem = {
  date: string;
  status: string;
  details: string;
  isCompleted: boolean;
};


export default function TrackComplaintPage() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter a valid tracking ID.');
      return;
    }
    setError('');
    setLoading(true);
    setStatus(null);

    // Simulate API call
    setTimeout(() => {
      if (trackingId.toUpperCase().startsWith('WM-')) {
        setStatus({
          id: trackingId,
          complainant: 'Mock User',
          agency: 'Mock Agency',
          submittedDate: '2024-07-20',
          currentStatus: 'Under Investigation',
          lastUpdate: '2024-07-22',
          details: 'Your complaint has been forwarded to the concerned department for comments. A response is awaited.',
          history: [
            { date: '2024-07-22', status: 'Under Investigation', details: 'Forwarded to the concerned agency for comments.', isCompleted: true },
            { date: '2024-07-21', status: 'Admitted for Investigation', details: 'Complaint admitted after initial scrutiny.', isCompleted: true },
            { date: '2024-07-20', status: 'Received', details: 'Your complaint has been successfully received.', isCompleted: true },
          ] as StatusHistoryItem[],
        });
      } else {
        setError('No complaint found with this Tracking ID.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8">
          <header className="text-left space-y-1.5">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              Track Your Complaint
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your complaint tracking ID to view its current status and history.
            </p>
          </header>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter Tracking ID (e.g., WM-20240720-12345)"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto h-12 px-8">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Tracking...
                    </>
                  ) : (
                    <>
                      Track Status
                    </>
                  )}
                </Button>
              </form>
               {error && <p className="text-sm font-medium text-destructive mt-4">{error}</p>}
            </CardContent>
          </Card>

          {status && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Status for Tracking ID: {status.id}</CardTitle>
                <CardDescription>
                  Submitted by {status.complainant} on {status.submittedDate} regarding {status.agency}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <Card className="bg-primary/10 border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-base">Current Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl text-primary font-bold">{status.currentStatus}</p>
                        <p className="text-muted-foreground text-xs mt-1">Last Update: {status.lastUpdate}</p>
                    </CardContent>
                </Card>
                
                <div>
                  <h3 className="text-lg font-semibold mb-6">Complaint History</h3>
                  <div className="space-y-10 relative pl-8 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-3">
                    {status.history.map((item: StatusHistoryItem, index: number) => (
                      <div key={index} className="relative flex items-start gap-4">
                        <div className={`absolute -left-1 top-1 h-8 w-8 rounded-full flex items-center justify-center ${item.isCompleted ? 'bg-primary' : 'bg-muted border'}`}>
                           {item.isCompleted && <CheckCircle className="h-5 w-5 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-base">{item.status}</p>
                          <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                          <p className="text-sm text-muted-foreground">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
    </div>
  );
}
