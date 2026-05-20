"use client";

/* ==========================================================
   OUTFLO — LOCATION FOOTER
   File: app/account/profile/(pages)/environment/location/main/view/footer/LocationFooter.tsx
   Scope: Render location controls permission footer
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add location control boundary footer
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
export default function LocationFooter() {
    return (
        <footer style={FOOTER_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                Place controls
            </Text>

            <Text as="p" type="meta" style={COPY_STYLE}>
                Location belongs to Environment. Other systems may consume place
                context, but they do not own it.
            </Text>
        </footer>
    );
}