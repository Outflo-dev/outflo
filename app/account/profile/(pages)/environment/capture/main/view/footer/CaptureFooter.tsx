"use client";

/* ==========================================================
   OUTFLO — ENGAGEMENT FOOTER
   File: app/account/profile/(pages)/environment/capture/main/view/footer/CaptureFooter.tsx
   Scope: Render Environment engagement boundary
   Last Updated:
   - iso: 2026-07-13
   - note: align footer language with Environment engagement law
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
export default function CaptureFooter() {
    return (
        <footer style={FOOTER_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                Engagement boundary
            </Text>

            <Text as="p" type="meta" style={COPY_STYLE}>
                Turning Engagement off stops future Environment records
                without changing existing history.
            </Text>
        </footer>
    );
}