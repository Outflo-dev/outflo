/* ==========================================================
   OUTFLO — OWNTRACKS MQTT TOPIC
   File: lib/environment/mqtt/owntracks-topic.ts
   Scope: Parse OwnTracks MQTT topic ownership identifiers
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export type OwnTracksTopicParts = {
    providerUserId: string;
    deviceId: string;
};

export function parseOwnTracksTopic(topic: string): OwnTracksTopicParts | null {
    const parts = topic.split("/");

    if (parts.length !== 3) {
        return null;
    }

    const [root, providerUserId, deviceId] = parts;

    if (root !== "owntracks") {
        return null;
    }

    if (!providerUserId || !deviceId) {
        return null;
    }

    return {
        providerUserId,
        deviceId,
    };
}