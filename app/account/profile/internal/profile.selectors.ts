/* ==========================================================
   OUTFLO — PROFILE SELECTORS
   File: app/account/profile/internal/profile.selectors.ts
   Scope: Provide local profile view-model derivation helpers
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: initial selectors for profile page identity shaping
   ========================================================== */

export function getFullName(firstName: string, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ").trim();
}

export function getUsername(username: string | null) {
  if (!username) return null;
  const clean = username.trim().replace(/^@+/, "");
  return clean ? `@${clean}` : null;
}

export function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "O";
}