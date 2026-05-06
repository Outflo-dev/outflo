import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const headerStore = await headers();

    return NextResponse.json({
        cookie_count: cookieStore.getAll().length,
        cookie_names: cookieStore.getAll().map((cookie) => cookie.name),
        authorization: headerStore.get("authorization") ? "present" : "missing",
    });
}