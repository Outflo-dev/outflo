// app/app/environment/main/view/footer/EnvironmentFooter.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FOOTER
   File: app/app/environment/main/view/footer/EnvironmentFooter.tsx
   Scope: Render Environment page footer note
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment substrate footer
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentFooterProps = {
    hasSnapshot: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const FOOTER_STYLE: CSSProperties = {
    padding: "10px 0 0",
    color: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentFooter({
    hasSnapshot,
}: EnvironmentFooterProps) {
    return (
        <footer style={FOOTER_STYLE}>
            <Text as="p" type="meta">
                {hasSnapshot
                    ? "Environment records what the system was permitted to know."
                    : "No Environment truth has landed yet."}
            </Text>
        </footer>
    );
}