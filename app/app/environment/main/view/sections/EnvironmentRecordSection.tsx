// app/app/environment/main/view/sections/EnvironmentRecordSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD SECTION
   File: app/app/environment/main/view/sections/EnvironmentRecordSection.tsx
   Scope: Render Environment latest record proof summary
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add icon-led Environment record summary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import type { EnvironmentRecordModel } from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRecordSectionProps = {
    model: EnvironmentRecordModel;
};

/* ------------------------------
   Icons
-------------------------------- */
function RecordIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
export default function EnvironmentRecordSection({
    model,
}: EnvironmentRecordSectionProps) {
    const SECTION_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 12,
    };

    const HEADER_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const PILL_STYLE: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 10px",
        borderRadius: 999,
        color: "var(--text-secondary)",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
    };

    const CARD_STYLE: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 14,
        padding: 16,
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.09)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
        boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
    };

    const ICON_STYLE: CSSProperties = {
        width: 52,
        height: 52,
        display: "grid",
        placeItems: "center",
        borderRadius: 18,
        color: "rgba(255,255,255,0.74)",
        background: "rgba(255,255,255,0.08)",
        boxShadow: "0 0 34px rgba(255,255,255,0.08)",
    };

    const COPY_STYLE: CSSProperties = {
        minWidth: 0,
        display: "grid",
        rowGap: 5,
    };

    const SUBTITLE_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
    };

    const SECONDARY_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        overflowWrap: "anywhere",
    };

    return (
        <section style={SECTION_STYLE}>
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

                    <Text as="p" type="meta" style={SECONDARY_STYLE}>
                        {model.secondary}
                    </Text>
                </div>

                <Chevron direction="right" />
            </article>
        </section>
    );
}