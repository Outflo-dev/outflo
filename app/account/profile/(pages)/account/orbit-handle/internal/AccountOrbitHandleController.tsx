"use client";

/* ==========================================================
   OUTFLO — ACCOUNT ORBIT HANDLE CONTROLLER
   File: app/account/profile/(pages)/account/orbithandle/internal/AccountOrbitHandleController.tsx
   Scope: Own account Orbit handle drilldown state, save action, and navigation
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add isolated account Orbit handle drilldown controller
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";
import { saveAccountOrbitHandle } from "../actions/account-orbit-handle.client";
import type { AccountOrbitHandlePageData } from "./account-orbit-handle.types";
import AccountOrbitHandleView from "../view/AccountOrbitHandleView";

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
   Component
-------------------------------- */
export default function AccountOrbitHandleController({
    orbitHandle: initialOrbitHandle,
}: AccountOrbitHandlePageData) {
    const router = useRouter();

    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [orbitHandle, setOrbitHandle] = useState(initialOrbitHandle);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function exitToAccount() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            router.push("/account/profile/account");
        }, MOTION_DURATION_MS);
    }

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSaving) return;

        setIsSaving(true);
        setError(null);

        const result = await saveAccountOrbitHandle({
            orbitHandle,
        });

        setIsSaving(false);

        if (!result.ok) {
            setError(result.message);
            return;
        }

        router.refresh();
        exitToAccount();
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <AccountOrbitHandleView
                        orbitHandle={orbitHandle}
                        error={error}
                        isSaving={isSaving}
                        onBack={handleBack}
                        onOrbitHandleChange={setOrbitHandle}
                        onSubmit={handleSubmit}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}