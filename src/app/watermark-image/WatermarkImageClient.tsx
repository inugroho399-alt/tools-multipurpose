"use client";

import { useState, useCallback, useEffect } from "react";
import ImageDropzone, { type ImageFile } from "@/components/image/ImageDropzone";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function WatermarkImageClient() {
  const [file, setFile] = useState<ImageFile | null>(null);
  const [text, setText] = useState<string>("Watermark");
  const [color, setColor] = useState<string>("#ffffff");
  const [opacity, setOpacity] = useState<number>(0.5); // 0.1 to 1.0
  const [fontSize, setFontSize] = useState<number>(48);
  const [position, setPosition] = useState<"center" | "bottom-right" | "top-left" | "bottom-left" | "top-right">("center");
  const [state, setState] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  const handleFilesAdded = useCallback((files: ImageFile[]) => {
    if (files.length === 0) return;
    setFile(files[0]);
    setState("idle");
    setError(null);
    setResultBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  }, [previewUrl]);

  const handleRemove = () => {
    if (file) URL.revokeObjectURL(file.preview);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setState("idle");
    setError(null);
    setResultBlob(null);
    setPreviewUrl(null);
  };

  const generateWatermark = () => {
    if (!file || !text) return;
    setState("processing");
    setError(null);
    setResultBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);

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

      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = color;
      
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize; // Approximation
      
      let x = 0;
      let y = 0;
      const padding = 20;

      switch (position) {
        case "center":
          x = (canvas.width - textWidth) / 2;
          y = (canvas.height + textHeight) / 2;
          break;
        case "bottom-right":
          x = canvas.width - textWidth - padding;
          y = canvas.height - padding;
          break;
        case "bottom-left":
          x = padding;
          y = canvas.height - padding;
          break;
        case "top-right":
          x = canvas.width - textWidth - padding;
          y = padding + textHeight;
          break;
        case "top-left":
          x = padding;
          y = padding + textHeight;
          break;
      }

      // Add shadow for better visibility
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillText(text, x, y);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResultBlob(blob);
            setPreviewUrl(URL.createObjectURL(blob));
            setState("done");
          } else {
            setError("Gagal menghasilkan gambar dengan watermark.");
            setState("error");
          }
        },
        file.file.type
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
    const ext = file.name.match(/\.[^/.]+$/)?.[0] || "";
    a.download = file.name.replace(/\.[^/.]+$/, "") + "-watermarked" + ext;
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
          style={{ background: "linear-gradient(135deg,#64748b,#475569)", boxShadow: "0 8px 30px rgba(100,116,139,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Watermark Image</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Tambahkan teks watermark ke gambar secara lokal di browser Anda.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse-slow"></span>
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
          <div className="flex flex-col gap-5 p-5 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <img src={file.preview} alt={file.name} className="w-12 h-12 rounded object-cover border border-white/10" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
              </div>
              <button onClick={handleRemove} className="btn-secondary text-xs py-1.5 px-3">
                Ganti file
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Teks Watermark</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-slate-500"
                  placeholder="Masukkan teks..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Posisi</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:border-slate-500 appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.2em" }}
                >
                  <option value="center">Tengah</option>
                  <option value="bottom-right">Kanan Bawah</option>
                  <option value="bottom-left">Kiri Bawah</option>
                  <option value="top-right">Kanan Atas</option>
                  <option value="top-left">Kiri Atas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Ukuran Teks: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="200"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-slate-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Transparansi: {Math.round(opacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={Math.round(opacity * 100)}
                    onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                    className="w-full accent-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Warna</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-8 p-0 border-0 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && state === "error" && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={generateWatermark}
              disabled={state === "processing" || !text.trim()}
              className="btn-primary px-10 py-3.5 text-base"
              style={{ background: "linear-gradient(135deg,#64748b,#475569)", boxShadow: "0 4px 20px rgba(100,116,139,0.4)" }}
            >
              {state === "processing" ? "Sedang memproses..." : "Terapkan Watermark"}
            </button>
          </div>
        </section>
      )}

      {state === "done" && previewUrl && (
        <div className="animate-slide-up mt-8">
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-6">
            <h3 className="text-sm font-medium text-slate-300 mb-3 text-center">Preview Hasil</h3>
            <div className="flex justify-center bg-black/30 rounded-lg p-2 overflow-hidden">
              <img src={previewUrl} alt="Watermark preview" className="max-h-[400px] object-contain rounded" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleDownload} className="btn-success px-10 py-3.5 text-base">
              Download Gambar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
