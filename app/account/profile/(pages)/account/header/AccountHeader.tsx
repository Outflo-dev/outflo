"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT HEADER
   File: app/account/profile/(pages)/account/view/AccountHeader.tsx
   Scope: Render compact account drilldown header
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: remove oversized account header and tighten account nav
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Text from "@/components/system/primitives/display/type/Text";
import AccountBackAction from "./AccountBackAction";

/* ------------------------------
   Types
-------------------------------- */
type AccountHeaderProps = {
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 18,
};

const NAV_STYLE: CSSProperties = {
    minHeight: 44,
    display: "grid",
    gridTemplateColumns: "44px 1fr 44px",
    alignItems: "center",
};

const NAV_TITLE_STYLE: CSSProperties = {
    textAlign: "center",
    fontSize: "var(--text-md)",
    fontWeight: "var(--font-weight-bold)",
    letterSpacing: "-0.025em",
    color: "var(--text-primary)",
};

const INTRO_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
    paddingTop: 4,
};

const TITLE_STYLE: CSSProperties = {
    fontSize: "var(--header-lg)",
    fontWeight: 700,
    letterSpacing: "-0.045em",
    lineHeight: 1,
    color: "var(--text-primary)",
};

const COPY_STYLE: CSSProperties = {
    maxWidth: 460,
    fontSize: "var(--text-sm)",
    lineHeight: 1.45,
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountHeader({ onBack }: AccountHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <div style={NAV_STYLE}>
                <AccountBackAction onBack={onBack} />

                <div style={NAV_TITLE_STYLE}>Account</div>

                <div />
            </div>

            <div style={INTRO_STYLE}>
                <Text as="h1" type="display" style={TITLE_STYLE}>
                    Account
                </Text>

                <Text as="p" type="meta" style={COPY_STYLE}>
                    Identity, access, and Begin anchor.
                </Text>
            </div>
        </header>
    );
}