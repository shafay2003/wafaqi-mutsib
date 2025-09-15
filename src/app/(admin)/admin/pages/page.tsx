
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Management</CardTitle>
        <CardDescription>
          This page will allow administrators to edit the content of static pages like "About Us" or "Contact".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Coming soon...</p>
      </CardContent>
    </Card>
  );
}
