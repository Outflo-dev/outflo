# OUTFLO — MONEY SUBSTRATE (v1)

Status: Locked  
Scope: Receipts, day/place views, orbit windows, money surfaces

This document defines the money substrate: how Outflō represents, groups, and displays money outflow.

Purpose:
- Define the canonical money entity (receipt)
- Define derived money views (day, place, orbit)
- Prevent drift in money surfaces and grouping rules
- Lock the relationship between receipts and all money UI

---

# Canonical Entity: Receipt

Receipts are the canonical money events in Outflō.

Receipts represent money leaving the user system.

Canonical table:

    receipts

Minimum required fields:

    id (uuid)
    user_id (uuid)
    amount_cents (integer)
    merchant (text)
    merchant_slug (text)
    purchased_at (timestamptz)

Invariants:

- Receipts are the source of truth for money outflow.
- Money arithmetic is performed in atomic cents (integer).
- Each receipt belongs to exactly one user (user_id).
- Receipt UUIDs must remain stable over time.
- purchased_at is the canonical timestamp for inclusion in windows.

---

# Atomic Money Law

Outflō computes money in atomic units.

Rules:

- All computation uses integer cents.
- No floating point math is permitted for money computation.
- Display formatting (dollars) is presentation only.

---

# Canonical Money Surfaces

Money surfaces live under the authenticated product namespace:

    /app/money

Money surfaces render views derived from receipts.

---

# Receipt Surfaces

Routes:

    /app/money/receipts
    /app/money/receipts/[id]

Contracts:

- Receipts index shows receipts for the user, optionally windowed.
- Receipt detail resolves by UUID and must be stable.

No receipt surface may invent “money state” not derivable from receipts.

---

# Day View (Derived)

Route:

    /app/money/day/[key]

Definition:

- A day key represents one local calendar day for the user.
- Day view aggregates receipts whose purchased_at falls within that day boundary.

Outputs:

- total_outflow_cents for that day
- list of receipts contributing to the total

Invariants:

- Day view is a grouping of receipts, not a separate ledger.
- Day totals must match the sum of contributing receipts.

---

# Place View (Derived)

Route:

    /app/money/place/[slug]

Definition:

- Place view aggregates receipts by merchant_slug.

Outputs:

- total_outflow_cents for that merchant_slug (optionally within a window)
- list of receipts contributing to the aggregation

Invariants:

- merchant_slug must be stable for consistent grouping.
- Place view is derived; it must never become a competing source of truth.

---

# Orbit Windows

An orbit is a time window used to measure outflow.

Orbits are window selections applied to the same receipt set.

Canonical orbit examples:

- Today (local day window)
- Rolling 365 (trailing window ending now)

Orbit windows must follow the computation contract:

    docs/architecture/outflo-computation/v1.md

Invariants:

- Orbits select a subset of receipts by purchased_at.
- Orbits never change receipt data.
- Orbits never become stored counters.

---

# Relationship to Outflō Computation

Money substrate surfaces consume the canonical computed numbers:

- daily_outflow_cents
- rolling_365_outflow_cents

Computation is defined in:

    docs/architecture/outflo-computation/v1.md

Invariants:

- Money UI must not create alternate totals.
- Any total displayed must be derivable from receipts and the selected window.

---

# Security Model

All money substrate queries must enforce:

    user_id = auth.uid()

Receipts and derived views are user-owned.

---

# System Summary

Money in Outflō is defined by receipts.

Receipts are grouped into derived views:

- receipts index/detail
- day view
- place view
- orbit windows (time windows)

All totals must match receipt sums and canonical computation.

---

End of Document.