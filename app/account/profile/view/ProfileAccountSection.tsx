"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT SECTION
   File: app/account/profile/view/ProfileAccountSection.tsx
   Scope: Render the primary account navigation list for the profile route
   Last Updated:
   - ms: 1778720709456
   - iso: 2026-05-14T01:05:09.456Z
   - note: add profile row descriptions while preserving floating account rhythm
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
  description?: string;
};

type ProfileAccountSectionProps = {
  items: readonly ProfileAccountItem[];
  sectionGap: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const NAV_STYLE: CSSProperties = {};

const ROW_STYLE: CSSProperties = {
  minHeight: 82,
  padding: "0 4px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  columnGap: 18,
  textDecoration: "none",
  color: COLOR.text.primary,
};

const ROW_DIVIDER_STYLE: CSSProperties = {
  borderBottom: `1px solid ${COLOR.border.row}`,
};

const TEXT_WRAP_STYLE: CSSProperties = {
  minWidth: 0,
  display: "grid",
  rowGap: 5,
};

const LABEL_STYLE: CSSProperties = {
  color: COLOR.text.primary,
};

const DESCRIPTION_STYLE: CSSProperties = {
  color: COLOR.text.secondary,
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
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                ...ROW_STYLE,
                ...(isLast ? null : ROW_DIVIDER_STYLE),
              }}
            >
              <span style={TEXT_WRAP_STYLE}>
                <Text type="label" style={LABEL_STYLE}>
                  {item.label}
                </Text>

                {item.description ? (
                  <Text type="meta" style={DESCRIPTION_STYLE}>
                    {item.description}
                  </Text>
                ) : null}
              </span>

              <span style={CHEVRON_WRAP_STYLE} aria-hidden="true">
                <Chevron
                  direction="right"
                  color="currentColor"
                  strokeWidth={1.7}
                />
              </span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}