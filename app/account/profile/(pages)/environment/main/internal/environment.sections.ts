/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT MODEL
   File: app/account/profile/(pages)/environment/main/internal/environment.sections.ts
   Scope: Build profile environment category doorway view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: align Environment doorway with MQTT-backed context model
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentViewModel } from "./environment.types";

/* ------------------------------
   Model
-------------------------------- */
export function getEnvironmentModel(): EnvironmentViewModel {
    return {
        participation: [
            {
                mark: "environment",
                label: "Environment",
                value: "Environment may participate in Outflō.",
                actionLabel: "On",
            },
            {
                mark: "location",
                label: "Location",
                value: "Control how place enters Environment.",
                href: "/account/profile/environment/location",
                actionLabel: "Select",
            },
            {
                mark: "capture",
                label: "Capture",
                value: "Control when Environment records.",
                href: "/account/profile/environment/capture",
                actionLabel: "Edit",
            },
        ],

        signals: [
            {
                mark: "weather",
                label: "Weather",
                value: "Temperature, pressure, wind, visibility, and atmosphere.",
                href: "/account/profile/environment/weather",
                actionLabel: "Edit",
            },
            {
                mark: "sun",
                label: "Sun",
                value: "Light, sun position, and day context.",
                href: "/account/profile/environment/sun",
                actionLabel: "Edit",
            },
            {
                mark: "precipitation",
                label: "Precipitation",
                value: "Rain and related weather events.",
                href: "/account/profile/environment/precipitation",
                actionLabel: "Edit",
            },
            {
                mark: "air",
                label: "Air quality",
                value: "Outdoor air context.",
                href: "/account/profile/environment/air-quality",
                actionLabel: "Edit",
            },
            {
                mark: "altitude",
                label: "Altitude",
                value: "Elevation context from the active source.",
                href: "/account/profile/environment/altitude",
                actionLabel: "Edit",
            },
        ],

        records: [
            {
                mark: "snapshot",
                label: "Snapshots",
                value: "Current Environment truth.",
                href: "/account/profile/environment/snapshots",
                actionLabel: "View",
            },
            {
                mark: "receipt",
                label: "Receipt links",
                value: "Environment attached to Money events.",
                href: "/account/profile/environment/receipt-links",
                actionLabel: "Soon",
            },
        ],
    };
}