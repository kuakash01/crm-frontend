// src/app/(auth)/register/page.tsx

import Image from "next/image";
import RegisterOrganizationForm from "@/features/auth/components/RegisterOrganisationForm";

export default function RegisterPage() {
  return (
    <main className="h-screen overflow-hidden bg-background">
      <div className="grid h-full lg:grid-cols-2">

        {/* Left Side */}
        <section className="relative hidden lg:flex flex-col justify-center bg-slate-950 px-16">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          <div className="relative z-10 max-w-2xl mx-auto">

            {/* Logo */}
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <span className="text-lg font-bold text-slate-900">
                  C
                </span>
              </div>

              <span className="text-xl font-semibold text-white">
                CRM Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl font-bold  leading-[1.05] text-white">
              Manage Your Entire{" "}
              <span className="text-blue-500">
                Sales Pipeline
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Track leads, manage customers, assign tasks,
              and grow your business from a single platform.
            </p>

            {/* Feature Icons */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                Lead Management
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                Team Collaboration
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                Customer Tracking
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                Analytics
              </div>
            </div>

            {/* Dashboard Preview */}
            {/* <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
              <Image
                src="/images/crm.jpg"
                alt="CRM Dashboard"
                width={1400}
                height={900}
                className="w-full object-cover"
                priority
              />
            </div> */}
          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <RegisterOrganizationForm />
          </div>
        </section>
      </div>
    </main>
  );
}