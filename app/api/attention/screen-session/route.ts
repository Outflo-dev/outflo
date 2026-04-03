/* ==========================================================
   OUTFLO — SCREEN SESSION WRITE ROUTE
   File: app/api/attention/screen-session/route.ts
   Scope: Write one completed canonical Outflō screen session
   Last Updated:
   - ms: 1775186487607
   - iso: 2026-04-03T03:21:27.607Z
   - note: add canonical completed screen-session write path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type ScreenSessionWriteBody = {
  started_ms?: unknown;
};

type ScreenSessionInsert = {
  user_id: string;
  app_key: "outflo";
  started_ms: number;
  ended_ms: number;
  duration_ms: number;
};

/* ------------------------------
   Helpers
-------------------------------- */
function isValidUnixMs(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1_000_000_000_000 &&
    value <= 9_999_999_999_999
  );
}

function buildInsert(userId: string, startedMs: number): ScreenSessionInsert {
  const endedMs = Date.now();
  const durationMs = endedMs - startedMs;

  if (durationMs < 0) {
    throw new Error("Invalid session boundary: ended_ms before started_ms.");
  }

  return {
    user_id: userId,
    app_key: "outflo",
    started_ms: startedMs,
    ended_ms: endedMs,
    duration_ms: durationMs,
  };
}

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(request: Request) {
  try {
    const supabase = await supabaseServer();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return NextResponse.json(
        { ok: false, error: "Failed to resolve authenticated user." },
        { status: 500 },
      );
    }

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as ScreenSessionWriteBody;
    const { started_ms } = body;

    if (!isValidUnixMs(started_ms)) {
      return NextResponse.json(
        { ok: false, error: "Invalid started_ms." },
        { status: 400 },
      );
    }

    const insert = buildInsert(user.id, started_ms);

    if (insert.duration_ms === 0) {
      return NextResponse.json(
        {
          ok: true,
          ignored: true,
          reason: "Zero-duration session ignored.",
        },
        { status: 200 },
      );
    }

    const { data, error } = await supabase
      .from("screen_sessions")
      .insert(insert)
      .select("id, user_id, app_key, started_ms, ended_ms, duration_ms, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        session: data,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown screen-session write failure.";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}