/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT TYPES
   File: app/account/profile/(pages)/environment/capture/main/internal/capture.types.ts
   Scope: Define Environment engagement page view contracts
   Last Updated:
   - iso: 2026-07-13
   - note: distinguish disabled controls from inactive selectable modes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentEngagementMode,
    EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";

/* ------------------------------
   State Aliases
-------------------------------- */
export type EngagementMode =
    EnvironmentEngagementMode;

export type EngagementState =
    EnvironmentEngagementState;

/* ------------------------------
   Controls
-------------------------------- */
export type CaptureControlId =
    | "engagement"
    | "precise"
    | "capture";

export type CaptureControlRowData = {
    id: CaptureControlId;
    label: string;
    value: string;
    isOn: boolean;
    isDisabled: boolean;
    isMuted: boolean;
};

/* ------------------------------
   View Model
-------------------------------- */
export type CaptureViewModel = {
    controls: CaptureControlRowData[];
};