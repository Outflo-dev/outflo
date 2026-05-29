// app/app/environment/main/view/sections/records/EnvironmentRecordCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD CARD
   File: app/app/environment/main/view/sections/records/EnvironmentRecordCard.tsx
   Scope: Own Environment latest snapshot proof card
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract record card ownership from record section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import type { EnvironmentRecordModel } from "../../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRecordCardProps = {
    model: EnvironmentRecordModel;
};

/* ------------------------------
   Icons
-------------------------------- */
function RecordIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 3.8h7.2L18 7.6V20a.8.8 0 0 1-.8.8H7A.8.8 0 0 1 6.2 20V4.6A.8.8 0 0 1 7 3.8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M14.2 3.8v4h3.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9 12h6M9 15h6M9 18h3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRecordCard({
    model,
}: EnvironmentRecordCardProps) {
    const CARD_STYLE: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 9,
        padding: 9,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.075)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.026))",
        boxShadow: "0 10px 24px rgba(0,0,0,0.13)",
    };

    const ICON_STYLE: CSSProperties = {
        width: 34,
        height: 34,
        display: "grid",
        placeItems: "center",
        borderRadius: 12,
        color: "rgba(255,255,255,0.74)",
        background: "rgba(255,255,255,0.07)",
        boxShadow: "0 0 22px rgba(255,255,255,0.06)",
    };

    const COPY_STYLE: CSSProperties = {
        minWidth: 0,
        display: "grid",
        rowGap: 1,
    };

    const SUBTITLE_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const SECONDARY_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    return (
        <article style={CARD_STYLE}>
            <div style={ICON_STYLE}>
                <RecordIcon />
            </div>

            <div style={COPY_STYLE}>
                <Text as="h3" type="label">
                    {model.title}
                </Text>

                <Text as="p" type="meta" style={SUBTITLE_STYLE}>
                    {model.subtitle}
                </Text>

                <Text as="p" type="meta" style={SECONDARY_STYLE}>
                    {model.primary}
                </Text>
            </div>

            <Chevron direction="right" />
        </article>
    );
}