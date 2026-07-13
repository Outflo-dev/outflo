# OUTFLO — TIME LAW (v2)

Status: LOCKED

Scope

Defines the canonical relationship between time, identity, event instants, event-local context, live Environment time, Guide presentation, temporal structures, computation, and historical truth within Outflō.

Replaces:

- Time Law v1

Clarified by:

- Guide Resolution Law v1
- Participation Law v2
- Emission Law v2
- Database Contract v6
- Ownership Law v1
- Computation Law v1

---

# 1. PURPOSE

Define how Outflō preserves temporal truth without collapsing canonical time, local context, current Environment time, and Guide presentation into one ambiguous value.

This law establishes:

- canonical time
- authoritative observation
- event instants
- event-local temporal context
- live Environment time
- Guide timezone view
- language and locale presentation
- temporal structures
- computation boundaries
- database ownership
- historical invariants

Time exists independently.

Outflō observes.

Outflō preserves.

Meaning is derived.

Presentation is Guide-governed.

---

# 2. CORE PRINCIPLE

Time exists independently of Outflō.

Canonical time records when something occurred.

Event-local context records where that instant was locally situated.

Live Environment time resolves the current civil time of the present Environment.

Guide presentation determines how temporal truth is shown.

None of these may rewrite another.

---

# 3. CANONICAL TIME

Canonical time is:

```txt
Unix milliseconds in UTC
```

Canonical examples:

- `now_ms`
- `moment_ms`
- `event_ms`
- `epoch_ms`

Rules:

- stored as `bigint`
- UTC-based
- millisecond precision
- immutable once admitted as historical truth
- independent of display timezone
- independent of language
- independent of locale
- independent of daylight-saving presentation

Canonical time is singular.

---

# 4. AUTHORITATIVE OBSERVATION

Authoritative time belongs to trusted observation.

Possible sources include:

- server runtime
- trusted emitter timestamps
- provider timestamps
- canonical event admission
- authenticated system operations

Rules:

- client time is never canonical by default
- source time may be accepted only through an explicit trust boundary
- server time is authoritative when source time is absent or untrusted
- time normalization must be explicit
- improved future observation does not rewrite historical canonical instants
- operational timestamps do not silently replace event timestamps

Observation preserves temporal reality.

Observation does not invent it.

---

# 5. THE FOUR TEMPORAL TRUTHS

Outflō must preserve four distinct temporal truths.

## Event Instant

The immutable UTC instant when an event occurred.

Examples:

- purchase time
- emitter event time
- context pull time
- screen-session start
- epoch anchor

Owner:

- canonical event or canonical time owner

Representation:

```txt
Unix milliseconds in UTC
```

---

## Event-Local Context

The timezone and offset applicable to the resolved Environment when the event occurred.

May include:

- IANA timezone
- UTC offset
- timezone abbreviation
- local civil date
- local civil time
- daylight-saving state
- place context when lawfully admitted

Rules:

- derives only from admitted canonical inputs
- may be preserved with the event or lawful association when historical reconstruction requires it
- does not replace the event instant
- must not be recomputed from current timezone rules when historical fidelity requires preserved event-local context
- must not exist when required source inputs were excluded

---

## Live Environment Time

The current civil time of the presently resolved Environment.

Rules:

- derives from current resolved Environment timezone
- changes continuously as time passes
- is not historical event truth
- is not browser-local by default
- may differ from the Guide’s display timezone
- becomes unavailable when the required Environment context is unavailable or excluded

Live Environment time answers:

> What time is it there now?

---

## Guide View

The Guide-controlled presentation of temporal truth.

May include:

- language
- locale
- timezone view
- 12-hour or 24-hour format
- date order
- month and weekday naming
- number formatting
- week-start convention
- relative-time style

Rules:

- Guide View affects display
- Guide View does not rewrite event instants
- Guide View does not rewrite event-local context
- Guide View may re-render historical truth
- browser defaults may assist only when no persisted Guide choice exists
- persisted Guide choice must remain authoritative when present

---

# 6. TIMEZONE OWNERSHIP

Timezone must not be treated as one undifferentiated field.

Outflō may preserve:

## Event Timezone

The IANA timezone applicable to the event-local context when the event occurred.

## Event UTC Offset

The numeric offset applicable at the event instant.

## Current Environment Timezone

The IANA timezone currently resolved from admitted Environment truth.

## Guide Display Timezone

The timezone through which the Guide chooses to view temporal truth.

These may be equal.

They are not the same owner.

Rules:

- event timezone is historical context
- current Environment timezone is current resolved context
- Guide display timezone is mutable presentation state
- UTC offset is not a substitute for IANA timezone
- timezone abbreviation is never sufficient canonical identity
- display timezone must never overwrite event timezone
- current Environment timezone must never rewrite historical event context

---

# 7. IANA TIMEZONE LAW

Outflō uses IANA timezone identifiers for canonical timezone identity.

Examples:

```txt
America/New_York
Europe/London
Asia/Tokyo
```

Rules:

- store IANA timezone when timezone identity must persist
- UTC offset alone is insufficient for future or historical civil-time resolution
- abbreviations such as EST, EDT, PST, or CET are presentation aids only
- timezone inference must preserve provenance
- derived timezone may exist only from admitted location or another lawful source
- excluded location must not be reconstructed indirectly through timezone metadata

IANA timezone identifies the civil-time rule set.

Offset identifies the event-specific displacement from UTC.

---

# 8. EVENT-LOCAL RESOLUTION

Event-local temporal context may derive from:

- admitted coordinates
- admitted place
- admitted timezone
- trusted provider context
- explicit Guide-entered place or timezone
- lawful associations

Rules:

- resolution never expands Guide permission
- dependent temporal context must not be created from excluded source families
- if location is excluded, location-derived timezone must not be reconstructed through provider remnants
- event-local context may be null when lawful inputs are absent
- null must be surfaced honestly
- historical event-local context is not backfilled from later permission

The Guide decides what Outflō may know.

Temporal resolution follows.

---

# 9. EPOCH

Epoch is the canonical temporal anchor of Guide identity within Outflō.

Owner:

```txt
user_epochs
```

Canonical field:

```txt
epoch_ms
```

Definition:

- the intentional beginning of the Guide’s Outflō system

Rules:

- immutable in production meaning
- identity-bound
- observed once
- never rewritten
- never redefined by timezone
- never redefined by locale
- never redefined by Global settings
- a new beginning requires a new identity or explicitly separate epoch owner

Dev or administrative reset behavior must remain explicitly non-production.

---

# 10. TEMPORAL STRUCTURES

Temporal structures derive from canonical time and lawful context.

Examples:

- day
- week
- month
- year
- window
- orbit
- local date
- relative duration

Temporal structures organize time.

Temporal structures do not own time.

---

## Day

Day is derived.

Inputs may include:

- event instant
- event-local timezone
- Guide display timezone
- explicit projection rule

Rules:

- a day projection must declare which timezone owns the boundary
- browser-local midnight is not an implicit canonical boundary
- event-local day and Guide-view day may differ
- day may be recomputed for display
- day is not canonical time

---

## Week

Week is derived.

Inputs may include:

- locale
- week-start convention
- timezone boundary

Rules:

- week-start is Guide presentation or projection state
- week grouping must declare its timezone
- ISO week and locale week are distinct projections
- week is not canonical time

---

## Orbit

Orbit is derived.

Rules:

- epoch anchored
- deterministic
- identity-bound
- not stored as canonical truth
- does not mutate historical time

Orbit organizes experience.

Orbit does not own time.

---

# 11. WINDOWS

A temporal window must declare:

- start instant
- end instant
- inclusivity rules
- timezone when civil boundaries are used
- canonical inputs
- projection context

Rules:

- window inclusion is deterministic
- UTC instant windows remain distinct from local civil-time windows
- day, week, month, and year windows require an explicit timezone owner
- Guide display settings must not silently change canonical inclusion
- recomputation must reproduce the same result from the same declared inputs

A window is a computation boundary.

A window is not canonical time.

---

# 12. LANGUAGE AND LOCALE

Language and locale govern temporal presentation.

They may affect:

- month names
- weekday names
- date ordering
- punctuation
- numbering systems
- relative-time language
- 12-hour or 24-hour conventions
- week conventions

Rules:

- language does not alter canonical time
- locale does not alter event instant
- locale may alter projection and display conventions
- persisted Guide locale outranks browser locale
- browser locale may provide a fallback only when permitted
- translated labels are presentation, not temporal truth

---

# 13. DATE AND TIME FORMAT

Date and time format are Guide presentation settings.

Examples:

- `MM/DD/YYYY`
- `DD/MM/YYYY`
- `YYYY-MM-DD`
- 12-hour time
- 24-hour time
- seconds shown or hidden
- timezone label shown or hidden

Rules:

- formatting consumes temporal truth
- formatting does not create temporal truth
- display formatting must be centralized through owned formatters
- surfaces must not each invent incompatible formatting behavior
- a raw ISO string is not automatically the correct Guide-facing format
- exported machine data may preserve canonical formats
- human exports may apply Guide presentation when explicitly intended

---

# 14. CURRENT TIME

Current time is observed, not stored as a continuously mutating canonical row.

Rules:

- `now_ms` is observed at computation or render boundaries
- current time must come from an authoritative runtime source
- the browser may animate presentation but does not become canonical time owner
- live clocks are projections
- live clocks may use current Environment timezone or Guide display timezone
- the selected clock owner must be explicit

A live clock must answer one of two questions:

```txt
What time is it there?
What time is it for the Guide?
```

Those are different projections.

---

# 15. CAPTURE AND PRECISE

Update posture affects when permitted temporal emissions and related context are processed.

## Capture

- the Guide intentionally requests the current moment
- runtime observes or resolves the current permitted state
- the capture receives a canonical event instant
- Capture does not reduce temporal precision
- Capture does not grant additional recording scope

## Precise

- permitted emissions are processed when they happen
- each admitted event preserves its own canonical instant
- Precise does not mean higher clock accuracy
- Precise does not grant unrestricted temporal or location data

Recording scope controls what may be known.

Update posture controls when permitted truth is processed.

---

# 16. PARTICIPATION

Time exists independently of participation.

Participation governs whether Outflō may admit specific temporal context beyond baseline canonical time.

Examples:

- location-derived timezone
- event-local civil time
- calendar participation
- device time context
- future temporal emitters

Rules:

- baseline canonical time may exist independently
- participation does not create time
- excluded temporal context remains null
- future permission changes do not rewrite historical temporal truth
- newly allowed context begins only after permission exists

---

# 17. DATABASE

The database must distinguish:

- canonical event instant
- operational timestamps
- epoch anchor
- event-local timezone
- event-local UTC offset
- current Environment timezone
- Guide display timezone
- locale
- format settings
- derived temporal projections

Rules:

- canonical event instant uses Unix milliseconds in UTC
- event-local context is preserved only when lawfully admitted and required
- Guide display settings remain mutable and separate
- current Environment timezone remains current-state context
- operational timestamps do not replace event timestamps
- historical event instants are immutable
- presentation changes do not mutate stored instants
- null-at-inception applies to excluded temporal context

---

# 18. COMPUTATION

Computation consumes admitted canonical time and lawful temporal context.

Examples:

- duration
- elapsed time
- day grouping
- week grouping
- orbit
- window inclusion
- local civil-time projection
- relative time
- timezone conversion

Rules:

- computation must declare its canonical inputs
- computation must declare timezone ownership where relevant
- computation may not infer excluded context
- outputs remain deterministic
- outputs remain reproducible
- derived time does not become canonical time
- caches do not become temporal truth

---

# 19. COMPILER

The compiler may:

- format event instants
- project event-local time
- project Guide-view time
- compose live Environment time
- choose truthful temporal fallbacks
- expose timezone and format labels

The compiler must not:

- invent event instants
- infer historical timezone from current browser state
- rewrite canonical time
- infer Precise from temporal availability
- recreate excluded location or timezone
- persist temporal truth
- silently choose a timezone owner

The compiler projects.

Infrastructure preserves.

---

# 20. SURFACES

Surfaces may display:

- event time
- event-local time
- Guide-view time
- live Environment time
- elapsed time
- day/week/month projections
- orbit
- temporal summaries

Rules:

- each surface must know which temporal truth it presents
- browser-local assumptions are prohibited unless explicitly selected
- labels such as “local” must identify whose local time
- missing temporal context must surface honestly
- a surface must not collapse event-local and Guide-view time
- UI does not own timezone or formatting truth

---

# 21. RECEIPTS AND EXPORTS

Receipts and exports may preserve:

- canonical event instant
- event-local timezone
- event-local UTC offset
- event-local civil time
- Guide-view rendering
- provenance

Rules:

- machine exports should preserve canonical time explicitly
- human exports may include event-local or Guide-view presentation
- the chosen presentation must be labeled
- exports must not replace canonical instant with a formatted string only
- excluded event-local context must not be reconstructed
- historical exports remain faithful to historical temporal admission

---

# 22. CHANGE

The Guide may change:

- display timezone
- language
- locale
- time format
- date format
- week convention

Effects:

- current and historical presentation may change
- canonical event instants do not change
- event-local historical context does not change
- current Environment time may change when current Environment changes
- day or week projections may change when their declared Guide-view timezone changes
- historical admission is not rewritten

Presentation changes the view.

Presentation does not change what occurred.

---

# 23. PROHIBITED COLLAPSES

The following collapses are prohibited:

```txt
event instant = formatted date string
event timezone = Guide display timezone
event UTC offset = IANA timezone
current Environment timezone = historical event timezone
browser timezone = canonical timezone
locale = language
day projection = canonical time
operational timestamp = event timestamp
Capture = coarse time
Precise = clock accuracy
```

Each concept must retain one owner.

---

# 24. INVARIANTS

The following must always remain true:

- time exists independently of Outflō
- canonical time is Unix milliseconds in UTC
- canonical event instants are immutable
- epoch anchors identity
- event instant and event-local context are distinct
- event-local context and Guide View are distinct
- live Environment time and Guide View are distinct
- IANA timezone and UTC offset are distinct
- browser-local time is not canonical by default
- language and locale do not rewrite time
- formatting does not rewrite time
- day, week, month, window, and orbit are projections
- every civil-time projection declares a timezone owner
- Capture and Precise do not redefine time precision
- excluded temporal context is null from inception
- current settings do not rewrite historical temporal truth
- computation remains deterministic and reproducible
- compiler and UI project but do not own temporal truth
- historical time is never rewritten

---

# 25. SYSTEM SUMMARY

```txt
Time
↓
Authoritative Observation
↓
Canonical Event Instant
├── Event-Local Context
├── Current Environment Context
└── Guide Presentation Settings
↓
Temporal Computation
↓
Projections
├── event-local time
├── Guide-view time
├── live Environment time
├── day
├── week
├── window
└── orbit
↓
Outflō Surfaces
↓
Guide Reflection
```

Ownership remains distinct:

```txt
Canonical instant
→ event owner

Event-local context
→ event or lawful association

Current Environment timezone
→ current Environment state

Guide display timezone and format
→ Global settings

Temporal projections
→ computation
```

---

# 26. FINAL PRINCIPLE

Time exists.

Outflō observes.

Canonical time preserves when.

Event-local context preserves where that instant belonged.

Live Environment time resolves what time it is there now.

Guide View determines how time is shown.

None of these rewrite another.

Time does not belong to Outflō.

Outflō belongs to time.

The system does not invent temporal truth.

It preserves the instant.

It resolves the context.

It presents the result for the Guide.

---

End of Document