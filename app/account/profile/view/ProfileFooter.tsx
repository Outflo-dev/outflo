"use client";

/* ==========================================================
   OUTFLO — PROFILE FOOTER
   File: app/account/profile/view/ProfileFooter.tsx
   Scope: Render quiet profile surface footer signature
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: add quiet versioned footer signature for profile surface
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
   rowGap: 6,
   paddingTop: 34,
   paddingBottom: 4,
};

const BRAND_ROW_STYLE: CSSProperties = {
   display: "flex",
   alignItems: "baseline",
   gap: 8,
};

const BRAND_STYLE: CSSProperties = {
   color: "var(--text-secondary)",
};

const VERSION_STYLE: CSSProperties = {
   color: "var(--text-tertiary)",
};

const META_STYLE: CSSProperties = {
   color: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileFooter() {
   return (
      <footer style={FOOTER_STYLE}>
         <div style={BRAND_ROW_STYLE}>
            <Text as="p" type="label" style={BRAND_STYLE}>
               Outflō
            </Text>

            <Text as="p" type="meta" style={VERSION_STYLE}>
               v0.1
            </Text>
         </div>

         <Text as="p" type="meta" style={META_STYLE}>
            tuned.
         </Text>
      </footer>
   );
}