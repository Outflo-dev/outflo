/* ==========================================================
   OUTFLO — APP ROOT
   File: app/app/page.tsx
   Scope: Render authenticated systems surface
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
            position: "relative",
          }}
        >
          <Link
            href="/account/profile"
            aria-label="Open profile"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "1px solid var(--border-soft)",
              background: "var(--surface-soft)",
              display: "grid",
              placeItems: "center",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 650,
            }}
          >
            E
          </Link>

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
            <Tile href="/app/money" label="Money" enabled={false} />
            <Tile href="/app/weather" label="Weather" enabled={false} />
            <Tile href="/app/environment" label="Environment" enabled={false} />
            <Tile href="/app/time" label="Time" enabled={false} />
          </div>

          <nav
            aria-label="Primary app navigation"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              paddingTop: 4,
            }}
          >
            <Pill href="/account/profile" label="Profile" active />
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

  return (
    <Link href={enabled ? href : "#"} style={style}>
      <div style={{ fontSize: 20, fontWeight: 650 }}>{label}</div>
      <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
        {enabled ? "Open" : "Soon"}
      </div>
    </Link>
  );
}

/* ------------------------------
   Pill
-------------------------------- */
function Pill({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-primary)",
        textDecoration: "none",
        fontSize: 13,
        border: "1px solid var(--border-soft)",
        background: active ? "var(--surface-soft)" : "var(--surface-muted)",
        borderRadius: 999,
        padding: "9px 14px",
        opacity: active ? 1 : 0.68,
      }}
    >
      {label}
    </Link>
  );
}