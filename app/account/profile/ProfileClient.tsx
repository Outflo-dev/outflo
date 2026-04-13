"use client";

/* ==========================================================
   OUTFLO — PROFILE CLIENT
   File: app/account/profile/ProfileClient.tsx
   Scope: Edit and save identity + environment preferences
   ========================================================== */

import { useMemo, useState } from "react";
import Link from "next/link";
import CardSheet from "@/components/system/surfaces/card/CardSheet";

/* ------------------------------
   Types
-------------------------------- */
type IdentityState = {
  display_name: string;
  username: string;
  avatar_url: string;
  gallery_urls: string[];
};

type PreferencesState = {
  base_currency: string;
  time_display: "auto" | "fixed";
  location_mode: "off" | "device" | "manual_city";
  manual_city: string;
  weather_mode: "off" | "on";
};

type ProfileClientProps = {
  initialIdentity: IdentityState;
  initialPreferences: PreferencesState;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileClient({
  initialIdentity,
  initialPreferences,
}: ProfileClientProps) {
  const [identity, setIdentity] = useState<IdentityState>(initialIdentity);
  const [preferences, setPreferences] =
    useState<PreferencesState>(initialPreferences);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const manualCityVisible = preferences.location_mode === "manual_city";

  const payload = useMemo(() => {
    return {
      display_name: identity.display_name.trim(),
      username: identity.username.trim().toLowerCase(),
      avatar_url: identity.avatar_url.trim(),
      base_currency: preferences.base_currency,
      time_display: preferences.time_display,
      location_mode: preferences.location_mode,
      manual_city: manualCityVisible ? preferences.manual_city.trim() : "",
      weather_mode: preferences.weather_mode,
    };
  }, [identity, preferences, manualCityVisible]);

  async function onSave() {
    if (saving) return;

    if (payload.username && !/^[a-z0-9]{3,20}$/.test(payload.username)) {
      setMessage(
        "Username must be 3–20 characters, lowercase letters and numbers only."
      );
      return;
    }

    if (!payload.display_name) {
      setMessage("Display name is required.");
      return;
    }

    if (!payload.avatar_url) {
      setMessage("Profile image URL is required for v1.");
      return;
    }

    if (payload.location_mode === "manual_city" && !payload.manual_city) {
      setMessage("Manual city is required when location mode is manual city.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setMessage("Could not save profile.");
        return;
      }

      setMessage("Profile saved.");
    } catch {
      setMessage("Network error while saving profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 20px 64px",
      }}
    ><div style={{ marginBottom: 16 }}>
  <Link
    href="/account/profile"
    style={{
      textDecoration: "none",
      fontSize: 14,
      opacity: 0.8,
    }}
    >
    ← Back to Profile
     </Link>
    </div>

    <h1 style={{ fontSize: 28, marginBottom: 8 }}>Profile</h1>
      <p style={{ opacity: 0.8, marginBottom: 28 }}>
        Define identity and environment preferences for the system.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Identity</h2>

        <div style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8 }}>
            <span>Display Name</span>
            <input
              value={identity.display_name}
              onChange={(e) =>
                setIdentity((prev) => ({
                  ...prev,
                  display_name: e.target.value,
                }))
              }
              placeholder="Eric"
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span>Username</span>
            <input
              value={identity.username}
              onChange={(e) =>
                setIdentity((prev) => ({
                  ...prev,
                  username: e.target.value.toLowerCase(),
                }))
              }
              placeholder="eric"
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
              }}
            />
            <small style={{ opacity: 0.7 }}>
              Unique handle. Lowercase letters and numbers only. 3–20 characters.
            </small>
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span>Profile Image URL</span>
            <input
              value={identity.avatar_url}
              onChange={(e) =>
                setIdentity((prev) => ({
                  ...prev,
                  avatar_url: e.target.value,
                }))
              }
              placeholder="https://..."
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
              }}
            />
          </label>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>
          Environment Preferences
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8 }}>
            <span>Base Currency</span>
            <select
              value={preferences.base_currency}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  base_currency: e.target.value,
                }))
              }
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
              }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span>Time Display</span>
            <select
              value={preferences.time_display}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  time_display: e.target.value as "auto" | "fixed",
                }))
              }
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
              }}
            >
              <option value="auto">Auto</option>
              <option value="fixed">Fixed</option>
            </select>
          </label>

          <fieldset
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <legend>Location Mode</legend>

            <div style={{ display: "grid", gap: 10 }}>
              <label>
                <input
                  type="radio"
                  name="location_mode"
                  value="off"
                  checked={preferences.location_mode === "off"}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      location_mode: "off",
                    }))
                  }
                />{" "}
                Off
              </label>

              <label>
                <input
                  type="radio"
                  name="location_mode"
                  value="device"
                  checked={preferences.location_mode === "device"}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      location_mode: "device",
                    }))
                  }
                />{" "}
                Device
              </label>

              <label>
                <input
                  type="radio"
                  name="location_mode"
                  value="manual_city"
                  checked={preferences.location_mode === "manual_city"}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      location_mode: "manual_city",
                    }))
                  }
                />{" "}
                Manual City
              </label>
            </div>
          </fieldset>

          {manualCityVisible ? (
            <label style={{ display: "grid", gap: 8 }}>
              <span>Manual City</span>
              <input
                value={preferences.manual_city}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    manual_city: e.target.value,
                  }))
                }
                placeholder="Miami, FL"
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                }}
              />
            </label>
          ) : null}

          <fieldset
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <legend>Weather Mode</legend>

            <div style={{ display: "grid", gap: 10 }}>
              <label>
                <input
                  type="radio"
                  name="weather_mode"
                  value="off"
                  checked={preferences.weather_mode === "off"}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      weather_mode: "off",
                    }))
                  }
                />{" "}
                Off
              </label>

              <label>
                <input
                  type="radio"
                  name="weather_mode"
                  value="on"
                  checked={preferences.weather_mode === "on"}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      weather_mode: "on",
                    }))
                  }
                />{" "}
                On
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Account</h2>
        <p style={{ opacity: 0.8 }}>
          Ingest alias and email mirror onboarding will land here next.
        </p>
      </section>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            fontWeight: 700,
            cursor: saving ? "default" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>

        {message ? <p style={{ margin: 0, opacity: 0.85 }}>{message}</p> : null}
      </div>
    </main>
  );
}