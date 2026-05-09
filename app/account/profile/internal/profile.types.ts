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

export type ProfileCardPanel = "avatar" | "controls" | "theme";

export type ProfileViewProps = ProfileRouteProps & {
  show: boolean;
  direction: ProfileDirection;

  cardPanel: ProfileCardPanel | null;
  cardOpen: boolean;

  onDismiss: () => void;
  onOpenPortal: () => void;
  onOpenAvatarPanel: () => void;
  onOpenControlsPanel: () => void;
  onChangeCardPanel: (panel: ProfileCardPanel) => void;
  onCloseCard: () => void;
};