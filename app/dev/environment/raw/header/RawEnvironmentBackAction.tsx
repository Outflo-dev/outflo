// app/dev/environment/raw/header/RawEnvironmentBackAction.tsx
"use client";

/* ==========================================================
   OUTFLO — RAW ENVIRONMENT BACK ACTION
   File: app/dev/environment/raw/header/RawEnvironmentBackAction.tsx
   Scope: Render raw Environment return action
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add raw Environment dev return action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Link from "next/link";

import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import TextButtonLink from "@/components/system/shell/buttons/types/text/TextButtonLink";

/* ------------------------------
   Constants
-------------------------------- */
const ACTION_STYLE: CSSProperties = {
    width: 44,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

/* ------------------------------
   Component
-------------------------------- */
export default function RawEnvironmentBackAction() {
    return (
        <TextButtonLink
            href="/app/systems"
            ariaLabel="Return to environment"
            title="Return to environment"
            style={ACTION_STYLE}
        >
            <Chevron
                direction="left"
                size="var(--chevron-size-md)"
                color="#f2f2f2"
            />
        </TextButtonLink>
    );
}