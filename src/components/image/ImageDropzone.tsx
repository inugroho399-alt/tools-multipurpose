"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number;
  preview: string;
}

interface ImageDropzoneProps {
  onFilesAdded: (files: ImageFile[]) => void;
  multiple?: boolean;
}

export default function ImageDropzone({ onFilesAdded, multiple = true }: ImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
      }));
      onFilesAdded(newFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
    },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all
        ${
          isDragReject
            ? "border-red-500/50 bg-red-500/10"
            : isDragActive
            ? "border-brand-500 bg-brand-500/10"
            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <p className="text-base sm:text-lg font-semibold text-slate-200 mb-2">
          {isDragReject
            ? "File tidak didukung (harus berupa gambar)"
            : isDragActive
            ? "Lepaskan gambar di sini..."
            : "Pilih file gambar"}
        </p>
        <p className="text-sm text-slate-500 max-w-[250px] mx-auto leading-relaxed">
          atau seret dan lepas file ke area ini
        </p>
        <div className="mt-6">
          <span className="btn-primary text-sm px-6 py-2.5">Jelajahi File</span>
        </div>
      </div>
    </div>
  );
}
