// app/app/environment/main/view/context/primitives/EnvironmentContextMapStatusDot.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT MAP STATUS DOT
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMapStatusDot.tsx
   Scope: Render Context Map live status dot
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: isolate Context Map status dot primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const DOT_STYLE: CSSProperties = {
   position: "absolute",
   right: -9,
   top: -7,
   width: 5,
   height: 5,
   borderRadius: 999,
   background: "var(--theme-semantic-good)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMapStatusDot() {
   return <span style={DOT_STYLE} aria-hidden="true" />;
}