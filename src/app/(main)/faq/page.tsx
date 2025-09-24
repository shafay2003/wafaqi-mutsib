
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Phone, Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFaqs } from "@/context/FaqContext";
import { usePageRefresh } from "@/hooks/use-page-refresh";
import { useState } from "react";

export default function FAQPage() {
  usePageRefresh();
  const { faqs } = useFaqs();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const helpResources = [
    {
      icon: Phone,
      title: "Call Helpline",
      description: "Get immediate assistance",
      action: "Call +92-51-9201715",
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed queries",
      action: "Email Us",
      color: "bg-blue-500"
    },
    {
      icon: MessageCircle,
      title: "File Complaint",
      description: "Submit formal complaint",
      action: "Start Process",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white rounded-xl p-8 md:p-12">
        <div className="max-w-4xl">
          <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/30">
            <HelpCircle className="h-3 w-3 mr-1" />
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
            Find quick answers to common questions about our services, complaint procedures, and processes.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* FAQ Content - Takes 3 columns */}
        <div className="lg:col-span-3">
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
                {searchTerm ? `Search Results (${filteredFaqs.length})` : `All Questions (${faqs.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse all questions.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")} 
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border rounded-lg px-4 hover:bg-gray-50 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-4">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-1 text-xs px-2 py-1">
                            {index + 1}
                          </Badge>
                          <span className="text-gray-900">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pb-4 pl-10 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Help Resources Sidebar - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="shadow-md sticky top-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-gray-600" />
                Need More Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              
              {helpResources.map((resource, index) => (
                <div key={index} className="group">
                  <Card className="border-2 border-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${resource.color} group-hover:scale-105 transition-transform`}>
                          <resource.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{resource.title}</h4>
                          <p className="text-gray-600 text-xs">{resource.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full text-xs" asChild>
                        {resource.title === "Call Helpline" ? (
                          <a href="tel:+92-51-9201715">{resource.action}</a>
                        ) : resource.title === "Email Support" ? (
                          <a href="mailto:complaints@mohtasib.gov.pk">{resource.action}</a>
                        ) : (
                          <a href="/complaint">{resource.action}</a>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6 shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{faqs.length}</div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact CTA Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our dedicated support team is available to assist you with any additional queries or concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/complaint">File a Complaint</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
