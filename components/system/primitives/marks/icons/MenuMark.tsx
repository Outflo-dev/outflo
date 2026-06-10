"use client";

/* ==========================================================
   OUTFLO — MENU MARK
   File: components/system/primitives/marks/icons/MenuMark.tsx
   Scope: Render reusable three-dot menu mark glyph
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: add reusable menu mark for header and menu affordances
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    width: "var(--mark-icon-size)",
    height: "var(--mark-icon-size)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flexShrink: 0,
};

const DOT_STYLE: CSSProperties = {
    width: 3.5,
    height: 3.5,
    borderRadius: 999,
    background: "currentColor",
};

/* ------------------------------
   Component
-------------------------------- */
export default function MenuMark() {
    return (
        <span aria-hidden="true" style={ROOT_STYLE}>
            <span style={DOT_STYLE} />
            <span style={DOT_STYLE} />
            <span style={DOT_STYLE} />
        </span>
    );
}