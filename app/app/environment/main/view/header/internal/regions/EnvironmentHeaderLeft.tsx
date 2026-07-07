// app/app/environment/main/view/header/internal/regions/EnvironmentHeaderLeft.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER LEFT REGION
   File: app/app/environment/main/view/header/internal/regions/EnvironmentHeaderLeft.tsx
   Scope: Own left-side Environment header region
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: tune left region vertical placement without altering Orb primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentHeaderOrb from "../../primitives/EnvironmentHeaderOrb";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderLeftProps = {
   onBack: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const WRAP_STYLE: CSSProperties = {
   transform: "translateY(2px)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderLeft({
   onBack,
}: EnvironmentHeaderLeftProps) {
   return (
      <div style={WRAP_STYLE}>
         <EnvironmentHeaderOrb onPress={onBack} />
      </div>
   );
}