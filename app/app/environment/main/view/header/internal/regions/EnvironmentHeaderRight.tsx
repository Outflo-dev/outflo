"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER RIGHT REGION
   File: app/app/environment/main/view/header/internal/regions/EnvironmentHeaderRight.tsx
   Scope: Compose Environment update status and refresh action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useEffect,
    useState,
    type CSSProperties,
} from "react";

import EnvironmentHeaderRefreshAction from "@/app/app/environment/main/view/header/primitives/EnvironmentHeaderRefreshAction";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderRightProps = {
    lastUpdatedAt: number | null;
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Styles
-------------------------------- */
const REGION_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
};

const UPDATED_BLOCK_STYLE: CSSProperties = {
    display: "grid",
    justifyItems: "end",
    rowGap: 3,
    minWidth: 44,
};

const UPDATED_LABEL_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--theme-text-secondary)",
    fontSize: 8,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
};

const UPDATED_TIME_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--theme-text-secondary)",
    fontSize: 8,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
};

/* ------------------------------
   Helpers
-------------------------------- */
function resolveUpdatedTime(
    lastUpdatedAt: number | null,
    now: number,
): string {
    if (lastUpdatedAt === null) {
        return "—";
    }

    const elapsedMilliseconds = Math.max(
        0,
        now - lastUpdatedAt,
    );

    const elapsedMinutes = Math.floor(
        elapsedMilliseconds / 60_000,
    );

    if (elapsedMinutes < 1) {
        return "Just now";
    }

    if (elapsedMinutes < 60) {
        return `${elapsedMinutes}m ago`;
    }

    const elapsedHours = Math.floor(
        elapsedMinutes / 60,
    );

    if (elapsedHours < 24) {
        return `${elapsedHours}h ago`;
    }

    const elapsedDays = Math.floor(
        elapsedHours / 24,
    );

    return `${elapsedDays}d ago`;
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderRight({
    lastUpdatedAt,
    onRefresh,
    refreshing,
}: EnvironmentHeaderRightProps) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        setNow(Date.now());

        const interval = window.setInterval(() => {
            setNow(Date.now());
        }, 30_000);

        return () => {
            window.clearInterval(interval);
        };
    }, [lastUpdatedAt]);

    const updatedTime = refreshing
        ? "Updating…"
        : resolveUpdatedTime(lastUpdatedAt, now);

    return (
        <div style={REGION_STYLE}>
            <div style={UPDATED_BLOCK_STYLE}>
                {refreshing ? (
                    <>
                        <span
                            aria-hidden="true"
                            style={UPDATED_LABEL_STYLE}
                        >
                            &nbsp;
                        </span>

                        <p style={UPDATED_LABEL_STYLE}>
                            UPDATING...
                        </p>
                    </>
                ) : (
                    <>
                        <p style={UPDATED_LABEL_STYLE}>
                            UPDATED
                        </p>

                        <p style={UPDATED_TIME_STYLE}>
                            {updatedTime}
                        </p>
                    </>
                )}
            </div>

            <EnvironmentHeaderRefreshAction
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </div>
    );
}