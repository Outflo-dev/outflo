"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Render Environment landing page navigation and status
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: simplify Environment landing header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import EnvironmentBackAction from "./EnvironmentBackAction";
import EnvironmentRefreshAction from "./EnvironmentRefreshAction";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderProps = {
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 18,
};

const NAV_STYLE: CSSProperties = {
    position: "sticky",
    top: -1,
    zIndex: 10,
    minHeight: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 8,
    background:
        "linear-gradient(180deg, rgba(5,9,16,0.94), rgba(5,9,16,0.62), transparent)",
    backdropFilter: "blur(18px)",
};

const INTRO_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: 18,
};

const COPY_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: 6,
};

const TITLE_STYLE: CSSProperties = {
    fontSize: "var(--header-lg)",
    fontWeight: "var(--font-weight-bold)",
    letterSpacing: "-0.055em",
    lineHeight: 0.95,
    color: "var(--text-primary)",
};

const META_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const LIVE_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 11px",
    borderRadius: 999,
    color: "var(--text-secondary)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    whiteSpace: "nowrap",
};

const DOT_STYLE: CSSProperties = {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "rgba(94,224,182,0.95)",
    boxShadow: "0 0 16px rgba(94,224,182,0.8)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeader({
    onBack,
    onRefresh,
    refreshing,
}: EnvironmentHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <div style={NAV_STYLE}>
                <EnvironmentBackAction onBack={onBack} />

                <EnvironmentRefreshAction
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            </div>

            <div style={INTRO_STYLE}>
                <div style={COPY_STYLE}>
                    <Text as="h1" type="display" style={TITLE_STYLE}>
                        Environment
                    </Text>

                    <Text as="p" type="meta" style={META_STYLE}>
                        Live substrate · Current snapshot
                    </Text>
                </div>

                <span style={LIVE_STYLE}>
                    <span style={DOT_STYLE} />

                    <Text as="span" type="meta">
                        Live
                    </Text>
                </span>
            </div>
        </header>
    );
}