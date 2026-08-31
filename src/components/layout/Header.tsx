"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isPdfTool = ["/merge-pdf", "/split-pdf", "/compress-pdf"].includes(pathname);
  const isImageTool = ["/compress-image", "/resize-image", "/convert-to-jpg", "/rotate-image", "/watermark-image"].includes(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-subtle" style={{ background: "rgba(15,17,23,0.85)", backdropFilter: "blur(16px)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b63f6,#6038d6)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-white group-hover:text-brand-300 transition-colors">
            PDF<span className="text-brand-400">Tools</span>
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/#pdf-tools"
            className={`px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              isPdfTool
                ? "bg-brand-600/20 text-brand-300"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="sm:hidden">PDF</span>
            <span className="hidden sm:inline">Tools PDF</span>
          </Link>
          <Link
            href="/#image-tools"
            className={`px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              isImageTool
                ? "bg-orange-600/20 text-orange-300"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="sm:hidden">Gambar</span>
            <span className="hidden sm:inline">Tools Gambar</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
