/**
 * Compresses an uploaded image before it ever becomes a data URL.
 *
 * Root cause of the QuotaExceededError this replaces: a modern phone photo is
 * routinely 3-8MB. Base64-encoding one adds ~33% overhead, so a single
 * uncompressed upload can already exceed Safari's ~5MB localStorage-per-origin
 * cap on its own -- two uploads (photo + signature) guarantee it on most
 * browsers. Resizing to a realistic ID-photo resolution before storage fixes
 * this at the source rather than papering over it, and has a second real
 * benefit: smaller uploads over the slow/mobile connections this brief asks
 * us to design for.
 */
export function compressImage(file: File, maxDim = 640, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
