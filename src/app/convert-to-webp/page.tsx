import type { Metadata } from "next";
import ConvertToWebpClient from "./ConvertToWebpClient";

export const metadata: Metadata = {
  title: "Convert to WebP — Konversi Gambar ke WebP Online",
  description: "Konversi PNG, JPG, GIF, BMP ke format WebP dengan kualitas yang bisa diatur untuk ukuran file lebih kecil. Gratis, tanpa upload ke server.",
};

export default function ConvertToWebpPage() {
  return <ConvertToWebpClient />;
}
