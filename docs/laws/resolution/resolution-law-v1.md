# OUTFLO — GUIDE RESOLUTION LAW (v1)

Status: LOCKED

Scope:

Defines the canonical relationship between:

- the Guide
- emitters
- emitted truth
- recording permission
- update posture
- canonical persistence
- resolution
- Global presentation
- Outflō surfaces

This law extends and clarifies the Participation Law and Emission Law.

It governs all present and future Outflō substrates.

---

# 1. PURPOSE

Define how the Guide governs what Outflō is permitted to record and how permitted truth is updated, resolved, and surfaced.

This law establishes:

- who the Guide is
- what the Guide owns
- what emitters own
- the distinction between emission and recording
- the distinction between recording scope and update posture
- the meaning of Capture
- the meaning of Precise
- how excluded emissions are treated
- how admitted truth becomes canonical
- how Global resolves presentation
- what “Outflō resolves” means

---

# 2. CORE PRINCIPLE

The world emits.

The Guide decides what Outflō may record.

Outflō records only permitted truth.

Outflō resolves the admitted truth.

Outflō surfaces the result.

---

# 3. THE GUIDE

The person within Outflō is the Guide.

The Guide is not a system mode.

The Guide is not a database alias.

The Guide is not a reduced label for manual behavior.

The Guide owns the relationship between lived reality and Outflō.

The Guide determines:

- what Outflō may record
- which emission families are admitted
- which emission families are excluded
- whether permitted truth updates through Capture or Precise
- how resolved truth is presented through Global settings
- when participation changes

Outflō follows the Guide.

Outflō does not independently expand its permission.

---

# 4. EMITTERS

Emitters observe reality and produce emission bundles.

Examples include:

- OwnTracks
- Open-Meteo
- financial institutions
- calendars
- devices
- health providers
- future emitters

An emitter may emit many values in one bundle.

For example, an emitter may emit:

- coordinates
- altitude
- speed
- heading
- battery
- connection
- weather
- rain
- pressure
- timestamps
- provider metadata

Emitters own observation.

Emitters do not own recording permission.

Emitters do not decide what becomes canonical Outflō truth.

---

# 5. EMISSION IS NOT RECORDING

An emission occurring does not mean Outflō is permitted to record every emitted value.

The distinction is permanent:

> emitted truth is not automatically recorded truth

Outflō may receive an emission bundle at the runtime boundary.

The Guide’s recording scope determines which emitted families may enter canonical persistence.

Therefore:

- emitted values may be present in the incoming bundle
- permitted values may enter canonical truth
- excluded values must not enter canonical truth
- exclusion is applied before canonical persistence

Outflō must never record an excluded value and merely hide it later.

---

# 6. GUIDE RECORDING SCOPE

Recording scope defines which emission families Outflō is permitted to resolve and persist.

Recording scope is Guide-owned.

Each canonical emission family is independently:

- allowed
- excluded

Examples:

- Location: allowed
- Temperature: allowed
- Rain: excluded
- Air Quality: allowed
- Altitude: excluded

Recording scope is independent of update posture.

A Guide may choose Precise while excluding Rain.

A Guide may choose Capture while allowing Location, Weather, and Air Quality.

No update posture implies permission to record every emission family.

---

# 7. NULL AT INCEPTION

When an emission family is excluded by the Guide:

- the emitter may still emit it
- the runtime may receive it as part of a source bundle
- Outflō must reject it before canonical persistence
- its canonical database value must be null from inception

Excluded truth must not be:

- stored and hidden
- stored and filtered only in the UI
- stored for possible future use
- reconstructed from retained provider payloads
- treated as historical canonical truth

The record must truthfully represent the Guide’s permission at the time of admission.

The absence is intentional.

The null is canonical.

---

# 8. UPDATE POSTURE

Update posture determines when Outflō processes newly available permitted emissions.

Update posture does not determine which emissions are permitted.

The canonical update postures are:

- Capture
- Precise

There is no City posture.

There is no Guide posture.

There is no predetermined posture unless a distinct future requirement establishes one.

---

# 9. CAPTURE

Capture means the Guide intentionally asks Outflō to resolve the current moment.

Capture occurs through an explicit Guide action.

Examples may include:

- pressing Refresh
- invoking Capture
- intentionally requesting a current update

Under Capture:

- emitters may continue to exist
- permitted scope remains unchanged
- Outflō does not continuously update canonical truth
- Outflō resolves the permitted current emissions when the Guide requests the moment

Capture is not diminished resolution.

Capture is Guide-initiated timing.

Capture answers:

> Resolve this moment now.

---

# 10. PRECISE

Precise means Outflō processes each permitted emission when that emission happens.

Precise does not mean:

- precise location
- higher coordinate accuracy
- every possible emission
- unrestricted recording
- maximum provider access
- a location-display mode

Precise means:

> Outflō accepts precisely the emissions the Guide has allowed, as they are noted, whenever they happen, without requiring the Guide to manually request each update.

Precise always remains bounded by recording scope.

Therefore:

- Precise + Rain allowed  
  → Rain may be recorded whenever emitted

- Precise + Rain excluded  
  → Rain remains null whenever emitted

Precise controls update timing.

Recording scope controls admission.

The two concepts are distinct.

---

# 11. THE TWO GUIDE-CONTROLLED AXES

Outflō must preserve two independent axes.

## Axis One — Recording Scope

Determines:

> What may enter canonical truth?

Values:

- allowed
- excluded

Applied independently per canonical emission family.

## Axis Two — Update Posture

Determines:

> When does Outflō process permitted emissions?

Values:

- Capture
- Precise

The axes may combine freely.

Examples:

### Capture + Location allowed

Outflō records Location only when the Guide intentionally captures the current moment.

### Capture + Rain excluded

Rain remains null when the Guide captures.

### Precise + Location allowed

Outflō records permitted Location emissions as they happen.

### Precise + Rain excluded

Rain remains null even when Rain is emitted.

---

# 12. CANONICAL ADMISSION

The canonical admission path is:

Reality

↓

Emitter observes

↓

Emitter produces emission bundle

↓

Outflō receives bundle

↓

Guide recording scope applies

↓

Excluded families become null

↓

Permitted families enter canonical ownership

↓

Canonical events persist

↓

Snapshots project current truth

The admission boundary must exist before canonical persistence.

UI filtering is not admission.

Compiler filtering is not admission.

Export filtering is not admission.

The canonical write boundary owns admission.

---

# 13. CANONICAL TRUTH

Canonical truth contains only Guide-permitted emissions.

Canonical truth belongs to Outflō’s canonical families.

Rules:

- emitters preserve source observation
- Guide scope controls admission
- canonical families own meaning
- canonical events preserve admitted history
- snapshots project current admitted truth
- excluded families remain null
- changing future permission does not rewrite historical truth

Participation changes future admission.

Participation does not mutate historical canonical truth.

---

# 14. RESOLUTION

Outflō resolves admitted truth.

Resolution may include:

- decomposing emission bundles
- assigning canonical families
- interpreting values
- deriving related context
- computing summaries
- establishing relationships
- formatting presentation through Global
- surfacing relevant truth

Resolution never expands permission.

Derived truth may exist only when its required canonical inputs were admitted.

For example:

- coordinates may resolve place
- coordinates may resolve city
- coordinates may resolve region
- coordinates may resolve country
- coordinates may resolve timezone
- timezone may resolve local civil time
- location and time may resolve sun context

If the required source family is excluded, downstream resolution must not reconstruct or infer that excluded truth through another path.

---

# 15. GLOBAL

Global governs how admitted and resolved truth is presented.

Global may own exhaustive Guide presentation settings, including:

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

Global does not own canonical observation.

Global does not redefine recorded truth.

Global does not grant recording permission.

Global transforms presentation, not history.

The relationship is:

Canonical truth

+

Resolved world context

+

Guide presentation settings

↓

Guide-facing view

---

# 16. TIME

Time must remain separated into distinct truths.

## Event Instant

The immutable moment when an event occurred.

Stored canonically as epoch or UTC-compatible time.

## Event-Local Context

The timezone and offset applicable to the resolved Environment when the event occurred.

## Guide View

The language, locale, timezone view, and format through which the Guide sees the event.

## Live Environment Time

The current civil time at the presently resolved Environment.

These truths must not be collapsed into browser-local assumptions.

A display timezone must never rewrite the canonical event instant.

---

# 17. LOCATION

Location is one canonical emission family under Guide authority.

Location does not define Guide permission.

Location does not define Precise.

Location does not define Capture.

When Location is permitted, admitted coordinates may support downstream resolution such as:

- place
- city
- region
- country
- timezone
- local time
- weather context
- sun context

When Location is excluded:

- canonical Location values remain null
- dependent resolution must not recreate Location indirectly
- UI must surface the absence honestly

The Guide decides.

Location follows.

---

# 18. SURFACES

Outflō surfaces canonical and resolved truth.

Surfaces include:

- Environment
- Money
- Time
- receipts
- summaries
- themes
- exports
- future substrates

Surfaces do not create permission.

Surfaces do not create canonical truth.

Surfaces do not reinterpret Capture or Precise.

Surfaces project the state established by infrastructure.

The UI must never infer Precise from snapshot existence.

The UI must never invent a place when place has not resolved.

The UI must never hide persisted excluded truth as a substitute for null-at-inception.

---

# 19. SETTINGS

Settings may be exhaustive in infrastructure and simple at individual surfaces.

The Guide does not need to understand every internal dependency.

The Guide chooses:

- what Outflō may record
- whether updates occur through Capture or Precise
- how resolved truth is presented

Outflō owns the lawful downstream consequences.

A simple control may alter a complete, typed settings contract.

Simplicity at the surface must not produce ambiguity in infrastructure.

---

# 20. DATABASE

The database preserves the outcome of Guide permission.

The database must distinguish:

- source receipt
- canonical events
- snapshot projection
- Guide settings
- resolved context
- presentation preferences

Update posture belongs to persisted Guide settings.

Recording scope belongs to persisted Guide settings or an equivalent singular Guide-owned permission contract.

Excluded canonical values are null from inception.

Capture and Precise do not belong inside historical event truth as mutable global state, though an event may preserve the posture under which it was admitted when provenance requires it.

The database must not collapse:

- recording scope
- update posture
- canonical truth
- resolved context
- presentation settings

Each responsibility must have one owner.

---

# 21. RUNTIME

The runtime enforces Guide permission.

For every incoming emission bundle, runtime must determine:

- which canonical families are present
- which families the Guide permits
- which values must be nulled
- whether the current update posture permits processing now
- what canonical events should be written
- what snapshot projections should change
- what downstream context may be resolved

Capture behavior:

- process when explicitly invoked by the Guide

Precise behavior:

- process permitted emissions as they happen

Runtime must not depend on UI labels to enforce this law.

---

# 22. COMPILER

The compiler consumes canonical and resolved truth.

The compiler may:

- derive view models
- select truthful fallbacks
- format semantic display values
- compose substrate views

The compiler must not:

- decide recording permission
- infer update posture from data availability
- restore excluded values
- invent canonical truth
- create Guide settings
- persist state

The compiler projects.

Infrastructure decides.

---

# 23. RECEIPTS AND EXPORTS

Receipts and exports prove the admitted record.

They must reflect:

- what was recorded
- what was resolved
- when it occurred
- relevant provenance
- applicable Guide permission boundaries when required

Receipts and exports must not include excluded canonical values.

They must not infer values that were null at inception.

Historical exports remain faithful to historical permission.

---

# 24. CHANGE

The Guide may change:

- recording scope
- update posture
- Global presentation settings

Changes affect future processing and future presentation according to their ownership.

Rules:

- recording-scope changes affect future admission
- update-posture changes affect future update behavior
- presentation changes may alter current display
- canonical historical truth remains unchanged
- excluded historical values are not backfilled
- newly allowed families begin recording only after permission exists

---

# 25. INVARIANTS

The following must always remain true:

- the person is the Guide
- the Guide chooses what Outflō may record
- emitters may emit more than Outflō records
- emission is not recording
- recording scope and update posture are distinct
- Capture means Guide-initiated resolution of the current moment
- Precise means permitted emissions are processed when they happen
- Precise does not mean record everything
- Precise does not mean location accuracy
- excluded values are null from inception
- exclusion occurs before canonical persistence
- canonical truth contains only admitted emissions
- Global governs presentation, not canonical truth
- location remains one Guide-governed emission family
- language and locale do not alter historical truth
- time display does not rewrite event instants
- UI projects infrastructure truth
- Outflō never expands its own permission
- historical truth is never rewritten by future participation changes

---

# 26. SYSTEM SUMMARY

Reality

↓

Emitter

↓

Emission Bundle

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

Snapshot Projection

↓

Resolved World Context

↓

Global Presentation

↓

Outflō Surfaces

↓

Guide Reflection

---

# 27. FINAL PRINCIPLE

The world emits.

The Guide decides what Outflō may record.

Capture resolves the moment when the Guide asks.

Precise resolves permitted emissions when they happen.

Excluded truth is null from inception.

Outflō records only admitted truth.

Outflō resolves what was admitted.

Outflō surfaces the result.

The Guide decides.

Outflō follows.

Outflō resolves.