/* ==========================================================
   OUTFLO — GLASS SHELL TYPES
   File: components/system/shell/glass/glass-shell.types.ts
   Scope: Define reusable glass shell visual contract
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: introduce reusable glass shell type contract
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type GlassShellTone =
    | "default"
    | "soft"
    | "strong"
    | "chrome";

export type GlassShellShape =
    | "panel"
    | "card"
    | "control"
    | "pill";

export type GlassShellPadding =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg";

export type GlassShellProps = {
    children: ReactNode;
    tone?: GlassShellTone;
    shape?: GlassShellShape;
    padding?: GlassShellPadding;
    fullWidth?: boolean;
    className?: string;
    style?: CSSProperties;
};