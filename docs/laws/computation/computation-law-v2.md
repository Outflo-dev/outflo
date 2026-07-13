# OUTFLO — COMPUTATION LAW (v2)

Status: LOCKED

Scope

Defines the canonical computation model for Outflō after the Guide Resolution Law.

Replaces:

- Computation Law v1

Clarified by:

- Guide Resolution Law v1
- Participation Law v2
- Emission Law v2
- Database Contract v6
- Time Law v2
- Ownership Law v1
- Thread Transition SOP v8

---

# 1. PURPOSE

Define how Outflō derives meaning from admitted canonical truth without inventing data, expanding Guide permission, duplicating formulas, obscuring units, or allowing presentation logic to become calculation ownership.

This law establishes:

- lawful computation inputs
- computation ownership
- unit ownership
- formula ownership
- rounding ownership
- temporal window ownership
- aggregation behavior
- derived truth
- projection
- caching
- reversibility
- shared calculation boundaries
- compiler and surface constraints

Computation derives.

Computation does not admit.

Computation does not invent.

---

# 2. CORE PRINCIPLE

Computation consumes admitted canonical truth.

Computation applies one named formula under one owner.

Computation produces reproducible derived truth.

Presentation may format the result.

Presentation does not own the calculation.

---

# 3. LAWFUL INPUTS

Computation may consume only:

- admitted canonical truth
- lawful current-state projections
- explicit Guide presentation settings when presentation is part of the output
- explicit projection parameters
- explicit constants owned by the computation

Computation may not consume:

- excluded values
- hidden provider remnants
- raw payload values that bypassed admission
- UI labels
- browser-local assumptions
- alternate duplicated state
- guessed defaults presented as truth

If a required input is null at inception, the computation must preserve that absence.

---

# 4. ADMISSION PRECEDES COMPUTATION

The canonical order is:

```txt
Reality
↓
Emitter or Source
↓
Runtime Receipt
↓
Guide Recording Scope
↓
Canonical Admission
↓
Canonical Truth
↓
Computation
```

Rules:

- computation never decides recording permission
- computation never restores excluded values
- computation never turns transient receipt into canonical input
- computation never bypasses null-at-inception
- computation never creates a second admission path

Admission belongs upstream.

Derivation begins only after admission.

---

# 5. COMPUTATION OWNERSHIP

Every reusable calculation has one owner.

A computation owner defines:

- input contract
- canonical unit
- formula
- rounding behavior
- null behavior
- output type
- verification cases

Repeated arithmetic across multiple files indicates missing ownership.

Example:

```txt
amount_minor / 10000
```

If repeated across surfaces, compilers, exports, or routes, it must become one named computation or conversion owner.

Rules:

- one formula, one owner
- consumers call the owner
- consumers do not restate the arithmetic
- similar-looking calculations remain separate when their meaning differs
- naming must describe meaning, not syntax

---

# 6. CANONICAL UNITS

Every numeric input and output must declare its unit.

Examples:

- Unix milliseconds
- integer minor currency units
- degrees Celsius
- meters
- hectopascals
- percentage points
- basis points
- parts per billion
- parts per million
- counts
- durations

Rules:

- storage unit and display unit remain distinct
- unit conversion is computation
- conversion has one owner
- formulas must not depend on unlabeled numbers
- ambiguous scale factors are prohibited
- output type must preserve unit identity where practical

A number without unit ownership is incomplete.

---

# 7. MONEY COMPUTATION

Canonical money truth remains in integer minor units or another explicitly owned integer scale.

Rules:

- floating-point arithmetic must not own canonical money
- scale conversion must be named
- tax, fee, subtotal, total, and rate calculations require explicit unit contracts
- rounding occurs only at the declared legal or presentation boundary
- display formatting does not rewrite canonical amount
- currency conversion, when introduced, must preserve source amount, source currency, rate provenance, converted amount, and conversion instant

Examples of distinct owners:

```txt
minor units → decimal amount
subtotal + tax + fee → total
units × price → line total
rate × taxable base → tax amount
```

These must not collapse into one generic “money helper.”

---

# 8. TIME COMPUTATION

Temporal computation consumes canonical instants and lawful temporal context.

Examples:

- durations
- windows
- day grouping
- week grouping
- orbit
- local civil-time projection
- relative time

Rules:

- timezone ownership must be explicit
- UTC windows and civil-time windows remain distinct
- browser timezone is not an implicit computation input
- event-local time and Guide-view time remain distinct
- current Guide settings may change presentation projections
- current settings do not rewrite historical event instants

Time computation follows Time Law v2.

---

# 9. WINDOWS

A computation over a window must declare:

- start instant
- end instant
- inclusivity
- timezone owner when civil boundaries are used
- canonical input set
- aggregation rule
- missing-value behavior
- output unit

Rules:

- window inclusion is deterministic
- the same declared inputs reproduce the same result
- local-day windows must identify whose local day
- Guide display timezone must not silently alter canonical inclusion
- window definitions belong to computation, not UI copy

---

# 10. AGGREGATION

Canonical aggregation types include:

- sum
- average
- minimum
- maximum
- count
- latest
- earliest
- duration
- rate
- ratio
- weighted average
- classification

Rules:

- aggregation must match the family’s meaning
- missing values are not silently treated as zero
- excluded values are not included
- current-state values are not substituted for historical events unless explicitly declared
- provider values do not outrank canonical values
- aggregation preserves source ownership

Averages require:

- numerator definition
- denominator definition
- weighting rule
- missing-value rule

Ratios require:

- numerator owner
- denominator owner
- zero-denominator behavior
- output scale

---

# 11. NULL BEHAVIOR

Computation must explicitly define null behavior.

Possible lawful outcomes:

- return null
- exclude missing observation from aggregation
- return partial result with completeness metadata
- fail validation
- use a named lawful fallback

Prohibited behavior:

- converting null to zero without law
- reconstructing excluded truth
- using browser or provider state as hidden fallback
- inventing a display value that appears canonical

The absence is meaningful.

Computation preserves it.

---

# 12. ROUNDING

Rounding has one owner and one reason.

Possible boundaries:

- legal currency settlement
- canonical storage normalization
- provider normalization
- display formatting
- export formatting

Rules:

- intermediate calculations retain sufficient precision
- rounding is deferred until the declared boundary
- display rounding does not mutate canonical value
- repeated `Math.round`, `toFixed`, or scale arithmetic across files indicates missing ownership
- rounding mode must be explicit when business meaning depends on it

Examples:

- half up
- half even
- floor
- ceiling
- truncation

Silent rounding is prohibited.

---

# 13. NORMALIZATION

Normalization converts lawful source values into canonical units or shapes.

Examples:

- seconds to milliseconds
- pressure units
- temperature units
- percentage scales
- currency scales
- provider enums to canonical families

Rules:

- normalization occurs after admission eligibility is known and before canonical computation where required
- normalization does not create permission
- normalization preserves provenance
- equivalent HTTP and MQTT inputs must normalize consistently
- one source value must not map to multiple meanings without explicit ownership

Normalization is not presentation.

---

# 14. DERIVED TRUTH

Derived truth emerges from canonical inputs through a named computation.

Examples:

- totals
- averages
- summaries
- classifications
- windows
- trends
- local civil-time values
- place groupings
- orbit values

Rules:

- derived truth remains reproducible
- derived truth preserves input provenance
- derived truth does not overwrite canonical truth
- derived truth does not become admission
- derived truth may be persisted only as a projection or cache with explicit ownership

Meaning is derived.

Meaning is not substituted for source truth.

---

# 15. PROJECTIONS

Projections organize canonical or derived truth for use.

Examples:

- day
- week
- place
- orbit
- category
- substrate summary
- receipt × Environment association

Rules:

- projections derive
- projections organize
- projections remain reversible
- projections do not own canonical truth
- projection parameters must be explicit
- Guide presentation may alter projection view without rewriting history

Projection is not ownership.

---

# 16. CACHING

Computed results may be cached.

Rules:

- cache owner is explicit
- cache inputs are identifiable
- cache invalidation preserves correctness
- cache values remain reproducible
- cache does not become canonical truth
- stale caches must not outrank canonical inputs
- cache keys include all parameters that affect output

Caching is optimization.

Caching is not truth.

---

# 17. CONSTANTS

A computation may use constants.

Examples:

- conversion factors
- scale factors
- physical constants
- canonical thresholds
- classification boundaries

Rules:

- constants are named
- constants have one owner
- constants include units
- constants are not repeated as unexplained literals
- changing a constant is a contract change when output meaning changes
- local geometry constants remain outside computation unless they affect canonical meaning

A magic number is missing ownership.

---

# 18. CLASSIFICATION

Classification maps computed or canonical values into semantic categories.

Examples:

- weather state
- air-quality band
- warning level
- merchant category
- trend direction

Rules:

- thresholds are explicit
- source unit is explicit
- ordering is deterministic
- boundary inclusivity is defined
- themes may style classification
- themes do not determine classification
- UI labels do not own classification law

Classification belongs to model or computation ownership.

---

# 19. GUIDE SETTINGS AND COMPUTATION

Guide settings may influence:

- recording scope
- update posture
- units
- language
- locale
- timezone view
- number format
- currency presentation
- week conventions

Rules:

- recording scope limits lawful inputs
- update posture affects when inputs become available
- presentation settings may affect formatting and projection
- presentation settings do not alter canonical values
- settings must be passed explicitly
- browser defaults may not silently replace persisted Guide settings

The Guide controls the relationship.

Computation follows the lawful inputs and declared view.

---

# 20. DATABASE

The database may preserve:

- canonical inputs
- current-state projections
- cached computations
- computation provenance
- versioned computation identifiers when required

Rules:

- persisted computation does not become canonical source truth
- formula version must be preserved when historical reproducibility requires it
- cache rows must identify their source parameters
- database triggers must not hide unowned business computation
- generated columns and functions remain subject to the same ownership law

The database may execute computation.

Execution location does not change ownership.

---

# 21. RUNTIME

Runtime may:

- invoke normalization
- invoke canonical computation
- compute current-state projections
- apply Guide settings
- persist lawful derived state

Runtime must not:

- duplicate formulas already owned elsewhere
- use UI formatting as input
- infer missing values without law
- compute from excluded source data
- hide unit conversion inside unrelated routes

Runtime orchestrates.

Named computation owners calculate.

---

# 22. COMPILER

The compiler may:

- invoke named computations
- assemble derived display models
- apply truthful formatting
- choose lawful fallbacks
- expose completeness metadata

The compiler must not:

- own reusable arithmetic
- duplicate scale conversions
- reconstruct excluded values
- decide recording permission
- silently round canonical values
- invent units
- infer current posture from data availability

The compiler composes.

Computation derives.

---

# 23. SURFACES

Surfaces may:

- request derived values
- select presentation formats
- render units
- visualize classifications
- display incomplete states honestly

Surfaces must not:

- perform canonical business arithmetic inline
- repeat conversion formulas
- choose hidden denominators
- treat null as zero
- determine canonical rounding
- derive permission from rendered data

A surface may perform trivial local presentation arithmetic only when it cannot affect canonical meaning and is not repeated.

Repeated local arithmetic must be promoted to an owner.

---

# 24. RECEIPTS AND EXPORTS

Receipts and exports may include:

- canonical values
- derived values
- formula or version provenance when required
- units
- rounding context
- presentation formatting

Rules:

- machine exports preserve canonical units explicitly
- human exports may format through Guide settings
- derived values must remain traceable to inputs
- exports must not recompute with a conflicting formula
- excluded values remain absent
- display-only formatting must not replace canonical numeric fields

---

# 25. VERIFICATION

Every named computation must be verifiable.

Verification should include:

- canonical input fixtures
- unit tests
- null cases
- boundary cases
- zero-denominator cases
- rounding cases
- timezone cases when temporal
- large-value cases
- negative-value cases when lawful
- reproducibility proof
- parity across all consumers

A computation is not complete because it “looks right” in one surface.

---

# 26. PROHIBITED PATTERNS

The following are prohibited:

- repeated arithmetic literals across files
- unlabeled scale factors
- computation from excluded values
- UI-owned business formulas
- compiler-owned admission logic
- null silently converted to zero
- hidden browser-timezone computation
- duplicate rounding behavior
- floating-point canonical money
- provider fallback that bypasses canonical ownership
- cached results treated as source truth
- formula changes without version or migration consideration
- “helper” files containing unrelated calculations
- generic utility ownership that obscures domain meaning

---

# 27. INVARIANTS

The following must always remain true:

- computation consumes admitted canonical truth
- admission precedes computation
- one reusable formula has one owner
- every number has a unit
- normalization and presentation remain distinct
- rounding has one owner
- null behavior is explicit
- excluded values are never reconstructed
- temporal computation declares timezone ownership
- aggregation rules are deterministic
- outputs remain reproducible
- derived truth does not overwrite canonical truth
- projections are not ownership
- caches are not truth
- compilers and surfaces do not duplicate canonical computation
- repeated arithmetic reveals missing ownership
- Guide presentation changes do not rewrite canonical values

---

# 28. SYSTEM SUMMARY

```txt
Admitted Canonical Truth
↓
Named Inputs + Units
↓
Named Formula Owner
↓
Normalization
↓
Computation
↓
Derived Truth
↓
Projection or Cache
↓
Global Formatting
↓
Outflō Surface
↓
Guide Reflection
```

Ownership remains distinct:

```txt
Canonical values
→ canonical owner

Formula
→ computation owner

Rounding
→ declared boundary owner

Projection
→ derived owner

Formatting
→ Global

Rendering
→ surface
```

---

# 29. FINAL PRINCIPLE

Outflō does not approximate.

Outflō does not scatter arithmetic.

Outflō does not let presentation own meaning.

Outflō admits lawful truth.

Outflō names the unit.

Outflō names the formula.

Outflō derives once.

Outflō reproduces everywhere.

Computation creates structure.

Computation preserves truth.

Computation remains owned.

---

End of Document