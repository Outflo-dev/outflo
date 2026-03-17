/* ==========================================================
   OUTFLO — UI ENTRY TILE
   File: components/ui/EntryTile.tsx
   Purpose: Render one canonical Outflō entry tile
   ========================================================== */

"use client";

/* ------------------------------
   Types
-------------------------------- */
export type EntryTileProps = {
  title: string;
  status?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const TILE_STYLE: React.CSSProperties = {
  width: "100%",
  minHeight: 112,
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "#000000",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 16,
  textAlign: "left",
};

const INTERACTIVE_STYLE: React.CSSProperties = {
  cursor: "pointer",
  transition: "border-color 160ms ease, transform 160ms ease, opacity 160ms ease",
};

const DISABLED_STYLE: React.CSSProperties = {
  opacity: 0.56,
  cursor: "not-allowed",
};

const TITLE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFFEFA",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 24,
  lineHeight: 1.15,
  fontWeight: 600,
  letterSpacing: "-0.02em",
};

const STATUS_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#B3B3B3",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 13,
  lineHeight: 1.3,
  fontWeight: 400,
};

const BUTTON_RESET_STYLE: React.CSSProperties = {
  appearance: "none",
  outline: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EntryTile({
  title,
  status,
  onClick,
  href,
  disabled = false,
  ariaLabel,
}: EntryTileProps) {
  const interactive = Boolean(onClick || href) && !disabled;

  if (href && !disabled) {
    return (
      <a
        href={href}
        aria-label={ariaLabel ?? title}
        style={{
          ...TILE_STYLE,
          ...INTERACTIVE_STYLE,
          textDecoration: "none",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          event.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          event.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseDown={(event) => {
          event.currentTarget.style.opacity = "0.96";
        }}
        onMouseUp={(event) => {
          event.currentTarget.style.opacity = "1";
        }}
      >
        <TileContent title={title} status={status} />
      </a>
    );
  }

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? title}
        style={{
          ...TILE_STYLE,
          ...INTERACTIVE_STYLE,
          ...BUTTON_RESET_STYLE,
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          event.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          event.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseDown={(event) => {
          event.currentTarget.style.opacity = "0.96";
        }}
        onMouseUp={(event) => {
          event.currentTarget.style.opacity = "1";
        }}
      >
        <TileContent title={title} status={status} />
      </button>
    );
  }

  return (
    <div
      aria-label={ariaLabel ?? title}
      style={{
        ...TILE_STYLE,
        ...(disabled ? DISABLED_STYLE : null),
      }}
    >
      <TileContent title={title} status={status} />
    </div>
  );
}

/* ------------------------------
   UI Surface
-------------------------------- */
type TileContentProps = {
  title: string;
  status?: string;
};

function TileContent({ title, status }: TileContentProps) {
  return (
    <>
      <h2 style={TITLE_STYLE}>{title}</h2>
      {status ? <p style={STATUS_STYLE}>{status}</p> : null}
    </>
  );
}