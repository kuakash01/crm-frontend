"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePermission } from "@/shared/hooks/usePermissions";
import {
  getMyOrganization,
  updateMyOrganization,
  type Organization,
} from "@/features/organizations/organizations.service";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  industry: "",
  description: "",
};

export default function OrganizationPage() {
  const { can } = usePermission();
  const canUpdate = Boolean(can("organizations:update"));

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);
        const data = await getMyOrganization();
        setOrganization(data);
        setFormData({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          website: data.website ?? "",
          address: data.address ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          country: data.country ?? "",
          zipCode: data.zipCode ?? "",
          industry: data.industry ?? "",
          description: data.description ?? "",
        });
      } catch {
        toast.error("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  const applyOrganization = (data: Organization) => {
    setOrganization(data);
    setFormData({
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      website: data.website ?? "",
      address: data.address ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      country: data.country ?? "",
      zipCode: data.zipCode ?? "",
      industry: data.industry ?? "",
      description: data.description ?? "",
    });
  };

  const handleCancel = () => {
    if (organization) {
      applyOrganization(organization);
    }
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const data = await updateMyOrganization(formData);
      applyOrganization(data);
      setEditing(false);
      toast.success("Organization details updated successfully");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to save organization details";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading organization details...
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        Organization details could not be loaded.
      </div>
    );
  }

  const joinedLabel = new Date(organization.createdAt).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Settings</h1>
          <p className="text-muted-foreground">
            Manage your company information and settings
          </p>
        </div>
        {canUpdate ? (
          <Button
            onClick={() => (editing ? handleCancel() : setEditing(true))}
            variant={editing ? "outline" : "default"}
          >
            {editing ? "Cancel" : "Edit"}
          </Button>
        ) : null}
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!editing}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                disabled={!editing}
                placeholder="e.g., Technology, Finance"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!editing}
                placeholder="company@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!editing}
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                disabled={!editing}
                placeholder="www.company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                disabled={!editing}
                placeholder="Country"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              disabled={!editing}
              placeholder="Street address"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                disabled={!editing}
                placeholder="City"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                disabled={!editing}
                placeholder="State"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                disabled={!editing}
                placeholder="ZIP Code"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={!editing}
              placeholder="Company description and details"
              rows={4}
            />
          </div>

          {editing && (
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{organization.teamMembers}</p>
            <p className="text-xs text-muted-foreground mt-1">Active users</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold truncate">{organization.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Workspace</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Joined
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{joinedLabel}</p>
            <p className="text-xs text-muted-foreground mt-1">Member since</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
