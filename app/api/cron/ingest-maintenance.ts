/* ==========================================================
   OUTFLO — INGEST MAINTENANCE CRON
   File: app/api/cron/ingest-maintenance/route.ts
   Scope: Secure scheduled maintenance for stale ingest job requeue and worker execution
   Last Updated:
   - ms: 1775095047608
   - iso: 2026-04-02T01:57:27.608Z
   - note: completion pass — add cron entrypoint for ingest self-healing
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { NextResponse } from "next/server";

/* ------------------------------
   Constants
-------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_REQUEUE_LIMIT = 25;
const DEFAULT_PROCESS_LIMIT = 25;

/* ------------------------------
   Helpers
-------------------------------- */

function getBaseUrl(req: Request): string {
  const url = new URL(req.url);
  return url.origin;
}

function getCronSecret(): string {
  const value = process.env.CRON_SECRET?.trim();

  if (!value) {
    throw new Error("Missing CRON_SECRET");
  }

  return value;
}

function isAuthorized(req: Request): boolean {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET?.trim();

  if (!secret) return false;

  return auth === `Bearer ${secret}`;
}

async function postJson(params: {
  url: string;
  body: Record<string, unknown>;
  authorization: string;
}) {
  const response = await fetch(params.url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: params.authorization,
    },
    body: JSON.stringify(params.body),
    cache: "no-store",
  });

  const text = await response.text();

  let json: unknown = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = {
      ok: false,
      raw: text,
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    json,
  };
}

/* ------------------------------
   Handler
-------------------------------- */

export async function GET(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const authorization = `Bearer ${getCronSecret()}`;

    const requeue = await postJson({
      url: `${baseUrl}/api/admin/requeue-stale-ingest-jobs`,
      body: {
        limit: DEFAULT_REQUEUE_LIMIT,
      },
      authorization,
    });

    const process = await postJson({
      url: `${baseUrl}/api/admin/process-ingest`,
      body: {
        limit: DEFAULT_PROCESS_LIMIT,
      },
      authorization,
    });

    return NextResponse.json({
      ok: requeue.ok && process.ok,
      cron: {
        route: "/api/cron/ingest-maintenance",
      },
      requeue,
      process,
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
          error instanceof Error
            ? error.message
            : "Unknown ingest maintenance cron error",
      },
      { status: 500 }
    );
  }
}