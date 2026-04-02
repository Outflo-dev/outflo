/* ==========================================================
   OUTFLO — CASHAPP PARSER
   File: lib/ingest/parsers/cashapp.ts
   Scope: Parse Cash App email subjects into spend events
   ========================================================== */

export type CashAppParseResult =
  | {
      ok: true;
      type: "spend";
      amount_minor: number;
      merchant_raw: string;
    }
  | {
      ok: false;
    };

const SPEND_REGEX = /you spent \$([\d,.]+) at (.+)/i;

export function parseCashAppSubject(
  subject: string | null | undefined
): CashAppParseResult {
  if (!subject) return { ok: false };

  const normalized = subject.trim();

  const match = normalized.match(SPEND_REGEX);

  if (!match) return { ok: false };

  const amountStr = match[1].replace(/,/g, "");
  const merchant = match[2].trim();

  const amount = Number(amountStr);

  if (!Number.isFinite(amount)) return { ok: false };

  return {
    ok: true,
    type: "spend",
    amount_minor: Math.round(amount * 100),
    merchant_raw: merchant,
  };
}