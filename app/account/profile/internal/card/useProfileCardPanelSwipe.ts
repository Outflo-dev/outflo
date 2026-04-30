"use client";

/* ==========================================================
   OUTFLO — USE PROFILE CARD PANEL SWIPE
   File: app/account/profile/internal/card/useProfileCardPanelSwipe.ts
   Scope: Own horizontal swipe gesture for ProfileCard panels
   ========================================================== */

import { useRef } from "react";
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

    function resetSwipe() {
        startXRef.current = null;
        startYRef.current = null;
        startTimeRef.current = null;
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        startXRef.current = event.clientX;
        startYRef.current = event.clientY;
        startTimeRef.current = performance.now();
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (startXRef.current === null || startYRef.current === null) return;

        const deltaY = event.clientY - startYRef.current;

        if (Math.abs(deltaY) > VERTICAL_CANCEL_PX) {
            resetSwipe();
        }
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
        panelSwipeHandlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerCancel,
        },
    };
}