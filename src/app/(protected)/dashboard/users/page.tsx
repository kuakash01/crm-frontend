"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  getUsers,
  deleteUser,
  changeUserStatus,
} from "@/features/users/users.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { User } from "@/features/users/users.types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);

      toast.success("User deleted successfully");

      setSelectedUser(null);

      loadUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleStatusChange = async (userId: number, isActive: boolean) => {
    try {
      await changeUserStatus(userId, isActive);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_active: isActive,
              }
            : user,
        ),
      );

      toast.success("User status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>

            <p className="text-muted-foreground">Manage organization users</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/users/invitations">
              <Button variant="outline">Pending Invitations</Button>
            </Link>

            <Link href="/dashboard/users/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{users.length}</div>

                  <p className="text-sm text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {users.filter((user) => user.is_active).length}
                  </div>

                  <p className="text-sm text-muted-foreground">Active Users</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {users.filter((user) => !user.is_active).length}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Inactive Users
                  </p>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>

                  <TableHead>Email</TableHead>

                  <TableHead>Role</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.fullname}
                    </TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Badge variant="outline">{user.role}</Badge>

                        {user.role.toLowerCase() === "admin" && (
                          <Badge>Owner</Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      {user.role.toLowerCase() === "admin" ? (
                        <Badge>Owner</Badge>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={user.is_active}
                            onCheckedChange={(checked) =>
                              handleStatusChange(user.id, checked)
                            }
                          />

                          <span className="text-sm">
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {user.role.toLowerCase() !== "admin" && (
                            <>
                              <Link href={`/dashboard/users/${user.id}/edit`}>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                              </Link>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => setSelectedUser(user)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}

                          {user.role.toLowerCase() === "admin" && (
                            <DropdownMenuItem disabled>
                              Owner Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AlertDialog
        open={!!selectedUser}
        onOpenChange={() => setSelectedUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedUser?.fullname}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
