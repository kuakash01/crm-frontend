"use client";

import { useState } from "react";
import { Send } from "lucide-react";
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

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Connect this to a real contact/email API later.
      await new Promise((resolve) =>
        setTimeout(resolve, 700),
      );

      toast.success(
        "Message received. Thanks for reaching out!",
      );

      event.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Send a message
        </CardTitle>

        <CardDescription>
          Tell me what you&apos;d like to discuss.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name
              </Label>

              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              Company
            </Label>

            <Input
              id="company"
              name="company"
              placeholder="Company or organization"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message
            </Label>

            <Textarea
              id="message"
              name="message"
              placeholder="What would you like to discuss?"
              rows={7}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={loading}
          >
            <Send className="mr-2 h-4 w-4" />

            {loading
              ? "Sending..."
              : "Send message"}
          </Button>
        </form>

        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          The contact form is currently a project demo and
          can be connected to an email or contact API later.
        </p>
      </CardContent>
    </Card>
  );
}