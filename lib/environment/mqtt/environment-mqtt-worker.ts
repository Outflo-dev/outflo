/* ==========================================================
   OUTFLO — ENVIRONMENT MQTT WORKER
   File: lib/environment/mqtt/environment-mqtt-worker.ts
   Scope: Consume OwnTracks MQTT location events into Environment DB
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import { loadEnvConfig } from "@next/env";
import mqtt from "mqtt";

import { handleEnvironmentMqttMessage } from "./environment-mqtt-handler";

loadEnvConfig(process.cwd());

const MQTT_URL = process.env.OUTFLO_MQTT_URL ?? "mqtt://localhost:1883";
const MQTT_TOPIC = process.env.OUTFLO_MQTT_TOPIC ?? "owntracks/+/+";
const MQTT_USERNAME = process.env.OUTFLO_MQTT_USERNAME;
const MQTT_PASSWORD = process.env.OUTFLO_MQTT_PASSWORD;

/* ------------------------------
   Main
-------------------------------- */
function main() {
    console.log("[environment-mqtt] connecting", {
        url: MQTT_URL,
        topic: MQTT_TOPIC,
        auth: MQTT_USERNAME ? "enabled" : "disabled",
    });

    const client = mqtt.connect(MQTT_URL, {
        username: MQTT_USERNAME,
        password: MQTT_PASSWORD,
    });

    client.on("connect", () => {
        console.log("[environment-mqtt] connected");

        client.subscribe(MQTT_TOPIC, { qos: 1 }, (error) => {
            if (error) {
                console.error("[environment-mqtt] subscribe failed", error);
                return;
            }

            console.log("[environment-mqtt] subscribed", MQTT_TOPIC);
        });
    });

    client.on("message", (incomingTopic, message) => {
        void handleEnvironmentMqttMessage(incomingTopic, message);
    });

    client.on("error", (error) => {
        console.error("[environment-mqtt] client error", error);
    });

    client.on("close", () => {
        console.warn("[environment-mqtt] connection closed");
    });
}

main();