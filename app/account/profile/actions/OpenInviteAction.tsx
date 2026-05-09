"use client";

/* ==========================================================
   OUTFLO — OPEN INVITE ACTION
   File: app/account/profile/actions/OpenInviteAction.tsx
   Scope: Trigger boundary for opening the profile invite route
   Last Updated:
   - ms: 1778290038937
   - iso: 2026-05-09T01:27:18.937Z
   - note: remove nested icon motion from invite trigger
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButtonLink from "@/components/system/shell/buttons/types/icon/IconButtonLink";

/* ------------------------------
   Types
-------------------------------- */
type OpenInviteActionProps = {
  textPrimary: string;
  iconSurface: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OpenInviteAction({
  textPrimary,
  iconSurface,
}: OpenInviteActionProps) {
  return (
    <IconButtonLink
      href="/account/profile/invite"
      ariaLabel="Open invite"
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
        ⌁
      </span>
    </IconButtonLink>
  );
}