import type { Metadata } from "next";

import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Akash Kumar about the CRM project, development opportunities, technical discussions, or collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}

      <section className="border-b bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Want to discuss the project?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Have a question about the CRM, its architecture, the technologies
            used, or just want to connect? Feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact */}

      <section className="py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact information */}

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Let&apos;s connect
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                I&apos;m always interested in discussing interesting projects,
                technical ideas, and development opportunities.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="space-y-6">
                <ContactItem title="Developer" value="Akash Kumar" />

                <ContactItem
                  title="Email"
                  value="ku.akash.04@gmail.com"
                  href="mailto:ku.akash.04@gmail.com"
                />

                <ContactItem
                  title="Project discussions"
                  value="CRM architecture, features, and technical implementation"
                />
              </div>
            </div>

            {/* External links */}

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm font-semibold">Find me online</p>

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="https://akashkumar04.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Portfolio
                </a>

                <a
                  href="https://github.com/kuakash01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Client form */}

          <ContactForm />
        </div>
      </section>

      {/* CTA */}

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Want to explore the CRM first?
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Create an account and explore the application yourself.
          </p>

          <div className="mt-6">
            <a
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore the CRM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({
  title,
  value,
  href,
}: {
  title: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>

      {href ? (
        <a
          href={href}
          className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      )}
    </div>
  );
}
