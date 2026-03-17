# OUTFLO — LEDGER ARCHITECTURE (v1)

Status: Locked  
Scope: Identity, Activation, Epoch, Reset, Archive

This document defines the canonical ledger lifecycle for Outflō.

Purpose:
- Define the identity-bound ledger model
- Establish epoch invariants
- Define reset and archive behavior
- Prevent time drift across devices

---

# Core State Model

Outflō operates under three primary states.

1. **Auth** — User identity verified.
2. **Activation** — User intentionally begins a ledger.
3. **Measurement (Ledger Active)** — System records outflow against immutable epoch.

An additional transitional state exists after reset:

4. **Dormant** — Authenticated but no active epoch. User must activate.

---

# Epoch Law

Epoch is the anchor of the Outflō system.

Rules:

- Epoch is created **only** when the user presses "Begin" on `/begin`.
- Epoch is stored in the cloud and is identity-bound.
- Epoch is immutable once created.
- Epoch never updates.
- All clocks derive strictly from the cloud epoch.
- No localStorage fallback is permitted.

Definition:

> Epoch marks the beginning of a user’s identity ledger.

---

# Routing Contract

Routing logic is **state-driven**, not UI-driven.

```
Not authenticated → /login
Authenticated + no epoch → /begin
Authenticated + epoch exists → /app/*
```

Rules:

- `/begin` is reachable **only when no epoch exists**.
- If an epoch exists, access to `/begin` must redirect to `/app`.

Note:

The `/begin` activation surface is defined by the ledger architecture.  
The UI implementation may not exist in early development phases, but the routing contract remains canonical.

---

# Activation Threshold

`/begin` represents a one-time threshold for a ledger.

Rules:

- The user cannot access the application until activation.
- Pressing **Begin** creates the epoch.
- Activation must be intentional.
- Silent epoch creation is prohibited.

Activation marks the moment when measurement begins.

---

# Hard Reset Law

Hard Reset performs the following actions:

1. Current ledger is sealed and archived.
2. Active epoch is deleted.
3. System transitions to Dormant state.
4. User is redirected to `/begin`.

Reset does **not** destroy historical data.

Reset does **not** modify timestamps.

Reset creates a pause between:

- Archive seal time
- New epoch creation time

This pause is intentional and defined.

---

# Archive Principles

Archived ledgers are:

- Read-only
- Immutable
- Non-reactivable
- Non-mergeable

Archive preserves historical integrity.

Lifecycle:

```
Reset → Archive → Dormant → Activation → New Ledger
```

---

# Clock Invariants

All time displays derive from:

```
age_ms = now_ms - epoch_ms
```

Rules:

- No incremental ticking.
- No stored counters.
- No client-derived epoch.
- Formatting may vary per page.
- The underlying scalar must remain identical.

This guarantees **zero drift across pages and devices**.

---

# System Summary

```
Auth → Activation → Ledger → Archive → Dormant → Activation → Ledger
```

Outflō is identity-bound.

Time begins when chosen.

History is sealed, not rewritten.

The system is **vault-based**, not session-based.

---

End of document.
