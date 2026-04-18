"use client";

/* ==========================================================
   OUTFLO — PROFILE SECRET TRIGGER
   File: app/account/profile/actions/ProfileSecretTrigger.tsx
   Scope: Hidden trigger boundary for revealing profile secret actions
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: reduce secret trigger to a pure action boundary aligned to profile ownership rewrite
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSecretTrigger() {
  function handleReveal() {
    window.dispatchEvent(new Event("outflo:profile-secret-reveal"));
  }

  return (
    <button
      type="button"
      aria-label="Reveal profile actions"
      onClick={handleReveal}
      style={{
        position: "absolute",
        inset: 0,
        border: "none",
        background: "transparent",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        zIndex: 0,
      }}
    />
  );
}