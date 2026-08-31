"use client";

import { useState, useCallback } from "react";
import PdfDropzone, { type PdfFile } from "@/components/pdf/PdfDropzone";
import SortableFileList from "@/components/pdf/SortableFileList";
import { mergePdfs, downloadPdf } from "@/lib/pdfUtils";

type ProcessingState = "idle" | "processing" | "done" | "error";

export default function MergePdfClient() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [state, setState] = useState<ProcessingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);

  const handleFilesAdded = useCallback((newFiles: PdfFile[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => `${f.name}-${f.size}`));
      const unique = newFiles.filter((f) => !existing.has(`${f.name}-${f.size}`));
      return [...prev, ...unique];
    });
    setState("idle");
    setError(null);
    setResultBytes(null);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setState("idle");
    setError(null);
    setResultBytes(null);
  }, []);

  const handleReorder = useCallback((reordered: PdfFile[]) => {
    setFiles(reordered);
  }, []);

  const handleClearAll = () => {
    setFiles([]);
    setState("idle");
    setError(null);
    setResultBytes(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Minimal 2 file PDF dibutuhkan untuk merge.");
      return;
    }

    setState("processing");
    setError(null);
    setResultBytes(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const merged = await mergePdfs(rawFiles);
      setResultBytes(merged);
      setResultSize(merged.byteLength);
      setState("done");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.";
      setError(message);
      setState("error");
    }
  };

  const handleDownload = () => {
    if (!resultBytes) return;
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadPdf(resultBytes, `merged-${timestamp}.pdf`);
  };

  const totalInputSize = files.reduce((acc, f) => acc + f.size, 0);
  const canMerge = files.length >= 2 && state !== "processing";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg,#3b63f6,#6038d6)", boxShadow: "0 8px 30px rgba(59,99,246,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
            <path d="M12 22v-8.3a4 4 0 0 0-1.17-2.83L3 3"/>
            <path d="m15 9 6-6"/>
            <path d="M12 22v-8.3a4 4 0 0 1 1.17-2.83L21 3"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Merge PDF</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Gabungkan beberapa file PDF menjadi satu. Atur urutannya dengan drag & drop.
        </p>
      </div>

      {/* ── Privacy badge ── */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
          File diproses sepenuhnya di browser Anda — tidak dikirim ke server manapun
        </div>
      </div>

      {/* ── Dropzone ── */}
      <section className="mb-6">
        <PdfDropzone onFilesAdded={handleFilesAdded} multiple />
      </section>

      {/* ── File list ── */}
      {files.length > 0 && (
        <section className="mb-6 animate-fade-in">
          {/* List header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-300">
                File yang akan digabungkan
                <span className="ml-2 px-2 py-0.5 rounded-full bg-brand-600/20 text-brand-300 text-xs">
                  {files.length} file
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Seret baris untuk mengubah urutan halaman
              </p>
            </div>
            <button
              onClick={handleClearAll}
              className="btn-secondary text-xs py-1.5 px-3"
              id="clear-all-files"
            >
              Hapus Semua
            </button>
          </div>

          {/* Sortable list */}
          <SortableFileList
            files={files}
            onReorder={handleReorder}
            onRemove={handleRemove}
          />

          {/* Total size */}
          <p className="mt-3 text-right text-xs text-slate-500">
            Total input: {(totalInputSize / (1024 * 1024)).toFixed(2)} MB
          </p>
        </section>
      )}

      {/* ── Validation warning ── */}
      {files.length === 1 && (
        <div className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-xs text-yellow-400">
            ⚠ Minimal 2 file PDF dibutuhkan untuk merge. Tambahkan lebih banyak file.
          </p>
        </div>
      )}

      {/* ── Error display ── */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
          <div className="flex items-start gap-3">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="text-sm font-medium text-red-400">Gagal memproses</p>
              <p className="text-xs text-red-400/70 mt-0.5">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Merge button ── */}
      {files.length >= 2 && state !== "done" && (
        <div className="flex justify-center">
          <button
            id="merge-pdf-btn"
            onClick={handleMerge}
            disabled={!canMerge}
            className="btn-primary px-10 py-3.5 text-base"
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
                  <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
                  <path d="M12 22v-8.3a4 4 0 0 0-1.17-2.83L3 3"/>
                  <path d="m15 9 6-6"/>
                  <path d="M12 22v-8.3a4 4 0 0 1 1.17-2.83L21 3"/>
                </svg>
                Gabungkan {files.length} PDF
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Success / Download ── */}
      {state === "done" && resultBytes && (
        <div className="animate-slide-up">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-emerald-300 font-semibold text-lg">PDF berhasil digabungkan!</p>
            <p className="text-slate-400 text-sm mt-1">
              Ukuran hasil:{" "}
              <span className="text-slate-900 dark:text-white font-medium">
                {(resultSize / (1024 * 1024)).toFixed(2)} MB
              </span>
              {" "}dari {files.length} file
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="download-merged-pdf"
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
            <button
              onClick={() => { setState("idle"); setResultBytes(null); }}
              className="btn-secondary px-6 py-3.5"
            >
              Merge Lagi
            </button>
          </div>
        </div>
      )}

      {/* ── How-to steps ── */}
      {files.length === 0 && (
        <section className="mt-14 animate-fade-in">
          <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Cara menggunakan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Upload PDF", desc: "Pilih atau seret beberapa file PDF ke area upload di atas." },
              { step: "2", title: "Atur Urutan", desc: "Drag & drop baris file untuk mengubah urutan halaman hasil merge." },
              { step: "3", title: "Download", desc: "Klik tombol Gabungkan, lalu download PDF hasil gabungan." },
            ].map((s) => (
              <div key={s.step} className="glass-card p-5 text-center">
                <div className="w-8 h-8 rounded-full bg-brand-600/25 text-brand-300 text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
