
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import SettingsForm from "./SettingsForm";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Site Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your website's branding and general information.
                </p>
            </div>
        </header>
        <Card>
            <CardContent className="pt-6">
                <SettingsForm />
            </CardContent>
        </Card>
    </div>
  );
}
