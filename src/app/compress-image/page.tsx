import type { Metadata } from "next";
import CompressImageClient from "./CompressImageClient";

export const metadata: Metadata = {
  title: "Compress Image — Kompres JPG & PNG Online",
  description: "Kompres gambar JPG, PNG, dan WebP untuk mengurangi ukuran file tanpa kehilangan kualitas visual yang berarti.",
};

export default function CompressImagePage() {
  return <CompressImageClient />;
}

