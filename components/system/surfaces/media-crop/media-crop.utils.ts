/* ==========================================================
   OUTFLO — MEDIA CROP UTILS
   File: components/system/surfaces/media-crop/media-crop.utils.ts
   Scope: Create cropped media blobs from selected image sources
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { Area } from "react-easy-crop";

/* ------------------------------
   Helpers
-------------------------------- */
function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);

    image.src = src;
  });
}

/* ------------------------------
   Utilities
-------------------------------- */
export async function createCroppedImageBlob(
  imageSrc: string,
  crop: Area,
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create crop canvas context.");
  }

  canvas.width = crop.width;
  canvas.height = crop.height;

  context.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not create cropped image blob."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      0.92,
    );
  });
}