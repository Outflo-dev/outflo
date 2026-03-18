/* ==========================================================
   OUTFLO — SYSTEMS ROOT
   File: app/app/systems/page.tsx
   Scope: Render system selector for authenticated app surfaces
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import Link from "next/link";

/* ------------------------------
   Page
-------------------------------- */
export default function SystemsPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "black",
        color: "white",
        padding: "max(24px, 6vh) 0px",
        display: "grid",
        placeItems: "center",
        width: "100%",
      }}
    >
      <section
        style={{
          width: "100%",
          display: "grid",
          rowGap: 18,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.55 }}>Systems</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <Tile href="/app/money" label="Money" enabled />
          <Tile href="" label="Time" enabled={false} />

          <div style={{ gridColumn: "1 / -1" }}>
            <Tile href="" label="Carbon" enabled={false} />
          </div>
        </div>

        <div>
          <Link
            href="/app"
            style={{
              color: "white",
              opacity: 0.7,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            ← App
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------
   Tile
-------------------------------- */
function Tile({
  href,
  label,
  enabled,
}: {
  href: string;
  label: string;
  enabled: boolean;
}) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "white",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 22,
    padding: "22px 20px",
    height: 140,
    display: "grid",
    alignContent: "space-between",
    opacity: enabled ? 1 : 0.35,
    pointerEvents: enabled ? "auto" : "none",
  };

  return (
    <Link href={enabled ? href : "#"} style={style}>
      <div style={{ fontSize: 20, fontWeight: 650 }}>{label}</div>
      <div style={{ fontSize: 13, opacity: 0.55 }}>
        {enabled ? "Open" : "Soon"}
      </div>
    </Link>
  );
}