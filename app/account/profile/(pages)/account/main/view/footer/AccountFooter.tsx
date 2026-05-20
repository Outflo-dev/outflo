"use client";

/* ==========================================================
   OUTFLO — ACCOUNT FOOTER
   File: app/account/profile/(pages)/account/main/view/footer/AccountFooter.tsx
   Scope: Render account surface footer
   Last Updated:
   - ms: 1779281968087
   - iso: 2026-05-20T12:59:28.087Z
   - note: add view-owned account footer
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
export default function AccountFooter() {
    return (
        <footer style={FOOTER_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                Account boundary
            </Text>

            <Text as="p" type="meta" style={COPY_STYLE}>
                Account owns identity and access setup. Other systems may display
                identity, but they do not own account records.
            </Text>
        </footer>
    );
}