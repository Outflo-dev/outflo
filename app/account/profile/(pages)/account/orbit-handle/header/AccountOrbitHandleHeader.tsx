"use client";

/* ==========================================================
   OUTFLO — ACCOUNT ORBIT HANDLE HEADER
   File: app/account/profile/(pages)/account/orbithandle/header/AccountOrbitHandleHeader.tsx
   Scope: Render account Orbit handle drilldown header
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: isolate account Orbit handle drilldown header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import AccountOrbitHandleBackAction from "./AccountOrbitHandleBackAction";

/* ------------------------------
   Types
-------------------------------- */
type AccountOrbitHandleHeaderProps = {
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
export default function AccountOrbitHandleHeader({
    onBack,
}: AccountOrbitHandleHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <div>
                <AccountOrbitHandleBackAction onBack={onBack} />
            </div>

            <div style={TITLE_STACK_STYLE}>
                <Text as="h1" type="display" style={TITLE_STYLE}>
                    Orbit handle
                </Text>

                <Text as="p" type="meta" style={DESCRIPTION_STYLE}>
                    Your Orbit handle is your required Outflō identity. It
                    displays with @ across your profile, while your account link
                    resolves without it.
                </Text>
            </div>
        </header>
    );
}