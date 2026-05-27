// app/dev/environment/raw/header/RawEnvironmentHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — RAW ENVIRONMENT HEADER
   File: app/dev/environment/raw/header/RawEnvironmentHeader.tsx
   Scope: Render raw Environment dev page header
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add raw Environment dev navigation header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Link from "next/link";

import RawEnvironmentBackAction from "./RawEnvironmentBackAction";

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
    background: "#080808",
};

const LINKS_STYLE: CSSProperties = {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
};

const LINK_STYLE: CSSProperties = {
    color: "#f2f2f2",
};

/* ------------------------------
   Component
-------------------------------- */
export default function RawEnvironmentHeader() {
    return (
        <header style={HEADER_STYLE}>
            <nav aria-label="Environment dev navigation" style={NAV_STYLE}>
                <RawEnvironmentBackAction />

                <div style={LINKS_STYLE}>
                    <Link href="/account/profile/environment" style={LINK_STYLE}>
                        Settings
                    </Link>

                    <Link
                        href="/account/profile/environment/live-test"
                        style={LINK_STYLE}
                    >
                        OwnTracks
                    </Link>

                    <Link href="/app/systems" style={LINK_STYLE}>
                        Systems
                    </Link>
                </div>
            </nav>
        </header>
    );
}