import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PDFTools — Alat PDF Online Gratis",
  description:
    "Gabung, pisah, dan kompres PDF langsung di browser. Gratis, aman, tanpa upload ke server manapun.",
};

const tools = [
  {
    id: "merge-pdf",
    href: "/merge-pdf",
    label: "Merge PDF",
    description: "Gabungkan beberapa file PDF menjadi satu dokumen dengan urutan yang bisa Anda atur.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5"/>
        <path d="M8 3H3v5"/>
        <path d="M12 22v-8.3a4 4 0 0 0-1.17-2.83L3 3"/>
        <path d="m15 9 6-6"/>
        <path d="M12 22v-8.3a4 4 0 0 1 1.17-2.83L21 3"/>
      </svg>
    ),
    gradient: "from-blue-600 to-indigo-600",
    glow: "rgba(59,99,246,0.25)",
    badge: "Populer",
    badgeColor: "bg-blue-500/20 text-blue-300",
  },
  {
    id: "split-pdf",
    href: "/split-pdf",
    label: "Split PDF",
    description: "Pisahkan halaman-halaman PDF menjadi file terpisah atau ekstrak range halaman tertentu.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5"/>
        <path d="M8 3H3v5"/>
        <path d="M12 22V12"/>
        <path d="m15 19-3 3-3-3"/>
        <path d="M21 3l-9 9"/>
        <path d="M3 3l9 9"/>
      </svg>
    ),
    gradient: "from-violet-600 to-purple-600",
    glow: "rgba(124,58,237,0.25)",
    badge: "Baru",
    badgeColor: "bg-violet-500/20 text-violet-300",
  },
  {
    id: "compress-pdf",
    href: "/compress-pdf",
    label: "Compress PDF",
    description: "Kurangi ukuran file PDF tanpa mengorbankan kualitas yang berarti. Cepat dan efisien.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
        <path d="m9.2 22 3-7 3 7"/>
        <path d="M9.2 22h5.6"/>
        <path d="M11 15h2"/>
      </svg>
    ),
    gradient: "from-emerald-600 to-teal-600",
    glow: "rgba(16,185,129,0.25)",
    badge: "Baru",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b63f6 0%, transparent 70%)" }}
        aria-hidden
      />

      <section className="relative pt-24 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <span className="section-label inline-block mb-4">Alat PDF Online</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Semua yang Anda butuhkan untuk{" "}
            <span className="gradient-text">file PDF</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Merge, split, dan kompres PDF langsung di browser — tanpa upload ke server, tanpa akun, gratis.
          </p>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-24 animate-slide-up">
        <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
          Pilih Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              id={`tool-card-${tool.id}`}
              className="glass-card group relative p-7 flex flex-col gap-5 no-underline"
            >
              {/* Badge */}
              <span className={`absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                {tool.badge}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${tool.gradient} text-white`}
                style={{ boxShadow: `0 8px 24px ${tool.glow}` }}
              >
                {tool.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {tool.label}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-brand-400 group-hover:gap-2.5 transition-all">
                Buka Tool
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative border-t border-subtle py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-xl font-bold text-white mb-10">Kenapa tidak pakai ilovepdf?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="glass-card p-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1.5">File tidak pernah meninggalkan browser</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Semua proses terjadi di perangkat Anda menggunakan WebAssembly. Tidak ada yang dikirim ke server.</p>
            </div>

            <div className="glass-card p-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1.5">Tanpa iklan, tanpa batas file</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Tidak ada limit harian, tidak perlu akun, tidak ada watermark pada hasil PDF.</p>
            </div>

            <div className="glass-card p-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1.5">Cepat karena tidak perlu upload</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Kecepatan proses hanya bergantung pada CPU perangkat Anda, bukan kecepatan internet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
