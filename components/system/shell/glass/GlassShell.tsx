"use client";

/* ==========================================================
   OUTFLO — GLASS SHELL
   File: components/system/shell/glass/GlassShell.tsx
   Scope: Own reusable glass surface skin with no action, motion, or domain ownership
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: introduce reusable glass shell for floating controls and panels
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type {
    GlassShellPadding,
    GlassShellProps,
    GlassShellShape,
    GlassShellTone,
} from "./glass-shell.types";

/* ------------------------------
   Constants
-------------------------------- */
const TONE_STYLES: Record<GlassShellTone, CSSProperties> = {
    default: {
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(18,22,30,0.46)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        backdropFilter: "blur(18px) saturate(1.18)",
        WebkitBackdropFilter: "blur(18px) saturate(1.18)",
    },
    soft: {
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(18,22,30,0.32)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        backdropFilter: "blur(14px) saturate(1.12)",
        WebkitBackdropFilter: "blur(14px) saturate(1.12)",
    },
    strong: {
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(18,22,30,0.62)",
        boxShadow: "0 14px 38px rgba(0,0,0,0.24)",
        backdropFilter: "blur(22px) saturate(1.24)",
        WebkitBackdropFilter: "blur(22px) saturate(1.24)",
    },
    chrome: {
        border: "1px solid rgba(255,255,255,0.20)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(18,22,30,0.42))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 34px rgba(0,0,0,0.20)",
        backdropFilter: "blur(20px) saturate(1.22)",
        WebkitBackdropFilter: "blur(20px) saturate(1.22)",
    },
};

const SHAPE_STYLES: Record<GlassShellShape, CSSProperties> = {
    panel: {
        borderRadius: 28,
    },
    card: {
        borderRadius: 24,
    },
    control: {
        borderRadius: 18,
    },
    pill: {
        borderRadius: 999,
    },
};

const PADDING_STYLES: Record<GlassShellPadding, CSSProperties["padding"]> = {
    none: 0,
    xs: "6px 8px",
    sm: "10px 12px",
    md: "14px 16px",
    lg: "18px 20px",
};

/* ------------------------------
   Helpers
-------------------------------- */
function cx(...values: Array<string | undefined>) {
    return values.filter(Boolean).join(" ");
}

/* ------------------------------
   Component
-------------------------------- */
export default function GlassShell({
    children,
    tone = "default",
    shape = "card",
    padding = "md",
    fullWidth = false,
    className,
    style,
}: GlassShellProps) {
    const shellStyle: CSSProperties = {
        ...TONE_STYLES[tone],
        ...SHAPE_STYLES[shape],
        padding: PADDING_STYLES[padding],
        width: fullWidth ? "100%" : undefined,
        boxSizing: "border-box",
        isolation: "isolate",
        ...style,
    };

    return (
        <div className={cx("outflo-glass-shell", className)} style={shellStyle}>
            {children}
        </div>
    );
}