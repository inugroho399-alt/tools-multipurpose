import { PDFDocument } from "pdf-lib";

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  if (files.length < 2) {
    throw new Error("Minimal 2 file PDF dibutuhkan untuk merge.");
  }

  const mergedDoc = await PDFDocument.create();

  for (const file of files) {
    let arrayBuffer: ArrayBuffer;
    try {
      arrayBuffer = await file.arrayBuffer();
    } catch {
      throw new Error(`Gagal membaca file "${file.name}". Pastikan file tidak korup.`);
    }

    let sourcePdf: PDFDocument;
    try {
      sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
    } catch {
      throw new Error(
        `File "${file.name}" tidak dapat dibaca — mungkin korup, terenkripsi, atau bukan PDF yang valid.`
      );
    }

    const pageCount = sourcePdf.getPageCount();
    if (pageCount === 0) {
      throw new Error(`File "${file.name}" tidak memiliki halaman.`);
    }

    const copiedPages = await mergedDoc.copyPages(sourcePdf, sourcePdf.getPageIndices());
    copiedPages.forEach((page) => mergedDoc.addPage(page));
  }

  const mergedPdfBytes = await mergedDoc.save();
  return mergedPdfBytes;
}

export function downloadPdf(bytes: Uint8Array, filename: string): void {
  const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
