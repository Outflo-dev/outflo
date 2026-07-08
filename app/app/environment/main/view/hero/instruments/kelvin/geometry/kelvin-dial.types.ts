/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL TYPES
   File: app/app/environment/main/view/hero/instruments/kelvin/geometry/kelvin-dial.types.ts
   Scope: Type contracts for Kelvin dial instrument
   ========================================================== */

export type EnvironmentKelvinDialProps = {
    value: number;
    celsius: number;
    fahrenheit: number;
    kelvin: number;
    unitLabel: string;
    indicatorValue: number;
    min?: number;
    max?: number;
};

export type EnvironmentKelvinDialReadoutProps = {
    value: number;
    celsius: number;
    fahrenheit: number;
    kelvin: number;
    unitLabel: string;
};