"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-lg" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();

  const isPdfTool = ["/merge-pdf", "/split-pdf", "/compress-pdf"].includes(pathname);
  const isImageTool = ["/compress-image", "/resize-image", "/convert-to-jpg", "/convert-to-webp", "/rotate-image", "/watermark-image"].includes(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-white/80 dark:bg-[#0f1117]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b63f6,#6038d6)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
            PDF<span className="text-brand-600 dark:text-brand-400">Tools</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-0.5 sm:gap-1">
            <Link
              href="/#pdf-tools"
              className={`px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                isPdfTool
                  ? "bg-brand-100 text-brand-700 dark:bg-brand-600/20 dark:text-brand-300"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-900 dark:text-white dark:hover:bg-white/5"
              }`}
            >
              <span className="sm:hidden">PDF</span>
              <span className="hidden sm:inline">Tools PDF</span>
            </Link>
            <Link
              href="/#image-tools"
              className={`px-2.5 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                isImageTool
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-900 dark:text-white dark:hover:bg-white/5"
              }`}
            >
              <span className="sm:hidden">Gambar</span>
              <span className="hidden sm:inline">Tools Gambar</span>
            </Link>
          </nav>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
