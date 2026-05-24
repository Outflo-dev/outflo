"use client";

/* ==========================================================
   OUTFLO — MANUAL CITY FOOTER
   File: app/account/profile/(pages)/environment/location/manual-city/main/view/footer/ManualCityFooter.tsx
   Scope: Render active place boundary footer
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: align active place footer with location drilldown packet grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Constants
-------------------------------- */
const FOOTER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
    paddingTop: 4,
    paddingBottom: 8,
};

const LABEL_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
};

const COPY_STYLE: CSSProperties = {
    maxWidth: 460,
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ManualCityFooter() {
    return (
        <footer style={FOOTER_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                Active place
            </Text>

            <Text as="p" type="meta" style={COPY_STYLE}>
                Manual location gives Outflō a stable place context when
                Device is not the selected source.
            </Text>
        </footer>
    );
}