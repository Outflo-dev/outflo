/* ==========================================================
   OUTFLO — TIME SUMMARY API
   File: app/api/time/summary/route.ts
   Scope: Return UTC-pure authenticated time summary over canonical receipts
   Last Updated:
   - ms: 1775096572633
   - iso: 2026-04-02T02:22:52.633Z
   - note: time computation build — add authenticated since-epoch and current-orbit summary route
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateUserEpochMs } from "@/lib/time/user-epoch";
import { buildTimeSummary } from "@/lib/time/summary";

/* ------------------------------
   Handler
-------------------------------- */

export async function GET() {
  try {
    const supabase = await supabaseServer();

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr) {
      throw userErr;
    }

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const epoch_ms = await getOrCreateUserEpochMs();

    if (epoch_ms === null || !Number.isFinite(epoch_ms)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to resolve user epoch",
        },
        { status: 500 }
      );
    }

    const summary = await buildTimeSummary({
      supabase,
      user_id: user.id,
      epoch_ms,
    });

    return NextResponse.json({
      ok: true,
      user_id: user.id,
      epoch_ms,
      summary,
      now: {
        ms: Date.now(),
        iso: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unknown time summary error",
      },
      { status: 500 }
    );
  }
}