"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD TABS
   File: app/account/profile/internal/ProfileCardTabs.tsx
   Scope: Own local profile card tab layout, icons, and active state display
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: extract profile card tab controls from ProfileView
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
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

/* ------------------------------
   Constants
-------------------------------- */
const TAB_BAR_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
  marginBottom: 18,
};

const TAB_STYLE: React.CSSProperties = {
  position: "relative",
  minHeight: 58,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  borderRadius: 18,
  background: "transparent",
  color: "var(--text-tertiary)",
  cursor: "pointer",
};

const ACTIVE_TAB_STYLE: React.CSSProperties = {
  color: "var(--text-primary)",
};

const ACTIVE_UNDERLINE_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: 0,
  width: 28,
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
      strokeWidth="1.8"
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={ICON_STYLE}
    >
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17h1.2a2.1 2.1 0 0 0 1.4-3.7 1.8 1.8 0 0 1 1.2-3.2h.7A4.1 4.1 0 0 0 20.5 9.5C20.5 6.2 16.8 3.5 12 3.5Z" />
      <circle cx="8.2" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="11.2" cy="7.2" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="8.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ------------------------------
   Helpers
-------------------------------- */
function getTabStyle(isActive: boolean): React.CSSProperties {
  return {
    ...TAB_STYLE,
    ...(isActive ? ACTIVE_TAB_STYLE : null),
  };
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileCardTabs({
  activePanel,
  fullName,
  avatarUrl,
  onChangePanel,
}: ProfileCardTabsProps) {
  return (
    <div style={TAB_BAR_STYLE}>
      <button
        type="button"
        aria-label="Avatar"
        aria-pressed={activePanel === "avatar"}
        onClick={() => onChangePanel("avatar")}
        style={getTabStyle(activePanel === "avatar")}
      >
        
    <Avatar size="sm" value={fullName} src={avatarUrl} alt={fullName} />

        {activePanel === "avatar" && <div style={ACTIVE_UNDERLINE_STYLE} />}
      </button>

      <button
        type="button"
        aria-label="Controls"
        aria-pressed={activePanel === "controls"}
        onClick={() => onChangePanel("controls")}
        style={getTabStyle(activePanel === "controls")}
      >
        <ControlsIcon />

        {activePanel === "controls" && <div style={ACTIVE_UNDERLINE_STYLE} />}
      </button>

      <button
        type="button"
        aria-label="Theme"
        aria-pressed={activePanel === "theme"}
        onClick={() => onChangePanel("theme")}
        style={getTabStyle(activePanel === "theme")}
      >
        <ThemeIcon />

        {activePanel === "theme" && <div style={ACTIVE_UNDERLINE_STYLE} />}
      </button>
    </div>
  );
}