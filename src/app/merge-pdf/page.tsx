import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF — Gabungkan File PDF Online",
  description:
    "Gabungkan beberapa file PDF menjadi satu dokumen. Gratis, cepat, tanpa upload ke server — semua proses terjadi di browser Anda.",
  keywords: ["merge pdf", "gabung pdf", "combine pdf", "pdf merger online"],
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
