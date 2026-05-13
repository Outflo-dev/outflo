"use client";

/* ==========================================================
   OUTFLO — ACCOUNT PHONE HEADER
   File: app/account/profile/(pages)/account/phone/header/AccountPhoneHeader.tsx
   Scope: Render account phone drilldown header
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: isolate account phone drilldown header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import AccountPhoneBackAction from "../actions/AccountPhoneBackAction";

/* ------------------------------
   Types
-------------------------------- */
type AccountPhoneHeaderProps = {
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 14,
};

const TITLE_STACK_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
};

const TITLE_STYLE: CSSProperties = {
    color: "var(--text-primary)",
};

const DESCRIPTION_STYLE: CSSProperties = {
    maxWidth: 520,
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountPhoneHeader({
    onBack,
}: AccountPhoneHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <div>
                <AccountPhoneBackAction onBack={onBack} />
            </div>

            <div style={TITLE_STACK_STYLE}>
                <Text as="h1" type="display" style={TITLE_STYLE}>
                    Phone
                </Text>

                <Text as="p" type="meta" style={DESCRIPTION_STYLE}>
                    Phone support is coming soon. Outflō does not send texts,
                    verify phone numbers, or use phone recovery yet.
                </Text>
            </div>
        </header>
    );
}