"use client";

/* ==========================================================
   OUTFLO — SYSTEMS ROOT
   File: app/app/systems/page.tsx
   Scope: Render system selector for authenticated app surfaces
   Last Updated:
   - ms: 1778107087301
   - iso: 2026-05-06T22:38:07.301Z
   - note: add tool entries, remove app link, and reveal controls through secret tap
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Constants
-------------------------------- */
const SECRET_TAP_TARGET = 7;

/* ------------------------------
   Page
-------------------------------- */
export default function SystemsPage() {
  const [secretTaps, setSecretTaps] = useState(0);
  const controlsRevealed = secretTaps >= SECRET_TAP_TARGET;

  function handleSecretTap() {
    setSecretTaps((current) => {
      if (current >= SECRET_TAP_TARGET) {
        return current;
      }

      return current + 1;
    });
  }

  return (
    <main
      style={{
        minHeight: "100svh",
        background:
          "radial-gradient(circle at top, var(--surface-soft), transparent 34%), var(--bg-primary)",
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
            rowGap: 22,
            boxSizing: "border-box",
          }}
        >
          <header
            style={{
              display: "grid",
              rowGap: 8,
            }}
          >
            <button
              type="button"
              onClick={handleSecretTap}
              aria-label="Systems"
              style={{
                appearance: "none",
                border: 0,
                background: "transparent",
                color: "var(--text-tertiary)",
                padding: 0,
                width: "fit-content",
                font: "inherit",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "default",
              }}
            >
              Systems
            </button>

            <div
              style={{
                fontSize: "clamp(38px, 8vw, 58px)",
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              Outflō
            </div>

            <div
              style={{
                maxWidth: 420,
                fontSize: 15,
                lineHeight: 1.45,
                color: "var(--text-secondary)",
              }}
            >
              Substrates, tools, and system surfaces.
            </div>
          </header>

          <div style={{ display: "grid", rowGap: 14 }}>
            <SectionLabel>Substrates</SectionLabel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              <Tile
                href="/app/money"
                label="Money"
                detail="Outflow surface"
                enabled
              />

              <Tile
                href="/app/time"
                label="Time"
                detail="Runtime clock"
                enabled
              />

              <div style={{ gridColumn: "1 / -1" }}>
                <Tile
                  href="/app/carbon"
                  label="Carbon"
                  detail="Future substrate"
                  enabled={false}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 14 }}>
            <SectionLabel>Tools</SectionLabel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              <Tile
                href="/tools/gain"
                label="Gain"
                detail="Daily under-outflow"
                enabled
              />

              <Tile
                href="/tools/compression"
                label="Orbit Money"
                detail="Annualized cadence"
                enabled
              />
            </div>
          </div>

          {controlsRevealed ? (
            <div style={{ display: "grid", rowGap: 14 }}>
              <SectionLabel>Control</SectionLabel>

              <Tile
                href="/account/profile"
                label="Controls"
                detail="Profile control surface"
                enabled
                prefetch={false}
              />
            </div>
          ) : null}
        </section>
      </AppFrame>
    </main>
  );
}

/* ------------------------------
   Section Label
-------------------------------- */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 650,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------
   Tile
-------------------------------- */
function Tile({
  href,
  label,
  detail,
  enabled,
  prefetch,
}: {
  href: string;
  label: string;
  detail: string;
  enabled: boolean;
  prefetch?: boolean;
}) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "var(--text-primary)",
    border: "1px solid var(--border-soft)",
    background: "linear-gradient(180deg, var(--surface-soft), var(--surface-muted))",
    borderRadius: 26,
    padding: "22px 20px",
    minHeight: 132,
    display: "grid",
    alignContent: "space-between",
    opacity: enabled ? 1 : 0.35,
    boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
  };

  const content = (
    <>
      <div style={{ display: "grid", rowGap: 6 }}>
        <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.03em" }}>
          {label}
        </div>

        <div
          style={{
            fontSize: 13,
            lineHeight: 1.35,
            color: "var(--text-tertiary)",
          }}
        >
          {detail}
        </div>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        {enabled ? "Open" : "Soon"}
      </div>
    </>
  );

  if (!enabled) {
    return <div style={style}>{content}</div>;
  }

  return (
    <Link href={href} prefetch={prefetch} style={style}>
      {content}
    </Link>
  );
}