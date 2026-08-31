import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Split PDF — Pisahkan Halaman PDF",
  description: "Pisahkan file PDF menjadi beberapa file terpisah berdasarkan range halaman yang Anda tentukan.",
};

export default function SplitPdfPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="glass-card p-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
            <path d="M12 22V12"/><path d="m15 19-3 3-3-3"/>
            <path d="M21 3l-9 9"/><path d="M3 3l9 9"/>
          </svg>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 mb-4">Segera Hadir</span>
        <h1 className="text-3xl font-bold text-white mb-3">Split PDF</h1>
        <p className="text-slate-400 mb-8">Fitur ini sedang dalam pengembangan. Kembali sebentar lagi!</p>
        <Link href="/" className="btn-primary">← Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
