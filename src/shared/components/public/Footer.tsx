import Link from "next/link";
import { ExternalLink, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_auto]">
          {/* Brand */}

          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>

              <span className="font-semibold text-foreground">
                CRM
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              A full-stack CRM project built by Akash Kumar
              to explore real-world application architecture,
              permissions, workflows, and real-time
              communication.
            </p>
          </div>

          {/* Navigation */}

          <div>
            <p className="text-sm font-semibold text-foreground">
              Explore
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>

              <Link
                href="/features"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>

              <Link
                href="/pricing"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Developer */}

          <div>
            <p className="text-sm font-semibold text-foreground">
              Developer
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href="https://akashkumar04.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                Portfolio
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://github.com/kuakash01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>

              <Link
                href="/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CRM. All rights
            reserved.
          </p>

          <p>
            Built by{" "}
            <a
              href="https://akashkumar04.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Akash Kumar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}