// app/app/environment/main/view/context/primitives/EnvironmentContextLimb.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT LIMB
   File: app/app/environment/main/view/context/primitives/EnvironmentContextLimb.tsx
   Scope: Render Context Planet atmospheric rim
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: bind limb to shared Context Planet coordinate frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const LIMB_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 4,
    pointerEvents: "none",
    borderRadius: 999,
    boxShadow: `
        inset -18px 10px 26px var(--environment-context-map-limb-soft),
        inset -2px 0 0 var(--environment-context-map-limb)
    `,
    opacity: "var(--environment-context-map-limb-opacity)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextLimb() {
    return <div style={LIMB_STYLE} />;
}