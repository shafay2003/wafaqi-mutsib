'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // If it's a quota exceeded error, try to handle it gracefully
    if (error.message.includes('QuotaExceededError') || error.message.includes('localStorage')) {
      console.warn('Storage quota exceeded, attempting recovery...');
      try {
        // Clear large files from storage
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('media-image-')) {
            localStorage.removeItem(key);
          }
        });
        
        // Reset the error state after a delay
        setTimeout(() => {
          this.setState({ hasError: false, error: undefined });
        }, 2000);
      } catch (recoveryError) {
        console.error('Recovery failed:', recoveryError);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {this.state.error?.message?.includes('Quota') 
                  ? 'Storage quota exceeded. Large files have been cleared from storage.' 
                  : 'An unexpected error occurred. This might be due to a large file upload.'}
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => this.setState({ hasError: false })}
                  size="sm"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                >
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;