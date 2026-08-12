import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css"; // Since layout is used in app router we can just import globals in layout

export const metadata: Metadata = {
  title: "ArtsDiva - Fine Art Gallery & Marketplace",
  description: "Curated fine art acquisition and annual leasing. Explore our masterpieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
