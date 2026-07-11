"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER REFRESH ACTION
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderRefreshAction.tsx
   Scope: Own Environment refresh interaction and mount refresh ring
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useEffect,
    useRef,
    useState,
} from "react";

import type { CSSProperties } from "react";

import {
    EnvironmentRefreshRing,
} from "@/components/system/primitives/marks/environment";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderRefreshActionProps = {
    onRefresh: () => void;
    refreshing: boolean;
};

type EnvironmentRefreshRingState =
    | "idle"
    | "refreshing"
    | "success";

/* ------------------------------
   Constants
-------------------------------- */
const SUCCESS_DURATION_MS = 10_000;

/* ------------------------------
   Styles
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    position: "relative",
    display: "grid",
    placeItems: "center",

    width: "clamp(36px, 9.4vw, 44px)",
    height: "clamp(36px, 9.4vw, 44px)",

    margin: 0,
    padding: 0,
    border: 0,
    borderRadius: 999,

    background: "transparent",

    cursor: "pointer",
    transform: "translateY(-1px)",
    WebkitTapHighlightColor: "transparent",
};

const RING_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderRefreshAction({
    onRefresh,
    refreshing,
}: EnvironmentHeaderRefreshActionProps) {
    const [ringState, setRingState] =
        useState<EnvironmentRefreshRingState>("idle");

    const previousRefreshingRef = useRef(refreshing);

    useEffect(() => {
        let successTimer: ReturnType<typeof setTimeout> | undefined;

        const wasRefreshing =
            previousRefreshingRef.current;

        previousRefreshingRef.current = refreshing;

        if (refreshing) {
            setRingState("refreshing");
        } else if (wasRefreshing) {
            setRingState("success");

            successTimer = setTimeout(() => {
                setRingState("idle");
            }, SUCCESS_DURATION_MS);
        }

        return () => {
            if (successTimer) {
                clearTimeout(successTimer);
            }
        };
    }, [refreshing]);

    return (
        <button
            type="button"
            aria-label={
                refreshing
                    ? "Refreshing Environment"
                    : ringState === "success"
                        ? "Environment updated"
                        : "Refresh Environment"
            }
            aria-busy={refreshing}
            disabled={refreshing}
            onClick={onRefresh}
            style={BUTTON_STYLE}
        >
            <span
                aria-hidden="true"
                style={RING_STYLE}
            >
                <EnvironmentRefreshRing
                    state={ringState}
                />
            </span>
        </button>
    );
}