"use client";

/* ==========================================================
   OUTFLO — USE PROFILE CARD POSTURE DRAG
   File: app/account/profile/internal/card/useProfileCardPostureDrag.ts
   Scope: Own vertical ProfileCard posture and elastic drag behavior
   ========================================================== */

import { useRef, useState } from "react";
import type { ProfileCardPanel, ProfileCardPosture } from "./profile-card.types";

/* ------------------------------
   Types
-------------------------------- */
type PostureDragConfig = {
    activePanel: ProfileCardPanel | null;
    posture: ProfileCardPosture;
    onChangePosture: (posture: ProfileCardPosture) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const EXPAND_THRESHOLD_PX = 54;
const MAX_UP_PX = 76;
const MAX_DOWN_PX = 72;

const COMPACT_UP_RESISTANCE = 0.42;
const MEDIUM_UP_RESISTANCE = 0.3;
const DOWN_RESISTANCE = 0.36;

/* ------------------------------
   Helpers
-------------------------------- */
function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

/* ------------------------------
   Hook
-------------------------------- */
export function useProfileCardPostureDrag({
    activePanel,
    posture,
    onChangePosture,
}: PostureDragConfig) {
    const startYRef = useRef<number | null>(null);
    const lastDeltaYRef = useRef(0);

    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const canExpand = activePanel === "controls" || activePanel === "theme";

    function resetDrag() {
        startYRef.current = null;
        lastDeltaYRef.current = 0;
        setDragY(0);
        setIsDragging(false);
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        startYRef.current = event.clientY;
        lastDeltaYRef.current = 0;
        setIsDragging(true);

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (startYRef.current === null) return;

        const deltaY = event.clientY - startYRef.current;
        lastDeltaYRef.current = deltaY;

        if (deltaY < 0) {
            const resistance =
                posture === "compact" ? COMPACT_UP_RESISTANCE : MEDIUM_UP_RESISTANCE;

            setDragY(clamp(deltaY, -MAX_UP_PX, 0) * resistance);
            return;
        }

        setDragY(clamp(deltaY, 0, MAX_DOWN_PX) * DOWN_RESISTANCE);
    }

    function handlePointerUp() {
        if (
            canExpand &&
            posture === "compact" &&
            lastDeltaYRef.current <= -EXPAND_THRESHOLD_PX
        ) {
            onChangePosture("medium");
        }

        resetDrag();
    }

    function handlePointerCancel() {
        resetDrag();
    }

    return {
        postureDragStyle: {
            transform: `translateY(${dragY}px)`,
            transition: isDragging
                ? "none"
                : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        } as React.CSSProperties,

        postureDragHandlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerCancel,
        },
    };
}