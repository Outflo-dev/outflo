"use client";

/* ==========================================================
   OUTFLO — ICON BUTTON
   File: components/system/shell/buttons/types/icon/IconButton.tsx
   Scope: Own reusable icon button action wrapper with role-based frame selection
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: align icon button wrapper to frame size and tone roles
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import IconButtonFrame, {
  type IconButtonFrameSize,
  type IconButtonFrameTone,
} from "@/components/system/shell/buttons/types/icon/IconButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  size?: IconButtonFrameSize;
  tone?: IconButtonFrameTone;
  disabled?: boolean;
  style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function IconButton({
  children,
  onClick,
  ariaLabel,
  size = "md",
  tone = "plain",
  disabled = false,
  style,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={{
        all: "unset",
        cursor: disabled ? "default" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        opacity: disabled ? 0.72 : 1,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <IconButtonFrame size={size} tone={tone} style={style}>
        {children}
      </IconButtonFrame>
    </button>
  );
}