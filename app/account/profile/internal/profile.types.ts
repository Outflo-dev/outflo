/* ==========================================================
   OUTFLO — PROFILE TYPES
   File: app/account/profile/internal/profile.types.ts
   Scope: Define local profile page contracts and shared types
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: initial type definitions for profile spine
   ========================================================== */

export type ProfileSectionKey =
  | "identity"
  | "account"
  | "environment"
  | "orbit"
  | "social"
  | "epoch"
  | "footer";

export type ProfileDirection = "up" | "down";

export type ProfileRouteProps = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  initial: string;
  epochMs: number;
};

export type ProfileSectionItem = {
  href: string;
  label: string;
};

export type ProfileSectionConfig = {
  key: ProfileSectionKey;
  title: string;
};

export type ProfileViewProps = ProfileRouteProps & {
  show: boolean;
  direction: ProfileDirection;
  sheetOpen: boolean;
  onDismiss: () => void;
  onOpenPortal: () => void;
  onOpenPhotoSheet: () => void;
  onClosePhotoSheet: () => void;
};