"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT CONTROLLER
   File: app/account/profile/(pages)/environment/capture/main/internal/CaptureController.tsx
   Scope: Load, present, and persist Environment engagement state
   Last Updated:
   - iso: 2026-07-13
   - note: consume shared canonical Engagement transitions and client transport
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
    readEnvironmentEngagementState,
    writeEnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement.client";
import {
    DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
    resolveEnvironmentEngagementState,
    type EnvironmentEngagementState,
    type EnvironmentEngagementTransition,
} from "@/lib/app-state/environment/environment-engagement";

import CaptureView from "../view/CaptureView";
import { getCaptureModel } from "./capture.sections";
import type {
    CaptureControlId,
} from "./capture.types";

/* ------------------------------
   Constants
-------------------------------- */
const MAIN_STYLE: CSSProperties = {
    minHeight: "100svh",
    padding:
        "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
};

/* ------------------------------
   Transition Resolution
-------------------------------- */
function getEngagementTransition(
    controlId: CaptureControlId,
): EnvironmentEngagementTransition {
    if (controlId === "engagement") {
        return {
            type: "toggle-enabled",
        };
    }

    return {
        type: "select-mode",
        mode: controlId,
    };
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

    const confirmedStateRef =
        useRef<EnvironmentEngagementState>(
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
                    await readEnvironmentEngagementState(
                        controller.signal,
                    );

                confirmedStateRef.current =
                    state;

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
        const nextState =
            resolveEnvironmentEngagementState(
                engagementState,
                getEngagementTransition(
                    controlId,
                ),
            );

        if (nextState === engagementState) {
            return;
        }

        setEngagementState(nextState);

        const saveVersion =
            saveVersionRef.current + 1;

        saveVersionRef.current =
            saveVersion;

        void writeEnvironmentEngagementState(
            nextState,
        )
            .then((persistedState) => {
                confirmedStateRef.current =
                    persistedState;

                if (
                    saveVersionRef.current !==
                    saveVersion
                ) {
                    return;
                }

                setEngagementState(
                    persistedState,
                );
            })
            .catch((error) => {
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
                    confirmedStateRef.current,
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