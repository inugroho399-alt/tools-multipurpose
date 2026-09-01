"use client";

import { useState, useCallback } from "react";
import PdfDropzone, { type PdfFile } from "@/components/pdf/PdfDropzone";

// Parses "1-3, 5, 7-9" → [[0,2], [4,4], [6,8]] (0-indexed).
// Throws with a user-readable message on invalid input.
function parsePageRanges(input: string, maxPage: number): Array<[number, number]> {
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) throw new Error("Masukkan setidaknya satu range halaman.");

  return parts.map((part) => {
    const match = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!match) {
      throw new Error(`Format tidak valid: "${part}". Gunakan format seperti: 1-3, 5, 7-9`);
    }
    const from = parseInt(match[1]);
    const to = match[2] ? parseInt(match[2]) : from;
    if (from < 1 || to > maxPage) {
      throw new Error(`Halaman ${from}–${to} di luar rentang (dokumen punya ${maxPage} halaman)`);
    }
    if (from > to) {
      throw new Error(`Range "${part}" tidak valid — angka awal harus ≤ angka akhir`);
    }
    return [from - 1, to - 1];
  });
}

export default function SplitPdfClient() {
  const [file, setFile] = useState<PdfFile | null>(null);
  // Cached ArrayBuffer to avoid reading the File object twice (once for count, once for split)
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<"all" | "range">("all");
  const [rangeInput, setRangeInput] = useState("");
  const [state, setState] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ fileCount: number; bytes: Uint8Array } | null>(null);

  const handleFileAdded = useCallback(async (files: PdfFile[]) => {
    if (files.length === 0) return;
    const incoming = files[0];

    setFile(null);
    setFileBuffer(null);
    setPageCount(null);
    setState("idle");
    setError(null);
    setResult(null);

    try {
      const buf = await incoming.file.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(buf);
      setFile(incoming);
      setFileBuffer(buf);
      setPageCount(doc.getPageCount());
    } catch {
      setError("File tidak dapat dibaca — mungkin korup atau terenkripsi.");
    }
  }, []);

  const handleRemove = () => {
    setFile(null);
    setFileBuffer(null);
    setPageCount(null);
    setState("idle");
    setError(null);
    setResult(null);
    setRangeInput("");
  };

  const handleSplit = async () => {
    if (!fileBuffer || !pageCount) return;

    setState("processing");
    setError(null);
    setResult(null);

    // Yield one frame so React renders the spinner before the heavy work starts
    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    try {
      const { PDFDocument } = await import("pdf-lib");
      const { default: JSZip } = await import("jszip");
      const sourceDoc = await PDFDocument.load(fileBuffer);
      const zip = new JSZip();

      if (mode === "all") {
        const padLen = String(pageCount).length;
        for (let i = 0; i < pageCount; i++) {
          const outDoc = await PDFDocument.create();
          const [page] = await outDoc.copyPages(sourceDoc, [i]);
          outDoc.addPage(page);
          const bytes = await outDoc.save();
          const num = String(i + 1).padStart(padLen, "0");
          zip.file(`page-${num}.pdf`, bytes);
        }
      } else {
        const ranges = parsePageRanges(rangeInput, pageCount);
        for (const [from, to] of ranges) {
          const outDoc = await PDFDocument.create();
          const indices = Array.from({ length: to - from + 1 }, (_, k) => from + k);
          const pages = await outDoc.copyPages(sourceDoc, indices);
          pages.forEach((p) => outDoc.addPage(p));
          const bytes = await outDoc.save();
          zip.file(`pages-${from + 1}-${to + 1}.pdf`, bytes);
        }
      }

      const zipBytes = await zip.generateAsync({ type: "uint8array" });
      setResult({ fileCount: Object.keys(zip.files).length, bytes: zipBytes });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat memproses file.");
      setState("error");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.bytes as Uint8Array<ArrayBuffer>], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(/\.pdf$/i, "") ?? "split"}-split.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const canProcess =
    file !== null &&
    state !== "processing" &&
    (mode === "all" || rangeInput.trim().length > 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)", boxShadow: "0 8px 30px rgba(124,58,237,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
            <path d="M12 22V12"/><path d="m15 19-3 3-3-3"/>
            <path d="M21 3l-9 9"/><path d="M3 3l9 9"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Split PDF</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Pisahkan halaman PDF menjadi file-file terpisah. Hasil diunduh sebagai satu file ZIP.
        </p>
      </div>

      {/* Privacy badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
          File diproses sepenuhnya di browser Anda — tidak dikirim ke server manapun
        </div>
      </div>

      {/* Dropzone — only shown when no file loaded */}
      {!file && (
        <section className="mb-6">
          <PdfDropzone onFilesAdded={handleFileAdded} multiple={false} />
        </section>
      )}

      {/* Error from initial file load */}
      {error && state === "idle" && !file && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Loaded file info + options */}
      {file && pageCount !== null && (
        <section className="mb-6 animate-fade-in">
          {/* File info card */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] mb-5">
            <div className="w-9 h-9 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB &middot;{" "}
                <span className="text-violet-400 font-medium">{pageCount} halaman</span>
              </p>
            </div>
            <button onClick={handleRemove} className="btn-secondary text-xs py-1.5 px-3">
              Ganti file
            </button>
          </div>

          {/* Mode selector */}
          <div className="flex rounded-xl overflow-hidden border border-white/10 mb-4" role="group" aria-label="Mode split">
            <button
              id="mode-all"
              onClick={() => setMode("all")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                mode === "all"
                  ? "bg-violet-600/30 text-violet-200 border-r border-white/10"
                  : "bg-white/[0.02] text-slate-400 hover:text-slate-200 border-r border-white/10"
              }`}
            >
              Semua halaman
            </button>
            <button
              id="mode-range"
              onClick={() => setMode("range")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                mode === "range"
                  ? "bg-violet-600/30 text-violet-200"
                  : "bg-white/[0.02] text-slate-400 hover:text-slate-200"
              }`}
            >
              Pilih range
            </button>
          </div>

          {mode === "all" && (
            <p className="text-sm text-slate-400 mb-4">
              Setiap halaman akan menjadi file PDF terpisah —{" "}
              <span className="text-slate-900 dark:text-white">{pageCount} file PDF</span> dikemas dalam 1 ZIP.
            </p>
          )}

          {mode === "range" && (
            <div className="mb-4">
              <label htmlFor="range-input" className="block text-sm font-medium text-slate-300 mb-2">
                Range halaman
              </label>
              <input
                id="range-input"
                type="text"
                value={rangeInput}
                onChange={(e) => {
                  setRangeInput(e.target.value);
                  if (state === "error") { setState("idle"); setError(null); }
                }}
                placeholder="Contoh: 1-3, 5, 7-9"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 transition-colors"
                aria-describedby="range-hint"
              />
              <p id="range-hint" className="mt-1.5 text-xs text-slate-500">
                Setiap range menghasilkan satu file PDF. Range: 1–{pageCount}.
              </p>
            </div>
          )}

          {/* Error from processing */}
          {error && (state === "error" || state === "idle") && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Process button */}
          {state !== "done" && (
            <div className="flex justify-center">
              <button
                id="split-pdf-btn"
                onClick={handleSplit}
                disabled={!canProcess}
                className="btn-primary px-10 py-3.5 text-base"
                style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
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
                      <path d="M12 22V12"/><path d="m15 19-3 3-3-3"/>
                      <path d="M21 3l-9 9"/><path d="M3 3l9 9"/>
                    </svg>
                    Pisahkan PDF
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Success / Download */}
      {state === "done" && result && (
        <div className="animate-slide-up">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-emerald-300 font-semibold text-lg">PDF berhasil dipisahkan!</p>
            <p className="text-slate-400 text-sm mt-1">
              <span className="text-slate-900 dark:text-white font-medium">{result.fileCount} file PDF</span>
              {" "}dikemas dalam 1 file ZIP (
              {(result.bytes.byteLength / (1024 * 1024)).toFixed(2)} MB)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="download-split-zip"
              onClick={handleDownload}
              className="btn-success px-10 py-3.5 text-base"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download ZIP
            </button>
            <button onClick={handleRemove} className="btn-secondary px-6 py-3.5">
              Split file lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
