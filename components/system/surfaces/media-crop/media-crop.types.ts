/* ==========================================================
   OUTFLO — MEDIA CROP TYPES
   File: components/system/surfaces/media-crop/media-crop.types.ts
   Scope: Define reusable media crop surface types
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type MediaCropShape = "rect" | "round";

export type MediaCropResult = {
  blob: Blob;
  objectUrl: string;
};