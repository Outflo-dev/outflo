"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT SECTION
   File: app/account/profile/view/ProfileAccountSection.tsx
   Scope: Render the primary account navigation list for the profile route
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: extract profile account navigation list from legacy surface into route-owned view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import Chevron from "@/components/system/primitives/navigation/Chevron";
import Text from "@/components/system/primitives/display/type/Text";
import { COLOR } from "@/components/system/primitives/color/color.config";

/* ------------------------------
   Types
-------------------------------- */
type ProfileAccountItem = {
  label: string;
  href: string;
};

type ProfileAccountSectionProps = {
  items: readonly ProfileAccountItem[];
  sectionGap: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAccountSection({
  items,
  sectionGap,
}: ProfileAccountSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap,
      }}
    >
      <nav aria-label="Profile navigation">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              minHeight: 56,
              padding: "0 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              color: COLOR.text.primary,
              borderTop: `1px solid ${COLOR.border.soft}`,
              borderBottom: `1px solid ${COLOR.border.row}`,
            }}
          >
            <Text type="label">{item.label}</Text>
            <Chevron direction="right" />
          </Link>
        ))}
      </nav>
    </section>
  );
}