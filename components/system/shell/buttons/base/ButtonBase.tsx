"use client";

/* ==========================================================
   OUTFLO — BUTTON SHELL
   File: components/system/shell/buttons/containers/ButtonShell.tsx
   Scope: Reusable visual button container with no action or domain ownership
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: extract base button container before button types
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ButtonShellProps = {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
  padding?: CSSProperties["padding"];
  borderRadius?: number | string;
  background?: string;
  color?: string;
  border?: string;
  display?: CSSProperties["display"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: number | string;
  flexShrink?: number;
  style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ButtonShell({
  children,
  width = "auto",
  height = "auto",
  minHeight,
  padding = 0,
  borderRadius = 999,
  background = "transparent",
  color = "currentColor",
  border = "none",
  display = "inline-flex",
  alignItems = "center",
  justifyContent = "center",
  gap = 0,
  flexShrink = 0,
  style,
}: ButtonShellProps) {
  return (
    <div
      style={{
        width,
        height,
        minHeight,
        padding,
        borderRadius,
        background,
        color,
        border,
        display,
        alignItems,
        justifyContent,
        gap,
        flexShrink,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}