"use client";

/* ==========================================================
   OUTFLO — PROFILE LOGOUT REVEAL
   File: app/account/profile/internal/ProfileLogoutReveal.tsx
   Scope: Secret-revealed logout pill for profile identity actions row
   Last Updated:
   - ms: 1776997355287
   - iso: 2026-04-24T02:22:35.287Z
   - note: extract secret logout reveal from legacy ProfileSecretActions into PillButtonLink-based component
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import PillButtonLink from "@/components/system/shell/buttons/types/pill/PillButtonLink";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  show: boolean;
  revealed: boolean;
  href: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileLogoutReveal({
  show,
  revealed,
  href,
}: Props) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: revealed ? "translateY(0px)" : "translateY(-4px)",
        pointerEvents: show ? "auto" : "none",
        transition:
          "opacity 160ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <PillButtonLink href={href} variant="danger">
        Log out
      </PillButtonLink>
    </div>
  );
}