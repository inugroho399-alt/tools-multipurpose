import type { Metadata } from "next";
import WatermarkImageClient from "./WatermarkImageClient";

export const metadata: Metadata = {
  title: "Watermark Image — Tambah Watermark ke Gambar Online",
  description: "Tambahkan teks watermark ke gambar JPG atau PNG dengan posisi, ukuran, dan transparansi yang bisa diatur.",
};

export default function WatermarkImagePage() {
  return <WatermarkImageClient />;
}

