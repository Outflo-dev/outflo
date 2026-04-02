/* ==========================================================
   OUTFLO — INGEST TYPES
   File: lib/ingest/types.ts
   Scope: Central shared types for ingest events, parsers, and canonical receipt drafts
   Last Updated:
   - ms: 1775079336492
   - iso: 2026-04-01T21:35:36.492Z
   - note: completion pass — centralize ingest shared types
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue =
  | JsonPrimitive
  | { [key: string]: JsonValue }
  | JsonValue[];

export type IngestProvider = string;

export type IngestEventRow = {
  id: string;
  provider: IngestProvider;
  received_at: string;
  message_id: string | null;
  event_id: string | null;
  user_id: string | null;
  raw: JsonValue;
};

export type CanonicalReceiptDraft = {
  user_id: string;
  moment_ms: number;
  amount_minor: number;
  currency: string;
  merchant_raw: string;

  amount_base_minor: number;
  base_currency: string;
  fx_rate: number;

  merchant_normalized?: string | null;
  payment_rail?: string | null;
  raw?: JsonValue;
};

export type ParseSuccess = {
  ok: true;
  parser: string;
  receipt: CanonicalReceiptDraft;
};

export type ParseFailure = {
  ok: false;
  parser: string | null;
  reason: string;
};

export type ParseIngestEventResult = ParseSuccess | ParseFailure;

export type IngestParser = (
  ev: IngestEventRow
) => ParseIngestEventResult;

export type ProcessSingleEventSuccess = {
  ok: true;
  status:
    | "already_processed"
    | "unsupported"
    | "processed";
  receipt_id?: string;
  receipt_no?: string | number;
};

export type ProcessSingleEventFailure = {
  ok: false;
  status: "failed";
  error: string;
};

export type ProcessSingleEventResult =
  | ProcessSingleEventSuccess
  | ProcessSingleEventFailure;