# PDFTools

A client-side PDF and image processing tool built as a portfolio project. All file processing happens entirely in the browser — no uploads, no server, no accounts required.

**Live demo:** [tools-multipurpose.vercel.app](https://tools-multipurpose.vercel.app)

---

## Features

### PDF Tools
| Tool | Status | Description |
|---|---|---|
| **Merge PDF** | ✅ Live | Combine multiple PDFs into one. Drag to reorder pages before merging. |
| **Split PDF** | ✅ Live | Split by individual pages or custom page ranges. Output as ZIP. |
| **Compress PDF** | ✅ Live | Optimize PDF structure to reduce file size. Shows before/after comparison. |

### Image Tools *(coming soon)*
| Tool | Status |
|---|---|
| Compress Image | 🔧 In development |
| Resize Image | 🔧 In development |
| Convert to JPG | 🔧 In development |
| Rotate Image | 🔧 In development |
| Watermark Image | 🔧 In development |

---

## How it works

All processing runs in the browser using:
- **[pdf-lib](https://pdf-lib.js.org/)** — PDF manipulation (merge, split, structural compression)
- **[JSZip](https://stuk.github.io/jszip/)** — Bundling split results into a downloadable ZIP
- **Canvas API** — Image processing (planned for image tools)

Files are read via the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) and processed in memory. Nothing is sent to a server.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **PDF:** [pdf-lib](https://pdf-lib.js.org/) — client-side PDF processing
- **ZIP:** [JSZip](https://stuk.github.io/jszip/)
- **Drag & Drop Upload:** [react-dropzone](https://react-dropzone.js.org/)
- **Drag to Reorder:** [@dnd-kit](https://dndkit.com/)
- **Deploy:** [Vercel](https://vercel.com/)

---

## Getting Started

```bash
# Clone
git clone https://github.com/inugroho399-alt/tools-multipurpose.git
cd tools-multipurpose

# Install
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (font, header, footer, metadata)
│   ├── page.tsx                # Landing page — PDF & image tool grid
│   ├── globals.css             # Design tokens, Tailwind layers, utility classes
│   │
│   ├── merge-pdf/
│   │   ├── page.tsx            # Metadata + server shell
│   │   └── MergePdfClient.tsx  # Upload, reorder, merge, download
│   │
│   ├── split-pdf/
│   │   ├── page.tsx
│   │   └── SplitPdfClient.tsx  # Upload, page count preview, range/all modes, ZIP download
│   │
│   └── compress-pdf/
│       ├── page.tsx
│       └── CompressPdfClient.tsx  # Upload, compress, before/after size comparison
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with category nav
│   │   └── Footer.tsx          # Two-column tool links footer
│   └── pdf/
│       ├── PdfDropzone.tsx     # Reusable PDF drag-and-drop upload (react-dropzone)
│       └── SortableFileList.tsx  # Drag-to-reorder list (@dnd-kit)
│
└── lib/
    └── pdfUtils.ts             # mergePdfs(), downloadPdf() utilities
```

---

## Design Decisions

**Client-side only** — pdf-lib and Canvas API run in the browser. User files never leave the device. No backend, no storage, no accounts.

**No premature abstraction** — utilities are only extracted when used in multiple places. Components that are used once stay where they're used.

**Honest UI** — Compress PDF shows a note explaining that compression effectiveness varies by PDF type (minimal on already-optimized image PDFs), rather than overpromising results.

**Phased development** — features are completed one at a time (upload → process → download → error handling) before moving to the next.

---

## Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**

Optionally set `NEXT_PUBLIC_SITE_URL` in Vercel environment variables to your deployment URL for correct OpenGraph meta tags.

---

## Known Limitations

- **Compress PDF** — Only compresses PDF structure (cross-reference streams, metadata). Cannot recompress embedded images without a server-side tool like Ghostscript.
- **Encrypted PDFs** — Files with password protection will fail with a clear error message.
- **Very large files** — Browser memory limits apply. Performance degrades above ~100MB depending on device.
