/* ==========================================================
   OUTFLO — ENVIRONMENT STATUS PILL TYPES
   File: app/app/environment/main/view/hero/primitives/statuspill/status-pill.types.ts
   Scope: Local types for Environment hero status pill primitive
   Last Updated:
   - ms:
   - iso:
   - note: isolate status pill types inside status pill primitive folder
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

/* ------------------------------
   Component Props
-------------------------------- */
export type EnvironmentStatusPillProps = {
    status: string;
};

export type EnvironmentStatusPillFrameProps = {
    children: ReactNode;
};

export type EnvironmentStatusPillSignalProps = {
    label?: string;
};