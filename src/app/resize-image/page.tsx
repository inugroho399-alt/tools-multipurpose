import type { Metadata } from "next";
import ResizeImageClient from "./ResizeImageClient";

export const metadata: Metadata = {
  title: "Resize Image — Ubah Ukuran Gambar Online",
  description: "Ubah dimensi gambar JPG, PNG, atau WebP sesuai ukuran piksel yang Anda tentukan. Gratis, tanpa upload ke server.",
};

export default function ResizeImagePage() {
  return <ResizeImageClient />;
}

