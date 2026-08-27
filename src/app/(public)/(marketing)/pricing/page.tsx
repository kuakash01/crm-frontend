import type { Metadata } from "next";
import {
  Check,
  Lock,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const features = [
  "Lead management",
  "Customer management",
  "Deal and pipeline tracking",
  "Task management",
  "Dynamic users and roles",
  "Role-based permissions",
  "Real-time notifications",
  "Paginated CRM data",
];



export const metadata: Metadata = {
  title: "CRM Pricing",
  description:
    "Explore the current free CRM plan and learn about future plans for advanced team and business capabilities.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}

      <section className="border-b bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Pricing
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Free to use, for now.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Every feature currently available in the CRM is
            free to use. Paid plans may be introduced later
            with additional capabilities for growing teams.
          </p>
        </div>
      </section>

      {/* Current plan */}

      <section className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <Card className="mx-auto max-w-3xl border-primary/30 shadow-lg">
            <CardContent className="p-8 sm:p-10">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold">
                    Free
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                    Full access to the current CRM
                    experience while the product continues
                    to evolve.
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight">
                      ₹0
                    </span>

                    <span className="text-sm text-muted-foreground">
                      / forever
                    </span>
                  </div>

                  <div className="mt-7">
                    <Button size="lg" asChild>
                      <a href="/register">
                        Get started
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                  <p className="font-medium">
                    No payment required
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    No card or subscription needed.
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t pt-8">
                <h3 className="text-sm font-semibold">
                  Included with the free plan
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                      <span className="text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Future plans */}

      <section className="border-y bg-muted/20 py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Future plans
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Paid plans may come later
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The current CRM is completely free. As the
              project grows, paid plans may be introduced
              with additional features designed for larger
              teams and more advanced workflows.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FutureFeature
              title="Advanced analytics"
              description="Deeper reporting and insights for sales and team performance."
            />

            <FutureFeature
              title="Larger team capacity"
              description="Additional organization and team capabilities for growing businesses."
            />

            <FutureFeature
              title="Advanced workflows"
              description="More automation and customization for complex CRM processes."
            />
          </div>
        </div>
      </section>

      {/* Transparency */}

      <section className="py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight">
            No hidden restrictions today
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The features currently available in the CRM are
            available without a subscription. Future pricing
            will be introduced only alongside meaningful new
            capabilities.
          </p>

          <div className="mt-7">
            <Button variant="outline" asChild>
              <a href="/register">
                Explore the CRM
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FutureFeature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </div>

        <h3 className="mt-5 font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}