"use client";

/* ==========================================================
   OUTFLO — PROFILE SECRET ACTIONS
   File: app/account/profile/internal/ProfileSecretActions.tsx
   Scope: Render profile identity pills with visible username and controls plus secret logout reveal
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: restore visible username and controls pills while keeping logout behind secret reveal
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { useProfileSecretState } from "./profile.secret";

/* ------------------------------
   Types
-------------------------------- */
type ProfileSecretActionsProps = {
  username: string | null;
  logoutHref: string;
  textPrimary: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const PILL_STYLE: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1,
  padding: "8px 10px",
  borderRadius: 999,
};

const SOFT_PILL_STYLE: React.CSSProperties = {
  ...PILL_STYLE,
  background: "rgba(255,255,255,0.08)",
  color: "var(--text-primary)",
};

const DANGER_PILL_STYLE: React.CSSProperties = {
  ...PILL_STYLE,
  color: "rgba(255, 120, 120, 0.9)",
  background: "rgba(255, 80, 80, 0.10)",
  border: "1px solid rgba(255, 80, 80, 0.25)",
  textDecoration: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSecretActions({
  username,
  logoutHref,
  textPrimary,
}: ProfileSecretActionsProps) {
  const {
    showSecret,
    revealed,
    showControls,
    closingControls,
    openControls,
    closeControls,
    updateAvatarMode,
    resetHideTimer,
  } = useProfileSecretState();

  const usernameLabel = username
  ? username.startsWith("@")
    ? username
    : `@${username}`
  : "@outflo";

  return (
    <>
      <div
        onMouseEnter={showSecret ? resetHideTimer : undefined}
        onPointerDown={showSecret ? resetHideTimer : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            ...SOFT_PILL_STYLE,
            color: "rgba(255, 254, 250, 0.72)",
            letterSpacing: -0.2,
          }}
        >
          {usernameLabel}
        </div>

        <button
          type="button"
          onClick={openControls}
          style={{
            ...SOFT_PILL_STYLE,
            color: textPrimary,
            border: "none",
            cursor: "pointer",
          }}
        >
          Controls
        </button>

        <div
          style={{
            opacity: showSecret ? 1 : 0,
            transform: revealed ? "translateY(0px)" : "translateY(-4px)",
            pointerEvents: showSecret ? "auto" : "none",
            transition:
              "opacity 160ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Link href={logoutHref} style={DANGER_PILL_STYLE}>
            Log out
          </Link>
        </div>
      </div>

      {showControls ? (
        <div
          role="dialog"
          aria-label="Profile controls"
          onClick={closeControls}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 120,
            background: "rgba(0, 0, 0, 0.42)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 640,
              borderRadius: 28,
              background: "#0f0f10",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "14px 14px 18px",
              transform: closingControls
                ? "translateY(16px)"
                : "translateY(0px)",
              opacity: closingControls ? 0 : 1,
              transition:
                "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 999,
                background: "rgba(255,255,255,0.16)",
                margin: "0 auto 14px",
              }}
            />

            <div
              style={{
                color: textPrimary,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: -0.2,
                marginBottom: 12,
              }}
            >
              Profile controls
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <button
                type="button"
                onClick={() => updateAvatarMode("image")}
                style={{
                  minHeight: 48,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: textPrimary,
                  fontSize: 14,
                  textAlign: "left",
                  padding: "0 14px",
                  cursor: "pointer",
                }}
              >
                Use profile image
              </button>

              <button
                type="button"
                onClick={() => updateAvatarMode("initial")}
                style={{
                  minHeight: 48,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: textPrimary,
                  fontSize: 14,
                  textAlign: "left",
                  padding: "0 14px",
                  cursor: "pointer",
                }}
              >
                Use initial
              </button>

              <button
                type="button"
                onClick={closeControls}
                style={{
                  minHeight: 48,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  color: "rgba(255, 254, 250, 0.72)",
                  fontSize: 14,
                  textAlign: "left",
                  padding: "0 14px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}