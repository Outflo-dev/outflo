/* ==========================================================
   OUTFLO — PROFILE SECTIONS
   File: app/account/profile/internal/profile.sections.ts
   Scope: Define stable profile section order and page-owned navigation items
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: initial section map and account item list for profile rewrite
   ========================================================== */

import type { ProfileSectionConfig, ProfileSectionItem } from "./profile.types";

export const PROFILE_SECTION_ORDER: ProfileSectionConfig[] = [
  { key: "identity", title: "Identity" },
  { key: "account", title: "Account" },
  { key: "environment", title: "Environment" },
  { key: "orbit", title: "Orbit" },
  { key: "social", title: "Social" },
  { key: "epoch", title: "Epoch" },
  { key: "footer", title: "Footer" },
];

export const PROFILE_ACCOUNT_ITEMS: ProfileSectionItem[] = [
  { href: "/account/profile/account", label: "Account" },
  { href: "/account/profile/edit", label: "Edit profile" },
  { href: "/account/profile/environment", label: "Environment" },
  { href: "/account/profile/invite", label: "Invite friends" },
  { href: "/account/profile/money", label: "Money" },
  { href: "/account/profile/notifications", label: "Notifications" },
  { href: "/account/profile/privacy", label: "Privacy" },
  { href: "/account/profile/records", label: "Records" },
  { href: "/account/profile/support", label: "Support" },
];