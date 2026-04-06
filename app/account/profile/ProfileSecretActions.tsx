"use client";

/* ==========================================================
   OUTFLO — PROFILE SECRET ACTIONS
   File: app/account/profile/ProfileSecretActions.tsx
   Scope: Hidden profile actions revealed from avatar triple-tap
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ------------------------------
   Types
-------------------------------- */
type ProfileSecretActionsProps = {
  username: string | null;
  editHref: string;
  logoutHref: string;
  textPrimary: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const AUTO_HIDE_MS = 4000;
const EXIT_ANIMATION_MS = 160;

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSecretActions({
  username,
  editHref,
  logoutHref,
  textPrimary,
}: ProfileSecretActionsProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const hideTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);

  function clearTimers() {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (removeTimerRef.current) {
      window.clearTimeout(removeTimerRef.current);
      removeTimerRef.current = null;
    }
  }

  function resetHideTimer() {
    clearTimers();

    hideTimerRef.current = window.setTimeout(() => {
      setRevealed(false);

      removeTimerRef.current = window.setTimeout(() => {
        setShowSecret(false);
      }, EXIT_ANIMATION_MS);
    }, AUTO_HIDE_MS);
  }

  useEffect(() => {
    function onReveal() {
      clearTimers();
      setShowSecret(true);

      requestAnimationFrame(() => {
        setRevealed(true);
      });

      resetHideTimer();
    }

    window.addEventListener("outflo:profile-secret-reveal", onReveal);

    return () => {
      window.removeEventListener("outflo:profile-secret-reveal", onReveal);
      clearTimers();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
      }}
    >
      {username ? (
        <div
          style={{
            height: 32,
            padding: "0 16px",
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.10)",
            color: textPrimary,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: -0.2,
            lineHeight: 1,
            userSelect: "text",
            WebkitUserSelect: "text",
          }}
        >
          {username}
        </div>
      ) : null}

      <Link
        href={editHref}
        style={{
          height: 32,
          padding: "0 16px",
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          background: "rgba(255,255,255,0.10)",
          color: textPrimary,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: -0.2,
          lineHeight: 1,
        }}
      >
        Edit
      </Link>

      {showSecret ? (
        <Link
          href={logoutHref}
          style={{
            height: 32,
            padding: "0 16px",
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            background: "rgba(255, 80, 80, 0.14)",
            color: "rgba(255, 120, 120, 0.92)",
            border: "1px solid rgba(255, 80, 80, 0.24)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: -0.2,
            lineHeight: 1,
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? "translateY(0) scale(1)"
              : "translateY(6px) scale(0.96)",
            transition:
              "opacity 140ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Sign Out
        </Link>
      ) : null}
    </div>
  );
}