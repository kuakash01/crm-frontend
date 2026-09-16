"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Mail,
  Globe,
  GitBranch,
  ExternalLink,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Terminal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactChannels() {
  const [copied, setCopied] = useState(false);
  const email = "ku.akash.04@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy email. Please select and copy manually.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Direct Contact Card */}
      <Card className="overflow-hidden border border-border/80 shadow-xl bg-card/80 backdrop-blur-md rounded-3xl">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Lead Architect & Engineer
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Akash Kumar
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for discussions</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            I designed and built this CRM to showcase modern full-stack web engineering—featuring
            PostgreSQL relational integrity, dynamic RBAC permission matrices, and live
            bidirectional WebSocket communication.
          </p>

          {/* Email Box with Click to Copy */}
          <div className="rounded-2xl border border-border/80 bg-muted/30 p-4 transition-colors hover:border-primary/40">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Direct Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="block truncate text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="shrink-0 rounded-xl border-border/80 hover:border-primary/50 text-xs font-semibold gap-1.5 h-9"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* External Social Profiles */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Verified Profiles & Source
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://akashkumar04.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card/60 p-4 transition-all hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Portfolio</p>
                    <p className="text-xs text-muted-foreground">akashkumar04.vercel.app</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href="https://github.com/kuakash01"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card/60 p-4 transition-all hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <GitBranch className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">GitHub</p>
                    <p className="text-xs text-muted-foreground">@kuakash01</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Timezone & SLA indicators */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/60">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>Response: &lt; 24 hours</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>IST (UTC+5:30) • Remote</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Topics Card */}
      <Card className="border border-border/70 bg-card/60 backdrop-blur-md rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">
            Recommended Inquiries & Discussion Topics
          </h3>
        </div>

        <div className="space-y-2.5">
          {[
            {
              title: "Architecture & Code Review",
              desc: "Deep dive into multi-tenant PostgreSQL schema design, WebSocket rooms, or indexing strategies.",
            },
            {
              title: "Enterprise Customization",
              desc: "Questions on customizing roles, permission tags, workflow rules, or self-hosted deployment.",
            },
            {
              title: "Full-Stack Collaboration & Hiring",
              desc: "Opportunities for senior frontend/full-stack engineering, contract development, or technical consulting.",
            },
            {
              title: "Feature Requests & Feedback",
              desc: "Suggestions for new CRM modules, analytics metrics, or universal search optimizations.",
            },
          ].map((topic, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/50 bg-muted/20 p-3 text-xs space-y-1 transition-colors hover:border-primary/30"
            >
              <span className="font-semibold text-foreground">{topic.title}</span>
              <p className="text-muted-foreground leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
