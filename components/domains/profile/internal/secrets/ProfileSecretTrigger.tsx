"use client";

/* ==========================================================
   OUTFLO — PROFILE SECRET TRIGGER
   File: app/account/profile/ProfileSecretTrigger.tsx
   Scope: Triple-tap avatar trigger for hidden profile actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useRef } from "react";

/* ------------------------------
   Constants
-------------------------------- */
const TAP_WINDOW_MS = 500;

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSecretTrigger() {
  const tapCountRef = useRef(0);
  const lastTapRef = useRef(0);

  function handleTap() {
    const now = Date.now();

    if (now - lastTapRef.current <= TAP_WINDOW_MS) {
      tapCountRef.current += 1;
    } else {
      tapCountRef.current = 1;
    }

    lastTapRef.current = now;

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;

      window.dispatchEvent(new CustomEvent("outflo:profile-secret-reveal"));

      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-label="Reveal profile actions"
      style={{
        position: "absolute",
        inset: 0,
        border: "none",
        background: "transparent",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        borderRadius: "50%",
        touchAction: "manipulation",
      }}
    />
  );
}