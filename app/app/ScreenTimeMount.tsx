/* ==========================================================
   OUTFLO — SCREEN TIME MOUNT
   File: app/app/ScreenTimeMount.tsx
   Scope: Mount Outflō screen-time runtime once inside protected /app namespace
   Last Updated:
   - ms: 1775187277840
   - iso: 2026-04-03T03:34:37.840Z
   - note: add single client mount for screen-time engine in protected app namespace
   ========================================================== */

/* ------------------------------
   Directive
-------------------------------- */
"use client";

/* ------------------------------
   Imports
-------------------------------- */
import { useScreenTime } from "@/lib/attention/use-screen-time";

/* ------------------------------
   Component
-------------------------------- */
export default function ScreenTimeMount() {
  useScreenTime();
  return null;
}