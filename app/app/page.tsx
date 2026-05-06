/* ==========================================================
   OUTFLO — APP ROOT
   File: app/app/page.tsx
   Scope: Render authenticated controls doorway
   Last Updated:
   - ms: 1778110410006
   - iso: 2026-05-06T23:33:30.006Z
   - note: restore app controls surface with active money time tiles and left-aligned control buttons
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import Link from "next/link";

import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Page
-------------------------------- */
export default function AppRootPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        padding: "max(24px, 6vh) 0px",
        display: "grid",
        placeItems: "center",
        width: "100%",
      }}
    >
      <AppFrame>
        <section
          style={{
            width: "100%",
            display: "grid",
            rowGap: 20,
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "grid", rowGap: 8 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Outflō
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Systems
            </div>

            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Runtime doorway
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--border-soft)",
              background: "var(--surface-muted)",
              borderRadius: 24,
              padding: "18px",
              display: "grid",
              rowGap: 6,
            }}
          >
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
              System running
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 650,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              1390:23:03
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <Tile href="/app/money" label="Money" enabled />
            <Tile href="/app/time" label="Time" enabled />
            <Tile href="/app/weather" label="Weather" enabled={false} />
            <Tile href="/app/environment" label="Environment" enabled={false} />
          </div>

          <nav
            aria-label="Control navigation"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 8,
              flexWrap: "wrap",
              paddingTop: 2,
            }}
          >
            <ControlButton href="/account/profile" label="Profile" />
            <ControlButton href="/app/systems" label="Systems" />
            <ControlButton href="/" label="Portal" />
          </nav>
        </section>
      </AppFrame>
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
    color: "var(--text-primary)",
    border: "1px solid var(--border-soft)",
    background: "var(--surface-soft)",
    borderRadius: 24,
    padding: "20px 18px",
    height: 132,
    display: "grid",
    alignContent: "space-between",
    opacity: enabled ? 1 : 0.38,
    pointerEvents: enabled ? "auto" : "none",
    boxSizing: "border-box",
  };

  const content = (
    <>
      <div style={{ fontSize: 20, fontWeight: 650 }}>{label}</div>

      <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
        {enabled ? "Open" : "Soon"}
      </div>
    </>
  );

  if (!enabled) {
    return <div style={style}>{content}</div>;
  }

  return (
    <Link href={href} style={style}>
      {content}
    </Link>
  );
}

/* ------------------------------
   Control Button
-------------------------------- */
function ControlButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-primary)",
        textDecoration: "none",
        fontSize: 13,
        border: "1px solid var(--border-soft)",
        background: "var(--surface-soft)",
        borderRadius: 999,
        padding: "9px 14px",
      }}
    >
      {label}
    </Link>
  );
}