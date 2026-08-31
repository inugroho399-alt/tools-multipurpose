"use client";

import { useState, useCallback, useEffect } from "react";
import ImageDropzone, { type ImageFile } from "@/components/image/ImageDropzone";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ConvertToWebpClient() {
  const [file, setFile] = useState<ImageFile | null>(null);
  const [quality, setQuality] = useState<number>(0.85); // 0.1 to 1.0
  const [state, setState] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleFilesAdded = useCallback((files: ImageFile[]) => {
    if (files.length === 0) return;
    setFile(files[0]);
    setState("idle");
    setError(null);
    setResultBlob(null);
  }, []);

  const handleRemove = () => {
    if (file) URL.revokeObjectURL(file.preview);
    setFile(null);
    setState("idle");
    setError(null);
    setResultBlob(null);
  };

  const handleConvert = () => {
    if (!file) return;
    setState("processing");
    setError(null);
    setResultBlob(null);

    const img = new Image();
    img.src = file.preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Gagal memproses gambar pada browser ini.");
        setState("error");
        return;
      }
      // WebP supports transparency, so we don't necessarily need a white background.
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResultBlob(blob);
            setState("done");
          } else {
            setError("Gagal menghasilkan gambar WebP.");
            setState("error");
          }
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => {
      setError("Gagal membaca file gambar.");
      setState("error");
    };
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.[^/.]+$/, "") + "-converted.webp";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg,#8b5cf6,#a855f7)", boxShadow: "0 8px 30px rgba(168,85,247,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Convert to WebP</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Konversi gambar JPG, PNG, atau format lain ke WebP generasi terbaru untuk ukuran lebih kecil.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse-slow"></span>
          File diproses sepenuhnya di browser Anda — tidak dikirim ke server manapun
        </div>
      </div>

      {!file && (
        <section className="mb-6">
          <ImageDropzone onFilesAdded={handleFilesAdded} multiple={false} />
        </section>
      )}

      {file && (
        <section className="mb-6 animate-fade-in">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] mb-5">
            <img src={file.preview} alt={file.name} className="w-12 h-12 rounded object-cover border border-white/10" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
            <button onClick={handleRemove} className="btn-secondary text-xs py-1.5 px-3">
              Ganti file
            </button>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <label className="block text-sm font-medium text-slate-300 mb-4">
              Kualitas WebP: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={Math.round(quality * 100)}
              onChange={(e) => setQuality(parseInt(e.target.value) / 100)}
              className="w-full accent-purple-500"
              disabled={state === "processing"}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Lebih Kecil (Kualitas Rendah)</span>
              <span>Kualitas Tinggi (Lebih Besar)</span>
            </div>
          </div>

          {error && state === "error" && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {state !== "done" && (
            <div className="flex justify-center">
              <button
                onClick={handleConvert}
                disabled={state === "processing"}
                className="btn-primary px-10 py-3.5 text-base"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#a855f7)", boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}
              >
                {state === "processing" ? "Sedang memproses..." : "Konversi ke WebP"}
              </button>
            </div>
          )}
        </section>
      )}

      {state === "done" && resultBlob && file && (
        <div className="animate-slide-up">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 mb-4 text-center">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Konversi Berhasil!</h2>
            <p className="text-lg text-emerald-400 font-bold mb-1">
              File WebP siap diunduh
            </p>
            <p className="text-xs text-slate-500">
              Ukuran file: {(resultBlob.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleDownload} className="btn-success px-10 py-3.5 text-base">
              Download WebP
            </button>
            <button onClick={handleRemove} className="btn-secondary px-6 py-3.5">
              Konversi gambar lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
