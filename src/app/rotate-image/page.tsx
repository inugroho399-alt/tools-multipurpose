import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rotate Image — Putar Gambar Online",
  description: "Putar gambar JPG, PNG, atau WebP sebesar 90°, 180°, atau 270°. Gratis, tanpa upload ke server.",
};

export default function RotateImagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="glass-card p-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg,#f43f5e,#ec4899)", boxShadow: "0 8px 24px rgba(244,63,94,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 mb-4">Segera Hadir</span>
        <h1 className="text-3xl font-bold text-white mb-3">Rotate Image</h1>
        <p className="text-slate-400 mb-8">Fitur ini sedang dalam pengembangan.</p>
        <Link href="/#image-tools" className="btn-primary">← Kembali ke Tools Gambar</Link>
      </div>
    </div>
  );
}
