/* ==========================================================
   OUTFLO — ENQUEUE INGEST JOB
   File: lib/ingest/enqueue-ingest-job.ts
   Scope: Create one queued ingest job for one ingest event
   Last Updated:
   - ms: <YOUR_MS>
   - iso: <YOUR_ISO>
   - note: add ingest job enqueue helper for new ingest worker spine
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------
   Types
-------------------------------- */
type EnqueueIngestJobParams = {
  supabase: SupabaseClient;
  ingestEventId: string;
  jobType?: string;
};

type EnqueueIngestJobResult =
  | {
      ok: true;
      jobId: string;
      status: "queued" | "already_queued";
    }
  | {
      ok: false;
      error: string;
    };

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_JOB_TYPE = "process_ingest";

/* ------------------------------
   Main
-------------------------------- */
export async function enqueueIngestJob(
  params: EnqueueIngestJobParams
): Promise<EnqueueIngestJobResult> {
  const { supabase, ingestEventId, jobType = DEFAULT_JOB_TYPE } = params;

  const { data: existing, error: existingErr } = await supabase
    .from("ingest_jobs")
    .select("id, status")
    .eq("ingest_event_id", ingestEventId)
    .limit(1)
    .maybeSingle();

  if (existingErr) {
    return {
      ok: false,
      error: existingErr.message,
    };
  }

  if (existing?.id) {
    return {
      ok: true,
      jobId: existing.id,
      status: "already_queued",
    };
  }

  const { data: inserted, error: insertErr } = await supabase
    .from("ingest_jobs")
    .insert({
      ingest_event_id: ingestEventId,
      job_type: jobType,
      status: "queued",
      attempts: 0,
      max_attempts: 5,
    })
    .select("id")
    .single();

  if (insertErr || !inserted?.id) {
    return {
      ok: false,
      error: insertErr?.message || "Failed to insert ingest job",
    };
  }

  return {
    ok: true,
    jobId: inserted.id,
    status: "queued",
  };
}