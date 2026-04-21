"use client";

/* ==========================================================
   OUTFLO — APP FRAME
   File: components/system/shell/app/AppFrame.tsx
   Scope: Shared app frame owning content width centering and horizontal safe-area gutter
   Last Updated:
   - ms: 1776803564726
   - iso: 2026-04-21T20:32:44.726Z
   - note: extract page frame ownership out of AppShell into dedicated shell boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import { APP_SHELL } from "./app-shell.constants";

/* ------------------------------
   Types
-------------------------------- */
type AppFrameProps = {
  children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const FRAME_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: APP_SHELL.maxWidth,
  margin: "0 auto",
  paddingLeft: `calc(${APP_SHELL.gutterX}px + env(safe-area-inset-left))`,
  paddingRight: `calc(${APP_SHELL.gutterX}px + env(safe-area-inset-right))`,
  boxSizing: "border-box",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AppFrame({ children }: AppFrameProps) {
  return <div style={FRAME_STYLE}>{children}</div>;
}