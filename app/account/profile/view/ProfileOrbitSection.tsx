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
import Text from "@/components/system/primitives/display/type/Text";
import { COLOR } from "@/components/system/primitives/color/color.config";

/* ------------------------------
   Types
-------------------------------- */
type ProfileOrbitSectionProps = {
  sectionGap: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileOrbitSection({
  sectionGap,
}: ProfileOrbitSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap,
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <Text type="meta" style={{ color: COLOR.text.secondary }}>
          Outflō is a lens on your flow through time. Beginning from a precise
          moment, choose a lens to explore your{" "}
          <Link
            href="/app/time"
            style={{
              color: COLOR.text.primary,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            orbit
          </Link>
          .
        </Text>
      </div>
    </section>
  );
}