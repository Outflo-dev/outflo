"use client";

/* ==========================================================
   OUTFLO — USE PROFILE CARD PANEL SWIPE
   File: app/account/profile/internal/card/useProfileCardPanelSwipe.ts
   Scope: Own horizontal swipe gesture for ProfileCard panels
   ========================================================== */

import { useRef, useState } from "react";
import type { ProfileCardPanel } from "./profile-card.types";

/* ------------------------------
   Types
-------------------------------- */
type SwipeConfig = {
    activePanel: ProfileCardPanel | null;
    onChangePanel: (panel: ProfileCardPanel) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const PANEL_ORDER: readonly ProfileCardPanel[] = [
    "avatar",
    "controls",
    "theme",
];

const SWIPE_THRESHOLD_PX = 54;
const VELOCITY_THRESHOLD_PX = 0.45;
const VERTICAL_CANCEL_PX = 36;
const FOLLOW_RESISTANCE = 1;

/* ------------------------------
   Hook
-------------------------------- */
export function useProfileCardPanelSwipe({
    activePanel,
    onChangePanel,
}: SwipeConfig) {
    const startXRef = useRef<number | null>(null);
    const startYRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const [followX, setFollowX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    function resetSwipe() {
        startXRef.current = null;
        startYRef.current = null;
        startTimeRef.current = null;
        setFollowX(0);
        setIsSwiping(false);
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        startXRef.current = event.clientX;
        startYRef.current = event.clientY;
        startTimeRef.current = performance.now();
        setIsSwiping(true);

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (startXRef.current === null || startYRef.current === null) return;

        const deltaX = event.clientX - startXRef.current;
        const deltaY = event.clientY - startYRef.current;

        if (Math.abs(deltaY) > VERTICAL_CANCEL_PX) {
            resetSwipe();
            return;
        }

        setFollowX(deltaX * FOLLOW_RESISTANCE);
    }

    function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
        if (
            activePanel === null ||
            startXRef.current === null ||
            startYRef.current === null ||
            startTimeRef.current === null
        ) {
            resetSwipe();
            return;
        }

        const deltaX = event.clientX - startXRef.current;
        const deltaY = event.clientY - startYRef.current;
        const elapsedMs = Math.max(1, performance.now() - startTimeRef.current);
        const velocity = Math.abs(deltaX) / elapsedMs;

        if (Math.abs(deltaY) > VERTICAL_CANCEL_PX) {
            resetSwipe();
            return;
        }

        const shouldSwipe =
            Math.abs(deltaX) >= SWIPE_THRESHOLD_PX ||
            velocity >= VELOCITY_THRESHOLD_PX;

        if (!shouldSwipe) {
            resetSwipe();
            return;
        }

        const currentIndex = PANEL_ORDER.indexOf(activePanel);

        if (currentIndex < 0) {
            resetSwipe();
            return;
        }

        const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
        const nextPanel = PANEL_ORDER[nextIndex];

        if (nextPanel) {
            onChangePanel(nextPanel);
        }

        resetSwipe();
    }

    function handlePointerCancel() {
        resetSwipe();
    }

    return {
        followX,
        isSwiping,

        panelSwipeHandlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerCancel,
        },
    };
}