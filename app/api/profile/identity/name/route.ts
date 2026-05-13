/* ==========================================================
   OUTFLO — PROFILE IDENTITY NAME API
   File: app/api/profile/identity/name/route.ts
   Scope: Persist authenticated user account name identity fields
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add isolated account name write path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type NameRequestBody = {
    first_name?: unknown;
    last_name?: unknown;
};

/* ------------------------------
   Constants
-------------------------------- */
const MAX_NAME_LENGTH = 80;

/* ------------------------------
   Helpers
-------------------------------- */
async function readNameRequestBody(req: Request): Promise<NameRequestBody> {
    try {
        const body = await req.json();

        if (!body || typeof body !== "object") {
            return {};
        }

        return body as NameRequestBody;
    } catch {
        return {};
    }
}

function normalizeFirstName(value: unknown) {
    if (typeof value !== "string") return "";
    return value.trim();
}

function normalizeLastName(value: unknown) {
    if (typeof value !== "string") return null;

    const clean = value.trim();

    return clean ? clean : null;
}

function isValidNamePart(value: string | null) {
    if (value === null) return true;
    return value.length <= MAX_NAME_LENGTH;
}

/* ------------------------------
   PATCH Handler
-------------------------------- */
export async function PATCH(req: Request) {
    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                auth_error: userError?.message ?? null,
            },
            { status: 401 }
        );
    }

    const body = await readNameRequestBody(req);

    const firstName = normalizeFirstName(body.first_name);
    const lastName = normalizeLastName(body.last_name);

    if (!isValidNamePart(firstName) || !isValidNamePart(lastName)) {
        return NextResponse.json(
            { error: `Name fields must be ${MAX_NAME_LENGTH} characters or fewer.` },
            { status: 400 }
        );
    }

    const { error } = await supabase.from("user_identity_assets").upsert(
        {
            user_id: user.id,
            first_name: firstName,
            last_name: lastName,
            updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
    );

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}
