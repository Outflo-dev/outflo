# OUTFLO — EMISSION LAW (v2)

Status: LOCKED

Scope

Defines the canonical relationship between reality, emitters, emission bundles, runtime receipt, Guide permission, canonical families, canonical admission, canonical truth, and substrate participation.

Replaces:

- Emission Law v1

Clarified by:

- Guide Resolution Law v1
- Participation Law v2
- Database Contract
- Ownership Law
- Computation Law
- Time Law

---

# 1. PURPOSE

Define how information enters Outflō without confusing observation, receipt, permission, admission, interpretation, or persistence.

This law establishes:

- what emitters own
- what emission bundles are
- what runtime receipt means
- what Guide permission governs
- how canonical families are identified
- how excluded values are handled
- how canonical admission occurs
- how canonical truth is established
- how replayability is constrained
- how substrates consume admitted truth

The world emits.

Outflō receives.

The Guide decides what Outflō may record.

Outflō resolves only admitted truth.

---

# 2. CORE PRINCIPLE

Reality exists.

Emitters observe.

Emitters emit.

Outflō may receive.

The Guide governs admission.

Canonical families own interpretation.

Canonical truth contains only permitted emissions.

---

# 3. REALITY

Reality exists independently of Outflō.

Examples:

- movement
- weather
- purchases
- communication
- body signals
- calendar events
- device state
- time passing

Reality does not require Outflō.

Outflō does not create reality.

Outflō may observe reality only through emitters and within the Guide’s permission boundary.

---

# 4. EMITTERS

Emitters observe reality and produce source emissions.

Examples:

- OwnTracks
- Open-Meteo
- email providers
- financial institutions
- calendars
- health systems
- devices
- future emitters

Emitters own:

- source observation
- source timestamps
- source identifiers
- source measurements
- source provenance

Emitters do not own:

- Guide permission
- canonical family meaning
- canonical admission
- substrate truth
- Outflō interpretation

Observation belongs to emitters.

Interpretation belongs to Outflō.

Admission belongs to the Guide-governed write boundary.

---

# 5. EMISSION BUNDLES

Emitters may produce bundles containing many source values.

A bundle may contain:

- measurements
- timestamps
- coordinates
- identifiers
- device state
- motion values
- provider metadata
- provider-derived values
- optional source payloads

An emission bundle is source evidence.

An emission bundle is not canonical truth.

An emission bundle may contain more than Outflō is permitted to record.

Therefore:

> bundle presence does not imply canonical permission

and:

> emission is not recording

---

# 6. RUNTIME RECEIPT

Runtime receipt means an emission bundle reached an Outflō processing boundary.

Runtime receipt does not mean:

- every value may be persisted
- every family is permitted
- the bundle is canonical
- the Guide granted unrestricted recording
- the bundle may be retained durably in full

Runtime receipt precedes canonical admission.

The admission boundary must follow.

---

# 7. GUIDE PERMISSION

The Guide determines which canonical emission families Outflō may record.

Each family is independently:

- allowed
- excluded

Guide permission applies before canonical persistence.

The Guide may allow some families and exclude others within the same incoming bundle.

Example:

```txt
Emitter bundle
├── Location      allowed
├── Temperature   allowed
├── Rain          excluded
├── Air Quality   allowed
└── Altitude      excluded
```

The emitter still emitted the bundle.

Outflō records only the allowed families.

---

# 8. NULL AT INCEPTION

When a family is excluded:

- the emitter may still emit it
- runtime may transiently receive it
- Outflō must reject it before canonical persistence
- its canonical value must be null from inception

Excluded values must not be:

- stored and hidden later
- stored for future use
- retained in replayable form
- reconstructed by a compiler
- inferred by a surface
- exported as if admitted

The absence is intentional.

The null is canonical.

---

# 9. CANONICAL FAMILIES

Outflō decomposes admitted bundle values into canonical families.

Examples:

Environment:

- location
- weather
- atmosphere
- sun
- air quality
- altitude
- pressure

Device:

- battery
- connection

Motion:

- speed
- heading
- activity

Money:

- transaction
- merchant
- amount
- currency

Time:

- moment

Future canonical families may emerge.

Canonical families belong to Outflō.

Providers do not define canonical ownership.

Guide permission governs whether a family may enter canonical truth.

---

# 10. CANONICAL ADMISSION

Canonical admission is the boundary where permitted source observation becomes Outflō truth.

The canonical path is:

```txt
Reality
↓
Emitter Observation
↓
Emission Bundle
↓
Runtime Receipt
↓
Guide Recording Scope
├── Allowed
└── Excluded → null from inception
↓
Canonical Family Assignment
↓
Canonical Persistence
```

Canonical admission must occur before:

- canonical event writes
- current-state projection writes
- provider-context persistence
- downstream computation
- surface compilation

UI filtering is not admission.

Compiler filtering is not admission.

Export filtering is not admission.

The canonical write boundary owns admission.

---

# 11. CANONICAL TRUTH

Canonical truth emerges only from admitted canonical families.

Rules:

- canonical truth belongs to Outflō
- canonical truth contains only Guide-permitted values
- canonical truth may consume many emitters
- canonical truth may consume many providers
- canonical truth remains family-owned
- excluded families remain null
- future permission changes do not rewrite historical truth

Provider truth may support canonical truth.

Provider truth never replaces canonical truth.

Source receipt may support canonical truth.

Source receipt never becomes canonical truth by itself.

---

# 12. SOURCE PRESERVATION

Source preservation exists to support provenance, diagnostics, and lawful replay.

Source preservation is always bounded by Guide permission.

Rules:

- permitted source evidence may be retained when required
- excluded values may not remain durably reconstructable
- raw payload retention must not bypass recording scope
- operational receipt does not outrank Guide permission
- source preservation must never become an alternate canonical owner

Preservation supports truth.

Preservation does not expand permission.

---

# 13. REPLAYABILITY

Replayability means Outflō may reproduce lawful processing from retained, permitted source evidence.

Replayability does not mean preserving every original source value indefinitely.

Rules:

- replay may reproduce only what the Guide permitted Outflō to retain
- replay may not reconstruct excluded family values
- replay may not bypass null-at-inception
- replay may not create canonical truth that permission previously denied
- replay must preserve provenance and deterministic behavior

Replayability is subordinate to Guide permission.

---

# 14. UPDATE POSTURE

Emission law distinguishes recording scope from update posture.

Recording scope determines:

> What may enter canonical truth?

Update posture determines:

> When may permitted emissions be processed?

The canonical update postures are:

- Capture
- Precise

Capture means permitted current emissions are processed when the Guide intentionally requests the moment.

Precise means permitted emissions are processed whenever they happen.

Precise does not grant permission to record excluded families.

Capture does not reduce the Guide’s allowed scope.

---

# 15. PROVIDERS

Providers may assist canonical resolution.

Providers may supply:

- weather context
- air quality context
- geocoding
- timezone data
- sun data
- merchant enrichment
- future enrichment

Provider results are supporting truth.

Providers do not own:

- canonical family identity
- Guide permission
- canonical admission
- canonical substrate truth

Provider-derived values must pass through the same Guide-governed admission boundary before persistence.

A provider may return more than Outflō is permitted to record.

Excluded provider-derived values remain null from inception.

---

# 16. RESOLUTION

Outflō resolves admitted emissions into canonical meaning.

Resolution may include:

- normalization
- unit conversion
- canonical family assignment
- place derivation
- timezone derivation
- semantic classification
- relationship construction
- current-state projection
- computation
- display compilation

Resolution never expands permission.

A derived value may exist only when all required canonical inputs were admitted.

If an input family is excluded, downstream resolution must not recreate it indirectly.

---

# 17. SUBSTRATES

Substrates consume canonical truth.

Examples:

- Environment
- Money
- Time
- future substrates

Rules:

- substrates consume admitted canonical families
- substrates do not redefine canonical ownership
- substrates do not expand Guide permission
- substrates may derive views
- substrates preserve the distinction between source, canonical truth, and projection

Substrates reveal structure.

Substrates do not create truth.

---

# 18. COMPUTATION

Computation consumes admitted canonical truth only.

Rules:

- no computation from excluded values
- no reconstruction of null-at-inception values
- no provider fallback that bypasses Guide scope
- outputs must remain reproducible
- derived truth must preserve source ownership
- computation never becomes canonical admission

Computation derives meaning.

Computation does not invent permission.

---

# 19. DATABASE

The database must distinguish:

- emitter registry
- runtime receipt or source evidence
- canonical events
- current-state projections
- Guide recording scope
- Guide update posture
- provider context
- resolved context

Rules:

- excluded values are null before canonical writes
- source history must not retain excluded values in reconstructable durable form
- canonical events contain only admitted values
- current-state projections contain only admitted values
- provider records remain supporting history
- mutable settings remain separate from canonical truth

The database preserves the result of admission.

The database does not decide permission independently.

---

# 20. RUNTIME

Runtime enforces emission admission.

For each incoming bundle, runtime must determine:

- which source values are present
- which canonical families they map to
- which families the Guide permits
- which values must be nulled
- whether Capture or Precise permits processing now
- which canonical events may be written
- which current-state projections may update
- which downstream provider resolutions may run

Runtime must not defer permission enforcement to UI, compiler, export, or display logic.

---

# 21. COMPILER

The compiler consumes canonical and resolved truth.

The compiler may:

- derive display models
- choose truthful fallbacks
- format values
- compose surface-ready state

The compiler must not:

- grant permission
- restore excluded values
- infer Precise from snapshot existence
- persist emissions
- create canonical truth
- reinterpret source bundles as admitted truth

The compiler projects.

Infrastructure admits.

---

# 22. SURFACES

Outflō surfaces admitted and resolved truth.

Surfaces must not:

- infer permission
- expose excluded values
- hide persisted excluded truth as a substitute for null-at-inception
- reconstruct missing values from provider metadata
- reinterpret Capture or Precise
- create canonical meaning

The interface reveals the system.

The interface does not replace the system.

---

# 23. RECEIPTS AND EXPORTS

Receipts and exports prove the admitted record.

They may include:

- admitted values
- canonical timestamps
- provenance
- resolved context
- lawful associations

They must not include:

- excluded source values
- reconstructed null-at-inception values
- provider values that bypassed admission
- alternate truth created only for display

Historical outputs remain faithful to historical permission.

---

# 24. CHANGE

The Guide may change recording scope and update posture.

Rules:

- scope changes affect future admission
- newly allowed families begin recording only after permission exists
- newly excluded families become null in future canonical writes
- past canonical truth remains unchanged
- excluded historical values are not backfilled
- update-posture changes affect future processing timing only

Participation changes future knowledge.

Participation does not rewrite history.

---

# 25. INVARIANTS

The following must always remain true:

- reality exists independently
- emitters observe
- emitters emit
- emission bundles preserve source structure only within Guide permission
- runtime receipt is not canonical admission
- emission is not recording
- the Guide governs canonical admission
- recording scope and update posture are distinct
- excluded values are null from inception
- replayability may not reconstruct excluded values
- providers support but do not own canonical truth
- canonical families belong to Outflō
- canonical truth contains only admitted values
- resolution never expands permission
- computation consumes admitted truth only
- substrates consume but do not redefine canonical truth
- compiler and UI do not own admission
- historical truth is never rewritten by future participation changes
- Outflō never expands its own permission

---

# 26. SYSTEM SUMMARY

```txt
Reality
↓
Emitter Observation
↓
Emission Bundle
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
Canonical Family Assignment
↓
Canonical Admission
↓
Canonical Events
↓
Current-State Projection
↓
Resolution
↓
Substrates
↓
Derived Views
↓
Guide Reflection
```

---

# 27. FINAL PRINCIPLE

The world emits.

Outflō may receive.

The Guide decides what Outflō may record.

Capture processes permitted truth when the Guide asks.

Precise processes permitted truth when emissions happen.

Excluded truth is null from inception.

Emitters preserve observation.

Outflō admits only permitted values.

Canonical families establish meaning.

Outflō resolves what was admitted.

Substrates reveal the result.

The Guide decides.

Outflō follows.

Outflō resolves.

---

End of Document