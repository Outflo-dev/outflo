"use client";

/* ==========================================================
   OUTFLO — PROFILE USERNAME PILL
   File: app/account/profile/internal/ProfileUsernamePill.tsx
   Scope: Display-only username pill for profile identity row
   Last Updated:
   - ms: 1776994863515
   - iso: 2026-04-24T01:41:03.515Z
   - note: extract username display from legacy ProfileSecretActions into PillLabel-based component
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import PillLabel from "@/components/system/shell/buttons/types/pill/PillLabel";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  username: string | null;
};

/* ------------------------------
   Helpers
-------------------------------- */
function formatUsername(username: string | null) {
  if (!username) return "@outflo";
  return username.startsWith("@") ? username : `@${username}`;
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileUsernamePill({ username }: Props) {
  const label = formatUsername(username);

  return (
    <PillLabel variant="muted">
      <span
        style={{
          letterSpacing: -0.2,
        }}
      >
        {label}
      </span>
    </PillLabel>
  );
}