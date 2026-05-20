/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT MODEL
   File: app/account/profile/(pages)/environment/main/internal/environment.sections.ts
   Scope: Build profile environment category doorway view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: make environment row the master participation toggle
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
                value: "Turn user-specific environment participation on or off.",
                actionLabel: "Off",
            },
            {
                mark: "location",
                label: "Location",
                value: "Manual city, device, and precision.",
                href: "/account/profile/environment/location",
                actionLabel: "Controls",
            },
            {
                mark: "capture",
                label: "Capture",
                value: "Moment and continuous capture.",
                href: "/account/profile/environment/capture",
                actionLabel: "Controls",
            },
        ],

        signals: [
            {
                mark: "sun",
                label: "Sun",
                value: "Altitude, azimuth, and daylight.",
                href: "/account/profile/environment/sun",
                actionLabel: "Controls",
            },
            {
                mark: "precipitation",
                label: "Precipitation",
                value: "Rain, accumulation, and probability.",
                href: "/account/profile/environment/precipitation",
                actionLabel: "Controls",
            },
            {
                mark: "weather",
                label: "Weather",
                value: "Temperature, humidity, wind, and pressure.",
                href: "/account/profile/environment/weather",
                actionLabel: "Controls",
            },
            {
                mark: "air",
                label: "Air quality",
                value: "AQI, PM2.5, PM10, and ozone.",
                href: "/account/profile/environment/air-quality",
                actionLabel: "Controls",
            },
        ],

        records: [
            {
                mark: "snapshot",
                label: "Snapshots",
                value: "Environment records.",
                href: "/account/profile/environment/snapshots",
                actionLabel: "View",
            },
            {
                mark: "receipt",
                label: "Receipt links",
                value: "Receipt-linked environment context.",
                href: "/account/profile/environment/receipt-links",
                actionLabel: "View",
            },
        ],
    };
}