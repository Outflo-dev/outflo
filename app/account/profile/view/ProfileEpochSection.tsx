"use client";

/* ==========================================================
   OUTFLO — PROFILE EPOCH SECTION
   File: app/account/profile/view/ProfileEpochSection.tsx
   Scope: Render the profile epoch ticker through shared system row grammar
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: cohere profile clock with Account-derived row and mark grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import EpochTicker from "@/components/system/primitives/display/clocks/EpochTicker";
import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import TimeMark from "@/components/system/primitives/marks/icons/TimeMark";
import SystemRow from "@/components/system/surfaces/rows/SystemRow";

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
        marginTop: sectionGap,
      }}
    >
      <SystemRow
        mark={
          <MarkFrame>
            <TimeMark />
          </MarkFrame>
        }
        label="Orbit"
        value={<EpochTicker epochMs={epochMs} />}
      />
    </section>
  );
}