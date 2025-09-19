
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            This is a placeholder page for the password reset flow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">In a real application, this page would contain a form to email a password reset link to the user.</p>
          <Button asChild>
            <Link href="/admin/login">Return to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
