# OUTFLO — THREAD TRANSITION SOP (v8)

Status: LOCKED

Replaces:

- Thread Transition SOP v7

Purpose:

Prevent drift by requiring explicit ownership, truth boundaries, Guide authority, admission boundaries, and file constraints before implementation.

---

# 1. CORE SHIFT

v7:

```txt
Declare state
→ assign ownership
→ constrain files
→ execute
```

v8:

```txt
Declare truth
→ assign ownership
→ declare Guide authority
→ declare admission and propagation
→ constrain files
→ execute
```

Implementation begins only after the system path is explicit.

---

# 2. THREAD START — REQUIRED BLOCK

Before writing any code, the thread must declare:

## STATE

What persisted, canonical, operational, current-state, derived, or presentation state is being worked on?

## OWNER

Who owns the Guide action or system transition?

## SOURCE OF TRUTH

Where does the authoritative value live?

Examples:

- database
- canonical event
- current-state projection
- Guide settings
- constant
- computation
- provider result
- runtime-only operational state

## GUIDE AUTHORITY

Does the Guide control:

- recording scope
- update posture
- Global presentation
- none of the above

If Guide authority applies, name the exact setting owner.

## ADMISSION BOUNDARY

Does this path receive emitted or provider truth?

If yes, declare:

- runtime receipt boundary
- canonical family mapping
- Guide recording-scope check
- null-at-inception behavior
- canonical write boundary

## WRITE PATH

How does the state change?

Examples:

```txt
Guide control
→ action or API
→ validation
→ database write
```

```txt
Emitter
→ runtime receipt
→ Guide admission
→ canonical event
→ current-state projection
```

## READ PATH

Where is the state read into runtime?

Examples:

- server layout
- page loader
- selector
- runtime worker
- compiler input
- provider adapter
- API route

## APPLICATOR

What applies the state to the system?

Examples:

- admission filter
- runtime dispatcher
- compiler
- formatter
- theme attribute
- computation
- projection builder

If no applicator exists, state:

```txt
APPLICATOR:
None
```

## CONSUMERS

Which systems, routes, compilers, exports, receipts, surfaces, or components consume the state?

## HISTORICAL EFFECT

Does the change affect:

- future admission
- current state
- presentation only
- historical truth
- operational state only

Historical canonical truth must not be rewritten unless the thread explicitly proves that historical mutation is lawful.

---

# 3. FILE BOUNDARY DECLARATION

Every implementation thread must declare:

## ALLOWED FILES

Explicit list of files that may be modified.

## FORBIDDEN FILES

Explicit list of files that must not be touched.

## DEFERRED FILES

Files known to require future work but excluded from the present pass.

If the file boundary is unclear:

```txt
STOP
```

No code is written until the boundary is explicit.

---

# 4. CANONICAL OWNERSHIP MODEL

## Guide Settings

Own:

- recording scope
- Capture or Precise update posture
- Global presentation settings

Guide settings are mutable.

Guide settings are not historical canonical truth.

---

## API Routes and Actions

Own:

- authenticated writes
- input validation
- explicit transition requests
- lawful handoff to runtime or database owners

They do not own canonical meaning.

---

## Runtime Admission

Owns:

- runtime receipt
- canonical family mapping
- Guide permission enforcement
- null-at-inception
- lawful canonical writes
- lawful current-state updates

Runtime admission must not be deferred to UI, compiler, export, or display logic.

---

## Database

Owns:

- persisted truth
- canonical event history
- current-state projections
- Guide settings
- lawful supporting history
- operational state
- security and policy boundaries

The database preserves lawful outcomes.

It does not independently expand permission.

---

## Canonical Owners

Own:

- singular concept meaning
- historical truth
- lawful interpretation boundaries

Examples:

```txt
Time
→ user_epochs and canonical event instants

Money
→ receipts

Environment current state
→ environment_snapshots
```

---

## Current-State Projections

Own:

- latest lawful state

They are mutable.

They are not immutable event history.

---

## Computation

Owns:

- deterministic derivation from admitted canonical truth
- projections
- reproducible summaries
- reversible calculations

Computation does not admit truth.

Computation does not expand permission.

---

## Compilers

Own:

- display models
- truthful fallbacks
- semantic composition
- surface-ready values

Compilers do not own:

- recording permission
- canonical persistence
- Guide settings
- historical truth

---

## Global

Owns:

- language
- locale
- display timezone
- date and time format
- number format
- units
- currency presentation
- week conventions
- accessibility presentation

Global changes presentation.

Global does not rewrite canonical truth.

---

## Layouts and Server Loaders

Own:

- canonical reads
- Guide setting reads
- runtime handoff
- surface entry state

They do not become alternate state owners.

---

## UI Surfaces

Own:

- projection
- interaction
- local composition
- presentation

They do not own canonical truth.

They do not infer Precise from data availability.

They do not repair unlawful persistence through hiding.

---

## Themes and Visual Systems

Own:

- appearance
- paint
- visual primitives
- theme participation

They do not own application truth.

---

## Legacy Systems

May render or remain operational during transition.

They may not:

- override canonical state
- duplicate Guide settings
- create alternate admission
- redefine truth
- introduce competing side effects

---

# 5. GUIDE RESOLUTION CHECK

Before implementation, answer:

```txt
Does this feature affect what Outflō may record?
Does this feature affect when permitted truth is processed?
Does this feature affect only how truth is presented?
```

The answers map to:

```txt
What may be recorded?
→ Recording Scope

When is permitted truth processed?
→ Capture or Precise

How is admitted truth presented?
→ Global
```

These axes must not be collapsed.

---

# 6. EMISSION CHECK

When the thread touches emitters, providers, ingest, webhooks, or device data, declare:

```txt
SOURCE:
What emitted?

RUNTIME RECEIPT:
Where did the bundle arrive?

FAMILY MAP:
Which canonical families are present?

GUIDE SCOPE:
Which families are allowed or excluded?

NULL RULE:
Where are excluded values removed?

CANONICAL WRITE:
Which admitted values persist?

CURRENT STATE:
Which projection updates?

PROVENANCE:
What lawful source evidence remains?
```

Excluded values may not remain durably reconstructable.

---

# 7. TIME CHECK

When the thread touches time, declare which temporal truth is in scope:

- canonical event instant
- event-local context
- current Environment time
- Guide display time
- operational timestamp
- derived window
- day, week, month, or orbit projection

Also declare:

```txt
TIMEZONE OWNER:
Which timezone defines the projection?

FORMAT OWNER:
Which Global setting formats it?

HISTORICAL RULE:
Can current settings affect historical display only,
or do they affect stored event context?
```

Browser-local assumptions are not canonical by default.

---

# 8. COMPUTATION CHECK

When the thread touches calculation, declare:

```txt
INPUT OWNER:
Which canonical owner provides inputs?

UNIT:
What canonical unit is used?

FORMULA OWNER:
Where does the named computation live?

ROUNDING:
Where and why does rounding occur?

OUTPUT TYPE:
Canonical, derived, cached, or presentation?

REVERSIBILITY:
Can the result be reproduced from canonical inputs?
```

Repeated arithmetic literals across files indicate missing computation ownership.

---

# 9. CONTRACT RULE

Existing contracts may predate current ownership law.

When conflict exists:

```txt
Latest locked law
→ current ownership
→ actual runtime and database evidence
```

wins over stale wording.

The thread must identify the conflicting document.

The thread must not silently implement both interpretations.

---

# 10. BUILD RULE

Do not build a page to solve ownership.

Do not add a helper to avoid naming ownership.

Do not use the compiler to repair runtime admission.

Do not use UI filtering to repair unlawful persistence.

Do not use a database field merely because it already exists.

Declare the system path first.

Pages and components are projections.

---

# 11. PATCH RULE

If a change:

- touches multiple ownership layers without declaration
- introduces duplicate writes
- duplicates Guide settings
- filters excluded values after persistence
- infers update posture from snapshot existence
- mixes canonical time with display time
- duplicates formulas across files
- fixes behavior without a named owner
- requires “just one more patch”

then:

```txt
STOP
```

Return to the thread-start declaration.

---

# 12. ONE-FILE RULE

One file at a time remains the default.

Before each file:

```txt
FILE:
Exact path

OWNER:
What responsibility belongs here?

CHANGE:
What exact responsibility is being added, removed, or corrected?

NON-GOALS:
What this file will not absorb?

VERIFICATION:
How correctness will be proven?
```

A file closes when:

- its responsibility is singular
- its imports align with ownership
- no competing write path remains
- the build or focused verification passes

Closed files are not reopened without evidence.

---

# 13. MIGRATION RULE

Migration proceeds by ownership, not by convenience.

Canonical order:

```txt
law
→ schema or settings ownership
→ runtime admission
→ canonical writes
→ current-state projection
→ compiler
→ Global formatting
→ UI surface
→ receipts and exports
```

A later layer must not be finalized while its upstream truth remains fake.

---

# 14. LEGACY RULE

Wrap legacy.

Do not repair legacy unless it blocks canonical propagation.

Legacy may:

- look outdated
- remain temporarily duplicated in appearance
- preserve historical structure

Legacy may not:

- write alternate truth
- reset Guide settings
- bypass recording scope
- apply conflicting side effects
- reconstruct excluded values
- redefine Global settings

---

# 15. DEAD OWNERSHIP RULE

When a responsibility is removed, remove its ownership.

Complete removal includes:

- write path
- read path
- imports
- helpers
- components
- tokens
- settings
- routes
- exports
- dead folders
- stale documentation references

Hiding output is not removal.

---

# 16. VERIFICATION RULE

Verification must match the layer.

Examples:

## Database

- constraints
- policies
- migration application
- row behavior
- null-at-inception proof

## Runtime

- allowed emission persists
- excluded emission does not persist
- Capture waits for Guide action
- Precise processes lawful emissions
- provider and emitter paths normalize consistently

## Computation

- deterministic output
- canonical unit proof
- rounding proof
- no duplicated formula ownership

## Compiler

- truthful fallback
- no inferred permission
- no reconstruction of excluded values

## Global

- persisted Guide choice
- correct locale and timezone behavior
- historical display changes without historical mutation

## UI

- build passes
- rendered state matches infrastructure truth
- themes resolve
- no dead references remain

Verification is part of implementation.

---

# 17. THREAD VALIDITY CHECK

A thread is valid only if:

- state is named
- owner is assigned
- source of truth is declared
- Guide authority is declared
- admission boundary is declared when applicable
- write path is declared
- read path is declared
- applicator is declared
- consumers are listed
- historical effect is declared
- allowed files are listed
- forbidden files are listed
- deferred files are listed
- verification is declared

If any required field is missing:

```txt
DO NOT WRITE CODE
```

---

# 18. FAILURE SIGNALS

Stop and re-evaluate when:

- state resets across routes
- multiple files write the same setting
- emitted values persist before permission filtering
- raw payloads retain excluded values
- current state is mistaken for event history
- browser timezone changes canonical behavior
- UI labels decide runtime behavior
- compiler fallbacks create fictional truth
- formulas differ across files
- theme or layout code acquires application ownership
- legacy code overrides canonical propagation
- every fix exposes another hidden owner

These are ownership failures.

They are not styling bugs.

---

# 19. REQUIRED THREAD OPENING TEMPLATE

```txt
THREAD:
Exact implementation scope

STATE:
Persisted, canonical, current-state, derived, operational, or presentation state

OWNER:
Guide, canonical system, runtime, computation, Global, or surface owner

SOURCE OF TRUTH:
Exact database table, event, setting, constant, provider result, or computation

GUIDE AUTHORITY:
Recording scope / update posture / Global / none

ADMISSION BOUNDARY:
Runtime receipt → family map → scope check → null rule → canonical write
or
Not applicable

WRITE PATH:
Exact transition path

READ PATH:
Exact runtime read path

APPLICATOR:
Exact applicator or None

CONSUMERS:
Exact systems and surfaces

HISTORICAL EFFECT:
Future admission / current state / presentation / historical truth / operational only

ALLOWED FILES:
Exact paths

FORBIDDEN FILES:
Exact paths

DEFERRED FILES:
Exact paths

VERIFICATION:
Exact proof
```

---

# 20. ONE-LINE LOCK

> We do not implement until truth, Guide authority, ownership, admission, propagation, file boundaries, and verification are explicit.

---

End of Document