import type { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF — Kurangi Ukuran File PDF",
  description:
    "Kompres file PDF untuk mengurangi ukurannya. Proses terjadi langsung di browser — file Anda tidak dikirim ke server.",
  keywords: ["compress pdf", "kompres pdf", "kecilkan pdf", "pdf compressor"],
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
