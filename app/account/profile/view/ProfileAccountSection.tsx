"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT SECTION
   File: app/account/profile/view/ProfileAccountSection.tsx
   Scope: Render the primary account navigation list for the profile route
   Last Updated:
   - ms: 1778720709456
   - iso: 2026-05-14T01:05:09.456Z
   - note: soften profile navigation rows to mirror account row rhythm
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Link from "next/link";

import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
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
   Constants
-------------------------------- */
const NAV_STYLE: CSSProperties = {
  borderTop: `1px solid ${COLOR.border.soft}`,
};

const ROW_STYLE: CSSProperties = {
  minHeight: 76,
  padding: "0 4px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  columnGap: 18,
  textDecoration: "none",
  color: COLOR.text.primary,
  borderBottom: `1px solid ${COLOR.border.row}`,
};

const LABEL_WRAP_STYLE: CSSProperties = {
  minWidth: 0,
  display: "flex",
  alignItems: "center",
};

const CHEVRON_WRAP_STYLE: CSSProperties = {
  minWidth: 34,
  minHeight: 34,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: COLOR.text.secondary,
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
      <nav aria-label="Profile navigation" style={NAV_STYLE}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} style={ROW_STYLE}>
            <span style={LABEL_WRAP_STYLE}>
              <Text type="label">{item.label}</Text>
            </span>

            <span style={CHEVRON_WRAP_STYLE} aria-hidden="true">
              <Chevron
                direction="right"
                color="currentColor"
                strokeWidth={1.7}
              />
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}