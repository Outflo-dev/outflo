"use client";

/* ==========================================================
   OUTFLO — MEDIA CROPPER
   File: components/system/surfaces/media-crop/MediaCropper.tsx
   Scope: Own reusable image crop interaction and cropped blob output
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import MediaCropFrame from "./MediaCropFrame";
import { createCroppedImageBlob } from "./media-crop.utils";
import type { MediaCropResult, MediaCropShape } from "./media-crop.types";

/* ------------------------------
   Types
-------------------------------- */
type MediaCropperProps = {
  title: string;
  sourceUrl: string;
  shape?: MediaCropShape;
  onCancel: () => void;
  onSave: (result: MediaCropResult) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_CROP: Point = {
  x: 0,
  y: 0,
};

const DEFAULT_ZOOM = 1;

/* ------------------------------
   Component
-------------------------------- */
export default function MediaCropper({
  title,
  sourceUrl,
  shape = "round",
  onCancel,
  onSave,
}: MediaCropperProps) {
  const [crop, setCrop] = useState<Point>(DEFAULT_CROP);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  function handleCropComplete(_: Area, nextCroppedAreaPixels: Area) {
    setCroppedAreaPixels(nextCroppedAreaPixels);
  }

  async function handleSave() {
    if (!croppedAreaPixels) {
      return;
    }

    const blob = await createCroppedImageBlob(sourceUrl, croppedAreaPixels);
    const objectUrl = URL.createObjectURL(blob);

    onSave({
      blob,
      objectUrl,
    });
  }

  return (
    <MediaCropFrame title={title} onCancel={onCancel} onSave={handleSave}>
      <Cropper
        image={sourceUrl}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape={shape === "round" ? "round" : "rect"}
        showGrid={false}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
      />
    </MediaCropFrame>
  );
}