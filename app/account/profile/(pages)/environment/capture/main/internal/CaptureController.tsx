"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT CONTROLLER
   File: app/account/profile/(pages)/environment/capture/main/internal/CaptureController.tsx
   Scope: Load, own, and persist Environment engagement state
   Last Updated:
   - iso: 2026-07-13
   - note: connect Engagement controls to canonical Guide persistence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";

import {
    DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
    isEnvironmentEngagementState,
    type EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";

import CaptureView from "../view/CaptureView";
import { getCaptureModel } from "./capture.sections";
import type {
    CaptureControlId,
} from "./capture.types";

/* ------------------------------
   Constants
-------------------------------- */
const ENGAGEMENT_ENDPOINT =
    "/api/profile/environment/engagement";

const MAIN_STYLE: CSSProperties = {
    minHeight: "100svh",
    padding:
        "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
};

/* ------------------------------
   State Resolution
-------------------------------- */
function resolveNextEngagementState(
    current: EnvironmentEngagementState,
    controlId: CaptureControlId,
): EnvironmentEngagementState {
    if (controlId === "engagement") {
        return {
            ...current,
            enabled: !current.enabled,
        };
    }

    if (!current.enabled) {
        return current;
    }

    if (controlId === "precise") {
        return {
            enabled: true,
            mode: "precise",
        };
    }

    return {
        enabled: true,
        mode: "capture",
    };
}

/* ------------------------------
   Persistence
-------------------------------- */
async function readEngagementState(
    signal: AbortSignal,
): Promise<EnvironmentEngagementState> {
    const response = await fetch(
        ENGAGEMENT_ENDPOINT,
        {
            method: "GET",
            cache: "no-store",
            signal,
        },
    );

    const body: unknown = await response.json();

    if (!response.ok) {
        const errorBody = body as {
            error?: string;
        };

        throw new Error(
            errorBody.error ??
            "Unable to load Environment engagement.",
        );
    }

    const responseBody = body as {
        engagement?: unknown;
    };

    if (
        !isEnvironmentEngagementState(
            responseBody.engagement,
        )
    ) {
        throw new Error(
            "Environment engagement response was invalid.",
        );
    }

    return responseBody.engagement;
}

async function writeEngagementState(
    state: EnvironmentEngagementState,
): Promise<void> {
    const response = await fetch(
        ENGAGEMENT_ENDPOINT,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        },
    );

    if (response.ok) {
        return;
    }

    const body = await response
        .json()
        .catch(() => null) as {
            error?: string;
        } | null;

    throw new Error(
        body?.error ??
        "Unable to save Environment engagement.",
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function CaptureController() {
    const [show, setShow] = useState(true);
    const [direction, setDirection] =
        useState<"left" | "right">("left");

    const [
        engagementState,
        setEngagementState,
    ] = useState<EnvironmentEngagementState>(
        DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
    );

    const saveVersionRef = useRef(0);

    const model =
        getCaptureModel(engagementState);

    useEffect(() => {
        const controller =
            new AbortController();

        async function loadEngagement() {
            try {
                const state =
                    await readEngagementState(
                        controller.signal,
                    );

                setEngagementState(state);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error(
                    "Failed to load Environment engagement.",
                    error,
                );
            }
        }

        void loadEngagement();

        return () => {
            controller.abort();
        };
    }, []);

    function handleToggle(
        controlId: CaptureControlId,
    ) {
        const previousState =
            engagementState;

        const nextState =
            resolveNextEngagementState(
                previousState,
                controlId,
            );

        if (nextState === previousState) {
            return;
        }

        setEngagementState(nextState);

        const saveVersion =
            saveVersionRef.current + 1;

        saveVersionRef.current =
            saveVersion;

        void writeEngagementState(
            nextState,
        ).catch((error) => {
            console.error(
                "Failed to save Environment engagement.",
                error,
            );

            if (
                saveVersionRef.current !==
                saveVersion
            ) {
                return;
            }

            setEngagementState(
                previousState,
            );
        });
    }

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    return (
        <Motion
            show={show}
            direction={direction}
        >
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <CaptureView
                        model={model}
                        onBack={handleBack}
                        onToggle={handleToggle}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}