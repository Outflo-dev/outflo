"use client";

/* ==========================================================
   OUTFLO — SYSTEMS ROOT
   File: app/app/systems/page.tsx
   Scope: Render system selector for authenticated app surfaces
   Last Updated:
   - ms: 1778110410006
   - iso: 2026-05-06T23:33:30.006Z
   - note: refine systems launcher with substrate tools runtime placement and secret controls access
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
              rowGap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={handleSecretTap}
                aria-label="Reveal controls"
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

              {controlsRevealed ? (
                <Link
                  href="/app"
                  prefetch={false}
                  style={{
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    fontSize: 13,
                    border: "1px solid var(--border-soft)",
                    background: "var(--surface-soft)",
                    borderRadius: 999,
                    padding: "8px 13px",
                  }}
                >
                  Controls
                </Link>
              ) : null}
            </div>

            <div
              style={{
                display: "grid",
                rowGap: 8,
              }}
            >
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
            </div>
          </header>

          <div
            style={{
              border: "1px solid var(--border-soft)",
              background:
                "linear-gradient(180deg, var(--surface-soft), var(--surface-muted))",
              borderRadius: 28,
              padding: "18px",
              display: "grid",
              rowGap: 6,
              boxShadow: "0 18px 60px rgba(0,0,0,0.16)",
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

              <Tile
                href="/app/weather"
                label="Weather"
                detail="Atmospheric substrate"
                enabled={false}
              />

              <Tile
                href="/app/environment"
                label="Environment"
                detail="External state"
                enabled={false}
              />
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
}: {
  href: string;
  label: string;
  detail: string;
  enabled: boolean;
}) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "var(--text-primary)",
    border: "1px solid var(--border-soft)",
    background:
      "linear-gradient(180deg, var(--surface-soft), var(--surface-muted))",
    borderRadius: 26,
    padding: "22px 20px",
    minHeight: 132,
    display: "grid",
    alignContent: "space-between",
    opacity: enabled ? 1 : 0.35,
    boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
  };

  const content = (
    <>
      <div style={{ display: "grid", rowGap: 6 }}>
        <div
          style={{
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
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
    <Link href={href} style={style}>
      {content}
    </Link>
  );
}