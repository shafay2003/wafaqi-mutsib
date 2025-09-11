'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
          details: 'Your complaint has been forwarded to the concerned department for comments. A response is awaited.'
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
              Enter your complaint tracking ID to view its current status.
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
                <CardTitle className="text-lg">Status for Tracking ID: {status.id}</CardTitle>
                <CardDescription className="text-sm">Submitted on: {status.submittedDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold">Current Status</h3>
                   <p className="text-primary font-bold">{status.currentStatus}</p>
                </div>
                 <div>
                  <h3 className="font-semibold">Last Update</h3>
                  <p className="text-muted-foreground">{status.lastUpdate}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Details</h3>
                  <p className="text-muted-foreground">{status.details}</p>
                </div>
              </CardContent>
            </Card>
          )}
    </div>
  );
}
