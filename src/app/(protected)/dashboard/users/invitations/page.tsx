"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getPendingInvitations,
  resendInvitation,
  cancelInvitation,
} from "@/features/users/users.service";

type Invitation = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  reportsTo: string | null;
  expiresAt: string;
  createdAt: string;
  status: "pending" | "expired";
};

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const loadInvitations = async () => {
    try {
      setLoading(true);

      const data = await getPendingInvitations();

      setInvitations(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load invitations",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, []);

  const handleResend = async (invitationId: number) => {
    try {
      setActionLoading(invitationId);

      await resendInvitation(invitationId);

      toast.success("Invitation resent successfully.");

      await loadInvitations();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to resend invitation",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (invitationId: number) => {
    try {
      setActionLoading(invitationId);

      await cancelInvitation(invitationId);

      toast.success("Invitation cancelled.");

      setInvitations((current) =>
        current.filter((item) => item.id !== invitationId),
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to cancel invitation",
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="mb-8">
     

          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Manage pending invitations sent to members of your organization.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={loadInvitations}
              disabled={loading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>

            <CardDescription>
              Invitations that have not been accepted yet.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Loading invitations...
              </div>
            ) : invitations.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-medium">No pending invitations</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  New invitations will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>

                      <TableHead>Email</TableHead>

                      <TableHead>Role</TableHead>

                      <TableHead>Reports To</TableHead>

                      <TableHead>Expires</TableHead>

                      <TableHead>Status</TableHead>

                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {invitations.map((invitation) => (
                      <TableRow key={invitation.id}>
                        <TableCell className="font-medium">
                          {invitation.fullName}
                        </TableCell>

                        <TableCell>{invitation.email}</TableCell>

                        <TableCell>{invitation.role}</TableCell>

                        <TableCell>{invitation.reportsTo || "—"}</TableCell>

                        <TableCell>
                          {new Date(invitation.expiresAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          <span
                            className={
                              invitation.status === "expired"
                                ? "text-sm text-destructive"
                                : "text-sm text-muted-foreground"
                            }
                          >
                            {invitation.status}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={actionLoading === invitation.id}
                              onClick={() => handleResend(invitation.id)}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Resend
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              disabled={actionLoading === invitation.id}
                              onClick={() => handleCancel(invitation.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
