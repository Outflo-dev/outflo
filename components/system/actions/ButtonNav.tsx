/* ==========================================================
   OUTFLO — UI BOTTOM NAV
   File: components/ui/BottomNav.tsx
   Purpose: Render one canonical Outflō bottom navigation
   ========================================================== */

"use client";

import type { ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type BottomNavItem = {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

export type BottomNavProps = {
  items: BottomNavItem[];
};

/* ------------------------------
   Constants
-------------------------------- */
const NAV_STYLE: React.CSSProperties = {
  position: "fixed",
  left: "50%",
  bottom: 0,
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: 480,
  height: 56,
  padding: "0 12px calc(env(safe-area-inset-bottom, 0px) + 8px)",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  background: "#000000",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
  alignItems: "center",
  zIndex: 100,
};

const ITEM_BASE_STYLE: React.CSSProperties = {
  minHeight: 44,
  border: "none",
  background: "transparent",
  appearance: "none",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  cursor: "pointer",
  textDecoration: "none",
  transition: "opacity 160ms ease, transform 160ms ease, color 160ms ease",
};

const LABEL_STYLE: React.CSSProperties = {
  margin: 0,
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 13,
  lineHeight: 1.1,
  fontWeight: 400,
};

const ACTIVE_LABEL_STYLE: React.CSSProperties = {
  ...LABEL_STYLE,
  color: "#FFFEFA",
};

const INACTIVE_LABEL_STYLE: React.CSSProperties = {
  ...LABEL_STYLE,
  color: "#7A7A7A",
};

const DISABLED_STYLE: React.CSSProperties = {
  opacity: 0.4,
  cursor: "not-allowed",
};

const ICON_WRAP_STYLE: React.CSSProperties = {
  width: 16,
  height: 16,
  display: "grid",
  placeItems: "center",
  color: "inherit",
};

/* ------------------------------
   Component
-------------------------------- */
export default function BottomNav({ items }: BottomNavProps) {
  return (
    <nav aria-label="Primary" style={NAV_STYLE}>
      {items.map((item) => (
        <BottomNavItemNode key={item.key} item={item} />
      ))}
    </nav>
  );
}

/* ------------------------------
   UI Surface
-------------------------------- */
type BottomNavItemNodeProps = {
  item: BottomNavItem;
};

function BottomNavItemNode({ item }: BottomNavItemNodeProps) {
  const {
    label,
    href,
    onClick,
    icon,
    isActive = false,
    disabled = false,
    ariaLabel,
  } = item;

  const labelStyle = isActive ? ACTIVE_LABEL_STYLE : INACTIVE_LABEL_STYLE;
  const color = isActive ? "#FFFEFA" : "#7A7A7A";

  const commonStyle: React.CSSProperties = {
    ...ITEM_BASE_STYLE,
    color,
    ...(disabled ? DISABLED_STYLE : null),
  };

  if (href && !disabled) {
    return (
      <a
        href={href}
        aria-label={ariaLabel ?? label}
        aria-current={isActive ? "page" : undefined}
        style={commonStyle}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-1px)";
          event.currentTarget.style.opacity = "0.92";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "translateY(0)";
          event.currentTarget.style.opacity = "1";
        }}
      >
        {icon ? <span style={ICON_WRAP_STYLE}>{icon}</span> : null}
        <p style={labelStyle}>{label}</p>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel ?? label}
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      style={commonStyle}
      onMouseEnter={(event) => {
        if (disabled) return;
        event.currentTarget.style.transform = "translateY(-1px)";
        event.currentTarget.style.opacity = "0.92";
      }}
      onMouseLeave={(event) => {
        if (disabled) return;
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.opacity = "1";
      }}
    >
      {icon ? <span style={ICON_WRAP_STYLE}>{icon}</span> : null}
      <p style={labelStyle}>{label}</p>
    </button>
  );
}