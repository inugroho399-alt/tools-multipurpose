import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convert to JPG — Konversi Gambar ke JPG Online",
  description: "Konversi PNG, WebP, GIF, BMP ke format JPG dengan kualitas yang bisa diatur. Gratis, tanpa upload ke server.",
};

export default function ConvertToJpgPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="glass-card p-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg,#eab308,#f97316)", boxShadow: "0 8px 24px rgba(234,179,8,0.3)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12"/><path d="m8 11 4 4 4-4"/>
            <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/>
          </svg>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 mb-4">Segera Hadir</span>
        <h1 className="text-3xl font-bold text-white mb-3">Convert to JPG</h1>
        <p className="text-slate-400 mb-8">Fitur ini sedang dalam pengembangan.</p>
        <Link href="/#image-tools" className="btn-primary">← Kembali ke Tools Gambar</Link>
      </div>
    </div>
  );
}
