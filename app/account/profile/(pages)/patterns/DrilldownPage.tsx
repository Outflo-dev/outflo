"use client";

/* ==========================================================
   OUTFLO — DRILLDOWN PAGE (PATTERN)
   File: app/account/profile/(pages)/patterns/DrilldownPage.tsx
   Scope: Shared drill-down page pattern with motion + frame + back behavior
   Last Updated:
   - ms: 1776817363338
   - iso: 2026-04-22T00:22:43.338Z
   - note: initial drill-down pattern aligned to chevron-direction motion law
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import Motion, { MOTION_DURATION_MS } from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Types
-------------------------------- */
type DrilldownPageProps = {
  title: string;
  description: string;
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
      <main
        style={{
          minHeight: "100vh",
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >
        <AppFrame>
          <div style={{ width: "100%" }}>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.1,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                margin: "12px 0 0",
                maxWidth: 560,
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.68)",
              }}
            >
              {description}
            </p>

            <button
              type="button"
              onClick={handleBack}
              style={{
                marginTop: 24,
                background: "transparent",
                border: "none",
                padding: 0,
                color: "rgba(255,255,255,0.82)",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ← Back to Profile
            </button>
          </div>
        </AppFrame>
      </main>
    </Motion>
  );
}