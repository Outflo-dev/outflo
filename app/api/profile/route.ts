/* ==========================================================
   OUTFLO — PROFILE API
   File: app/api/profile/route.ts
   Scope: Persist identity and environment preferences for authenticated user
   ========================================================== */

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Route
-------------------------------- */
export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const display_name = String(body.display_name ?? "").trim();
  const avatar_url = String(body.avatar_url ?? "").trim();

  const usernameRaw = String(body.username ?? "").trim().toLowerCase();
  const username = usernameRaw || null;

  const base_currency = String(body.base_currency ?? "USD");
  const time_display = String(body.time_display ?? "auto");
  const location_mode = String(body.location_mode ?? "device");
  const manual_city =
    location_mode === "manual_city"
      ? String(body.manual_city ?? "").trim()
      : null;
  const weather_mode = String(body.weather_mode ?? "on");

  if (!display_name) {
    return NextResponse.json(
      { error: "Display name is required." },
      { status: 400 }
    );
  }

  if (!avatar_url) {
    return NextResponse.json(
      { error: "Avatar URL is required." },
      { status: 400 }
    );
  }

  if (username && !/^[a-z0-9]{3,20}$/.test(username)) {
    return NextResponse.json(
      { error: "Invalid username." },
      { status: 400 }
    );
  }

  if (
    !["USD", "EUR", "GBP", "JPY"].includes(base_currency) ||
    !["auto", "fixed"].includes(time_display) ||
    !["off", "device", "manual_city"].includes(location_mode) ||
    !["off", "on"].includes(weather_mode)
  ) {
    return NextResponse.json(
      { error: "Invalid profile values." },
      { status: 400 }
    );
  }

  if (location_mode === "manual_city" && !manual_city) {
    return NextResponse.json(
      { error: "Manual city is required." },
      { status: 400 }
    );
  }

  const { error: identityError } = await supabase
    .from("user_identity_assets")
    .upsert(
      {
        user_id: user.id,
        display_name,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (identityError) {
    const message = identityError.message.toLowerCase();
    const isDuplicate =
      message.includes("duplicate") || message.includes("unique");

    return NextResponse.json(
      {
        error: isDuplicate
          ? "Username is already taken."
          : identityError.message,
      },
      { status: 500 }
    );
  }

  const { error: preferencesError } = await supabase
    .from("user_preferences")
    .upsert(
      {
        user_id: user.id,
        base_currency,
        time_display,
        location_mode,
        manual_city,
        weather_mode,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (preferencesError) {
    return NextResponse.json(
      { error: preferencesError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

/* ------------------------------
   PATCH — avatar_mode (additive)
-------------------------------- */
export async function PATCH(req: Request) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const avatar_mode = body.avatar_mode;

  if (!["image", "initial"].includes(avatar_mode)) {
    return NextResponse.json(
      { error: "Invalid avatar_mode" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("user_identity_assets")
    .update({
      avatar_mode,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}