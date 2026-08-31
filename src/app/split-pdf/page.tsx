import type { Metadata } from "next";
import SplitPdfClient from "./SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF — Pisahkan Halaman PDF",
  description:
    "Pisahkan file PDF menjadi beberapa file terpisah berdasarkan halaman atau range yang Anda tentukan. Hasil diunduh sebagai satu file ZIP.",
  keywords: ["split pdf", "pisah pdf", "extract pdf pages", "pdf splitter"],
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
