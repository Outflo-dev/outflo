/* ==========================================================
   OUTFLO — ADMIN REPLAY INGEST
   File: app/api/admin/replay-ingest/route.ts
   Scope: Replay failed or unprocessed ingest events safely
   Last Updated:
   - ms: 1775093909424
   - iso: 2026-04-02T01:38:29.424Z
   - note: completion pass — add safe ingest replay route
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  processSingleEvent,
  type IngestEventRow,
} from "@/lib/ingest/process-single-event";

/* ------------------------------
   Types
-------------------------------- */

type ReplayMode = "failed" | "unprocessed" | "by_id";

type ReplayBody = {
  mode?: ReplayMode;
  limit?: number;
  ingest_event_id?: string;
};

/* ------------------------------
   Constants
-------------------------------- */

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

/* ------------------------------
   Helpers
-------------------------------- */

function normalizeLimit(value: unknown): number {
  const n =
    typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);

  if (!Number.isFinite(n) || n <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(n, MAX_LIMIT);
}

/* ------------------------------
   Handler
-------------------------------- */

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();

    const body = (await req.json().catch(() => ({}))) as ReplayBody;
    const mode: ReplayMode = body.mode ?? "failed";
    const limit = normalizeLimit(body.limit);
    const ingestEventId =
      typeof body.ingest_event_id === "string" ? body.ingest_event_id : null;

    let query = supabase
      .from("ingest_events")
      .select("*")
      .order("received_at", { ascending: true })
      .limit(limit);

    if (mode === "failed") {
      query = query
      .not("process_error", "is", null)
      .is("processed_at", null);
    }  

    if (mode === "unprocessed") {
      query = query
        .is("processed_at", null)
        .is("process_error", null);
    }

    if (mode === "by_id") {
      if (!ingestEventId) {
        return NextResponse.json(
          {
            ok: false,
            error: "ingest_event_id required for by_id mode",
          },
          { status: 400 }
        );
      }

      query = supabase
        .from("ingest_events")
        .select("*")
        .eq("id", ingestEventId)
        .limit(1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to load ingest events: ${error.message}`);
    }

    const events = (data ?? []) as IngestEventRow[];

    const results = [];

    for (const event of events) {
      try {
        const result = await processSingleEvent({
          supabase,
          event,
        });

        results.push({
          ingest_event_id: event.id,
          ok: result.ok,
          status: result.status,
          receipt_id:
            "receipt_id" in result ? (result.receipt_id ?? null) : null,
          processed_at:
            "processed_at" in result ? (result.processed_at ?? null) : null,
          process_error:
            "process_error" in result ? result.process_error : null,
        });
      } catch (error) {
        results.push({
          ingest_event_id: event.id,
          ok: false,
          status: "route_error",
          receipt_id: null,
          processed_at: null,
          process_error:
            error instanceof Error ? error.message : "Unknown replay error",
        });
      }
    }

    return NextResponse.json({
      ok: true,
      mode,
      processed: results.length,
      results,
      now: {
        ms: Date.now(),
        iso: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Replay ingest error",
      },
      { status: 500 }
    );
  }
}