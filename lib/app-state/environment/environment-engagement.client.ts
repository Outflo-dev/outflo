"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT CLIENT
   File: lib/app-state/environment/environment-engagement.client.ts
   Scope: Read and persist canonical Environment engagement state from client surfaces
   Last Updated:
   - iso: 2026-07-13
   - note: centralize validated Engagement transport and ordered writes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    isEnvironmentEngagementState,
    type EnvironmentEngagementState,
} from "./environment-engagement";

/* ------------------------------
   Constants
-------------------------------- */
const ENVIRONMENT_ENGAGEMENT_ENDPOINT =
    "/api/profile/environment/engagement";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentEngagementResponse = {
    engagement?: unknown;
};

type EnvironmentEngagementErrorResponse = {
    error?: unknown;
};

/* ------------------------------
   Write Queue
-------------------------------- */
let environmentEngagementWriteQueue:
    Promise<void> = Promise.resolve();

/* ------------------------------
   Response Resolution
-------------------------------- */
async function readResponseBody(
    response: Response,
): Promise<unknown> {
    return response
        .json()
        .catch(() => null);
}

function resolveErrorMessage(
    body: unknown,
    fallback: string,
): string {
    if (
        typeof body !== "object" ||
        body === null
    ) {
        return fallback;
    }

    const errorBody =
        body as EnvironmentEngagementErrorResponse;

    return typeof errorBody.error === "string"
        ? errorBody.error
        : fallback;
}

function resolveEngagementResponse(
    body: unknown,
): EnvironmentEngagementState {
    if (
        typeof body !== "object" ||
        body === null
    ) {
        throw new Error(
            "Environment engagement response was invalid.",
        );
    }

    const responseBody =
        body as EnvironmentEngagementResponse;

    if (
        !isEnvironmentEngagementState(
            responseBody.engagement,
        )
    ) {
        throw new Error(
            "Environment engagement response was invalid.",
        );
    }

    return responseBody.engagement;
}

/* ------------------------------
   Read
-------------------------------- */
export async function readEnvironmentEngagementState(
    signal?: AbortSignal,
): Promise<EnvironmentEngagementState> {
    const response = await fetch(
        ENVIRONMENT_ENGAGEMENT_ENDPOINT,
        {
            method: "GET",
            cache: "no-store",
            signal,
        },
    );

    const body =
        await readResponseBody(response);

    if (!response.ok) {
        throw new Error(
            resolveErrorMessage(
                body,
                "Unable to load Environment engagement.",
            ),
        );
    }

    return resolveEngagementResponse(body);
}

/* ------------------------------
   Write
-------------------------------- */
export function writeEnvironmentEngagementState(
    state: EnvironmentEngagementState,
): Promise<EnvironmentEngagementState> {
    const write = environmentEngagementWriteQueue
        .then(async () => {
            const response = await fetch(
                ENVIRONMENT_ENGAGEMENT_ENDPOINT,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(state),
                },
            );

            const body =
                await readResponseBody(response);

            if (!response.ok) {
                throw new Error(
                    resolveErrorMessage(
                        body,
                        "Unable to save Environment engagement.",
                    ),
                );
            }

            return resolveEngagementResponse(body);
        });

    environmentEngagementWriteQueue =
        write.then(
            () => undefined,
            () => undefined,
        );

    return write;
}