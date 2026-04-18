"use client";

/* ==========================================================
   OUTFLO — PROFILE ORBIT SECTION
   File: app/account/profile/view/ProfileOrbitSection.tsx
   Scope: Render the orbit message block for the profile route
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: extract orbit message from legacy profile surface into route-owned view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

/* ------------------------------
   Types
-------------------------------- */
type ProfileOrbitSectionProps = {
  sectionGap: number;
  textPrimary: string;
  textSecondary: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileOrbitSection({
  sectionGap,
  textPrimary,
  textSecondary,
}: ProfileOrbitSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap,
        padding: "0 16px",
        color: textSecondary,
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      <div style={{ marginBottom: 12 }}>
        Outflō is a lens on your flow through time. Beginning from a precise
        moment, choose a lens to explore your{" "}
        <Link
          href="/app/time"
          style={{
            color: textPrimary,
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          orbit
        </Link>
        .
      </div>
    </section>
  );
}