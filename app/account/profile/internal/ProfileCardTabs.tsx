"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD TABS
   File: app/account/profile/internal/ProfileCardTabs.tsx
   Scope: Own local profile card tab layout, icons, and active state display
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: refine profile card tab feel and icon balance
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import Avatar from "@/components/system/primitives/display/avatar/Avatar";

/* ------------------------------
   Types
-------------------------------- */
type ProfileCardPanel = "avatar" | "controls" | "theme";

type ProfileCardTabsProps = {
  activePanel: ProfileCardPanel | null;
  fullName: string;
  avatarUrl: string | null;
  onChangePanel: (panel: ProfileCardPanel) => void;
};

type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const TAB_BAR_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 8,
  marginBottom: 18,
};

const TAB_STYLE: React.CSSProperties = {
  position: "relative",
  minHeight: 54,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  background: "transparent",
  color: "var(--text-tertiary)",
  cursor: "pointer",
  opacity: 0.72,
  transform: "translateY(0)",
  transition:
    "opacity 180ms ease, color 180ms ease, transform 180ms ease, background 180ms ease",
};

const ACTIVE_TAB_STYLE: React.CSSProperties = {
  color: "var(--text-primary)",
  opacity: 1,
};

const ACTIVE_UNDERLINE_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: 3,
  width: 26,
  height: 2,
  borderRadius: 999,
  background: "var(--text-primary)",
  transform: "translateX(-50%)",
};

const ICON_STYLE: React.CSSProperties = {
  display: "block",
};

/* ------------------------------
   Icons
-------------------------------- */
function ControlsIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      style={ICON_STYLE}
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
      <circle cx="9" cy="7" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="11" cy="17" r="2" />
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={ICON_STYLE}
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.75v2.5" />
      <path d="M12 18.75v2.5" />
      <path d="M21.25 12h-2.5" />
      <path d="M5.25 12h-2.5" />
      <path d="m18.55 5.45-1.75 1.75" />
      <path d="m7.2 16.8-1.75 1.75" />
      <path d="m18.55 18.55-1.75-1.75" />
      <path d="m7.2 7.2-1.75-1.75" />
    </svg>
  );
}

/* ------------------------------
   Helpers
-------------------------------- */
function getTabStyle(active: boolean): React.CSSProperties {
  return {
    ...TAB_STYLE,
    ...(active ? ACTIVE_TAB_STYLE : null),
  };
}

/* ------------------------------
   Components
-------------------------------- */
function TabButton({
  label,
  active,
  onClick,
  children,
}: TabButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      style={getTabStyle(active)}
    >
      {children}

      {active && <div style={ACTIVE_UNDERLINE_STYLE} />}
    </button>
  );
}

export default function ProfileCardTabs({
  activePanel,
  fullName,
  avatarUrl,
  onChangePanel,
}: ProfileCardTabsProps) {
  return (
    <div style={TAB_BAR_STYLE}>
      <TabButton
        label="Avatar"
        active={activePanel === "avatar"}
        onClick={() => onChangePanel("avatar")}
      >
        <Avatar size="sm" value={fullName} src={avatarUrl} alt={fullName} />
      </TabButton>

      <TabButton
        label="Controls"
        active={activePanel === "controls"}
        onClick={() => onChangePanel("controls")}
      >
        <ControlsIcon />
      </TabButton>

      <TabButton
        label="Theme"
        active={activePanel === "theme"}
        onClick={() => onChangePanel("theme")}
      >
        <ThemeIcon />
      </TabButton>
    </div>
  );
}