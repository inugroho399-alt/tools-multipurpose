import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PDFTools — Alat PDF & Gambar Online Gratis",
  description:
    "Merge, split, kompres PDF, resize, rotate, dan konversi gambar — langsung di browser. Gratis, tanpa upload ke server.",
};

const pdfTools = [
  {
    id: "merge-pdf",
    href: "/merge-pdf",
    label: "Merge PDF",
    description: "Gabungkan beberapa file PDF menjadi satu dokumen dengan urutan yang bisa Anda atur.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
        <path d="M12 22v-8.3a4 4 0 0 0-1.17-2.83L3 3"/>
        <path d="m15 9 6-6"/>
        <path d="M12 22v-8.3a4 4 0 0 1 1.17-2.83L21 3"/>
      </svg>
    ),
    gradient: "from-blue-600 to-indigo-600",
    glow: "rgba(59,99,246,0.25)",
    badge: "Populer",
    badgeColor: "bg-blue-500/20 text-blue-300",
    live: true,
  },
  {
    id: "split-pdf",
    href: "/split-pdf",
    label: "Split PDF",
    description: "Pisahkan halaman-halaman PDF menjadi file terpisah atau ekstrak range halaman tertentu.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
        <path d="M12 22V12"/><path d="m15 19-3 3-3-3"/>
        <path d="M21 3l-9 9"/><path d="M3 3l9 9"/>
      </svg>
    ),
    gradient: "from-violet-600 to-purple-600",
    glow: "rgba(124,58,237,0.25)",
    badge: "Live",
    badgeColor: "bg-violet-500/20 text-violet-300",
    live: true,
  },
  {
    id: "compress-pdf",
    href: "/compress-pdf",
    label: "Compress PDF",
    description: "Optimalkan struktur internal PDF untuk mengurangi ukuran file tanpa re-upload.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
        <path d="m9.2 22 3-7 3 7"/><path d="M9.2 22h5.6"/><path d="M11 15h2"/>
      </svg>
    ),
    gradient: "from-emerald-600 to-teal-600",
    glow: "rgba(16,185,129,0.25)",
    badge: "Live",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
    live: true,
  },
];

const imageTools = [
  {
    id: "compress-image",
    href: "/compress-image",
    label: "Compress Image",
    description: "Kompres JPG dan PNG untuk mengurangi ukuran file sambil mempertahankan kualitas visual.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/>
      </svg>
    ),
    gradient: "from-orange-500 to-amber-500",
    glow: "rgba(249,115,22,0.25)",
    badge: "Baru",
    badgeColor: "bg-orange-500/20 text-orange-300",
    live: true,
  },
  {
    id: "resize-image",
    href: "/resize-image",
    label: "Resize Image",
    description: "Ubah dimensi gambar JPG, PNG, atau WebP sesuai ukuran yang Anda tentukan.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 3h-6"/><path d="M21 3v6"/><path d="M3 21h6"/><path d="M3 21v-6"/>
        <path d="M21 3 3 21"/>
      </svg>
    ),
    gradient: "from-sky-500 to-cyan-500",
    glow: "rgba(14,165,233,0.25)",
    badge: "Baru",
    badgeColor: "bg-sky-500/20 text-sky-300",
    live: true,
  },
  {
    id: "convert-to-jpg",
    href: "/convert-to-jpg",
    label: "Convert to JPG",
    description: "Konversi PNG, WebP, GIF, atau format lain menjadi JPG dengan kualitas yang bisa diatur.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12"/><path d="m8 11 4 4 4-4"/>
        <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/>
      </svg>
    ),
    gradient: "from-yellow-500 to-orange-500",
    glow: "rgba(234,179,8,0.25)",
    badge: "Baru",
    badgeColor: "bg-yellow-500/20 text-yellow-300",
    live: true,
  },
  {
    id: "rotate-image",
    href: "/rotate-image",
    label: "Rotate Image",
    description: "Putar gambar 90°, 180°, atau 270° dan unduh hasilnya secara instan.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    ),
    gradient: "from-rose-500 to-pink-500",
    glow: "rgba(244,63,94,0.25)",
    badge: "Baru",
    badgeColor: "bg-rose-500/20 text-rose-300",
    live: true,
  },
  {
    id: "watermark-image",
    href: "/watermark-image",
    label: "Watermark Image",
    description: "Tambahkan teks watermark ke gambar dengan posisi, ukuran, dan transparansi yang bisa diatur.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    gradient: "from-slate-500 to-zinc-500",
    glow: "rgba(100,116,139,0.25)",
    badge: "Baru",
    badgeColor: "bg-slate-500/20 text-slate-300",
    live: true,
  },
  {
    id: "convert-to-webp",
    href: "/convert-to-webp",
    label: "Convert to WebP",
    description: "Konversi gambar JPG, PNG, atau format lain ke format WebP untuk ukuran file yang lebih kecil.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/>
      </svg>
    ),
    gradient: "from-purple-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.25)",
    badge: "Baru",
    badgeColor: "bg-purple-500/20 text-purple-300",
    live: true,
  },
];

function ToolCard({ tool }: { tool: typeof pdfTools[0] | typeof imageTools[0] }) {
  return (
    <Link
      href={tool.href}
      id={`tool-card-${tool.id}`}
      className="glass-card group relative p-7 flex flex-col gap-5 no-underline"
    >
      <span className={`absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
        {tool.badge}
      </span>

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${tool.gradient} text-white`}
        style={{ boxShadow: `0 8px 24px ${tool.glow}` }}
      >
        {tool.icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
          {tool.label}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-brand-400 group-hover:gap-2.5 transition-all">
        {tool.live ? "Buka Tool" : "Segera hadir"}
        {tool.live && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        )}
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b63f6 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <span className="section-label inline-block mb-4">Alat PDF & Gambar Online</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Proses file{" "}
            <span className="gradient-text">PDF & gambar</span>
            {" "}di browser
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Merge, split, kompres PDF, resize, convert gambar — langsung di perangkat Anda. Tanpa upload ke server, tanpa akun, gratis.
          </p>
        </div>
      </section>

      {/* PDF Tools */}
      <section id="pdf-tools" className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-16 animate-slide-up">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b63f6,#6038d6)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h2 className="text-base font-bold text-white">Tools PDF</h2>
          </div>
          <div className="flex-1 h-px bg-white/8"></div>
          <span className="text-xs text-slate-500">{pdfTools.length} tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pdfTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
        </div>
      </section>

      {/* Image Tools */}
      <section id="image-tools" className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f97316,#eab308)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
            </div>
            <h2 className="text-base font-bold text-white">Tools Gambar</h2>
          </div>
          <div className="flex-1 h-px bg-white/8"></div>
          <span className="text-xs text-slate-500">{imageTools.length} tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {imageTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
        </div>
      </section>

      {/* Why section */}
      <section className="relative border-t border-subtle py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-xl font-bold text-white mb-10">Kenapa tidak pakai ilovepdf atau iloveimg?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="glass-card p-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1.5">File tidak pernah meninggalkan browser</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Semua proses terjadi di perangkat Anda. Tidak ada yang dikirim ke server.</p>
            </div>

            <div className="glass-card p-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1.5">Tanpa iklan, tanpa batas file</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Tidak ada limit harian, tidak perlu akun, tidak ada watermark pada hasil.</p>
            </div>

            <div className="glass-card p-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1.5">Cepat karena tidak perlu upload</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Kecepatan proses hanya bergantung pada CPU perangkat Anda, bukan koneksi internet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
