
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          This page will be used to manage website administrators and users. Functionality to add, edit, and remove users will be implemented here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Coming soon...</p>
      </CardContent>
    </Card>
  );
}
