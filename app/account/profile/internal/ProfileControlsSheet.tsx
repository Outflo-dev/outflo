"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLS SHEET
   File: app/account/profile/internal/ProfileControlsSheet.tsx
   Scope: Local overlay surface for profile controls actions
   Last Updated:
   - ms: 1776997406742
   - iso: 2026-04-24T02:23:26.742Z
   - note: extract profile controls overlay from legacy ProfileSecretActions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { COLOR } from "@/components/system/primitives/color/color.config";
import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  closing: boolean;
  onClose: () => void;
  onUseImage: () => void;
  onUseInitial: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileControlsSheet({
  closing,
  onClose,
  onUseImage,
  onUseInitial,
}: Props) {
  return (
    <div
      role="dialog"
      aria-label="Profile controls"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "rgba(0, 0, 0, 0.42)", // keep for now (overlay)
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
          background: COLOR.surface.base,
          border: `1px solid ${COLOR.border.soft}`,
          padding: "14px 14px 18px",
          transform: closing ? "translateY(16px)" : "translateY(0px)",
          opacity: closing ? 0 : 1,
          transition:
            "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
        }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 999,
            background: COLOR.surface.soft,
            margin: "0 auto 14px",
          }}
        />

        <div
          style={{
            color: COLOR.text.primary,
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
            onClick={onUseImage}
            style={{
              minHeight: 48,
              borderRadius: 16,
              border: `1px solid ${COLOR.border.soft}`,
              background: COLOR.surface.muted,
              color: COLOR.text.primary,
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
            onClick={onUseInitial}
            style={{
              minHeight: 48,
              borderRadius: 16,
              border: `1px solid ${COLOR.border.soft}`,
              background: COLOR.surface.muted,
              color: COLOR.text.primary,
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
            onClick={onClose}
            style={{
              minHeight: 48,
              borderRadius: 16,
              border: `1px solid ${COLOR.border.soft}`,
              background: "transparent",
              color: COLOR.text.secondary,
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
  );
}