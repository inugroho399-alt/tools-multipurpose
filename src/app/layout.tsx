import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tools-multipurpose.vercel.app"
  ),
  title: {
    default: "PDFTools — Alat PDF Online Gratis",
    template: "%s | PDFTools",
  },
  description:
    "Gabung, pisah, kompres PDF dan banyak lagi — langsung di browser Anda. Gratis, cepat, tanpa upload ke server.",
  keywords: ["pdf", "merge pdf", "split pdf", "compress pdf", "pdf tools", "online pdf"],
  authors: [{ name: "PDFTools" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PDFTools",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-page flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
