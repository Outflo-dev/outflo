"use client";

/* ==========================================================
   OUTFLO — APP ROUTE TRANSITION
   File: components/system/shell/app/AppRouteTransition.tsx
   Scope: Own global visual handoff between routed app surfaces
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: contain route transition rules in explicit motion map
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";

/* ------------------------------
   Types
-------------------------------- */
type AppRouteTransitionProps = {
    pathname: string;
    children: ReactNode;
};

type RouteDirection = "up" | "down" | "left" | "right";

type TransitionPair = {
    enter: RouteDirection;
    exit: RouteDirection;
};

type RouteLayer = {
    id: string;
    pathname: string;
    children: ReactNode;
    phase: "enter" | "exit" | "entered";
    direction: RouteDirection;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    minHeight: "100dvh",
    width: "100%",
    position: "relative",
    overflowX: "clip",
};

const LAYER_BASE_STYLE: CSSProperties = {
    width: "100%",
    minHeight: "100dvh",
};

const DEFAULT_TRANSITION: TransitionPair = {
    enter: "up",
    exit: "down",
};

const PROFILE_ENTER_TRANSITION: TransitionPair = {
    enter: "up",
    exit: "down",
};

const PROFILE_EXIT_TO_SYSTEMS_TRANSITION: TransitionPair = {
    enter: "down",
    exit: "down",
};

const ROUTE_TRANSITIONS: Record<string, TransitionPair> = {
    "/app/systems→/app/time": {
        enter: "left",
        exit: "left",
    },
    "/app/time→/app/systems": {
        enter: "right",
        exit: "right",
    },
    "/app/systems→/app/money": {
        enter: "right",
        exit: "right",
    },
    "/app/money→/app/systems": {
        enter: "left",
        exit: "left",
    },
};

/* ------------------------------
   Helpers
-------------------------------- */
function getRouteTransitionKey(from: string, to: string) {
    return `${from}→${to}`;
}

function resolveTransition(from: string, to: string): TransitionPair {
    if (to.startsWith("/account/profile")) {
        return PROFILE_ENTER_TRANSITION;
    }

    if (from.startsWith("/account/profile") && to === "/app/systems") {
        return PROFILE_EXIT_TO_SYSTEMS_TRANSITION;
    }

    return ROUTE_TRANSITIONS[getRouteTransitionKey(from, to)] ?? DEFAULT_TRANSITION;
}

function getLayerStyle(layer: RouteLayer, isTopLayer: boolean): CSSProperties {
    return {
        ...LAYER_BASE_STYLE,
        position: layer.phase === "exit" ? "absolute" : "relative",
        inset: layer.phase === "exit" ? 0 : undefined,
        zIndex: isTopLayer ? 2 : 1,
        pointerEvents: isTopLayer ? "auto" : "none",
    };
}

/* ------------------------------
   Component
-------------------------------- */
export default function AppRouteTransition({
    pathname,
    children,
}: AppRouteTransitionProps) {
    const previous = useRef({
        pathname,
        children,
    });

    const transitionId = useRef(0);

    const [layers, setLayers] = useState<RouteLayer[]>([
        {
            id: `route:${pathname}:initial`,
            pathname,
            children,
            phase: "entered",
            direction: "up",
        },
    ]);

    useEffect(() => {
        if (pathname === previous.current.pathname) {
            previous.current = {
                pathname,
                children,
            };

            const timeout = window.setTimeout(() => {
                setLayers([
                    {
                        id: `route:${pathname}:current`,
                        pathname,
                        children,
                        phase: "entered",
                        direction: "up",
                    },
                ]);
            }, 0);

            return () => window.clearTimeout(timeout);
        }

        transitionId.current += 1;

        const id = transitionId.current;
        const transition = resolveTransition(previous.current.pathname, pathname);

        const exitingLayer: RouteLayer = {
            id: `route:${previous.current.pathname}:exit:${id}`,
            pathname: previous.current.pathname,
            children: previous.current.children,
            phase: "exit",
            direction: transition.exit,
        };

        const enteringLayer: RouteLayer = {
            id: `route:${pathname}:enter:${id}`,
            pathname,
            children,
            phase: "enter",
            direction: transition.enter,
        };

        setLayers([exitingLayer, enteringLayer]);

        previous.current = {
            pathname,
            children,
        };

        const timeout = window.setTimeout(() => {
            setLayers([
                {
                    ...enteringLayer,
                    phase: "entered",
                },
            ]);
        }, MOTION_DURATION_MS);

        return () => window.clearTimeout(timeout);
    }, [pathname, children]);

    return (
        <div style={ROOT_STYLE}>
            {layers.map((layer, index) => {
                const isTopLayer = index === layers.length - 1;

                return (
                    <RouteMotionLayer
                        key={layer.id}
                        layer={layer}
                        isTopLayer={isTopLayer}
                    />
                );
            })}
        </div>
    );
}

/* ------------------------------
   Route Motion Layer
-------------------------------- */
function RouteMotionLayer({
    layer,
    isTopLayer,
}: {
    layer: RouteLayer;
    isTopLayer: boolean;
}) {
    const [show, setShow] = useState(layer.phase !== "enter");

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setShow(layer.phase === "entered" || layer.phase === "enter");
        });

        return () => window.cancelAnimationFrame(frame);
    }, [layer.phase]);

    return (
        <div style={getLayerStyle(layer, isTopLayer)}>
            <Motion show={show} direction={layer.direction}>
                {layer.children}
            </Motion>
        </div>
    );
}