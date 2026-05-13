/* ==========================================================
   OUTFLO — PROFILE IDENTITY ORBIT HANDLE API
   File: app/api/profile/identity/orbit-handle/route.ts
   Scope: Persist authenticated user Orbit handle identity field
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add isolated Orbit handle write path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type OrbitHandleRequestBody = {
    orbit_handle?: unknown;
};

type IdentityRow = {
    first_name: string | null;
    last_name: string | null;
};

/* ------------------------------
   Constants
-------------------------------- */
const MIN_HANDLE_LENGTH = 3;
const MAX_HANDLE_LENGTH = 30;
const HANDLE_PATTERN = /^[a-z0-9._]+$/;

/* ------------------------------
   Helpers
-------------------------------- */
async function readOrbitHandleRequestBody(
    req: Request
): Promise<OrbitHandleRequestBody> {
    try {
        const body = await req.json();

        if (!body || typeof body !== "object") {
            return {};
        }

        return body as OrbitHandleRequestBody;
    } catch {
        return {};
    }
}

function getFallbackFirstName(email: string | undefined) {
    return email?.split("@")[0]?.trim() || "Outflo";
}

function normalizeOrbitHandle(value: unknown) {
    if (typeof value !== "string") return "";

    return value.trim().replace(/^@+/, "").toLowerCase();
}

function getOrbitHandleValidationError(orbitHandle: string) {
    if (!orbitHandle) return "Orbit handle is required.";

    if (
        orbitHandle.length < MIN_HANDLE_LENGTH ||
        orbitHandle.length > MAX_HANDLE_LENGTH
    ) {
        return `Orbit handle must be ${MIN_HANDLE_LENGTH}-${MAX_HANDLE_LENGTH} characters.`;
    }

    if (!HANDLE_PATTERN.test(orbitHandle)) {
        return "Use letters, numbers, dots, or underscores.";
    }

    if (/^[._]/.test(orbitHandle) || /[._]$/.test(orbitHandle)) {
        return "Orbit handle cannot start or end with a dot or underscore.";
    }

    if (orbitHandle.includes("..") || orbitHandle.includes("__")) {
        return "Orbit handle cannot contain repeated dots or underscores.";
    }

    return null;
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

    const body = await readOrbitHandleRequestBody(req);
    const orbitHandle = normalizeOrbitHandle(body.orbit_handle);
    const validationError = getOrbitHandleValidationError(orbitHandle);

    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { data: identity, error: identityError } = await supabase
        .from("user_identity_assets")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle<IdentityRow>();

    if (identityError) {
        return NextResponse.json(
            { error: identityError.message },
            { status: 500 }
        );
    }

    const { error } = await supabase.from("user_identity_assets").upsert(
        {
            user_id: user.id,
            first_name: identity?.first_name ?? getFallbackFirstName(user.email),
            last_name: identity?.last_name ?? null,
            username: orbitHandle,
            updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
    );

    if (error) {
        const message = error.message.toLowerCase();
        const isDuplicate =
            message.includes("duplicate") || message.includes("unique");

        return NextResponse.json(
            {
                error: isDuplicate
                    ? "Orbit handle is already taken."
                    : error.message,
            },
            { status: isDuplicate ? 409 : 500 }
        );
    }

    return NextResponse.json({ ok: true });
}