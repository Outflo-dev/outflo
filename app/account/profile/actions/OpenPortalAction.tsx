"use client";

/* ==========================================================
   OUTFLO — OPEN PORTAL ACTION
   File: app/account/profile/actions/OpenPortalAction.tsx
   Scope: Trigger boundary for exiting profile to the public portal
   Last Updated:
   - ms: 1778290038937
   - iso: 2026-05-09T01:27:18.937Z
   - note: remove nested icon motion from portal trigger
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";

/* ------------------------------
   Types
-------------------------------- */
type OpenPortalActionProps = {
  textPrimary: string;
  iconSurface: string;
  onOpenPortal: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OpenPortalAction({
  textPrimary,
  iconSurface,
  onOpenPortal,
}: OpenPortalActionProps) {
  return (
    <IconButton
      ariaLabel="Go to portal"
      onClick={onOpenPortal}
      style={{
        background: iconSurface,
        color: textPrimary,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "block",
          fontSize: 18,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ↗
      </span>
    </IconButton>
  );
}