/* ==========================================================
   OUTFLO — USE ENVIRONMENT HOOK
   File: lib/environment/use-environment.ts
   Scope: Time-driven environment state updater (1s interval)
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { useEffect, useState } from "react";
import {
  getEnvironmentState,
  EnvironmentState,
} from "./environment-engine";

/* ------------------------------
   Types
-------------------------------- */

type WeatherInput = {
  cloud_density: number;
  rain_factor: number;
  storm_factor: number;
};

/* ------------------------------
   Hook
-------------------------------- */

export function useEnvironment(weather: WeatherInput) {
  const [state, setState] = useState<EnvironmentState>(() =>
    getEnvironmentState({
      date: new Date(),
      ...weather,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setState(
        getEnvironmentState({
          date: new Date(),
          ...weather,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [weather.cloud_density, weather.rain_factor, weather.storm_factor]);

  return state;
}