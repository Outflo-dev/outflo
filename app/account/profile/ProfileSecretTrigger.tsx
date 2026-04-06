"use client";

/* ==========================================================
   OUTFLO — PROFILE SECRET TRIGGER
   File: app/account/profile/ProfileSecretTrigger.tsx
   Scope: Triple-tap avatar trigger for hidden profile actions
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSecretTrigger() {
  let tapCount = 0;
  let lastTap = 0;

  function handleTap() {
    const now = Date.now();

    if (now - lastTap <= 500) {
      tapCount += 1;
    } else {
      tapCount = 1;
    }

    lastTap = now;

    if (tapCount >= 3) {
      tapCount = 0;

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
      }}
    />
  );
}