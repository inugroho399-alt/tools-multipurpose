import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress PDF — Kompres Ukuran File PDF",
  description: "Kurangi ukuran file PDF tanpa kehilangan kualitas berarti. Gratis dan tanpa upload ke server.",
};

export default function CompressPdfPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="glass-card p-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: "0 8px 24px rgba(16,185,129,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
            <path d="m9.2 22 3-7 3 7"/><path d="M9.2 22h5.6"/><path d="M11 15h2"/>
          </svg>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 mb-4">Segera Hadir</span>
        <h1 className="text-3xl font-bold text-white mb-3">Compress PDF</h1>
        <p className="text-slate-400 mb-8">Fitur ini sedang dalam pengembangan. Kembali sebentar lagi!</p>
        <Link href="/" className="btn-primary">← Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
