/* ==========================================================
   OUTFLO — PROFILE FLOWS MODEL
   File: app/account/profile/(pages)/flows/main/internal/flows.sections.ts
   Scope: Build profile flows doorway view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define money time environment and ingest flow rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { FlowsViewModel } from "./flows.types";

/* ------------------------------
   Model
-------------------------------- */
export function getFlowsModel(): FlowsViewModel {
    return {
        systems: [
            {
                mark: "money",
                label: "Money",
                value: "Receipts + outflow",
                href: "/account/profile/money",
            },
            {
                mark: "time",
                label: "Time",
                value: "Epoch + orbit",
                actionLabel: "Soon",
            },
            {
                mark: "environment",
                label: "Environment",
                value: "Location + weather",
                href: "/account/profile/environment",
            },
            {
                mark: "ingest",
                label: "Ingest",
                value: "Sources + processing",
                actionLabel: "Soon",
            },
        ],
    };
}