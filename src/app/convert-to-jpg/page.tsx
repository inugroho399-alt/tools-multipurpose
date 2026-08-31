import type { Metadata } from "next";
import ConvertToJpgClient from "./ConvertToJpgClient";

export const metadata: Metadata = {
  title: "Convert to JPG — Konversi Gambar ke JPG Online",
  description: "Konversi PNG, WebP, GIF, BMP ke format JPG dengan kualitas yang bisa diatur. Gratis, tanpa upload ke server.",
};

export default function ConvertToJpgPage() {
  return <ConvertToJpgClient />;
}

