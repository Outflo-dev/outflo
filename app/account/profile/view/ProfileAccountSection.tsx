"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT SECTION
   File: app/account/profile/view/ProfileAccountSection.tsx
   Scope: Render profile navigation and orbit row through Account-derived row grammar
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: align profile intro sizing, rows, marks, chevrons, and orbit row to account grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EpochTicker from "@/components/system/primitives/display/clocks/EpochTicker";
import Text from "@/components/system/primitives/display/type/Text";
import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import PersonMark from "@/components/system/primitives/marks/icons/PersonMark";
import SunMark from "@/components/system/primitives/marks/icons/SunMark";
import TimeMark from "@/components/system/primitives/marks/icons/TimeMark";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import SystemRow from "@/components/system/surfaces/rows/SystemRow";

import type { ProfileMenuMarkKind } from "../internal/profile.types";

/* ------------------------------
   Types
-------------------------------- */
type ProfileAccountItem = {
  label: string;
  href: string;
  description?: string;
  mark: ProfileMenuMarkKind;
};

type ProfileAccountSectionProps = {
  items: readonly ProfileAccountItem[];
  sectionGap: number;
  epochMs: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const SECTION_TITLE_STACK_STYLE: CSSProperties = {
  display: "grid",
  rowGap: 8,
  marginBottom: 18,
  paddingTop: 4,
};

const TITLE_STYLE: CSSProperties = {
  fontSize: "var(--header-lg)",
  fontWeight: "var(--font-weight-bold)",
  letterSpacing: "-0.045em",
  lineHeight: 1,
  color: "var(--text-primary)",
};

const DESCRIPTION_STYLE: CSSProperties = {
  maxWidth: 460,
  fontSize: "var(--text-sm)",
  lineHeight: 1.45,
  color: "var(--text-secondary)",
};

const ROW_DIVIDER_STYLE: CSSProperties = {
  borderBottom: "1px solid var(--border-soft)",
};

const MARK_ICON_STYLE: CSSProperties = {
  width: "var(--mark-icon-size)",
  height: "var(--mark-icon-size)",
  display: "block",
  flexShrink: 0,
};

/* ------------------------------
   Marks
-------------------------------- */
function ProfileMenuMark({ mark }: { mark: ProfileMenuMarkKind }) {
  if (mark === "account") return <PersonMark />;
  if (mark === "settings") return <SunMark />;
  if (mark === "flows") return <FlowsMark />;
  if (mark === "records") return <RecordsMark />;

  return <SupportMark />;
}

function FlowsMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <path d="M4.5 13.5c2.8 2.8 6.2 2.8 9 0s2.8-6.2 0-9" />
      <path d="M17.5 8.5c-2.8-2.8-6.2-2.8-9 0s-2.8 6.2 0 9" />
      <path d="M15.5 4.5h-2.8v2.8" />
      <path d="M6.5 17.5h2.8v-2.8" />
    </svg>
  );
}

function RecordsMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <path d="M7 4.5h8a1.5 1.5 0 0 1 1.5 1.5v11.5l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2V6A1.5 1.5 0 0 1 7 4.5Z" />
      <path d="M8 9h6" />
      <path d="M8 12h5" />
    </svg>
  );
}

function SupportMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M9.2 8.9a2 2 0 1 1 3.2 1.6c-.8.6-1.4 1.1-1.4 2.1" />
      <path d="M11 15.5h.01" />
    </svg>
  );
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAccountSection({
  items,
  sectionGap,
  epochMs,
}: ProfileAccountSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap,
      }}
    >
      <div style={SECTION_TITLE_STACK_STYLE}>
        <Text as="h1" type="display" style={TITLE_STYLE}>
          Profile
        </Text>

        <Text as="p" type="meta" style={DESCRIPTION_STYLE}>
          Identity, controls, and system surfaces.
        </Text>
      </div>

      <nav aria-label="Profile navigation">
        {items.map((item) => (
          <SystemRow
            key={item.href}
            href={item.href}
            mark={
              <MarkFrame>
                <ProfileMenuMark mark={item.mark} />
              </MarkFrame>
            }
            label={item.label}
            value={item.description}
            right={
              <Chevron
                direction="right"
                role="menu"
                color="var(--text-secondary)"
              />
            }
            style={ROW_DIVIDER_STYLE}
          />
        ))}

        <SystemRow
          mark={
            <MarkFrame>
              <TimeMark />
            </MarkFrame>
          }
          label="Orbit"
          value={<EpochTicker epochMs={epochMs} />}
        />
      </nav>
    </section>
  );
}
