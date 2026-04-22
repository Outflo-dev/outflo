"use client";

/* ==========================================================
   OUTFLO — OPEN PORTAL ACTION
   File: app/account/profile/actions/OpenPortalAction.tsx
   Scope: Trigger boundary for exiting profile to the public portal
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: wire portal trigger to controller-owned exit behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import Motion from "@/components/system/primitives/motion/Motion";

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
        transition: "opacity 120ms ease",
      }}
    >
      <Motion show={true} direction="up">
        <span
          style={{
            display: "block",
            fontSize: 18,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ↗
        </span>
      </Motion>
    </IconButton>
  );
}