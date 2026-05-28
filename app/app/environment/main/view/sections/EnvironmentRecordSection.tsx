// app/app/environment/main/view/sections/EnvironmentRecordSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD SECTION
   File: app/app/environment/main/view/sections/EnvironmentRecordSection.tsx
   Scope: Render Environment latest record proof summary
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment record summary section
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
   Component
-------------------------------- */
export default function EnvironmentRecordSection({
    model,
}: EnvironmentRecordSectionProps) {
    const SECTION_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 12,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const CARD_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
        padding: 18,
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.09)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
        boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
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
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Records
            </Text>

            <article style={CARD_STYLE}>
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