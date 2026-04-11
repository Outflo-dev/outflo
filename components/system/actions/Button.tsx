/* ==========================================================
   OUTFLO — UI BUTTON
   File: components/ui/Button.tsx
   Purpose: Render one canonical Outflō button
   ========================================================== */

"use client";

import type { ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "admin";

export type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const BASE_BUTTON_STYLE: React.CSSProperties = {
  minHeight: 44,
  padding: "0 16px",
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  appearance: "none",
  outline: "none",
  cursor: "pointer",
  transition: "border-color 160ms ease, opacity 160ms ease, transform 160ms ease, background 160ms ease",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 16,
  lineHeight: 1,
  fontWeight: 500,
  textAlign: "center",
  whiteSpace: "nowrap",
  textDecoration: "none",
};

const PRIMARY_STYLE: React.CSSProperties = {
  background: "#FFFEFA",
  color: "#000000",
  border: "1px solid #FFFEFA",
};

const SECONDARY_STYLE: React.CSSProperties = {
  background: "transparent",
  color: "#FFFEFA",
  border: "1px solid rgba(255,255,255,0.16)",
};

const GHOST_STYLE: React.CSSProperties = {
  background: "transparent",
  color: "#B3B3B3",
  border: "1px solid transparent",
};

const ADMIN_STYLE: React.CSSProperties = {
  background: "transparent",
  color: "#FFFEFA",
  border: "1px solid rgba(255,255,255,0.24)",
};

const DISABLED_STYLE: React.CSSProperties = {
  opacity: 0.44,
  cursor: "not-allowed",
  transform: "none",
};

/* ------------------------------
   Helpers
-------------------------------- */
function getVariantStyle(variant: ButtonVariant): React.CSSProperties {
  switch (variant) {
    case "secondary":
      return SECONDARY_STYLE;
    case "ghost":
      return GHOST_STYLE;
    case "admin":
      return ADMIN_STYLE;
    case "primary":
    default:
      return PRIMARY_STYLE;
  }
}

/* ------------------------------
   Component
-------------------------------- */
export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const style = {
    ...BASE_BUTTON_STYLE,
    ...getVariantStyle(variant),
    ...(disabled ? DISABLED_STYLE : null),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={style}
      onMouseEnter={(event) => {
        if (disabled) return;

        if (variant === "primary") {
          event.currentTarget.style.opacity = "0.92";
        }

        if (variant === "secondary" || variant === "admin") {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.32)";
        }

        if (variant === "ghost") {
          event.currentTarget.style.color = "#FFFEFA";
        }

        event.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(event) => {
        if (disabled) return;

        if (variant === "primary") {
          event.currentTarget.style.opacity = "1";
        }

        if (variant === "secondary") {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        }

        if (variant === "admin") {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.24)";
        }

        if (variant === "ghost") {
          event.currentTarget.style.color = "#B3B3B3";
        }

        event.currentTarget.style.transform = "translateY(0)";
      }}
      onMouseDown={(event) => {
        if (disabled) return;
        event.currentTarget.style.opacity = "0.9";
      }}
      onMouseUp={(event) => {
        if (disabled) return;

        if (variant === "primary") {
          event.currentTarget.style.opacity = "0.92";
        } else {
          event.currentTarget.style.opacity = "1";
        }
      }}
    >
      {children}
    </button>
  );
}