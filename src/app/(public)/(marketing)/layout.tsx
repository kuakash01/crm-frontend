// src/app/(marketing)/layout.tsx

// import Header from "@/shared/components/Header";
// import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/public/Header";
import Footer from "@/shared/components/public/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
