"use client";

import { useState, useCallback, useEffect } from "react";
import ImageDropzone, { type ImageFile } from "@/components/image/ImageDropzone";
import { processImage } from "@/lib/imageProcessor";

export default function ResizeImageClient() {
  const [file, setFile] = useState<ImageFile | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 });
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
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
    const addedFile = files[0];
    setFile(addedFile);
    setState("idle");
    setError(null);
    setResultBlob(null);

    const img = new Image();
    img.src = addedFile.preview;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setNewDimensions({ width: img.width, height: img.height });
    };
  }, []);

  const handleRemove = () => {
    if (file) URL.revokeObjectURL(file.preview);
    setFile(null);
    setState("idle");
    setError(null);
    setResultBlob(null);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    if (keepAspectRatio && dimensions.width > 0) {
      const ratio = dimensions.height / dimensions.width;
      setNewDimensions({ width: val, height: Math.round(val * ratio) });
    } else {
      setNewDimensions((prev) => ({ ...prev, width: val }));
    }
    setState("idle");
    setResultBlob(null);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    if (keepAspectRatio && dimensions.height > 0) {
      const ratio = dimensions.width / dimensions.height;
      setNewDimensions({ width: Math.round(val * ratio), height: val });
    } else {
      setNewDimensions((prev) => ({ ...prev, height: val }));
    }
    setState("idle");
    setResultBlob(null);
  };

  const handleResize = async () => {
    if (!file) return;
    if (newDimensions.width <= 0 || newDimensions.height <= 0) {
      setError("Dimensi harus lebih besar dari 0.");
      setState("error");
      return;
    }
    setState("processing");
    setError(null);
    setResultBlob(null);

    await new Promise<void>((r) => requestAnimationFrame(r));

    try {
      const blob = await processImage("resize", file.file, {
        newWidth: newDimensions.width,
        newHeight: newDimensions.height,
      });
      setResultBlob(blob);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memproses gambar.");
      setState("error");
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    const ext = file.name.match(/\.[^/.]+$/)?.[0] || "";
    a.download = file.name.replace(/\.[^/.]+$/, "") + "-resized" + ext;
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
          style={{ background: "linear-gradient(135deg,#0ea5e9,#06b6d4)", boxShadow: "0 8px 30px rgba(14,165,233,0.35)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 3h-6"/><path d="M21 3v6"/><path d="M3 21h6"/><path d="M3 21v-6"/><path d="M21 3 3 21"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">Resize Image</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Ubah dimensi gambar JPG, PNG, atau WebP secara lokal di browser Anda.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/8">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-slow"></span>
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
              <p className="text-xs text-slate-500">Asli: {dimensions.width} &times; {dimensions.height} px</p>
            </div>
            <button onClick={handleRemove} className="btn-secondary text-xs py-1.5 px-3">
              Ganti file
            </button>
          </div>

          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Dimensi Baru (px)</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Lebar (Width)</label>
                <input
                  type="number"
                  value={newDimensions.width || ""}
                  onChange={handleWidthChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/60"
                  disabled={state === "processing"}
                />
              </div>
              <div className="text-slate-500 mt-5">&times;</div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Tinggi (Height)</label>
                <input
                  type="number"
                  value={newDimensions.height || ""}
                  onChange={handleHeightChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-sky-500/60"
                  disabled={state === "processing"}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepAspectRatio}
                onChange={(e) => setKeepAspectRatio(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-sky-500 focus:ring-sky-500/50"
                disabled={state === "processing"}
              />
              <span className="text-sm text-slate-400">Pertahankan rasio aspek (Aspect Ratio)</span>
            </label>
          </div>

          {error && state === "error" && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {state !== "done" && (
            <div className="flex justify-center">
              <button
                onClick={handleResize}
                disabled={state === "processing" || (newDimensions.width === dimensions.width && newDimensions.height === dimensions.height)}
                className="btn-primary px-10 py-3.5 text-base"
                style={{ background: "linear-gradient(135deg,#0ea5e9,#06b6d4)", boxShadow: "0 4px 20px rgba(14,165,233,0.4)" }}
              >
                {state === "processing" ? "Sedang memproses..." : "Resize Gambar"}
              </button>
            </div>
          )}
        </section>
      )}

      {state === "done" && resultBlob && file && (
        <div className="animate-slide-up">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 mb-4 text-center">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Resize Berhasil!</h2>
            <p className="text-lg text-emerald-400 font-bold mb-1">
              {newDimensions.width} &times; {newDimensions.height} px
            </p>
            <p className="text-xs text-slate-500">
              Ukuran file: {(resultBlob.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleDownload} className="btn-success px-10 py-3.5 text-base">
              Download Gambar
            </button>
            <button onClick={handleRemove} className="btn-secondary px-6 py-3.5">
              Resize gambar lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
