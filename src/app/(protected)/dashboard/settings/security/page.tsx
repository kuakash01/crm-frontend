"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Lock, Shield, Smartphone, AlertTriangle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SecurityPage() {
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [twoFALoading, setTwoFALoading] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setChangePasswordLoading(true);
      // TODO: Replace with actual API call
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleToggle2FA = async () => {
    try {
      setTwoFALoading(true);
      // TODO: Replace with actual API call
      setTwoFAEnabled(!twoFAEnabled);
      toast.success(`Two-factor authentication ${!twoFAEnabled ? "enabled" : "disabled"}`);
    } catch (error) {
      toast.error("Failed to update 2FA settings");
    } finally {
      setTwoFALoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and privacy</p>
      </div>

      {/* Password Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your account password regularly for security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              placeholder="Confirm new password"
            />
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={changePasswordLoading}
            className="w-full"
          >
            {changePasswordLoading ? "Updating..." : "Change Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
            <div className="space-y-1">
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">Use an authenticator app for two-factor authentication</p>
            </div>
            <Badge variant={twoFAEnabled ? "default" : "outline"}>
              {twoFAEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>

          <Button
            onClick={handleToggle2FA}
            disabled={twoFALoading}
            variant={twoFAEnabled ? "destructive" : "default"}
            className="w-full"
          >
            {twoFALoading ? "Loading..." : twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
          </Button>

          {twoFAEnabled && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-3 flex gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">2FA is active</p>
                <p className="text-sm text-green-700 dark:text-green-300">Your account is protected with two-factor authentication</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">Windows • Chrome • This device</p>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Last active: Just now</p>
          </div>

          <Separator />

          <Button variant="outline" className="w-full">
            Sign Out of All Other Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Login Activity</CardTitle>
          <CardDescription>Last 5 login attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "Today at 10:30 AM", location: "New Delhi, India", device: "Chrome on Windows" },
              { time: "Yesterday at 2:15 PM", location: "New Delhi, India", device: "Safari on MacOS" },
              { time: "2 days ago at 9:45 AM", location: "Mumbai, India", device: "Chrome on Windows" },
            ].map((login, idx) => (
              <div key={idx} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{login.time}</p>
                  <p className="text-xs text-muted-foreground">{login.location}</p>
                  <p className="text-xs text-muted-foreground">{login.device}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Danger Zone */}
      <Card className="border-red-200 dark:border-red-900 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
