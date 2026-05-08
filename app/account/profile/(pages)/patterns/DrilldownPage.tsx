"use client";

/* ==========================================================
   OUTFLO — DRILLDOWN PAGE (PATTERN)
   File: app/account/profile/(pages)/patterns/DrilldownPage.tsx
   Scope: Shared drill-down page pattern with motion frame and back behavior
   Last Updated:
   - ms: 1778208600000
   - iso: 2026-05-08T02:50:00.000Z
   - note: align drilldown pattern to theme tokens and system pill back action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import Motion, {
  MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";
import PillButtonLink from "@/components/system/shell/buttons/types/pill/PillButtonLink";

/* ------------------------------
   Types
-------------------------------- */
type DrilldownPageProps = {
  title: string;
  description: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const MAIN_STYLE: React.CSSProperties = {
  minHeight: "100svh",
  background: "var(--bg-primary)",
  color: "var(--text-primary)",
  paddingTop: "max(24px, env(safe-area-inset-top))",
  paddingBottom: "max(40px, env(safe-area-inset-bottom))",
};

const SURFACE_STYLE: React.CSSProperties = {
  width: "100%",
  display: "grid",
  rowGap: 24,
};

const HEADER_STYLE: React.CSSProperties = {
  display: "grid",
  rowGap: 12,
};

const TITLE_STYLE: React.CSSProperties = {
  margin: 0,
  fontSize: 28,
  lineHeight: 1.1,
  fontWeight: 700,
  color: "var(--text-primary)",
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  margin: 0,
  maxWidth: 560,
  fontSize: 15,
  lineHeight: 1.7,
  color: "var(--text-secondary)",
};

const PLACEHOLDER_STYLE: React.CSSProperties = {
  border: "1px solid var(--border-soft)",
  background: "var(--surface-muted)",
  borderRadius: 24,
  padding: 18,
  display: "grid",
  rowGap: 8,
};

const PLACEHOLDER_LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 650,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-tertiary)",
};

const PLACEHOLDER_TEXT_STYLE: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function DrilldownPage({
  title,
  description,
}: DrilldownPageProps) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  function handleBack() {
    setDirection("left");
    setShow(false);

    window.setTimeout(() => {
      window.history.back();
    }, MOTION_DURATION_MS);
  }

  return (
    <Motion show={show} direction={direction}>
      <main style={MAIN_STYLE}>
        <AppFrame>
          <section style={SURFACE_STYLE}>
            <div>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  appearance: "none",
                  border: 0,
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <PillButtonLink href="/account/profile" variant="muted">
                  ← Profile
                </PillButtonLink>
              </button>
            </div>

            <header style={HEADER_STYLE}>
              <h1 style={TITLE_STYLE}>{title}</h1>
              <p style={DESCRIPTION_STYLE}>{description}</p>
            </header>

            <div style={PLACEHOLDER_STYLE}>
              <div style={PLACEHOLDER_LABEL_STYLE}>Coming next</div>
              <div style={PLACEHOLDER_TEXT_STYLE}>
                This surface is reserved for profile-owned setup and controls.
              </div>
            </div>
          </section>
        </AppFrame>
      </main>
    </Motion>
  );
}