"use client";

/* ==========================================================
   OUTFLO — ACCOUNT NAME HEADER
   File: app/account/profile/(pages)/account/name/header/AccountNameHeader.tsx
   Scope: Render account name drilldown header
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: isolate account name drilldown header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import AccountNameBackAction from "./AccountNameBackAction";

/* ------------------------------
   Types
-------------------------------- */
type AccountNameHeaderProps = {
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
export default function AccountNameHeader({
    onBack,
}: AccountNameHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <div>
                <AccountNameBackAction onBack={onBack} />
            </div>

            <div style={TITLE_STACK_STYLE}>
                <Text as="h1" type="display" style={TITLE_STYLE}>
                    Account name
                </Text>

                <Text as="p" type="meta" style={DESCRIPTION_STYLE}>
                    Use one or both fields. Your name is optional and appears anywhere
                    Outflō shows your account identity.
                </Text>
            </div>
        </header>
    );
}