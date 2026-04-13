"use client";

/* ==========================================================
   OUTFLŌ — PROFILE SURFACE
   File: components/domains/profile/surfaces/ProfileSurface.tsx
   Scope: Mount profile UI into shell layer root as a true overlay surface (fixed + scroll owner)
   Last Updated:
   - ms: 1775672111393
   - iso: 2026-04-08T18:15:11.393Z
   - note: fix scroll ownership — surface owns fixed + overflow, motion is visual only
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Motion from "@/components/system/primitives/motion/Motion";
import CardSheet from "@/components/system/surfaces/card/CardSheet";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSurface({
  children,
  show,
  direction,
}: {
  children: ReactNode;
  show: boolean;
  direction: "up" | "down";
}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setRoot(document.getElementById("surface-layer-root"));
  }, []);

  useEffect(() => {
    function handleOpen() {
      setSheetOpen(true);
    }

    window.addEventListener("outflo:profile-sheet-open", handleOpen);

    return () => {
      window.removeEventListener("outflo:profile-sheet-open", handleOpen);
    };
  }, []);

  if (!root) return null;

  return createPortal(
    <Motion show={show} direction={direction}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          pointerEvents: "auto",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          background: "black",
        }}
      >
        <div
          style={{
            minHeight: "100%",
          }}
        >
          {children}
        </div>

        <CardSheet show={sheetOpen} onClose={() => setSheetOpen(false)}>
          <div style={{ padding: 20 }}>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Card Sheet</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              This is the first live system sheet on profile.
            </p>
          </div>
        </CardSheet>
      </div>
    </Motion>,
    root
  );
}