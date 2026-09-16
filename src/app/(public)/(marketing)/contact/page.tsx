import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Code2,
  HelpCircle,
  CheckCircle2,
  Terminal,
} from "lucide-react";

import ContactForm from "./ContactForm";
import ContactChannels from "./ContactChannels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PublicCtaButton } from "@/shared/components/public/PublicCtaButton";

export const metadata: Metadata = {
  title: "Contact & Developer Inquiries | Modern Multi-Tenant CRM",
  description:
    "Direct contact channel with lead engineer Akash Kumar for CRM system inquiries, full-stack architecture discussions, custom integrations, or development collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

const quickFaqs = [
  {
    q: "Can I inspect the underlying architecture or self-host this CRM?",
    a: "Yes! The CRM is architected with a decoupled Node.js/Express backend and Next.js frontend with PostgreSQL. You can inspect public repositories on Akash Kumar's GitHub profile.",
  },
  {
    q: "Are you open to full-stack engineering roles or technical consulting?",
    a: "Absolutely. I am actively open to discussing senior full-stack roles, system architecture design, and contract implementations.",
  },
  {
    q: "What is the fastest way to get a reply?",
    a: "Sending a direct email to ku.akash.04@gmail.com or submitting the direct message form on this page routes immediately to my primary inbox with an SLA under 24 hours.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-80" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 border-b border-border/40">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full border-primary/30 bg-primary/5 text-primary gap-1.5 shadow-sm"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Direct Engineering Inquiries</span>
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
            Let&apos;s Discuss Modern{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Full-Stack Architecture
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions regarding multi-tenant PostgreSQL design, real-time WebSocket
            synchronization, dynamic RBAC permission matrices, or potential engineering opportunities? Reach out directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {["PostgreSQL Scalability", "Socket.IO Real-Time", "Granular RBAC", "Developer Consulting"].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <CheckCircle2 className="h-3 w-3 text-primary" />
                <span>{pill}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
            {/* Left Column: Direct channels, engineer info, topics */}
            <ContactChannels />

            {/* Right Column: Interactive Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Quick FAQ / Inquiries Section */}
      <section className="py-16 border-t border-border/40 bg-muted/10">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1 rounded-full border-border/70 text-muted-foreground gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-primary" />
                <span>Quick Answers</span>
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Frequently Asked Questions Before Reaching Out
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {quickFaqs.map((faq, idx) => (
              <Card
                key={idx}
                className="border border-border/70 bg-card/70 backdrop-blur-md rounded-2xl p-5 sm:p-6 space-y-3 transition-colors hover:border-primary/40"
              >
                <h3 className="text-sm font-bold text-foreground leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="relative py-20 border-t bg-muted/20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Experience the Live Production CRM
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Create a live workspace instantly with zero credit card required. Test live deal pipelines,
            customer management, and universal search directly in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <PublicCtaButton
              guestText="Launch Free Workspace"
              authText="Go to Dashboard"
            />
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-xl h-11 px-6">
                <span>Architecture Blueprint</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
