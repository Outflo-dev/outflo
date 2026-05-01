"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD HANDLE
   File: app/account/profile/internal/card/ProfileCardHandle.tsx
   Scope: Render the ProfileCard drag handle
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type Props = {
    dragHandlers?: {
        onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
        onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
        onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
        onPointerCancel?: React.PointerEventHandler<HTMLDivElement>;
    };
};

/* ------------------------------
   Constants
-------------------------------- */
const HANDLE_WRAP_STYLE: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: 2,
    paddingBottom: 12,
    flexShrink: 0,
};

const HANDLE_STYLE: React.CSSProperties = {
    width: "var(--bottom-card-handle-width)",
    height: "var(--bottom-card-handle-height)",
    borderRadius: 999,
    background: "var(--bottom-card-handle-bg)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileCardHandle({ dragHandlers }: Props) {
    return (
        <div style={HANDLE_WRAP_STYLE} {...dragHandlers}>
            <div style={HANDLE_STYLE} />
        </div>
    );
}