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
    <div className="flex flex-col gap-4">
          <header className="text-left space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">
              Track Your Complaint
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your complaint tracking ID to view its current status and history.
            </p>
          </header>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-start gap-2">
                <Input
                  type="text"
                  placeholder="Enter Tracking ID (e.g., WM-20240720-12345)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> Track Status
                    </>
                  )}
                </Button>
              </form>
               {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
            </CardContent>
          </Card>

          {status && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Status for Tracking ID: {status.id}</CardTitle>
                <CardDescription className="text-sm">
                  Submitted by {status.complainant} on {status.submittedDate} regarding {status.agency}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Current Status</h3>
                   <p className="text-lg text-primary font-bold">{status.currentStatus}</p>
                   <p className="text-muted-foreground text-xs">Last Update: {status.lastUpdate}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Complaint History</h3>
                  <div className="space-y-8 relative pl-6 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-2">
                    {status.history.map((item: StatusHistoryItem, index: number) => (
                      <div key={index} className="relative">
                        <div className={`absolute -left-7 top-1 h-4 w-4 rounded-full flex items-center justify-center ${item.isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground'}`}>
                           {item.isCompleted && <CheckCircle className="h-4 w-4" />}
                        </div>
                        <p className="font-semibold text-primary">{item.status}</p>
                        <p className="text-xs text-muted-foreground mb-1">{item.date}</p>
                        <p className="text-muted-foreground">{item.details}</p>
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
