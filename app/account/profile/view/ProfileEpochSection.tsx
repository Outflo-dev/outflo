"use client";

/* ==========================================================
   OUTFLO — PROFILE EPOCH SECTION
   File: app/account/profile/view/ProfileEpochSection.tsx
   Scope: Render the profile epoch ticker block
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: extract epoch ticker block from legacy profile surface into route-owned view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import EpochTicker from "@/components/system/primitives/display/EpochTicker";

/* ------------------------------
   Types
-------------------------------- */
type ProfileEpochSectionProps = {
  epochMs: number;
  sectionGap: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileEpochSection({
  epochMs,
  sectionGap,
}: ProfileEpochSectionProps) {
  return (
    <section
      style={{
        paddingTop: sectionGap * 3.5,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: "left",
      }}
    >
      <EpochTicker epochMs={epochMs} />
    </section>
  );
}