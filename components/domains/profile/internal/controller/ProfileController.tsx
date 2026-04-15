"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLLER
   File: components/domains/profile/internal/controller/ProfileController.tsx
   Scope: Own local profile UI orchestration (sheet state + event wiring)
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: extract controller from surface; enforce ownership boundaries
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import ProfileSurface from "@/components/domains/profile/surfaces/ProfileSurface";
import CardSheet from "@/components/system/surfaces/card/CardSheet";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileController({
  children,
  show,
  direction,
}: {
  children: ReactNode;
  show: boolean;
  direction: "up" | "down";
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setSheetOpen(true);
    }

    window.addEventListener("outflo:profile-sheet-open", handleOpen);

    return () => {
      window.removeEventListener("outflo:profile-sheet-open", handleOpen);
    };
  }, []);

  return (
    <>
      <ProfileSurface show={show} direction={direction}>
        {children}
      </ProfileSurface>

      <CardSheet show={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div style={{ padding: 20 }}>
          <h3 style={{ margin: 0, marginBottom: 12 }}>Card Sheet</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            This is the first live system sheet on profile.
          </p>
        </div>
      </CardSheet>
    </>
  );
}