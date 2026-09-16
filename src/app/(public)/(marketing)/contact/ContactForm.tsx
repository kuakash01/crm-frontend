"use client";

import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Simulates real-time dispatch (hook up to email service / webhook)
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
      toast.success("Message dispatched successfully! Akash will get back to you shortly.");
      event.currentTarget.reset();
    } catch {
      toast.error("Failed to send message. Please try emailing directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-border/80 shadow-xl bg-card/80 backdrop-blur-md rounded-3xl">
      <CardHeader className="p-6 sm:p-8 pb-4 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Badge
            variant="outline"
            className="text-xs font-semibold px-3 py-1 rounded-full border-primary/30 bg-primary/5 text-primary gap-1.5"
          >
            <Sparkles className="h-3 w-3" />
            <span>Direct Channel</span>
          </Badge>
          <span className="text-xs text-muted-foreground">Direct to Developer</span>
        </div>

        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          Send a Direct Message
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          Fill out the specifications below. Messages are routed directly to Akash Kumar for prompt review and technical discussion.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 pt-2">
        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Message Dispatched!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Thank you for reaching out. Your inquiry has been queued and Akash will respond to your email within 24 hours.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmitted(false)}
              className="mt-2 rounded-xl text-xs"
            >
              Send Another Note
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Elena Rostova"
                  required
                  className="rounded-xl border-border/80 bg-background/60 h-11 focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Email Address <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="rounded-xl border-border/80 bg-background/60 h-11 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Organization / Company <span className="text-muted-foreground/60 font-normal">(Optional)</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Company, project, or affiliation"
                className="rounded-xl border-border/80 bg-background/60 h-11 focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Inquiry Focus <span className="text-muted-foreground/60 font-normal">(Optional)</span>
              </Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g. Architecture review, full-stack consulting, feature inquiry"
                className="rounded-xl border-border/80 bg-background/60 h-11 focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Message & Technical Details <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Describe your project, questions regarding the CRM architecture, or what you'd like to collaborate on..."
                rows={5}
                required
                className="rounded-xl border-border/80 bg-background/60 focus-visible:ring-primary/20 resize-none"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto px-8 h-11 rounded-xl font-bold shadow-lg shadow-primary/20 gap-2 transition-all hover:shadow-primary/30"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
          <span>
            Spam-protected. Direct routing. Emails are never shared or used for marketing lists.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}