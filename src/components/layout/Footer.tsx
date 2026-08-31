import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b63f6,#6038d6)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-300">PDFTools</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link href="/merge-pdf" className="hover:text-slate-300 transition-colors">Merge PDF</Link>
            <Link href="/split-pdf" className="hover:text-slate-300 transition-colors">Split PDF</Link>
            <Link href="/compress-pdf" className="hover:text-slate-300 transition-colors">Compress PDF</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600">
            © {year} PDFTools. Semua proses terjadi di browser Anda.
          </p>
        </div>
      </div>
    </footer>
  );
}
