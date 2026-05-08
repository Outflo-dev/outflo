/* ==========================================================
   OUTFLO — PROFILE SECTIONS
   File: app/account/profile/internal/profile.sections.ts
   Scope: Define stable profile section order and page-owned navigation items
   Last Updated:
   - ms: 1778208600000
   - iso: 2026-05-08T02:50:00.000Z
   - note: simplify profile menu language around account flows settings records and support
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileSectionConfig, ProfileSectionItem } from "./profile.types";

/* ------------------------------
   Sections
-------------------------------- */
export const PROFILE_SECTION_ORDER: ProfileSectionConfig[] = [
  { key: "identity", title: "Identity" },
  { key: "account", title: "Account" },
  { key: "environment", title: "Environment" },
  { key: "orbit", title: "Orbit" },
  { key: "social", title: "Social" },
  { key: "epoch", title: "Epoch" },
  { key: "footer", title: "Footer" },
];

/* ------------------------------
   Account Items
-------------------------------- */
export const PROFILE_ACCOUNT_ITEMS: ProfileSectionItem[] = [
  { href: "/account/profile/account", label: "Account" },
  { href: "/account/profile/flows", label: "Flows" },
  { href: "/account/profile/settings", label: "Settings" },
  { href: "/account/profile/records", label: "Records" },
  { href: "/account/profile/support", label: "Support" },
];