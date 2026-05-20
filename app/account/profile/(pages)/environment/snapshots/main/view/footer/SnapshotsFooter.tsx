"use client";

/* ==========================================================
   OUTFLO — SNAPSHOTS FOOTER
   File: app/account/profile/(pages)/environment/snapshots/main/view/footer/SnapshotsFooter.tsx
   Scope: Render environment snapshots records footer
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add snapshots records footer
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
export default function SnapshotsFooter() {
    return (
        <footer style={FOOTER_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                Record boundary
            </Text>

            <Text as="p" type="meta" style={COPY_STYLE}>
                Turning signals off stops future capture. Past snapshots remain
                records unless a later delete action is explicitly added.
            </Text>
        </footer>
    );
}