/* ==========================================================
   OUTFLO — PROFILE SECRET STATE
   File: app/account/profile/internal/profile.secret.ts
   Scope: Own hidden profile action state, timers, reveal behavior, and controls sheet orchestration
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: extract secret reveal and controls behavior from legacy mixed profile file
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useRef, useState } from "react";

/* ------------------------------
   Constants
-------------------------------- */
const AUTO_HIDE_MS = 4000;
const EXIT_ANIMATION_MS = 160;
const CONTROLS_CLOSE_MS = 220;

/* ------------------------------
   Hook
-------------------------------- */
export function useProfileSecretState() {
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

  function revealSecret() {
    clearTimers();
    setShowSecret(true);

    requestAnimationFrame(() => {
      setRevealed(true);
    });

    resetHideTimer();
  }

  function openControls() {
    setShowControls(true);
    setClosingControls(false);
  }

  function closeControls() {
    setClosingControls(true);

    window.setTimeout(() => {
      setShowControls(false);
      setClosingControls(false);
    }, CONTROLS_CLOSE_MS);
  }

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

    closeControls();
  }

  useEffect(() => {
    function onReveal() {
      revealSecret();
    }

    window.addEventListener("outflo:profile-secret-reveal", onReveal);

    return () => {
      window.removeEventListener("outflo:profile-secret-reveal", onReveal);
      clearTimers();
    };
  }, []);

  return {
    showSecret,
    revealed,
    showControls,
    closingControls,
    openControls,
    closeControls,
    updateAvatarMode,
    resetHideTimer,
  };
}