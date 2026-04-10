"use client";

/* ==========================================================
   OUTFLO — PROFILE SECRET ACTIONS
   File: app/account/profile/ProfileSecretActions.tsx
   Scope: Hidden profile actions + surfaced controls sheet (photo mode)
   Last Updated:
   - ms: 1775700870557
   - iso: 2026-04-09T02:14:30.557Z
   - note: add controls sheet with avatar_mode toggle (additive only)
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

  const [showControls, setShowControls] = useState(false);
  const [closingControls, setClosingControls] = useState(false);

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

  /* ------------------------------
     Handlers — Controls
  -------------------------------- */
  async function updateAvatarMode(mode: "image" | "initial") {
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_mode: mode }),
      });
    } catch (err) {
      console.error("Failed to update avatar_mode", err);
    }

    setClosingControls(true);
    setTimeout(() => {
      setShowControls(false);
      setClosingControls(false);
    }, 220);
  }

  function closeControls() {
    setClosingControls(true);
    setTimeout(() => {
      setShowControls(false);
      setClosingControls(false);
    }, 220);
  }

  return (
    <>
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

        {/* Controls */}
        <button
          onClick={() => setShowControls(true)}
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
            border: "none",
            cursor: "pointer",
          }}
        >
          Controls
        </button>

        {/* Secret Sign Out (UNCHANGED) */}
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

      {/* ------------------------------
         UI: Controls Sheet
      -------------------------------- */}
      {showControls ? (
        <div
          onClick={closeControls}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
            opacity: closingControls ? 0 : 1,
            transition: "opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 640,
              margin: "0 auto",
              paddingLeft: 16,
              paddingRight: 16,
              background: "#000",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "16px",
              opacity: closingControls ? 0 : 1,
              transform: closingControls ? "translateY(24px)" : "translateY(0)",
              transition:
                 "opacity 270ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              style={{
                color: textPrimary,
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              Photo
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <button
                onClick={() => updateAvatarMode("image")}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.14)",
                  color: textPrimary,
                  border: "none",
                }}
              >
                On
              </button>

              <button
                onClick={() => updateAvatarMode("initial")}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  color: textPrimary,
                  border: "none",
                }}
              >
                Off
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={closeControls}
                style={{
                  background: "none",
                  border: "none",
                  color: textPrimary,
                  fontSize: 13,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}