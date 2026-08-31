import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resize Image — Ubah Ukuran Gambar Online",
  description: "Ubah dimensi gambar JPG, PNG, atau WebP sesuai ukuran piksel yang Anda tentukan. Gratis, tanpa upload ke server.",
};

export default function ResizeImagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="glass-card p-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg,#0ea5e9,#06b6d4)", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 3h-6"/><path d="M21 3v6"/><path d="M3 21h6"/><path d="M3 21v-6"/><path d="M21 3 3 21"/>
          </svg>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 mb-4">Segera Hadir</span>
        <h1 className="text-3xl font-bold text-white mb-3">Resize Image</h1>
        <p className="text-slate-400 mb-8">Fitur ini sedang dalam pengembangan.</p>
        <Link href="/#image-tools" className="btn-primary">← Kembali ke Tools Gambar</Link>
      </div>
    </div>
  );
}
