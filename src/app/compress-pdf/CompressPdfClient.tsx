"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import PdfDropzone, { type PdfFile } from "@/components/pdf/PdfDropzone";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function CompressPdfClient() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [state, setState] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ bytes: Uint8Array; savedBytes: number } | null>(null);

  const handleFileAdded = useCallback(async (files: PdfFile[]) => {
    if (files.length === 0) return;
    const incoming = files[0];

    setFile(null);
    setFileBuffer(null);
    setState("idle");
    setError(null);
    setResult(null);

    try {
      const buf = await incoming.file.arrayBuffer();
      // Verify it's a valid PDF before accepting
      await PDFDocument.load(buf);
      setFile(incoming);
      setFileBuffer(buf);
    } catch {
      setError("File tidak dapat dibaca — mungkin korup atau terenkripsi.");
    }
  }, []);

  const handleRemove = () => {
    setFile(null);
    setFileBuffer(null);
    setState("idle");
    setError(null);
    setResult(null);
  };

  const handleCompress = async () => {
    if (!fileBuffer) return;

    setState("processing");
    setError(null);
    setResult(null);

    try {
      const doc = await PDFDocument.load(fileBuffer);
      // useObjectStreams compresses cross-reference tables and metadata structure.
      // Effective on older/unoptimized PDFs; minimal effect on already-optimized or image-only PDFs.
      const compressed = await doc.save({ useObjectStreams: true });
      setResult({
        bytes: compressed,
        savedBytes: fileBuffer.byteLength - compressed.byteLength,
      });
      setState("done");
    } catch {
      setError("Gagal memproses file. Pastikan PDF tidak terenkripsi.");
      setState("error");
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const blob = new Blob([result.bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "") + "-compressed.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const savedPercent = result
    ? Math.round((result.savedBytes / (fileBuffer?.byteLength ?? 1)) * 100)
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg,#059669,#0d9488)", boxShadow: "0 8px 30px rgba(5,150,105,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
            <path d="m9.2 22 3-7 3 7"/><path d="M9.2 22h5.6"/><path d="M11 15h2"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Compress PDF</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Optimalkan struktur internal PDF untuk mengurangi ukuran file. Proses terjadi di browser — tidak ada upload.
        </p>
      </div>

      {/* Privacy badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
          File diproses sepenuhnya di browser Anda — tidak dikirim ke server manapun
        </div>
      </div>

      {/* Dropzone */}
      {!file && (
        <section className="mb-6">
          <PdfDropzone onFilesAdded={handleFileAdded} multiple={false} />
        </section>
      )}

      {/* Load error */}
      {error && !file && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* File loaded */}
      {file && fileBuffer && (
        <section className="mb-6 animate-fade-in">
          {/* File info */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] mb-5">
            <div className="w-9 h-9 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={handleRemove} className="btn-secondary text-xs py-1.5 px-3">
              Ganti file
            </button>
          </div>

          {/* Info note about compression scope */}
          <div className="p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/15 mb-5">
            <p className="text-xs text-amber-400/90 leading-relaxed">
              <span className="font-semibold">Catatan:</span> Kompresi bekerja dengan mengoptimalkan struktur internal PDF
              (object streams, cross-reference table). Paling efektif pada PDF berbasis teks atau PDF lama yang belum dioptimalkan.
              PDF yang sudah mengandung gambar JPEG terkompresi mungkin tidak berkurang banyak.
            </p>
          </div>

          {/* Process error */}
          {error && state === "error" && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Compress button */}
          {state !== "done" && (
            <div className="flex justify-center">
              <button
                id="compress-pdf-btn"
                onClick={handleCompress}
                disabled={state === "processing"}
                className="btn-primary px-10 py-3.5 text-base"
                style={{ background: "linear-gradient(135deg,#059669,#0d9488)", boxShadow: "0 4px 20px rgba(5,150,105,0.4)" }}
              >
                {state === "processing" ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sedang memproses...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                      <path d="m9.2 22 3-7 3 7"/><path d="M9.2 22h5.6"/><path d="M11 15h2"/>
                    </svg>
                    Kompres PDF
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Result */}
      {state === "done" && result && file && fileBuffer && (
        <div className="animate-slide-up">
          {/* Size comparison */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Perbandingan ukuran</h2>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-4 rounded-xl bg-white/[0.03] text-center">
                <p className="text-xs text-slate-500 mb-1">Sebelum</p>
                <p className="text-xl font-bold text-slate-300">{formatBytes(fileBuffer.byteLength)}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] text-center">
                <p className="text-xs text-slate-500 mb-1">Sesudah</p>
                <p className={`text-xl font-bold ${result.savedBytes > 0 ? "text-emerald-400" : "text-slate-300"}`}>
                  {formatBytes(result.bytes.byteLength)}
                </p>
              </div>
            </div>

            {/* Result interpretation */}
            {savedPercent > 0 ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-sm text-emerald-300">Ukuran berkurang</span>
                <span className="text-lg font-bold text-emerald-400">
                  -{savedPercent}% ({formatBytes(result.savedBytes)})
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-700/30 border border-white/8">
                <p className="text-sm text-slate-400 text-center">
                  PDF ini sudah teroptimalkan — tidak ada pengurangan ukuran yang signifikan.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Only show download if there's actual benefit, or always show? 
                Always show — user may still want the re-saved file. */}
            <button
              id="download-compressed-pdf"
              onClick={handleDownload}
              className="btn-success px-10 py-3.5 text-base"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </button>
            <button onClick={handleRemove} className="btn-secondary px-6 py-3.5">
              Kompres file lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
