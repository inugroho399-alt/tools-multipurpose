// Worker scope — runs off the main thread via OffscreenCanvas.
// Handles all 5 image operations: compress, resize, convert, rotate, watermark.

type WorkerParams = {
  mimeType: string;
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
};

type WorkerIn = {
  id: number;
  op: string;
  buffer: ArrayBuffer;
  params: WorkerParams;
};

globalThis.addEventListener("message", async (e: MessageEvent<WorkerIn>) => {
  const { id, op, buffer, params } = e.data;

  try {
    const srcBlob = new Blob([buffer], { type: params.mimeType });
    const bitmap = await createImageBitmap(srcBlob);

    let canvasW = bitmap.width;
    let canvasH = bitmap.height;

    if (op === "resize") {
      canvasW = params.newWidth!;
      canvasH = params.newHeight!;
    } else if (op === "rotate" && (params.degrees === 90 || params.degrees === 270)) {
      canvasW = bitmap.height;
      canvasH = bitmap.width;
    }

    const canvas = new OffscreenCanvas(canvasW, canvasH);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

    if (params.fillWhite) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasW, canvasH);
    }

    switch (op) {
      case "compress":
      case "convert":
        ctx.drawImage(bitmap, 0, 0);
        break;

      case "resize":
        ctx.drawImage(bitmap, 0, 0, canvasW, canvasH);
        break;

      case "rotate":
        ctx.translate(canvasW / 2, canvasH / 2);
        ctx.rotate((params.degrees! * Math.PI) / 180);
        ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
        break;

      case "watermark": {
        ctx.drawImage(bitmap, 0, 0);
        const { text, position, fontSize, color, opacity } = params;
        ctx.globalAlpha = opacity!;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = color!;
        const textW = ctx.measureText(text!).width;
        const pad = 20;
        let x = 0;
        let y = 0;
        switch (position) {
          case "center":      x = (canvasW - textW) / 2;       y = (canvasH + fontSize!) / 2; break;
          case "bottom-right": x = canvasW - textW - pad;        y = canvasH - pad;             break;
          case "bottom-left":  x = pad;                          y = canvasH - pad;             break;
          case "top-right":   x = canvasW - textW - pad;        y = pad + fontSize!;           break;
          case "top-left":    x = pad;                          y = pad + fontSize!;            break;
        }
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(text!, x, y);
        break;
      }
    }

    bitmap.close();

    const outType = op === "convert" ? params.targetType! : params.mimeType;
    const resultBlob = await canvas.convertToBlob({ type: outType, quality: params.quality ?? 0.92 });
    const resultBuffer = await resultBlob.arrayBuffer();

    (globalThis as unknown as Worker).postMessage(
      { id, success: true, result: resultBuffer },
      [resultBuffer]
    );
  } catch (err) {
    (globalThis as unknown as Worker).postMessage({ id, success: false, error: String(err) });
  }
});
