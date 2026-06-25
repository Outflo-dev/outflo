// app/app/environment/main/view/header/internal/regions/EnvironmentHeaderLeft.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER LEFT REGION
   File: app/app/environment/main/view/header/internal/regions/EnvironmentHeaderLeft.tsx
   Scope: Own left-side Environment header region
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import EnvironmentHeaderOrb from "../../primitives/EnvironmentHeaderOrb";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderLeftProps = {
    onBack: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderLeft({
    onBack,
}: EnvironmentHeaderLeftProps) {
    return <EnvironmentHeaderOrb onPress={onBack} />;
}