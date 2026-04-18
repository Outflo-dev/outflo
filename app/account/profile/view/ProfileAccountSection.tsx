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
  textPrimary: string;
  textTertiary: string;
  borderSoft: string;
  borderRow: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAccountSection({
  items,
  sectionGap,
  textPrimary,
  textTertiary,
  borderSoft,
  borderRow,
}: ProfileAccountSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap,
        paddingLeft: 8,
        paddingRight: 8,
        boxSizing: "border-box",
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
              color: textPrimary,
              borderTop: `1px solid ${borderSoft}`,
              borderBottom: `1px solid ${borderRow}`,
            }}
          >
            <span style={{ fontSize: 14 }}>{item.label}</span>
            <span style={{ fontSize: 12, color: textTertiary }}>›</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}