import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Watermark Image — Tambah Watermark ke Gambar Online",
  description: "Tambahkan teks watermark ke gambar JPG atau PNG dengan posisi, ukuran, dan transparansi yang bisa diatur.",
};

export default function WatermarkImagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="glass-card p-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg,#64748b,#475569)", boxShadow: "0 8px 24px rgba(100,116,139,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300 mb-4">Segera Hadir</span>
        <h1 className="text-3xl font-bold text-white mb-3">Watermark Image</h1>
        <p className="text-slate-400 mb-8">Fitur ini sedang dalam pengembangan.</p>
        <Link href="/#image-tools" className="btn-primary">← Kembali ke Tools Gambar</Link>
      </div>
    </div>
  );
}
