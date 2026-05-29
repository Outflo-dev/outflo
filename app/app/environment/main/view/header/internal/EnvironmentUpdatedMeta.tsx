// app/app/environment/main/view/header/internal/EnvironmentUpdatedMeta.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT UPDATED META
   File: app/app/environment/main/view/header/internal/EnvironmentUpdatedMeta.tsx
   Scope: Own Environment header updated-status text
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract Environment updated meta ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentUpdatedMetaProps = {
    refreshing: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentUpdatedMeta({
    refreshing,
}: EnvironmentUpdatedMetaProps) {
    const META_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.64)",
        textAlign: "right",
        whiteSpace: "nowrap",
    };

    return (
        <Text as="p" type="meta" style={META_STYLE}>
            {refreshing ? "Pulling current context" : "Updated 4m ago"}
        </Text>
    );
}