"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface PdfDropzoneProps {
  onFilesAdded: (files: PdfFile[]) => void;
  multiple?: boolean;
}

export default function PdfDropzone({ onFilesAdded, multiple = true }: PdfDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const pdfFiles: PdfFile[] = acceptedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
      }));
      onFilesAdded(pdfFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  const hasRejected = fileRejections.length > 0;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        id="pdf-dropzone"
        className={`relative w-full rounded-2xl border-2 border-dashed p-10 sm:p-14 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
          isDragActive || isDragging
            ? "border-brand-400 bg-brand-500/10"
            : hasRejected
            ? "border-red-500/50 bg-red-500/5"
            : "border-white/10 bg-white/[0.02] hover:border-brand-500/40 hover:bg-white/[0.04]"
        }`}
      >
        <input {...getInputProps()} />

        {/* Upload icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragActive ? "scale-110" : ""
          }`}
          style={{ background: "linear-gradient(135deg, rgba(59,99,246,0.2), rgba(96,56,214,0.2))", border: "1px solid rgba(59,99,246,0.3)" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b63f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          {isDragActive ? (
            <p className="text-brand-300 font-semibold text-lg">Lepaskan file di sini...</p>
          ) : (
            <>
              <p className="text-white font-semibold text-lg">
                Seret & lepas file PDF di sini
              </p>
              <p className="text-slate-500 text-sm mt-1">
                atau{" "}
                <span className="text-brand-400 font-medium underline underline-offset-2">
                  klik untuk memilih file
                </span>
              </p>
            </>
          )}
        </div>

        {/* Constraints */}
        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Hanya file .pdf
          </span>
          {multiple && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Bisa pilih banyak file
            </span>
          )}
        </div>
      </div>

      {/* Rejection errors */}
      {hasRejected && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-red-400 font-medium">
            ⚠ Beberapa file ditolak — pastikan Anda hanya memilih file PDF (.pdf)
          </p>
        </div>
      )}
    </div>
  );
}
