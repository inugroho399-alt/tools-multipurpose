import type { Metadata } from "next";
import RotateImageClient from "./RotateImageClient";

export const metadata: Metadata = {
  title: "Rotate Image — Putar Gambar Online",
  description: "Putar gambar JPG, PNG, atau WebP sebesar 90°, 180°, atau 270°. Gratis, tanpa upload ke server.",
};

export default function RotateImagePage() {
  return <RotateImageClient />;
}

