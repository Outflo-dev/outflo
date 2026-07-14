/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT MODEL
   File: app/account/profile/(pages)/environment/main/internal/environment.sections.ts
   Scope: Build profile environment category doorway view model
   Last Updated:
   - iso: 2026-07-13
   - note: move Location to Signals and replace Capture doorway with Engagement
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
                value: "Control whether Environment is available in Outflō.",
                actionLabel: "On",
            },
            {
                mark: "capture",
                label: "Engagement",
                value: "Control whether and how Environment records.",
                href: "/account/profile/environment/capture",
                actionLabel: "Controls",
            },
        ],

        signals: [
            {
                mark: "location",
                label: "Location",
                value: "Control how place enters Environment.",
                href: "/account/profile/environment/location",
                actionLabel: "Controls",
            },
            {
                mark: "weather",
                label: "Weather",
                value: "Temperature, pressure, wind, visibility, and atmosphere.",
                href: "/account/profile/environment/weather",
                actionLabel: "Controls",
            },
            {
                mark: "sun",
                label: "Sun",
                value: "Light, sun position, and day context.",
                href: "/account/profile/environment/sun",
                actionLabel: "Controls",
            },
            {
                mark: "precipitation",
                label: "Precipitation",
                value: "Rain and related weather events.",
                href: "/account/profile/environment/precipitation",
                actionLabel: "Controls",
            },
            {
                mark: "air",
                label: "Air quality",
                value: "Outdoor air context.",
                href: "/account/profile/environment/air-quality",
                actionLabel: "Controls",
            },
            {
                mark: "altitude",
                label: "Altitude",
                value: "Elevation context from the active source.",
                href: "/account/profile/environment/altitude",
                actionLabel: "Controls",
            },
        ],

        display: [
            {
                mark: "units",
                label: "Units",
                value: "Control how Environment values are expressed.",
                href: "/account/profile/environment/units",
                actionLabel: "Controls",
            },
            {
                mark: "time",
                label: "Time",
                value: "Control how Environment time is expressed.",
                href: "/account/profile/environment/time",
                actionLabel: "Controls",
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
                actionLabel: "View",
            },
        ],
    };
}