/* ==========================================================
   OUTFLO — INGEST LAYER MAP (v1)
   File: docs/architecture/ingest-layer-map-v1.md
   Scope: Define canonical ingest system layers and responsibilities to prevent drift

   Last Updated:
   - ms: 1775096572633
   - iso: 2026-04-02T02:22:52.633Z
   - note: completion pass — formalize ingest layer ownership after system lock
   ========================================================== */

/* ==========================================================
   PURPOSE
   ----------------------------------------------------------
   This document defines the internal layers of the ingest system
   and what belongs in each layer.

   It exists to:
   - preserve structural clarity
   - prevent responsibility drift
   - ensure future features are placed correctly

   This is not a behavioral contract.
   It is a structural map.
   ========================================================== */


/* ==========================================================
   CANONICAL INGEST LAYERS
   ========================================================== */


/* ------------------------------
   1. ENTRY LAYER
---------------------------------
   Location:
   - app/api/ingest/resend/route.ts

   Responsibility:
   - Receive external payloads (e.g. Resend webhook)
   - Resolve user identity (aliases)
   - Persist ingest_event
   - Create ingest_job
   - Trigger worker (optional immediate execution)

   Does NOT:
   - parse content
   - interpret business meaning
   - create receipts
-------------------------------- */


/* ------------------------------
   2. EVENT LAYER
---------------------------------
   Location:
   - ingest_events (table)

   Responsibility:
   - Immutable record of captured input
   - Stores raw payload
   - Tracks processing state:
     - claimed_at
     - processed_at
     - process_error
     - receipt_id

   Properties:
   - append-only
   - canonical input truth

-------------------------------- */


/* ------------------------------
   3. JOB LAYER
---------------------------------
   Location:
   - ingest_jobs (table)

   Responsibility:
   - Execution orchestration
   - Claiming, retrying, scheduling
   - Tracks:
     - status (queued, processing, succeeded, exhausted)
     - attempts
     - next_attempt_at
     - claimed_at
     - worker_id
     - last_error

   Properties:
   - mutable
   - governs execution lifecycle

-------------------------------- */


/* ------------------------------
   4. WORKER LAYER
---------------------------------
   Location:
   - app/api/admin/process-ingest/route.ts

   Responsibility:
   - Claim jobs
   - Execute processing loop
   - Coordinate retries and finalization

   Does NOT:
   - parse provider-specific logic directly
   - create receipts directly

-------------------------------- */


/* ------------------------------
   5. PARSER LAYER
---------------------------------
   Location:
   - lib/ingest/parsers/*

   Responsibility:
   - Provider-specific interpretation
   - Convert raw input → normalized intent

   Example:
   - Cash App subject → amount, merchant, direction

   Does NOT:
   - write to database
   - manage jobs
   - create receipts

-------------------------------- */


/* ------------------------------
   6. PROCESSOR LAYER
---------------------------------
   Location:
   - lib/ingest/process-single-event.ts

   Responsibility:
   - Orchestrate parsing
   - Create canonical receipt
   - Update ingest_event state

   This is the ONLY layer that:
   - creates receipts
   - defines ingest → receipt transformation

-------------------------------- */


/* ------------------------------
   7. RECOVERY / ADMIN LAYER
---------------------------------
   Location:
   - /api/admin/ingest-status
   - /api/admin/replay-ingest
   - /api/admin/requeue-stale-ingest-jobs

   Responsibility:
   - Visibility into system state
   - Replay failed or historical events
   - Requeue stalled jobs
   - Support operational control

   Properties:
   - admin-only
   - does not bypass processor

-------------------------------- */


/* ==========================================================
   INVARIANTS
   ========================================================== */

- Entry layer does not parse
- Parser layer does not write to database
- Worker layer does not define business meaning
- Processor layer is the sole creator of receipts
- Recovery layer does not bypass processor
- All receipts originate from ingest_events via processor
- ingest_events are immutable input truth
- ingest_jobs govern execution, not meaning


/* ==========================================================
   SUMMARY
   ========================================================== */

Entry → capture  
Event → record  
Job → schedule  
Worker → execute  
Parser → interpret  
Processor → create  
Recovery → control

Ingest is complete when:
- every event can be processed deterministically
- failures are recoverable
- system requires no manual intervention