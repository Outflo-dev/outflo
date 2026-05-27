// app/account/profile/(pages)/environment/live-test/header/EnvironmentLiveTestBackAction.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LIVE TEST BACK ACTION
   File: app/account/profile/(pages)/environment/live-test/header/EnvironmentLiveTestBackAction.tsx
   Scope: Render Environment live test return action
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add live test return action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

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
export default function EnvironmentLiveTestBackAction() {
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
                color="var(--text-primary)"
            />
        </TextButtonLink>
    );
}