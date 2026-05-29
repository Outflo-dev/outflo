// app/app/environment/main/view/sections/records/EnvironmentRecordHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD HEADER
   File: app/app/environment/main/view/sections/records/EnvironmentRecordHeader.tsx
   Scope: Own Environment records title and view-all action
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract record header ownership from record section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRecordHeader() {
    const HEADER_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 9,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const PILL_STYLE: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 8px",
        borderRadius: 999,
        color: "var(--text-secondary)",
        background: "rgba(255,255,255,0.052)",
        border: "1px solid rgba(255,255,255,0.07)",
    };

    return (
        <header style={HEADER_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Records
            </Text>

            <span style={PILL_STYLE}>
                <Text as="span" type="meta">
                    View all
                </Text>

                <Chevron direction="right" />
            </span>
        </header>
    );
}