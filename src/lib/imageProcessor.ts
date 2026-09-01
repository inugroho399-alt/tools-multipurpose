// Singleton worker dispatcher for all image processing operations.
// Uses OffscreenCanvas in a Web Worker to avoid blocking the main thread.
// Falls back to main-thread canvas for browsers without OffscreenCanvas (Safari < 16.4).

let _worker: Worker | null = null;
let _idCounter = 0;
const _pending = new Map<
  number,
  { resolve: (buf: ArrayBuffer) => void; reject: (err: Error) => void }
>();

function getWorker(): Worker {
  if (!_worker) {
    _worker = new Worker(
      new URL("../workers/imageWorker.ts", import.meta.url),
      { type: "module" }
    );
    _worker.addEventListener("message", (e: MessageEvent) => {
      const { id, success, result, error } = e.data as {
        id: number;
        success: boolean;
        result?: ArrayBuffer;
        error?: string;
      };
      const p = _pending.get(id);
      if (!p) return;
      _pending.delete(id);
      if (success && result) p.resolve(result);
      else p.reject(new Error(error ?? "Worker error"));
    });
    _worker.addEventListener("error", () => {
      // Reset on fatal error so next call recreates the worker
      _worker = null;
    });
  }
  return _worker;
}

export interface ImageProcessParams {
  quality?: number;
  newWidth?: number;
  newHeight?: number;
  targetType?: string;
  fillWhite?: boolean;
  degrees?: number;
  text?: string;
  position?: string;
  fontSize?: number;
  color?: string;
  opacity?: number;
}

export type ImageOp = "compress" | "resize" | "convert" | "rotate" | "watermark";

/**
 * Process an image file off the main thread (Web Worker) when possible.
 * Automatically falls back to main-thread canvas for older browsers.
 */
export async function processImage(
  op: ImageOp,
  file: File,
  params: ImageProcessParams
): Promise<Blob> {
  const outputType = params.targetType ?? file.type;

  // Worker path: Chrome 69+, Firefox 105+, Safari 16.4+
  if (typeof OffscreenCanvas !== "undefined") {
    try {
      const buffer = await file.arrayBuffer();
      const worker = getWorker();
      const id = ++_idCounter;

      const resultBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        _pending.set(id, { resolve, reject });
        // Transfer the buffer (zero-copy) to the worker
        worker.postMessage(
          { id, op, buffer, params: { ...params, mimeType: file.type } },
          [buffer]
        );
      });

      return new Blob([resultBuffer], { type: outputType });
    } catch {
      // Worker unavailable — fall through to main-thread canvas
    }
  }

  return mainThreadFallback(op, file, params);
}

// Main-thread fallback using standard HTMLCanvasElement
function mainThreadFallback(op: ImageOp, file: File, params: ImageProcessParams): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const blobUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(blobUrl);

      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (op === "resize") { w = params.newWidth!; h = params.newHeight!; }
      if (op === "rotate" && (params.degrees === 90 || params.degrees === 270)) { w = img.naturalHeight; h = img.naturalWidth; }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;

      if (params.fillWhite) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h); }

      if (op === "rotate") {
        ctx.translate(w / 2, h / 2);
        ctx.rotate((params.degrees! * Math.PI) / 180);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      } else if (op === "resize") {
        ctx.drawImage(img, 0, 0, w, h);
      } else if (op === "watermark") {
        ctx.drawImage(img, 0, 0);
        const { text, position, fontSize, color, opacity } = params;
        ctx.globalAlpha = opacity!;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = color!;
        const textW = ctx.measureText(text!).width;
        const pad = 20;
        let x = 0;
        let y = 0;
        switch (position) {
          case "center":       x = (w - textW) / 2;    y = (h + fontSize!) / 2; break;
          case "bottom-right": x = w - textW - pad;     y = h - pad;             break;
          case "bottom-left":  x = pad;                 y = h - pad;             break;
          case "top-right":    x = w - textW - pad;     y = pad + fontSize!;     break;
          case "top-left":     x = pad;                 y = pad + fontSize!;     break;
        }
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(text!, x, y);
      } else {
        ctx.drawImage(img, 0, 0);
      }

      const outputType = op === "convert" ? params.targetType! : file.type;
      canvas.toBlob(
        (blob) => { if (blob) resolve(blob); else reject(new Error("Canvas.toBlob failed")); },
        outputType,
        params.quality
      );
    };

    img.onerror = () => { URL.revokeObjectURL(blobUrl); reject(new Error("Failed to load image")); };
    img.src = blobUrl;
  });
}
