import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/placeholder-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about the Wafaqi Mohtasib, filing complaints, and our processes.',
};

export default function FAQPage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <header className="text-center space-y-3 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
            </p>
          </header>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
