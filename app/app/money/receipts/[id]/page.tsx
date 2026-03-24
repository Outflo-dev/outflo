/* ==========================================================
   OUTFLO — RECEIPT DETAIL PAGE
   File: app/money/receipts/[id]/page.tsx
   Scope: Render a single receipt (cloud truth) with day + 365 context
   Last Updated:
   - ms: 1774325409190
   - iso: 2026-03-24T04:10:09.190Z
   - note: Phase C read alignment
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* ------------------------------
   Types
-------------------------------- */
type Receipt = {
  id: string;
  merchant_raw: string;
  amount_minor: number;
  currency: string;
  moment_ms: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const SYSTEM_EPOCH_KEY = "outflo_system_epoch_v1";

const GLOW = "#FFFEFA";

const FOOTER_STREET = "314 Outflō Grove";
const FOOTER_CITYSTATEZIP = "Miami, FL 33133";
const FOOTER_PHONE = "+1 (305) 000-0000";

const LAT_33133 = "25.7280";
const LNG_33133 = "-80.2374";

const NAV_H = 56;

/* ------------------------------
   Helpers
-------------------------------- */
function getOrCreateSystemEpoch(): number {
  try {
    const raw = localStorage.getItem(SYSTEM_EPOCH_KEY);
    const n = raw ? Number(raw) : NaN;
    if (Number.isFinite(n) && n > 0) return n;

    const now = Date.now();
    localStorage.setItem(SYSTEM_EPOCH_KEY, String(now));
    return now;
  } catch {
    return Date.now();
  }
}

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

function formatHeroDateTime(momentMs: number) {
  const d = new Date(momentMs);
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

function formatTime24WithSeconds(momentMs: number) {
  const d = new Date(momentMs);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mi}:${ss}`;
}

function dayKeyLocal(momentMs: number) {
  const d = new Date(momentMs);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function sumDay(items: Receipt[]) {
  let s = 0;
  for (const r of items) s += r.amount_minor;
  return s;
}

function dayCumulativeAtMoment(target: Receipt, receipts: Receipt[]) {
  const k = dayKeyLocal(target.moment_ms);
  const sameDay = receipts.filter(
    (r) => dayKeyLocal(r.moment_ms) === k
  );

  const asc = [...sameDay].sort((a, b) => {
    if (a.moment_ms !== b.moment_ms) return a.moment_ms - b.moment_ms;
    return a.id.localeCompare(b.id);
  });

  let s = 0;
  for (const r of asc) {
    s += r.amount_minor;
    if (r.id === target.id) return s;
  }
  return target.amount_minor;
}

function receiptSuffix(id: string) {
  const parts = id.split("-");
  return parts.length > 1 ? parts[1] : id;
}

function firstGlyph(merchant: string) {
  const s = (merchant || "").trim();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (/[A-Za-z0-9]/.test(c)) return c.toUpperCase();
  }
  return "?";
}

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function avatarColors(merchant: string) {
  const h = hashString(merchant || "outflo") % 360;
  return {
    bg: `hsl(${h} 42% 22%)`,
    fg: `hsl(${h} 80% 86%)`,
  };
}

function normalizeMerchantKey(merchant: string) {
  return (merchant || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[’']/g, "")
    .replace(/[.]/g, "")
    .replace(/&/g, "and");
}

function logoUrlFor(merchant: string) {
  const key = normalizeMerchantKey(merchant);

  const MAP: Record<string, string> = {
    "7-eleven": "7-eleven.com",
    amazon: "amazon.com",
    "t-mobile": "t-mobile.com",
    tmobile: "t-mobile.com",
    starbucks: "starbucks.com",
    walmart: "walmart.com",
    target: "target.com",
  };

  const domain = MAP[key] ?? null;
  return domain ? `https://logo.clearbit.com/${domain}` : null;
}

/* ------------------------------
   Component
-------------------------------- */
export default function ReceiptDetailPage() {
  const router = useRouter();
  const params = useParams();
  const raw = params?.id;
  const id = Array.isArray(raw) ? raw[0] : (raw ?? "");

  const [loaded, setLoaded] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [systemEpoch, setSystemEpoch] = useState<number | null>(null);
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    setSystemEpoch(getOrCreateSystemEpoch());
  }, []);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        const r1 = await fetch(`/api/receipts/${encodeURIComponent(id)}`, {
          cache: "no-store",
        });

        if (!r1.ok) {
          if (!alive) return;
          setReceipt(null);
          setReceipts([]);
          setLoaded(true);
          return;
        }

        const j1 = await r1.json();
        const one: Receipt | null = j1?.receipt ?? null;

        const r2 = await fetch("/api/receipts", { cache: "no-store" });
        const j2 = await r2.json();
        const list: Receipt[] = Array.isArray(j2?.receipts) ? j2.receipts : [];

        if (!alive) return;
        setReceipt(one);
        setReceipts(list);
        setLoaded(true);
      } catch {
        if (!alive) return;
        setReceipt(null);
        setReceipts([]);
        setLoaded(true);
      }
    }

    if (!id) {
      setReceipt(null);
      setReceipts([]);
      setLoaded(true);
      return;
    }

    setLoaded(false);
    run();

    return () => {
      alive = false;
    };
  }, [id]);

  const computed = useMemo(() => {
    if (!receipt) return null;

    const dayKey = dayKeyLocal(receipt.moment_ms);
    const sameDay = receipts.filter(
      (r) => dayKeyLocal(r.moment_ms) === dayKey
    );

    const dayCum = dayCumulativeAtMoment(receipt, receipts);
    const total365 = receipts.reduce((s, r) => s + r.amount_minor, 0);

    const asc = [...sameDay].sort((a, b) => {
      if (a.moment_ms !== b.moment_ms) return a.moment_ms - b.moment_ms;
      return a.id.localeCompare(b.id);
    });

    const idx = Math.max(0, asc.findIndex((r) => r.id === receipt.id));

    return {
      dayCum,
      total365,
      dayIndex: idx + 1,
      dayCount: asc.length,
      dayTotal: sumDay(sameDay),
      dayKey,
    };
  }, [receipt, receipts]);

  let userEpochTime = "(unavailable)";
  if (systemEpoch != null && receipt != null) {
    const elapsedMs = Math.max(0, receipt.moment_ms - systemEpoch);

    const totalSeconds = Math.floor(elapsedMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const remainder = totalSeconds % 86400;

    const hours = Math.floor(remainder / 3600);
    const minutes = Math.floor((remainder % 3600) / 60);
    const seconds = remainder % 60;

    const dayLabel = days === 1 ? "day" : "days";

    userEpochTime =
      `${days} ${dayLabel} · ` +
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`;
  }

  function close() {
    try {
      router.back();
    } catch {
      router.push("/app/money/receipts");
    }
  }

  if (!loaded) {
    return (
      <main style={wrap}>
        <button onClick={close} style={xFixed} aria-label="Close">
          ×
        </button>

        <div
          style={{
            width: "100%",
            maxWidth: 720,
            paddingTop: NAV_H,
            fontSize: 12,
            opacity: 0.55,
          }}
        >
          Loading…
        </div>
      </main>
    );
  }

  if (!receipt || !computed) {
    return (
      <main style={wrap}>
        <button onClick={close} style={xFixed} aria-label="Close">
          ×
        </button>

        <div
          style={{
            width: "100%",
            maxWidth: 720,
            paddingTop: NAV_H,
            display: "grid",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 16, opacity: 0.9 }}>Receipt not found.</div>
          <div style={{ fontSize: 12, opacity: 0.55 }}>
            id:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {id || "(empty)"}
            </span>
            {" · "}
            cloud:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {receipts.length}
            </span>
          </div>

          <button
            onClick={() => router.push("/app/money/receipts")}
            style={pillButtonStyle}
          >
            Back to receipts
          </button>
        </div>
      </main>
    );
  }

  const merchantName =
    (receipt.merchant_raw || "").trim() || "Merchant";
  const glyph = firstGlyph(merchantName);
  const colors = avatarColors(merchantName);

  const logoUrl = logoUrlFor(merchantName);

  const dayHref = `/app/money/day/${encodeURIComponent(computed.dayKey)}`;
  const placeHref = `/app/money/place/${encodeURIComponent(merchantName)}`;

  const heroAmount =
    Number.isFinite(receipt.amount_minor) && receipt.amount_minor > 0
      ? formatMoney(receipt.amount_minor, receipt.currency)
      : "—";

  return (
    <main style={wrap}>
      <button onClick={close} style={xFixed} aria-label="Close">
        ×
      </button>

      <div style={frame}>
        <section style={{ ...section, paddingTop: NAV_H }}>
          <div style={heroStack}>
            <div style={{ ...avatar, background: colors.bg, color: colors.fg }}>
              {logoUrl && logoOk ? (
                <img
                  src={logoUrl}
                  alt={merchantName}
                  width={54}
                  height={54}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 999,
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={() => setLogoOk(false)}
                />
              ) : (
                glyph
              )}
            </div>

            <div style={heroInfo}>
              <div style={merchant} title={merchantName}>
                {merchantName}
              </div>
              <div style={metaLine}>
                {formatHeroDateTime(receipt.moment_ms)}
              </div>
            </div>

            <div style={amount}>{heroAmount}</div>
          </div>
        </section>

        <div style={sectionDivider} />

        <section style={section}>
          <Title>Position</Title>

          <div style={rows}>
            <Row label="Day" value={computed.dayKey} mono />
            <Row
              label="Orbit"
              value={formatMoney(computed.dayCum, receipt.currency)}
            />
            <Row label="Index" value={String(computed.dayIndex)} mono />
          </div>
        </section>

        <div style={sectionDivider} />

        <section style={section}>
          <Title>Orientation</Title>

          <div style={rows}>
            <Row label="City, State" value="Miami, FL" />
            <Row label="Weather" value="—" />
          </div>
        </section>

        <div style={sectionDivider} />

        <section style={section}>
          <Title>Ledger</Title>

          <div style={rows}>
            <Row label="Receipt ID" value={`#${receiptSuffix(receipt.id)}`} mono />
            <Row
              label="Raw time (24h + seconds)"
              value={formatTime24WithSeconds(receipt.moment_ms)}
              mono
            />
            <Row
              label="Epoch"
              value={String(receipt.moment_ms)}
              mono
            />
            <Row label="User Epoch" value={userEpochTime} mono />
            <Row
              label="Coordinates"
              value={`${LAT_33133}, ${LNG_33133}`}
              mono
            />
            <Row label="Payment rail" value="Cash App" />
          </div>
        </section>

        <div style={sectionDivider} />

        <section style={section}>
          <Title>Explore</Title>

          <div style={menu}>
            <MenuItem href={dayHref} label="See all transactions for this day" />
            <MenuItem
              href={placeHref}
              label={`View your ${merchantName} transactions across time`}
            />
            <MenuItem href="/app/money/about" label="Learn how the Engine works" />
          </div>
        </section>

        <div style={sectionDivider} />

        <section style={footerSection}>
          <div style={footerBrand}>Outflō</div>
          <div style={footerLine}>{FOOTER_STREET}</div>
          <div style={footerLine}>{FOOTER_CITYSTATEZIP}</div>
          <div style={footerLine}>{FOOTER_PHONE}</div>

          <div style={{ height: 14 }} />

          <Link href="/" style={footerLink}>
            outflo.xyz
          </Link>
        </section>
      </div>
    </main>
  );
}

/* ------------------------------
   Subcomponents
-------------------------------- */
function Title({ children }: { children: string }) {
  return <div style={title}>{children}</div>;
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div style={row}>
      <div style={rowLabel}>{label}</div>
      <div
        style={{
          ...rowValue,
          ...(mono
            ? { fontVariantNumeric: "tabular-nums", letterSpacing: "0.02em" }
            : {}),
        }}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

function MenuItem({ label, href }: { label: string; href?: string }) {
  const inner = (
    <div style={menuItem}>
      <div style={menuLabel}>{label}</div>
      <div style={chev}>›</div>
    </div>
  );

  if (!href) return inner;

  return (
    <Link href={href} style={menuLink}>
      {inner}
    </Link>
  );
}

/* ------------------------------
   Styles
-------------------------------- */
const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background: "black",
  color: "white",
  display: "grid",
  placeItems: "start stretch",
  padding: "max(24px, 6vh) 0px",
};

const frame: React.CSSProperties = {
  width: "100%",
  maxWidth: "none",
  boxSizing: "border-box",
  position: "relative",
};

const xFixed: React.CSSProperties = {
  position: "fixed",
  top: 6,
  left: 6,
  width: 40,
  height: 40,
  lineHeight: "40px",
  padding: 0,
  borderRadius: 999,
  background: "rgba(0,0,0,0.9)",
  border: "none",
  color: "white",
  fontSize: 26,
  opacity: 1,
  cursor: "pointer",
  zIndex: 50,
};

const section: React.CSSProperties = {
  display: "grid",
  gap: 14,
  padding: "10px 0",
};

const sectionDivider: React.CSSProperties = {
  height: 1,
  background: "rgba(255,255,255,0.10)",
  margin: "14px 0",
};

const heroStack: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const avatar: React.CSSProperties = {
  width: 54,
  height: 54,
  borderRadius: 999,
  display: "grid",
  placeItems: "center",
  fontSize: 20,
  fontWeight: 750,
  userSelect: "none",
  overflow: "hidden",
};

const heroInfo: React.CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const merchant: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 650,
  letterSpacing: "-0.02em",
  color: "var(--text-secondary)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const metaLine: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-secondary)",
  letterSpacing: "0.02em",
};

const amount: React.CSSProperties = {
  fontSize: 62,
  fontWeight: 760,
  letterSpacing: "-0.05em",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
  color: GLOW,
  marginTop: 4,
};

const title: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 650,
  letterSpacing: "-0.01em",
  opacity: 0.92,
};

const rows: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "baseline",
};

const rowLabel: React.CSSProperties = {
  fontSize: 14,
  color: "var(--text-secondary)",
};

const rowValue: React.CSSProperties = {
  fontSize: 14,
  opacity: 0.92,
  textAlign: "right",
  maxWidth: "62%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const menu: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

const menuItem: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "8px 0",
};

const menuLabel: React.CSSProperties = {
  fontSize: 16,
  opacity: 0.92,
};

const chev: React.CSSProperties = {
  fontSize: 22,
  opacity: 0.30,
  lineHeight: "22px",
};

const menuLink: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
};

const footerSection: React.CSSProperties = {
  display: "grid",
  gap: 2,
  padding: "10px 0 32px",
};

const footerBrand: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 650,
  opacity: 0.78,
  letterSpacing: "0.02em",
  marginBottom: 2,
};

const footerLine: React.CSSProperties = {
  fontSize: 13,
  opacity: 0.42,
  lineHeight: 1.12,
};

const footerLink: React.CSSProperties = {
  fontSize: 12,
  color: GLOW,
  textDecoration: "underline",
  textUnderlineOffset: 3,
  opacity: 0.95,
};

const pillButtonStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "white",
  borderRadius: 999,
  padding: "10px 12px",
  fontSize: 12,
  cursor: "pointer",
};
