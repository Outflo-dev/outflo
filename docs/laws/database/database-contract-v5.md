# OUTFLO — DATABASE CONTRACT (v5)

Status: LOCKED

Scope
Defines canonical database ownership, truth boundaries, and structural invariants for Outflō.

Last Touched:
- reason: emission-family ownership rewrite
- note: contract describes database reality, not ideal architecture

---

# 1. PURPOSE

The database preserves canonical truth.

Every canonical concept has one owner.

Supporting structures may:

- emit
- associate
- project
- operationally describe

Supporting structures may never replace canonical ownership.

---

# 2. CORE PRINCIPLE

The database records what exists.

Canonical truth belongs to canonical owners.

Operational systems support truth.

They do not redefine truth.

---

# 3. GLOBAL INVARIANTS

## Identity

Canonical identity:

auth.users.id

Rules:

- identity is immutable
- user-owned truth binds to identity

---

## Time

Canonical time:

Unix milliseconds

Rules:

- bigint
- UTC
- immutable
- operational timestamps are not canonical truth

---

## Ownership

Rules:

- one canonical owner per concept
- supporting systems may assist
- supporting systems may not replace

---

## Derived Data

Rules:

- derived values are allowed
- derived values never overwrite source truth

---

## Preferences

Rules:

- mutable
- rendering only
- participation only
- never canonical truth

---

# 4. CANONICAL OWNERS

## Time

Owner:

user_epochs

Truth:

- Begin
- epoch anchor

Canonical field:

epoch_ms

---

## Money

Owner:

receipts

Truth:

money leaving the user system

Canonical fields:

- receipt_no
- user_id
- moment_ms
- amount_minor
- currency
- merchant_raw

Rules:

- immutable
- identity-bound
- canonical money truth

---

## Environment

Owner:

environment_snapshots

Truth:

resolved environment emission-family state

Rules:

- canonical environment truth
- resolved from emitters and providers
- independent from money
- independent from ingest
- immutable ownership

Emitter history and provider history support canonical truth.

They do not replace canonical truth.

---

# 5. SUPPORTING SYSTEMS

Supporting systems exist to enable canonical systems.

Supporting systems are not canonical owners.

---

## Environment

environment_emitters

Owns:

- emitter registry

---

environment_emitter_events

Owns:

- emitter history

---

environment_context_events

Owns:

- provider history

---

Rules:

- preserve history
- support canonical environment truth
- never replace environment_snapshots

---

## Ingest

Canonical entities:

- ingest_aliases
- inbound_email_stub
- ingest_events
- ingest_jobs

Purpose:

- routing
- capture
- processing
- execution

Rules:

- ingest captures bundles
- ingest preserves source input
- ingest does not interpret canonical substrate truth
- receipts are created downstream

---

## Receipt Environment

receipt_environment

Purpose:

associate receipts with environment truth

Rules:

- association layer
- subordinate to receipts
- subordinate to environment
- does not own environment truth

Association is not ownership.

---

## User Settings

Examples:

- user_preferences
- environment_user_settings

Purpose:

- rendering
- participation
- precision

Rules:

- mutable
- user-owned
- never canonical ledger truth

---

# 6. TRANSITIONAL SYSTEMS

Legacy systems may exist.

Examples:

- user_system

Rules:

- transitional only
- may not compete with canonical ownership
- may not redefine canonical truth

Legacy structures may survive migration.

Canonical reads and writes must use canonical owners.

---

# 7. DATABASE LAW

Columns describe existence.

Constraints describe invariants.

Foreign keys describe dependency.

Indexes describe traversal.

Policies describe ownership.

Write behavior describes mutation.

Population describes activity.

Functions describe hidden behavior.

The contract documents database reality.

---

# 8. CANONICAL OWNERSHIP SUMMARY

Time

→ user_epochs

Money

→ receipts

Environment

→ environment_snapshots

Supporting systems may:

- emit
- associate
- project
- route
- process
- operationally describe

Supporting systems may never replace canonical ownership.

---

## Final Principle

The database contract is not architecture.

The database contract is a receipt of reality.

---

End of Document