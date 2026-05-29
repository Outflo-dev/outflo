// app/app/environment/main/internal/EnvironmentController.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTROLLER
   File: app/app/environment/main/internal/EnvironmentController.tsx
   Scope: Own Environment route motion, navigation, and refresh action
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: preserve compact Environment surface while allowing page scroll
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";

import EnvironmentView from "../view/EnvironmentView";
import { getEnvironmentModel } from "./environment.sections";
import type { EnvironmentSnapshot } from "./environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentControllerProps = {
    snapshot: EnvironmentSnapshot | null;
};

/* ------------------------------
   Constants
-------------------------------- */
const MAIN_STYLE: CSSProperties = {
    minHeight: "100svh",
    padding:
        "calc(env(safe-area-inset-top) + 6px) 0 max(18px, env(safe-area-inset-bottom))",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentController({
    snapshot,
}: EnvironmentControllerProps) {
    const router = useRouter();

    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [refreshing, setRefreshing] = useState(false);

    const model = useMemo(() => {
        return getEnvironmentModel(snapshot);
    }, [snapshot]);

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    async function handleRefresh() {
        if (refreshing) return;

        setRefreshing(true);

        try {
            await fetch("/api/environment/context/pull", {
                method: "GET",
                cache: "no-store",
            });

            router.refresh();
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <EnvironmentView
                        model={model}
                        onBack={handleBack}
                        onRefresh={handleRefresh}
                        refreshing={refreshing}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}