"use client";

/* ==========================================================
   OUTFLO — ICON BUTTON SHELL
   File: components/system/shell/buttons/containers/IconButtonShell.tsx
   Scope: Reusable circular icon button container with no action or domain ownership
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: extract icon-only button container after base button shell
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import ButtonShell from "@/components/system/shell/buttons/base/ButtonBase";

/* ------------------------------
   Types
-------------------------------- */
type IconButtonShellProps = {
  children: ReactNode;
  size?: number;
  borderRadius?: number | string;
  background?: string;
  color?: string;
  border?: string;
  flexShrink?: number;
  style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function IconButtonShell({
  children,
  size = 40,
  borderRadius = "50%",
  background = "rgba(255,255,255,0.08)",
  color = "currentColor",
  border = "none",
  flexShrink = 0,
  style,
}: IconButtonShellProps) {
  return (
    <ButtonShell
      width={size}
      height={size}
      borderRadius={borderRadius}
      background={background}
      color={color}
      border={border}
      flexShrink={flexShrink}
      style={style}
    >
      {children}
    </ButtonShell>
  );
}