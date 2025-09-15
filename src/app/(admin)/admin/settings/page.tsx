
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          This page will contain general website settings, such as site title, contact information, and social media links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Coming soon...</p>
      </CardContent>
    </Card>
  );
}
