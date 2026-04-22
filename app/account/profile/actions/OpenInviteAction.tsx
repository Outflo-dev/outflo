"use client";

/* ==========================================================
   OUTFLO — OPEN INVITE ACTION
   File: app/account/profile/actions/OpenInviteAction.tsx
   Scope: Trigger boundary for opening the profile invite route
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: preserve invite route trigger in route-owned header action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButtonLink from "@/components/system/shell/buttons/types/icon/IconButtonLink";
import Motion from "@/components/system/primitives/motion/Motion";

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
      <Motion show direction="up">
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
      </Motion>
    </IconButtonLink>
  );
}