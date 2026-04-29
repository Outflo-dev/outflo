"use client";

/* ==========================================================
   OUTFLO — BOTTOM CARD
   File: components/system/surfaces/card/types/bottom/BottomCard.tsx
   Scope: Bottom viewport card surface with backdrop, frame alignment, and entrance motion
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import { APP_SHELL } from "@/components/system/shell/app/app-shell.constants";
import BottomCardFrame from "./BottomCardFrame";
import { useBottomCardDrag } from "./useBottomCardDrag";
import { useBottomCardScrollLock } from "./useBottomCardScrollLock";
import { useBottomCardPanelSwipe } from "./useBottomCardPanelSwipe";

/* ------------------------------
   Types
-------------------------------- */
type SwipePanelsConfig<T extends string> = {
  active: T | null;
  order: readonly T[];
  onChange: (panel: T) => void;
};

type Props<T extends string = string> = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  swipePanels?: SwipePanelsConfig<T>;
};

/* ------------------------------
   Constants
-------------------------------- */
const WRAP_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 120,
  overflow: "hidden",
  overscrollBehavior: "contain",
  touchAction: "none",
};

const BACKDROP_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  border: 0,
  margin: 0,
  padding: 0,
  background: "var(--bottom-card-backdrop)",
  pointerEvents: "auto",
};

const FRAME_STYLE: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  maxWidth: APP_SHELL.maxWidth,
  margin: "0 auto",
  paddingLeft: "env(safe-area-inset-left)",
  paddingRight: "env(safe-area-inset-right)",
  boxSizing: "border-box",
};

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

const CONTENT_STYLE: React.CSSProperties = {
  minHeight: 0,
  flex: 1,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  overscrollBehavior: "contain",
  touchAction: "pan-y",
};

/* ------------------------------
   Component
-------------------------------- */
export default function BottomCard<T extends string = string>({
  show,
  onClose,
  children,
  swipePanels,
}: Props<T>) {
  const { dragStyle, dragHandlers } = useBottomCardDrag(onClose);
  const { panelSwipeStyle, panelSwipeHandlers } =
  useBottomCardPanelSwipe(swipePanels);

  useBottomCardScrollLock(show);

  if (!show) return null;

  return (
    <div style={WRAP_STYLE}>
      <style>
        {`
          @keyframes outfloBottomCardIn {
            from {
              transform: translateY(100%);
              opacity: 0;
            }

            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <button
        type="button"
        aria-label="Close card"
        onClick={onClose}
        style={BACKDROP_STYLE}
      />

      <div
        style={{
          ...FRAME_STYLE,
          ...dragStyle,
          animation: "outfloBottomCardIn 340ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <BottomCardFrame>
          <div style={HANDLE_WRAP_STYLE} {...dragHandlers}>
            <div style={HANDLE_STYLE} />
          </div>

          <div
             style={{
              ...CONTENT_STYLE,
              ...panelSwipeStyle,
       }}
           {...panelSwipeHandlers}
     >
           {children}
         </div>
        </BottomCardFrame>
      </div>
    </div>
  );
}