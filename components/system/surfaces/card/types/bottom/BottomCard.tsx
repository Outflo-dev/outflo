"use client";

/* ==========================================================
   OUTFLO — BOTTOM CARD
   File: components/system/surfaces/card/types/bottom/BottomCard.tsx
   Scope: Bottom viewport card surface with backdrop, frame alignment, and entrance motion
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useState, type ReactNode } from "react";
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

type BottomCardPosture = "compact" | "medium";

type PanelPostureConfig<T extends string> = Partial<Record<T, BottomCardPosture>>;

type Props<T extends string = string> = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  swipePanels?: SwipePanelsConfig<T>;
  panelPostures?: PanelPostureConfig<T>;
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

const PANEL_VIEWPORT_STYLE: React.CSSProperties = {
  minHeight: 0,
  flex: 1,
  overflow: "hidden",
};

const PANEL_TRACK_STYLE: React.CSSProperties = {
  minHeight: 0,
  height: "100%",
};

const PANEL_SCROLL_STYLE: React.CSSProperties = {
  minHeight: 0,
  height: "100%",
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
  panelPostures,
}: Props<T>) {
  const activeTargetPosture: BottomCardPosture =
    swipePanels?.active
      ? panelPostures?.[swipePanels.active] ?? "medium"
      : "medium";

  const [resolvedPosture, setResolvedPosture] =
    useState<BottomCardPosture>("compact");

  const { dragStyle, dragHandlers } = useBottomCardDrag({
    posture: resolvedPosture,
    targetPosture: activeTargetPosture,
    onChangePosture: setResolvedPosture,
  });

  const { panelSwipeStyle, panelSwipeHandlers } =
    useBottomCardPanelSwipe(swipePanels);

  useBottomCardScrollLock(show);

  useEffect(() => {
    setResolvedPosture("compact");
  }, [swipePanels?.active]);

  if (!show) return null;

  const cardHeight =
    resolvedPosture === "compact"
      ? "var(--bottom-card-height-compact)"
      : "var(--bottom-card-height-medium)";

  return (
    <div style={WRAP_STYLE}>
      <style>
        {`
          @keyframes outfloBottomCardIn {
            from {
              transform: translateY(18px);
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
          animation: "outfloBottomCardIn 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <BottomCardFrame height={cardHeight}>
          <div style={HANDLE_WRAP_STYLE} {...dragHandlers}>
            <div style={HANDLE_STYLE} />
          </div>

          <div style={PANEL_VIEWPORT_STYLE} {...panelSwipeHandlers}>
            <div
              style={{
                ...PANEL_TRACK_STYLE,
                ...panelSwipeStyle,
              }}
            >
              <div style={PANEL_SCROLL_STYLE}>
                {children}
              </div>
            </div>
          </div>
        </BottomCardFrame>
      </div>
    </div>
  );
}