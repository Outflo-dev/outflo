// app/account/profile/(pages)/environment/live-test/header/EnvironmentLiveTestHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LIVE TEST HEADER
   File: app/account/profile/(pages)/environment/live-test/header/EnvironmentLiveTestHeader.tsx
   Scope: Render Environment live test navigation header
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add live test navigation header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Link from "next/link";

import EnvironmentLiveTestBackAction from "./EnvironmentLiveTestBackAction";

/* ------------------------------
   Constants
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "contents",
};

const NAV_STYLE: CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "10px 0 14px",
    marginBottom: 10,
    background: "var(--bg-primary)",
};

const LINKS_STYLE: CSSProperties = {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
};

const LINK_STYLE: CSSProperties = {
    color: "var(--text-primary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentLiveTestHeader() {
    return (
        <header style={HEADER_STYLE}>
            <nav aria-label="Environment dev navigation" style={NAV_STYLE}>
                <EnvironmentLiveTestBackAction />

                <div style={LINKS_STYLE}>
                    <Link href="/account/profile/environment" style={LINK_STYLE}>
                        Settings
                    </Link>

                    <Link href="/dev/environment/raw" style={LINK_STYLE}>
                        Raw
                    </Link>

                    <Link href="/app/systems" style={LINK_STYLE}>
                        Systems
                    </Link>
                </div>
            </nav>
        </header>
    );
}