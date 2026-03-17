/* ==========================================================
   OUTFLO — UI CARD
   File: components/ui/Card.tsx
   Purpose: Render one canonical Outflō card object
   ========================================================== */

"use client";

/* ------------------------------
   Types
-------------------------------- */
export type CardProps = {
  topLeft: string;
  topRight?: string;
  value: string;
  bottomLeft?: string;
  bottomRight?: string;
  onClick?: () => void;
  ariaLabel?: string;
  isInteractive?: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const CARD_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "#000000",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const INTERACTIVE_STYLE: React.CSSProperties = {
  cursor: "pointer",
  transition: "border-color 160ms ease, transform 160ms ease, opacity 160ms ease",
};

const TOP_ROW_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const VALUE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFFEFA",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 32,
  lineHeight: 1.1,
  fontWeight: 600,
  letterSpacing: "-0.02em",
};

const TOP_TEXT_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#B3B3B3",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 13,
  lineHeight: 1.3,
  fontWeight: 400,
};

const BOTTOM_ROW_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const BOTTOM_TEXT_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#7A7A7A",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 13,
  lineHeight: 1.3,
  fontWeight: 400,
};

/* ------------------------------
   Component
-------------------------------- */
export default function Card({
  topLeft,
  topRight,
  value,
  bottomLeft,
  bottomRight,
  onClick,
  ariaLabel,
  isInteractive = false,
}: CardProps) {
  const interactive = Boolean(onClick) || isInteractive;

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        style={{
          ...CARD_STYLE,
          ...INTERACTIVE_STYLE,
          appearance: "none",
          textAlign: "left",
          outline: "none",
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
        <CardContent
          topLeft={topLeft}
          topRight={topRight}
          value={value}
          bottomLeft={bottomLeft}
          bottomRight={bottomRight}
        />
      </button>
    );
  }

  return (
    <div style={CARD_STYLE} aria-label={ariaLabel}>
      <CardContent
        topLeft={topLeft}
        topRight={topRight}
        value={value}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
      />
    </div>
  );
}

/* ------------------------------
   UI Surface
-------------------------------- */
type CardContentProps = Omit<CardProps, "onClick" | "ariaLabel" | "isInteractive">;

function CardContent({
  topLeft,
  topRight,
  value,
  bottomLeft,
  bottomRight,
}: CardContentProps) {
  return (
    <>
      <div style={TOP_ROW_STYLE}>
        <p style={TOP_TEXT_STYLE}>{topLeft}</p>
        {topRight ? <p style={TOP_TEXT_STYLE}>{topRight}</p> : null}
      </div>

      <p style={VALUE_STYLE}>{value}</p>

      {(bottomLeft || bottomRight) ? (
        <div style={BOTTOM_ROW_STYLE}>
          <p style={BOTTOM_TEXT_STYLE}>{bottomLeft ?? ""}</p>
          <p style={BOTTOM_TEXT_STYLE}>{bottomRight ?? ""}</p>
        </div>
      ) : null}
    </>
  );
}