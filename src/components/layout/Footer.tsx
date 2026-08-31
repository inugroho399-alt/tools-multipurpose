import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b63f6,#6038d6)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-300">PDFTools</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Semua proses terjadi di browser Anda. File tidak pernah dikirim ke server manapun.
            </p>
          </div>

          {/* PDF Tools */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tools PDF</p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/merge-pdf", label: "Merge PDF" },
                { href: "/split-pdf", label: "Split PDF" },
                { href: "/compress-pdf", label: "Compress PDF" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Image Tools */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tools Gambar</p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/compress-image", label: "Compress Image" },
                { href: "/resize-image", label: "Resize Image" },
                { href: "/convert-to-jpg", label: "Convert to JPG" },
                { href: "/convert-to-webp", label: "Convert to WebP" },
                { href: "/rotate-image", label: "Rotate Image" },
                { href: "/watermark-image", label: "Watermark Image" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-subtle pt-6">
          <p className="text-xs text-slate-600 text-center">© {year} PDFTools. Dibuat untuk portofolio.</p>
        </div>
      </div>
    </footer>
  );
}
