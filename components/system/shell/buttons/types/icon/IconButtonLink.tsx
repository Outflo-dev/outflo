"use client";

/* ==========================================================
   OUTFLO — ICON BUTTON LINK
   File: components/system/shell/buttons/types/icon/IconButtonLink.tsx
   Scope: Link-owned icon button composed from IconButtonFrame
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: add link-owned icon button type using locked button syntax
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import IconButtonFrame from "@/components/system/shell/buttons/types/icon/IconButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type IconButtonLinkProps = {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  size?: number;
  style?: CSSProperties;
  prefetch?: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function IconButtonLink({
  href,
  children,
  ariaLabel,
  size = 40,
  style,
  prefetch,
}: IconButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      prefetch={prefetch}
      style={{
        display: "inline-flex",
        textDecoration: "none",
      }}
    >
      <IconButtonFrame size={size} style={style}>
        {children}
      </IconButtonFrame>
    </Link>
  );
}