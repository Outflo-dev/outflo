/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT MODEL
   File: app/account/profile/(pages)/environment/capture/main/internal/capture.sections.ts
   Scope: Build Environment engagement control view model
   Last Updated:
   - iso: 2026-07-13
   - note: distinguish disabled controls from inactive selectable modes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CaptureViewModel,
    EngagementState,
} from "./capture.types";

/* ------------------------------
   Model
-------------------------------- */
export function getCaptureModel(
    state: EngagementState,
): CaptureViewModel {
    const engagementEnabled = state.enabled;

    const preciseSelected =
        engagementEnabled &&
        state.mode === "precise";

    const captureSelected =
        engagementEnabled &&
        state.mode === "capture";

    return {
        controls: [
            {
                id: "engagement",
                label: "Engagement",
                value: "Allow Environment to save permitted context.",
                isOn: engagementEnabled,
                isDisabled: false,
                isMuted: false,
            },
            {
                id: "precise",
                label: "Precise",
                value: "Save each permitted emission as it happens.",
                isOn: preciseSelected,
                isDisabled: !engagementEnabled,
                isMuted:
                    engagementEnabled &&
                    captureSelected,
            },
            {
                id: "capture",
                label: "Capture",
                value: "Save Environment only when explicitly requested.",
                isOn: captureSelected,
                isDisabled: !engagementEnabled,
                isMuted:
                    engagementEnabled &&
                    preciseSelected,
            },
        ],
    };
}