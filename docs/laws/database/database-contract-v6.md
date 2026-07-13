# OUTFLO — DATABASE CONTRACT (v6)

Status: LOCKED

Scope

Defines canonical database ownership, truth boundaries, Guide permission persistence, admission outcomes, current-state projection, resolved context, Global presentation settings, and structural invariants for Outflō.

Replaces:

- Database Contract v5

Clarified by:

- Guide Resolution Law v1
- Participation Law v2
- Emission Law v2
- Ownership Law v1
- Time Law v1
- Computation Law v1
- DB Ownership Audit — Final Freeze

---

# 1. PURPOSE

Define what the Outflō database owns, what it preserves, what it must distinguish, and what it must never collapse.

This contract establishes:

- canonical database ownership
- the distinction between source receipt and canonical admission
- the distinction between canonical events and current-state projections
- the persistence of Guide recording scope
- the persistence of Guide update posture
- the treatment of excluded values
- the ownership of resolved context
- the ownership of Global presentation settings
- the relationship between canonical truth, supporting systems, and operational state
- the difference between database law and database implementation

The database preserves truth.

The database does not invent truth.

The database preserves the result of Guide-governed admission.

---

# 2. CORE PRINCIPLE

The database records what Outflō was permitted to know.

Canonical truth belongs to canonical owners.

Guide settings govern future admission and presentation.

Operational systems support truth.

Supporting systems do not redefine truth.

Excluded values are null from inception.

---

# 3. DATABASE ROLE

The database is the persisted ownership boundary for Outflō.

It may preserve:

- canonical identity
- canonical time anchors
- canonical events
- current-state projections
- source evidence within Guide permission
- provider context within Guide permission
- Guide participation settings
- Global presentation settings
- associations
- operational process state
- provenance
- security boundaries

It must not:

- expand Guide permission
- reconstruct excluded values
- treat runtime receipt as canonical truth
- collapse mutable settings into historical event truth
- collapse current-state projection into immutable event history
- treat provider payloads as canonical owners
- allow supporting tables to compete with canonical ownership

---

# 4. GLOBAL INVARIANTS

## Identity

Canonical identity:

```txt
auth.users.id
```

Rules:

- identity is immutable
- Guide-owned truth binds to identity
- supporting account records may describe identity
- supporting account records do not replace canonical identity

---

## Time

Canonical time:

```txt
Unix milliseconds in UTC
```

Rules:

- canonical time values use `bigint`
- canonical event time is immutable once admitted
- operational timestamps do not replace canonical event time
- display timezone never rewrites canonical time
- event-local context and Guide view remain distinct from canonical instant

---

## Ownership

Rules:

- one canonical owner per concept
- support is not ownership
- association is not ownership
- projection is not ownership
- provider truth is not canonical ownership
- settings are not ledger truth
- current-state projection is not immutable event history

---

## Admission

Rules:

- runtime receipt precedes canonical admission
- Guide recording scope applies before canonical persistence
- excluded values are null from inception
- canonical writes contain only admitted values
- replayable durable storage may not reconstruct excluded values
- compiler, UI, export, and reporting layers do not own admission

---

## Derived Data

Rules:

- derived values are allowed
- derived values must be reproducible from admitted canonical inputs
- derived values never overwrite canonical source truth
- cached values remain projections
- projections never become canonical owners

---

## Settings

Rules:

- settings are mutable
- settings are Guide-owned
- settings govern future admission, update behavior, and presentation
- settings never become canonical historical truth
- settings changes do not rewrite historical canonical records

---

# 5. GUIDE SETTINGS

The database must preserve three distinct Guide-owned settings domains.

## Recording Scope

Recording scope determines:

> Which canonical emission families may enter Outflō’s canonical record?

Rules:

- recording scope is persisted
- each canonical family is independently allowed or excluded
- recording scope applies before canonical persistence
- newly allowed families begin recording only after permission exists
- newly excluded families become null in future canonical writes
- historical canonical truth is not rewritten
- excluded historical values are not backfilled

Recording scope belongs to one singular Guide-owned permission contract.

It may be stored in:

```txt
user_preferences
```

or a future singular successor.

The physical table may evolve.

The ownership must remain singular.

---

## Update Posture

Canonical update postures:

```txt
capture
precise
```

Rules:

- update posture is persisted
- update posture is mutable
- Capture means processing occurs when the Guide intentionally requests the moment
- Precise means permitted emissions are processed when they happen
- update posture does not determine recording scope
- update posture does not expand permission
- update posture is not inferred from snapshot existence
- update posture is not stored as mutable historical truth inside canonical events

An event may preserve the posture under which it was admitted when provenance requires it.

That preserved value is event provenance.

It is not the current Guide setting.

---

## Global Presentation

Global presentation settings may include:

- language
- locale
- timezone view
- time format
- date format
- number format
- measurement units
- currency display
- week conventions
- regional presentation
- accessibility presentation

Rules:

- Global settings affect presentation
- Global settings do not grant recording permission
- Global settings do not redefine canonical truth
- Global settings may change current display
- Global settings do not rewrite historical event instants
- Global settings remain separate from recording scope and update posture

---

# 6. CANONICAL OWNERS

## Time

Owner:

```txt
user_epochs
```

Truth:

- Begin
- epoch anchor

Canonical field:

```txt
epoch_ms
```

Rules:

- immutable in production meaning
- identity-bound
- singular
- never redefined by Global presentation
- dev or administrative reset behavior must remain explicitly non-production

---

## Money

Owner:

```txt
receipts
```

Truth:

- money leaving the Guide system

Canonical fields include:

- receipt_no
- user_id
- moment_ms
- amount_minor
- currency
- merchant_raw

Rules:

- identity-bound
- canonical money truth
- canonical amount remains in integer minor units
- presentation currency formatting does not rewrite canonical amount
- production truth is not mutated by presentation changes
- dev or administrative reset behavior must remain explicitly non-production

---

## Environment

Current owner:

```txt
environment_snapshots
```

Truth:

- current/latest resolved Environment state per Guide

Rules:

- this table is a mutable current-state projection
- it is not an immutable historical snapshot stream
- it contains only Guide-admitted Environment values
- excluded canonical families remain null
- provider and emitter histories support it
- it remains independent from Money and Ingest
- its current name may create future pressure, but current behavior governs present meaning

The audit proves:

```txt
UNIQUE(user_id)
one current row per Guide
repeated updates
```

Therefore:

> `environment_snapshots` currently owns current Environment state, not immutable snapshot history.

---

# 7. ENVIRONMENT SUPPORTING SYSTEMS

## environment_emitters

Owner:

- Environment Ingest

Owns:

- emitter registry
- provider/device identity
- source registration

Does not own:

- Guide permission
- canonical Environment truth
- current-state projection

---

## environment_emitter_events

Owner:

- Environment Ingest

Owns:

- admitted emitter event history
- lawful emitter provenance
- source evidence within Guide permission

Rules:

- event history is append-oriented
- stored payloads must not retain excluded family values in reconstructable form
- emitter history supports canonical Environment truth
- emitter history does not replace current Environment state
- runtime receipt is not automatically durable event history

---

## environment_context_events

Owner:

- Environment Runtime

Owns:

- admitted provider context history
- provider provenance
- lawful enrichment evidence

Rules:

- provider history remains supporting truth
- provider-returned values must pass Guide admission before persistence
- excluded provider-derived values remain null from inception
- provider history does not replace current Environment state
- provider metadata must not become a back door to reconstruct excluded values

---

## environment_snapshots

Owner:

- Environment

Owns:

- current/latest resolved Environment state

Rules:

- one current row per Guide under the present model
- updated by lawful runtime writes
- contains only admitted values
- may contain resolved place, timezone, weather, sun, air, device, and motion context when permitted
- does not own historical event truth
- does not own Guide settings
- does not own Global presentation settings

---

# 8. SOURCE RECEIPT AND REPLAY

Source receipt exists to support routing, diagnostics, processing, provenance, and lawful replay.

Rules:

- source receipt is not canonical truth
- source receipt may be transient
- durable source evidence is bounded by Guide permission
- excluded values may not remain durably reconstructable
- replay may reproduce only what the Guide permitted Outflō to retain
- raw payload preservation does not outrank recording scope
- retention policy must distinguish transient receipt from durable admitted evidence

The database must never allow:

```txt
excluded source value
→ retained raw payload
→ later reconstruction
→ canonical backfill
```

That path is prohibited.

---

# 9. INGEST

Canonical entities:

- ingest_aliases
- inbound_email_stub
- ingest_events
- ingest_jobs

## ingest_aliases

Owns:

- ingest routing truth

Rules:

- route source identity to canonical Guide identity
- remain distinct from canonical substrate truth
- do not interpret Money, Environment, or future substrate meaning

---

## inbound_email_stub

Owns:

- raw inbound email intake support

Rules:

- operational intake only
- dormant or active status does not change ownership
- raw content retention must remain bounded by Guide permission
- it does not own receipt truth

---

## ingest_events

Owns:

- webhook event receipt
- processing audit state
- claim and completion state

Rules:

- mutable operational process truth
- not an immutable ledger
- not canonical Money truth
- not canonical Environment truth
- may support replay only within Guide permission

---

## ingest_jobs

Owns:

- queue state
- retry state
- worker execution state

Rules:

- operational only
- mutable
- subordinate to ingest processing
- never canonical substrate truth

---

# 10. RECEIPT ENVIRONMENT ASSOCIATION

Owner:

```txt
receipt_environment
```

Purpose:

- associate a receipt with Environment truth

Rules:

- association is subordinate to the receipt
- association may reference Environment
- association does not own receipt truth
- association does not own Environment truth
- association does not duplicate canonical values without a proven reason
- deletion behavior must preserve canonical ownership boundaries

Association is not ownership.

---

# 11. PROFILE AND IDENTITY SUPPORT

## profiles

Owner:

- Account / Identity Support

Owns:

- account shell
- account number
- bootstrap support

Rules:

- supports canonical identity
- does not replace `auth.users.id`
- may support routing and account presentation

---

## user_identity_assets

Owner:

- Profile

Owns:

- name
- username
- avatar
- gallery identity presentation

Rules:

- presentation identity only
- not canonical Guide permission
- not canonical substrate truth

---

# 12. SETTINGS TABLES

Current settings structures include:

```txt
user_preferences
environment_user_settings
```

## user_preferences

Current role:

- primary Guide settings root
- participation settings
- Global presentation settings
- update posture
- future recording-scope owner unless superseded by a singular successor

Rules:

- mutable
- Guide-owned
- never canonical ledger truth
- one authoritative owner for each setting
- no duplicate setting ownership across tables
- read and write paths must remain explicit

---

## environment_user_settings

Current role:

- narrow Environment presentation settings

Current example:

- temperature unit

Rules:

- mutable
- Guide-owned
- presentation only
- must not compete with `user_preferences`
- merge or split pressure must be resolved by ownership, not convenience
- duplicate ownership is prohibited

---

# 13. GLOBAL PRESENTATION STORAGE

Global presentation settings must remain structurally distinct from canonical truth.

Examples:

- `language`
- `locale`
- `timezone_view`
- `time_format`
- `date_format`
- `number_format`
- `currency_display`
- `week_start`
- Environment unit preferences

Rules:

- Global settings may be exhaustive in infrastructure
- surfaces may expose only simple controls
- one setting has one persisted owner
- presentation changes may re-render historical truth
- presentation changes may not rewrite historical values
- browser defaults may assist but may not silently replace persisted Guide choice
- Global settings do not belong in canonical event rows except as explicit event-local provenance when required

---

# 14. RESOLVED CONTEXT

Resolved context may include:

- place
- city
- region
- country
- timezone
- UTC offset
- timezone abbreviation
- local civil-time context
- weather context
- sun context
- air-quality context
- merchant context
- future derived context

Rules:

- resolved context derives only from admitted canonical inputs
- resolved context never expands Guide permission
- resolved context must preserve provenance when required
- event-local resolved context and current resolved context are distinct
- current Environment context may live in `environment_snapshots`
- historical event-local context belongs with the event or a lawful association when required
- Global view does not replace event-local context

---

# 15. CURRENT STATE, EVENT HISTORY, AND PROJECTION

The database must distinguish three concepts.

## Canonical Event History

Preserves admitted historical truth.

Rules:

- append-oriented
- immutable in production meaning
- contains only admitted values
- future settings changes do not rewrite it

---

## Current-State Projection

Represents latest resolved truth.

Rules:

- mutable
- reproducible from lawful inputs where architecture supports it
- may be updated repeatedly
- does not replace historical event truth
- current owner for Environment is `environment_snapshots`

---

## Derived Projection

Organizes or accelerates canonical truth.

Examples:

- receipt associations
- cached summaries
- day/place/orbit views

Rules:

- reproducible
- reversible
- never canonical ownership
- never admission

---

# 16. OPERATIONAL SYSTEMS

Operational systems may include:

- email_mirror_state
- forwarding_verifications
- ingest_jobs
- runtime locks
- claim state
- retry state
- diagnostic state

Rules:

- operational state is mutable
- operational state may be transient
- operational state never becomes canonical substrate truth
- operational state requires explicit security ownership
- dormant systems remain non-canonical until activated and audited

---

# 17. ATTENTION

Current owner:

```txt
screen_sessions
```

Role:

- append-only attention or screen-session event stream

Rules:

- canonical status remains limited to its own observed event domain
- it does not become Time ownership
- it may support future Attention substrate work
- it must not redefine canonical time
- its inclusion in wider computation requires an explicit law and owner

---

# 18. LEGACY AND TRANSITIONAL SYSTEMS

Legacy structures may exist.

Example:

```txt
user_system
```

Rules:

- transitional only
- may not compete with canonical ownership
- may not redefine epoch, settings, or system truth
- canonical reads and writes must use canonical owners
- legacy survival does not imply active ownership
- removal or archival must follow proven usage evidence

---

# 19. SECURITY AND POLICY

Policies describe access ownership.

Rules:

- Guide-owned tables require explicit access control
- canonical and settings tables must not rely on UI secrecy
- service-role writes must remain narrowly scoped
- runtime event tables require intentional hardening
- missing RLS is a security state, not a neutral omission
- public access must be explicit
- provider or ingest write paths must not broaden read access
- security policy must preserve the same ownership model as application code

RLS, grants, constraints, and service-role boundaries are part of database truth.

---

# 20. CONSTRAINTS AND DATABASE LAW

Columns describe existence.

Constraints describe invariants.

Foreign keys describe dependency.

Indexes describe traversal.

Policies describe access ownership.

Write behavior describes mutation.

Population describes activity.

Functions and triggers describe hidden behavior.

Comments describe whether the database explains itself.

The database contract must describe actual database reality.

It must not pretend desired architecture has already shipped.

---

# 21. MUTATION LAW

Mutation behavior must match truth type.

## Immutable Production Truth

Examples:

- canonical event time
- admitted historical events
- epoch anchor
- canonical money event meaning

Rules:

- no ordinary mutation
- no ordinary deletion
- dev or administrative reset behavior must remain explicit and isolated

---

## Mutable Guide Settings

Examples:

- recording scope
- update posture
- language
- locale
- units
- Global presentation settings

Rules:

- mutable
- identity-bound
- changes affect future behavior or current presentation
- changes do not rewrite historical truth

---

## Mutable Current-State Projections

Example:

- `environment_snapshots`

Rules:

- repeated updates are expected
- current-state mutation does not imply historical mutation
- current-state rows must not be described as immutable event history

---

## Mutable Operational State

Examples:

- ingest claim state
- retry state
- email mirror state

Rules:

- mutable by design
- non-canonical
- explicit owner required

---

# 22. DATABASE AND RUNTIME

The database preserves lawful outcomes.

Runtime enforces admission.

The runtime must determine:

- which source values are present
- which canonical families they map to
- which families the Guide permits
- whether Capture or Precise allows processing now
- which values must be nulled
- which canonical events may be written
- which current-state projections may update
- which provider resolutions may persist

The database must not rely on downstream UI or compiler behavior to correct an unlawful write.

---

# 23. RECEIPTS AND EXPORTS

Receipts and exports prove persisted truth.

They may include:

- canonical values
- canonical time
- admitted resolved context
- lawful provenance
- lawful associations
- event-local context when preserved

They must not include:

- excluded values
- reconstructable null-at-inception values
- provider values that bypassed admission
- current Guide settings represented as historical event truth
- alternate display-only truth

Historical outputs remain faithful to historical admission.

---

# 24. CHANGE

The Guide may change:

- recording scope
- update posture
- Global presentation settings

Database effects:

- scope changes affect future canonical admission
- posture changes affect future processing timing
- presentation changes affect current and future display
- historical canonical truth remains unchanged
- excluded history is not backfilled
- newly allowed families begin recording only after permission exists
- current-state projections may update according to future lawful emissions
- settings changes are preserved as mutable settings, not rewritten event truth

---

# 25. CURRENT DATABASE OWNERSHIP SUMMARY

```txt
Identity
→ auth.users.id

Time
→ user_epochs

Money
→ receipts

Environment current state
→ environment_snapshots

Environment emitter registry
→ environment_emitters

Environment emitter history
→ environment_emitter_events

Environment provider history
→ environment_context_events

Guide settings root
→ user_preferences

Environment presentation settings
→ environment_user_settings

Receipt × Environment association
→ receipt_environment

Ingest routing
→ ingest_aliases

Ingest processing
→ ingest_events

Ingest operations
→ ingest_jobs

Raw inbound support
→ inbound_email_stub

Profile support
→ profiles

Identity presentation
→ user_identity_assets

Email mirror operations
→ email_mirror_state

Forwarding verification
→ forwarding_verifications

Attention event stream
→ screen_sessions

Legacy
→ user_system
```

This summary records current ownership.

It does not prohibit future migration.

Any future migration must preserve singular ownership and explicit transition.

---

# 26. INVARIANTS

The following must always remain true:

- canonical identity is singular
- canonical time uses Unix milliseconds in UTC
- every canonical concept has one owner
- runtime receipt is not canonical admission
- emission is not recording
- Guide recording scope applies before canonical persistence
- Capture and Precise remain distinct from recording scope
- excluded values are null from inception
- durable source history may not reconstruct excluded values
- canonical events contain only admitted values
- current-state projections remain distinct from event history
- `environment_snapshots` currently owns current/latest Environment state
- mutable settings are not canonical ledger truth
- Global presentation does not rewrite canonical truth
- provider history supports but does not replace canonical ownership
- operational state is not canonical truth
- associations are not ownership
- projections are not ownership
- historical truth is not rewritten by future settings changes
- security policy must reflect ownership
- the contract describes database reality, not imagined architecture

---

# 27. SYSTEM SUMMARY

```txt
Reality
↓
Emitter / Provider / Source
↓
Runtime Receipt
↓
Guide Recording Scope
├── Allowed
└── Excluded → null from inception
↓
Guide Update Posture
├── Capture
└── Precise
↓
Canonical Admission
↓
Canonical Events
↓
Current-State Projection
↓
Resolved Context
↓
Global Presentation Settings
↓
Outflō Surfaces
```

Database ownership beneath the flow:

```txt
Identity
Time
Money
Environment
Guide Settings
Ingest
Associations
Operational State
```

Each concept has one owner.

---

# 28. FINAL PRINCIPLE

The database preserves what Outflō was permitted to know.

The Guide governs admission.

Runtime enforces permission.

Canonical owners preserve truth.

Current-state projections preserve the latest lawful state.

Global settings govern presentation.

Operational systems support the record.

Excluded truth is null from inception.

The database does not expand permission.

The database does not rewrite history.

The contract is not architecture theater.

The contract is a receipt of reality.

---

End of Document