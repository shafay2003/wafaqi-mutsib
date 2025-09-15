
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function SettingsForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { settings, setSettings } = useSettings();

  const form = useForm({
    defaultValues: {
      siteName: settings.siteName,
      logo: undefined,
    },
  });

  useEffect(() => {
    form.reset({ siteName: settings.siteName });
  }, [settings.siteName, form]);

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("Settings data:", data);

    setTimeout(() => {
      setSettings({ siteName: data.siteName });
      setLoading(false);
      toast({
        title: "Settings Saved!",
        description: "Your site branding has been updated.",
      });
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Wafaqi Mohtasib Secretariat" {...field} />
              </FormControl>
              <FormDescription>
                This name appears in the site header and browser tab.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Logo</FormLabel>
              <FormControl>
                <Input type="file" />
              </FormControl>
               <FormDescription>
                Upload a new logo (e.g., SVG, PNG, JPG). Leave blank to keep the current one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
        </Button>
      </form>
    </Form>
  );
}
