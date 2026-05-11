"use client";

/* ==========================================================
   OUTFLO — APP ROUTE TRANSITION
   File: components/system/shell/app/AppRouteTransition.tsx
   Scope: Own global visual handoff between routed app surfaces
   Last Updated:
   - ms: 1778467797659
   - iso: 2026-05-11T02:49:57.659Z
   - note: add shell-adjacent route transition owner using Motion primitive
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

/* ------------------------------
   Helpers
-------------------------------- */
function resolveTransition(from: string, to: string): TransitionPair {
    if (to.startsWith("/account/profile")) {
        return {
            enter: "up",
            exit: "down",
        };
    }

    if (from.startsWith("/account/profile") && to === "/app/systems") {
        return {
            enter: "down",
            exit: "down",
        };
    }

    if (to === "/app/time") {
        return {
            enter: "left",
            exit: "left",
        };
    }

    if (from === "/app/time" && to === "/app/systems") {
        return {
            enter: "right",
            exit: "right",
        };
    }

    if (to === "/app/money") {
        return {
            enter: "right",
            exit: "right",
        };
    }

    if (from === "/app/money" && to === "/app/systems") {
        return {
            enter: "left",
            exit: "left",
        };
    }

    return {
        enter: "up",
        exit: "down",
    };
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

            setLayers([
                {
                    id: `route:${pathname}:current`,
                    pathname,
                    children,
                    phase: "entered",
                    direction: "up",
                },
            ]);

            return;
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
        if (layer.phase === "entered") {
            setShow(true);
            return;
        }

        const frame = window.requestAnimationFrame(() => {
            setShow(layer.phase === "enter");
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