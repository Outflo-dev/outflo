/* ==========================================================
   OUTFLO — NAVIGATION CORE
   File: lib/navigation.ts
   Scope: Global navigation helpers for push, back, close, and depth detection
   Last Updated:
   - ms: 1775412646527
   - iso: 2026-04-05T18:10:46.527Z
   - note: introduce global navigation behavior layer before UI integration
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type NavState = {
  origin?: string;
  depth: number;
};

/* ------------------------------
   Helpers
-------------------------------- */

export function getDepthFromPath(pathname: string): number {
  if (!pathname) return 1;

  const segments = pathname.split("/").filter(Boolean);

  // root surfaces = 1
  return Math.max(1, segments.length);
}

/* ------------------------------
   Navigation Actions
-------------------------------- */

export function pushWithOrigin(
  href: string,
  currentPath: string
): string {
  const url = new URL(href, "http://n");

  if (!url.searchParams.get("origin")) {
    url.searchParams.set("origin", currentPath);
  }

  return url.pathname + url.search;
}

export function resolveBack(): number {
  return -1;
}

export function resolveClose(
  searchParams: URLSearchParams,
  fallback: string = "/app/home"
): string {
  return searchParams.get("origin") || fallback;
}

/* ------------------------------
   Visibility Rules
-------------------------------- */

export function shouldShowNav(depth: number): boolean {
  return depth === 1;
}