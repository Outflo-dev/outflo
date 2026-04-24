"use client";

/* ==========================================================
   OUTFLO — PILL BUTTON LINK
   File: components/system/shell/buttons/types/pill/PillButtonLink.tsx
   Scope: Navigation pill built from PillButtonFrame (link owner, no action ownership)
   Last Updated:
   - ms: 1776994761956
   - iso: 2026-04-24T01:39:21.956Z
   - note: align to system-level pill variants (soft, muted, danger) and remove domain leakage
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import PillButtonFrame from "./PillButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type PillVariant = "soft" | "muted" | "danger";

type Props = {
  href: string;
  children: ReactNode;
  variant?: PillVariant;
  ariaLabel?: string;
  title?: string;
  style?: CSSProperties;
  prefetch?: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const RESET: CSSProperties = {
  textDecoration: "none",
  display: "inline-flex",
};

/* ------------------------------
   Component
-------------------------------- */
export default function PillButtonLink({
  href,
  children,
  variant = "soft",
  ariaLabel,
  title,
  style,
  prefetch,
}: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={title}
      prefetch={prefetch}
      style={RESET}
    >
      <PillButtonFrame variant={variant} style={style}>
        {children}
      </PillButtonFrame>
    </Link>
  );
}