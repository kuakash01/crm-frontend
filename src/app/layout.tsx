import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ReduxProvider from "@/store/provider";


import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-crm-domain.com"),

  title: {
    default: "CRM - Customer Relationship Management Platform",
    template: "%s | CRM",
  },

  description:
    "A modern CRM platform for managing leads, customers, deals, tasks, users, roles, permissions, and real-time team activity.",

  keywords: [
    "CRM",
    "customer relationship management",
    "sales CRM",
    "lead management",
    "customer management",
    "deal management",
    "task management",
    "team collaboration",
  ],

  authors: [
    {
      name: "Akash Kumar",
      url: "https://akashkumar04.vercel.app/",
    },
  ],

  creator: "Akash Kumar",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "CRM",
    title:
      "CRM - Customer Relationship Management Platform",
    description:
      "Manage leads, customers, deals, tasks, users, permissions, and real-time team activity in one workspace.",
    url: "https://your-crm-domain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          duration={3000}
        />
      </body>
    </html>
  );
}
