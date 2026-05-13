"use client";

/* ==========================================================
   OUTFLO — ACCOUNT PHONE VIEW
   File: app/account/profile/(pages)/account/phone/view/AccountPhoneView.tsx
   Scope: Render account phone future-system explainer surface
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add account phone coming-soon drilldown surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import AccountPhoneHeader from "../header/AccountPhoneHeader";

/* ------------------------------
   Types
-------------------------------- */
type AccountPhoneViewProps = {
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 34,
};

const CARD_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 12,
    border: "1px solid var(--border-soft)",
    borderRadius: 24,
    background: "var(--surface-muted)",
    padding: 18,
};

const EYEBROW_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
};

const BODY_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const LIST_STYLE: CSSProperties = {
    margin: 0,
    paddingLeft: 18,
    color: "var(--text-secondary)",
    display: "grid",
    rowGap: 8,
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountPhoneView({ onBack }: AccountPhoneViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <AccountPhoneHeader onBack={onBack} />

            <div style={CARD_STYLE}>
                <Text as="p" type="meta" style={EYEBROW_STYLE}>
                    Coming soon
                </Text>

                <Text as="p" type="meta" style={BODY_STYLE}>
                    Phone will become an optional account connection once the
                    messaging and verification system exists.
                </Text>

                <ul style={LIST_STYLE}>
                    <li>
                        <Text as="span" type="meta">
                            Optional phone storage
                        </Text>
                    </li>

                    <li>
                        <Text as="span" type="meta">
                            Future verification support
                        </Text>
                    </li>

                    <li>
                        <Text as="span" type="meta">
                            Future alerts or recovery only after SMS is enabled
                        </Text>
                    </li>
                </ul>
            </div>
        </section>
    );
}