import ComplaintForm from "@/components/complaint/ComplaintForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'File a Complaint',
  description: 'Submit your complaint against any Federal Government agency through our online portal.',
};

export default function ComplaintPage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <header className="text-center space-y-3 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              Lodge Your Complaint
            </h1>
            <p className="text-lg text-muted-foreground">
              Please provide detailed and accurate information to help us process your complaint effectively. All fields are required.
            </p>
          </header>

          <ComplaintForm />
        </div>
      </div>
    </div>
  );
}
