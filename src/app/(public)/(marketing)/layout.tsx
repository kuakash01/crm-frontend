// src/app/(marketing)/layout.tsx

import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}