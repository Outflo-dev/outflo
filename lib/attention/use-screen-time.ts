/* ==========================================================
   OUTFLO — USE SCREEN TIME HOOK
   File: lib/attention/use-screen-time.ts
   Scope: Mount and manage ScreenTimeEngine lifecycle on client
   Last Updated:
   - ms: 1775187058905
   - iso: 2026-04-03T03:30:58.905Z
   - note: wire screen-time engine into client runtime (single owner)
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect } from "react";

import { createScreenTimeEngine } from "@/lib/attention/screen-time-engine";

/* ------------------------------
   Hook
-------------------------------- */
export function useScreenTime(): void {
  useEffect(() => {
    const engine = createScreenTimeEngine();

    engine.start();

    return () => {
      void engine.destroy();
    };
  }, []);
}