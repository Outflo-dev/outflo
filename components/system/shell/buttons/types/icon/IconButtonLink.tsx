"use client";

/* ==========================================================
   OUTFLO — ICON BUTTON LINK
   File: components/system/shell/buttons/types/icon/IconButtonLink.tsx
   Scope: Own reusable icon button link wrapper with role-based frame selection
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: align icon button link to frame size roles
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import IconButtonFrame, {
  type IconButtonFrameSize,
  type IconButtonFrameTone,
} from "@/components/system/shell/buttons/types/icon/IconButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type IconButtonLinkProps = {
  children: ReactNode;
  href: string;
  ariaLabel: string;
  size?: IconButtonFrameSize;
  tone?: IconButtonFrameTone;
  style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function IconButtonLink({
  children,
  href,
  ariaLabel,
  size = "md",
  tone = "plain",
  style,
}: IconButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
      }}
    >
      <IconButtonFrame size={size} tone={tone} style={style}>
        {children}
      </IconButtonFrame>
    </Link>
  );
}