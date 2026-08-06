"use client";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings as SettingsIcon, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Your current account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-semibold">{session.user.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email / Username</p>
              <p className="font-semibold">{session.user.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="font-semibold capitalize">{session.user.role || "N/A"}</p>
            </div>
            {session.user.clinicName && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clinic Name</p>
                <p className="font-semibold">{session.user.clinicName}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>To change your password, please sign out and use the "Forgot Password" flow on the login page.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-muted-foreground bg-muted/50 p-4 rounded-lg">
            <ShieldAlert className="h-6 w-6" />
            <p className="text-sm">For security reasons, password resets are handled via email OTP verification.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
