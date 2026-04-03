/* ==========================================================
   OUTFLO — WEATHER FETCH
   File: lib/weather/get-weather.ts
   Scope: Resolve weather from coordinates or manual city and normalize provider output
   Last Updated:
   - ms: 1775178432296
   - iso: 2026-04-03T01:07:12.296Z
   - note: rewrite weather fetch to support baseline coordinates and manual-city weather resolution for environment wiring
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type WeatherQuery =
  | {
      kind: "coords";
      lat: number;
      lng: number;
    }
  | {
      kind: "manual_city";
      manual_city: string;
    };

export type NormalizedCurrentWeather = {
  temp: number;
  condition: string;
  cloud_density: number;
  rain_factor: number;
  storm_factor: number;
  label: string;
};

export type NormalizedHourlyWeather = {
  timestamp: number;
  temp: number;
  cloud_density: number;
  rain_factor: number;
};

export type NormalizedDailyWeather = {
  date: number;
  temp_min: number;
  temp_max: number;
  cloud_density: number;
  rain_factor: number;
};

export type NormalizedWeather = {
  current: NormalizedCurrentWeather;
  hourly: NormalizedHourlyWeather[];
  daily: NormalizedDailyWeather[];
};

/* ------------------------------
   Public Function
-------------------------------- */

export async function getWeather(
  query: WeatherQuery
): Promise<NormalizedWeather> {
  const response = await fetch(buildWeatherUrl(query), {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Weather fetch failed");
  }

  const providerData = await response.json();
  return normalizeProviderWeather(providerData);
}

/* ------------------------------
   Helpers
-------------------------------- */

function buildWeatherUrl(query: WeatherQuery): string {
  if (query.kind === "coords") {
    const params = new URLSearchParams({
      lat: String(query.lat),
      lon: String(query.lng),
    });

    return `/api/weather?${params.toString()}`;
  }

  const params = new URLSearchParams({
    city: query.manual_city,
  });

  return `/api/weather?${params.toString()}`;
}

function normalizeProviderWeather(data: any): NormalizedWeather {
  const current: NormalizedCurrentWeather = {
    temp: data.current?.temp ?? 0,
    condition: data.current?.condition ?? "Unknown",
    cloud_density: clamp((data.current?.clouds ?? 0) / 100, 0, 1),
    rain_factor: clamp(extractRainFactor(data.current), 0, 1),
    storm_factor: clamp(extractStormFactor(data.current), 0, 1),
    label: data.location?.name ?? "",
  };

  const hourly: NormalizedHourlyWeather[] = (data.hourly ?? []).map((h: any) => ({
    timestamp: h.dt * 1000,
    temp: h.temp ?? 0,
    cloud_density: clamp((h.clouds ?? 0) / 100, 0, 1),
    rain_factor: clamp(extractRainFactor(h), 0, 1),
  }));

  const daily: NormalizedDailyWeather[] = (data.daily ?? []).map((d: any) => ({
    date: d.dt * 1000,
    temp_min: d.temp?.min ?? 0,
    temp_max: d.temp?.max ?? 0,
    cloud_density: clamp((d.clouds ?? 0) / 100, 0, 1),
    rain_factor: clamp(extractRainFactor(d), 0, 1),
  }));

  return { current, hourly, daily };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function extractRainFactor(obj: any): number {
  if (!obj) {
    return 0;
  }

  if (obj.rain?.["1h"]) {
    return clamp(obj.rain["1h"] / 10, 0, 1);
  }

  return 0;
}

function extractStormFactor(obj: any): number {
  const condition = obj?.condition?.toLowerCase?.() ?? "";

  if (condition.includes("storm") || condition.includes("thunder")) {
    return 1;
  }

  return 0;
}