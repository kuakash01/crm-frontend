"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Building2,
  Compass,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";

import { createLead } from "@/features/leads/leads.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePermission } from "@/shared/hooks/usePermissions";

const SOURCE_OPTIONS = [
  { value: "MANUAL", label: "Direct / Manual Entry", desc: "Added directly by sales representative" },
  { value: "WEBSITE", label: "Website Contact Form", desc: "Inbound inquiry from company landing page" },
  { value: "REFERRAL", label: "Customer Referral", desc: "Referred by an existing client or partner" },
  { value: "GOOGLE", label: "Google Search / Ads", desc: "Organic search or pay-per-click campaign" },
  { value: "FACEBOOK", label: "Social Media / Ads", desc: "Campaign lead from social networks" },
];

export default function CreateLeadPage() {
  const router = useRouter();
  const { can } = usePermission();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone1: "",
    phone2: "",
    company: "",
    source: "MANUAL",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createLead(formData);
      toast.success("Lead created successfully");
      router.push("/dashboard/leads");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create lead");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!can("leads:create")) {
      router.replace("/dashboard/leads");
    }
  }, [can, router]);

  if (!can("leads:create")) {
    return null;
  }

  const fullName = `${formData.fname} ${formData.lname}`.trim();
  const initials =
    (formData.fname[0] || "") + (formData.lname[0] || "") || "NL";

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/leads"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Leads
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create Lead</h1>
          <p className="text-muted-foreground mt-1">
            Capture a new prospective customer into your active sales pipeline.
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Lead Details</CardTitle>
                  <CardDescription className="mt-1">
                    Fill in the contact and organizational identity for this lead.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                  Initial Stage: NEW
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Section 1: Contact Identity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>Personal & Company Information</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fname" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        placeholder="e.g. Sarah"
                        required
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lname" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        placeholder="e.g. Connor"
                        required
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="sarah@example.com"
                          required
                          className="pl-9 h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Company / Organization
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Global Inc."
                          className="pl-9 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Numbers */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Phone & Communications</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone1" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Primary Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone1"
                        name="phone1"
                        value={formData.phone1}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        required
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone2" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Secondary Phone <span className="text-muted-foreground font-normal">(Optional)</span>
                      </Label>
                      <Input
                        id="phone2"
                        name="phone2"
                        value={formData.phone2}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2835"
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Acquisition & Source */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 border-b border-border/40 pb-2">
                    <Compass className="h-4 w-4 text-primary" />
                    <span>Lead Channel & Acquisition</span>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Acquisition Channel
                    </Label>
                    <Select
                      value={formData.source}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, source: val }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOURCE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex flex-col py-0.5">
                              <span className="font-medium text-sm">{opt.label}</span>
                              <span className="text-xs text-muted-foreground">{opt.desc}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/leads")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="min-w-[130px]">
                    {loading ? "Creating Lead..." : "Create Lead"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Live Preview Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* Live Card Preview */}
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Live Preview
                </span>
                <Badge variant="secondary" className="text-xs font-medium">
                  {formData.source}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center border border-primary/20 shrink-0">
                  {initials.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg truncate">
                    {fullName || "Lead Name Preview"}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    {formData.company || "No Company Specified"}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-border/40 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate text-foreground/90">
                    {formData.email || "email@domain.com"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span className="text-foreground/90">
                    {formData.phone1 || "+1 (555) 000-0000"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Journey Preview */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Pipeline Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { stage: "NEW", desc: "Captured & awaiting outreach", active: true },
                { stage: "CONTACTED", desc: "Initial engagement established", active: false },
                { stage: "QUALIFIED", desc: "Budget & intent verified", active: false },
                { stage: "PROPOSAL / NEGOTIATION", desc: "Commercial review", active: false },
                { stage: "CONVERTED", desc: "Transformed into active customer", active: false },
              ].map((step, idx) => (
                <div key={step.stage} className="flex items-start gap-3 text-xs">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                      step.active ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/30"
                    }`}
                  />
                  <div>
                    <span className={`font-semibold ${step.active ? "text-primary" : "text-foreground/80"}`}>
                      {step.stage}
                    </span>
                    <p className="text-muted-foreground text-[11px] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Best Practice Tip */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-primary">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>Speed-to-Lead Recommendation</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Leads contacted within the first 5 minutes are 9x more likely to convert into active customers. Keep notifications enabled to respond quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
