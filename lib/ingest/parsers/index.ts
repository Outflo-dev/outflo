/* ==========================================================
   OUTFLO — PARSER INDEX
   File: lib/ingest/parsers/index.ts
   Scope: Route ingest events to correct parser
   ========================================================== */

import { parseCashAppSubject } from "./cashapp";

export type ParsedIngestEvent =
  | {
      ok: true;
      type: "spend";
      amount_minor: number;
      merchant_raw: string;
    }
  | {
      ok: false;
    };

export function parseIngestEvent(event: any): ParsedIngestEvent {
  const subject = event?.raw?.data?.subject ?? null;

  const cashapp = parseCashAppSubject(subject);

  if (cashapp.ok) {
    return cashapp;
  }

  return { ok: false };
}