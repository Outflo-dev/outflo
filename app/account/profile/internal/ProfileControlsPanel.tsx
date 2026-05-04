"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLS PANEL
   File: app/account/profile/internal/ProfileControlsPanel.tsx
   Scope: Profile display controls rendered inside ProfileCard
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: render profile-native visibility controls and quick actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ControlKey = "avatar" | "location" | "money" | "orbit";

type ControlState = Record<ControlKey, boolean>;

type ControlOption = {
   key: ControlKey;
   title: string;
   meta: string;
};

type ControlPillProps = {
   title: string;
   meta: string;
   active: boolean;
   onClick: () => void;
};

type ActionButtonProps = {
   label: string;
   onClick: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const CONTROLS: ControlOption[] = [
   {
      key: "avatar",
      title: "Avatar",
      meta: "Image",
   },
   {
      key: "location",
      title: "Location",
      meta: "Place",
   },
   {
      key: "money",
      title: "Outflow",
      meta: "Money",
   },
   {
      key: "orbit",
      title: "Orbit",
      meta: "Epoch",
   },
];

const ROOT_STYLE: React.CSSProperties = {
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   gap: 18,
};

const PREVIEW_STYLE: React.CSSProperties = {
   width: "100%",
   minHeight: 128,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
   gap: 12,
   border: "1px solid var(--border-soft)",
   borderRadius: 28,
   background: "var(--surface-muted)",
   padding: 18,
};

const PREVIEW_ORB_STYLE: React.CSSProperties = {
   width: 58,
   height: 58,
   borderRadius: 999,
   border: "1px solid var(--border-soft)",
   background: "var(--surface-soft)",
   boxShadow: "0 0 32px var(--glow-primary)",
};

const PREVIEW_LABEL_STYLE: React.CSSProperties = {
   margin: 0,
   color: "var(--text-tertiary)",
   fontSize: 13,
   lineHeight: 1.35,
};

const VISIBILITY_GRID_STYLE: React.CSSProperties = {
   width: "100%",
   display: "grid",
   gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
   gap: 10,
};

const CONTROL_PILL_STYLE: React.CSSProperties = {
   minHeight: 66,
   width: "100%",
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
   gap: 10,
   border: "1px solid var(--border-soft)",
   borderRadius: 22,
   background: "var(--surface-muted)",
   color: "var(--text-primary)",
   padding: "0 14px",
   cursor: "pointer",
   textAlign: "left",
};

const CONTROL_PILL_ACTIVE_STYLE: React.CSSProperties = {
   ...CONTROL_PILL_STYLE,
   background: "var(--surface-soft)",
};

const CONTROL_TEXT_STYLE: React.CSSProperties = {
   display: "flex",
   flexDirection: "column",
   gap: 3,
   minWidth: 0,
};

const CONTROL_TITLE_STYLE: React.CSSProperties = {
   fontSize: 15,
   fontWeight: 700,
   color: "var(--text-primary)",
};

const CONTROL_META_STYLE: React.CSSProperties = {
   fontSize: 12,
   color: "var(--text-tertiary)",
};

const CONTROL_MARK_STYLE: React.CSSProperties = {
   width: 22,
   height: 22,
   borderRadius: 999,
   border: "1px solid var(--border-soft)",
   background: "transparent",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   flexShrink: 0,
};

const CONTROL_MARK_ACTIVE_STYLE: React.CSSProperties = {
   ...CONTROL_MARK_STYLE,
   background: "var(--surface-soft)",
};

const CONTROL_DOT_STYLE: React.CSSProperties = {
   width: 8,
   height: 8,
   borderRadius: 999,
   background: "var(--text-primary)",
};

const ACTIONS_STYLE: React.CSSProperties = {
   display: "flex",
   flexDirection: "column",
   gap: 10,
   width: "100%",
};

const ACTION_BUTTON_STYLE: React.CSSProperties = {
   minHeight: 46,
   width: "100%",
   border: "1px solid var(--border-soft)",
   borderRadius: 999,
   background: "var(--surface-muted)",
   color: "var(--text-primary)",
   fontSize: 14,
   fontWeight: 500,
   cursor: "pointer",
};

/* ------------------------------
   Components
-------------------------------- */
function ControlPill({
   title,
   meta,
   active,
   onClick,
}: ControlPillProps) {
   return (
      <button
         type="button"
         aria-pressed={active}
         onClick={onClick}
         style={active ? CONTROL_PILL_ACTIVE_STYLE : CONTROL_PILL_STYLE}
      >
         <div style={CONTROL_TEXT_STYLE}>
            <div style={CONTROL_TITLE_STYLE}>{title}</div>
            <div style={CONTROL_META_STYLE}>{meta}</div>
         </div>

         <div style={active ? CONTROL_MARK_ACTIVE_STYLE : CONTROL_MARK_STYLE}>
            {active ? <div style={CONTROL_DOT_STYLE} /> : null}
         </div>
      </button>
   );
}

function ActionButton({ label, onClick }: ActionButtonProps) {
   return (
      <button type="button" style={ACTION_BUTTON_STYLE} onClick={onClick}>
         {label}
      </button>
   );
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileControlsPanel() {
   const [controls, setControls] = useState<ControlState>({
      avatar: true,
      location: true,
      money: true,
      orbit: true,
   });

   const activeCount = Object.values(controls).filter(Boolean).length;

   function toggleControl(key: ControlKey) {
      setControls((current) => ({
         ...current,
         [key]: !current[key],
      }));
   }

   function handleInvite() {
      window.location.href = "/account/profile/invite";
   }

   async function handleCopyProfileLink() {
      await window.navigator.clipboard.writeText(window.location.href);
   }

   return (
      <div style={ROOT_STYLE}>
         <div style={PREVIEW_STYLE}>
            <div style={PREVIEW_ORB_STYLE} />

            <p style={PREVIEW_LABEL_STYLE}>
               Profile controls · {activeCount} visible
            </p>
         </div>

         <div style={VISIBILITY_GRID_STYLE}>
            {CONTROLS.map((control) => (
               <ControlPill
                  key={control.key}
                  title={control.title}
                  meta={control.meta}
                  active={controls[control.key]}
                  onClick={() => toggleControl(control.key)}
               />
            ))}
         </div>

         <div style={ACTIONS_STYLE}>
            <ActionButton
               label="Copy profile link"
               onClick={handleCopyProfileLink}
            />

            <ActionButton label="Invite" onClick={handleInvite} />
         </div>
      </div>
   );
}