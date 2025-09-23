import ComplaintForm from "@/components/complaint/ComplaintForm";
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'File a Complaint',
  description: 'Submit your complaint against any Federal Government agency through our online portal.',
};

export default function ComplaintPage() {
  return (
    <div className="flex flex-col gap-4">
        <header className="text-left space-y-1.5">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              Lodge Your Complaint
            </h1>
            <p className="text-sm text-muted-foreground">
              Please provide detailed and accurate information to help us process your complaint effectively. All fields are required.
            </p>
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <ComplaintForm />
        </Suspense>
    </div>
  );
}
