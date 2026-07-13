# OUTFLO — OWNERSHIP LAW (v2)

Status: LOCKED

Scope

Defines canonical ownership within Outflō after the Guide Resolution Law.

Replaces:

- Ownership Law v1

Clarified by:

- Guide Resolution Law v1
- Participation Law v2
- Emission Law v2
- Database Contract v6
- Time Law v2
- Computation Law v2
- Thread Transition SOP v8

---

# 1. PURPOSE

Define how Outflō assigns responsibility for truth, permission, admission, computation, presentation, operation, and change.

This law establishes:

- singular ownership
- Guide authority
- canonical ownership
- admission ownership
- current-state ownership
- computation ownership
- projection ownership
- presentation ownership
- supporting-system boundaries
- association
- orchestration
- operational ownership
- migration and evolution
- conflict resolution

Ownership exists to eliminate ambiguity.

If ownership is unclear, the system is incomplete.

---

# 2. CORE PRINCIPLE

Everything has one owner.

One responsibility may have many consumers.

One owner may delegate execution.

Delegation does not transfer ownership.

Support does not become ownership.

---

# 3. OWNERSHIP TYPES

Outflō distinguishes the following ownership types:

- Guide authority
- canonical truth ownership
- admission ownership
- current-state ownership
- computation ownership
- projection ownership
- presentation ownership
- operational ownership
- association ownership
- orchestration ownership

These types may participate in one system path.

They must not be collapsed into one vague “owner.”

---

# 4. GUIDE AUTHORITY

The Guide owns the relationship between lived reality and Outflō.

The Guide determines:

- recording scope
- update posture
- Global presentation settings
- future participation changes

Guide authority does not mean the Guide owns canonical tables, runtime code, compilers, or UI components.

The distinction is:

```txt
Guide
→ decides permission and posture

Outflō owners
→ enforce, preserve, derive, and surface the result
```

The Guide is not a system mode.

The Guide is not a database alias.

The Guide is not a runtime implementation owner.

---

# 5. CANONICAL OWNERSHIP

Canonical concepts have exactly one owner.

Examples:

```txt
Identity
→ auth.users.id

Time anchor
→ user_epochs

Money
→ receipts

Environment current state
→ environment_snapshots
```

Rules:

- canonical ownership is singular
- canonical ownership is stable
- canonical truth does not move casually
- supporting systems may assist
- projections may organize
- associations may connect
- none may replace the canonical owner

Canonical ownership answers:

> Where does this truth belong?

---

# 6. ADMISSION OWNERSHIP

Admission ownership governs the boundary where runtime receipt becomes lawful Outflō truth.

Admission owns:

- canonical family mapping
- Guide recording-scope enforcement
- null-at-inception
- lawful canonical writes
- lawful current-state updates
- lawful supporting-history persistence

Admission does not belong to:

- UI
- compiler
- export
- report
- theme
- formatter

Runtime admission may be implemented across several files.

The admission responsibility remains singular.

Admission ownership answers:

> What is permitted to enter canonical truth?

---

# 7. CURRENT-STATE OWNERSHIP

Current-state owners preserve the latest lawful state.

Example:

```txt
environment_snapshots
→ current/latest resolved Environment state
```

Rules:

- current-state ownership is mutable
- current-state ownership is not immutable event history
- current-state projection may be rebuilt from lawful inputs where architecture supports it
- repeated updates do not imply broken ownership
- current state must not replace canonical event history

Current-state ownership answers:

> What is true now?

---

# 8. HISTORICAL OWNERSHIP

Historical owners preserve admitted event truth.

Rules:

- historical truth is append-oriented
- historical truth is immutable in production meaning
- historical truth contains only admitted values
- current settings do not rewrite historical truth
- future permission does not backfill excluded history
- current-state rows must not be mistaken for historical event streams

Historical ownership answers:

> What happened?

---

# 9. COMPUTATION OWNERSHIP

Each reusable calculation has one owner.

The computation owner defines:

- input contract
- units
- formula
- rounding
- null behavior
- output type
- verification

Rules:

- consumers call the computation owner
- consumers do not restate the formula
- repeated arithmetic reveals missing ownership
- execution location does not change ownership
- database functions, runtime helpers, and compiler calls remain subject to the same owner

Computation ownership answers:

> How is this value derived?

---

# 10. PROJECTION OWNERSHIP

Projection organizes canonical or derived truth.

Examples:

- day
- week
- place
- orbit
- category
- receipt × Environment association
- current summaries

Rules:

- projections derive
- projections organize
- projections remain reversible
- projections never become canonical truth
- projection parameters are explicit
- projection ownership does not replace source ownership

Projection ownership answers:

> How is truth arranged for use?

Projection is not canonical ownership.

---

# 11. PRESENTATION OWNERSHIP

Presentation owns how truth is shown.

Global owns:

- language
- locale
- display timezone
- date and time format
- number format
- units
- currency presentation
- week conventions
- accessibility presentation

UI owns:

- local composition
- hierarchy
- interaction
- rendering
- shared-form selection
- visual recipe assembly

Themes own:

- paint
- appearance
- theme feeling
- semantic state color identity

Rules:

- presentation does not rewrite canonical truth
- formatting does not become computation ownership
- UI does not infer permission
- themes do not determine semantic meaning
- Global does not grant recording scope

Presentation ownership answers:

> How does the Guide receive the truth?

---

# 12. SUPPORTING SYSTEMS

Supporting systems may:

- observe
- emit
- enrich
- associate
- project
- orchestrate
- cache
- queue
- route
- verify
- operationally describe

Supporting systems do not:

- replace canonical owners
- expand Guide permission
- create alternate truth
- become admission through convenience
- become presentation owners unless explicitly assigned

Support is not ownership.

---

# 13. ASSOCIATION

Association connects independent owners.

Example:

```txt
receipt_environment

receipt
↔
Environment
```

Rules:

- neither canonical owner absorbs the other
- the association owns the relationship only
- deletion behavior must preserve canonical independence
- association rows must not silently duplicate canonical ownership
- association may preserve event-local context when explicitly required

Association ownership answers:

> How are two owned truths connected?

Association is not canonical ownership.

---

# 14. ORCHESTRATION

Orchestration coordinates owners.

Examples:

- API route
- runtime worker
- controller
- server action
- job processor

Orchestration may:

- authenticate
- validate
- call owners
- coordinate sequencing
- handle responses
- manage retries

Orchestration does not own:

- canonical meaning
- Guide permission
- reusable computation
- presentation format
- domain truth

Orchestration ownership answers:

> In what order do owned responsibilities execute?

Coordination is not canonical ownership.

---

# 15. OPERATIONAL OWNERSHIP

Operational systems own mutable process state.

Examples:

- queue status
- retry state
- claim state
- webhook processing state
- mirror windows
- verification state
- runtime locks

Rules:

- operational state is mutable
- operational state may be transient
- operational state is not canonical substrate truth
- operational state requires one owner
- operational state must not become a hidden ledger
- operational success or failure does not redefine historical truth

Operational ownership answers:

> What is the system doing?

---

# 16. PROVIDERS AND EMITTERS

Emitters own source observation.

Providers own source-returned context.

Outflō owns canonical interpretation.

The Guide owns permission.

Runtime owns admission enforcement.

Rules:

- source ownership preserves provenance
- provider values do not become canonical by arrival
- emitter bundles may contain excluded families
- supporting source truth remains bounded by Guide permission
- providers may assist but do not replace canonical owners

The complete distinction is:

```txt
Emitter or Provider
→ source observation

Guide
→ permission

Runtime Admission
→ lawful entry

Canonical Owner
→ meaning and truth
```

---

# 17. INTERPRETATION

Interpretation belongs to the canonical domain owner.

Examples:

- Money interprets receipt truth
- Environment interprets Environment truth
- Time interprets temporal truth

Providers, emitters, compilers, and surfaces may assist.

They do not own domain meaning.

Interpretation must consume admitted truth.

Interpretation must not expand Guide permission.

---

# 18. FILE OWNERSHIP

A file owns one coherent responsibility.

Rules:

- file placement reflects responsibility
- file name reflects ownership
- one file may coordinate several owners only when it is an orchestrator
- mixed responsibilities require a split
- large size alone does not prove incorrect ownership
- repeated unrelated helpers indicate missing owners
- a split preserves ownership
- a move corrects ownership

Before changing a file, declare:

```txt
FILE
OWNER
RESPONSIBILITY
CHANGE
NON-GOALS
VERIFICATION
```

---

# 19. STATE OWNERSHIP

Every state value must declare:

- truth type
- owner
- source of truth
- write path
- read path
- applicator
- consumers
- historical effect

Truth types include:

- canonical
- historical
- current-state
- Guide setting
- derived
- cached
- presentation
- operational

A value without truth-type ownership is incomplete.

---

# 20. SETTINGS OWNERSHIP

Guide settings are mutable persisted truth about the Guide’s relationship with Outflō.

Distinct settings domains include:

- recording scope
- update posture
- Global presentation

Rules:

- one setting has one owner
- duplicate settings across tables are prohibited
- settings do not become historical canonical truth
- current settings affect future behavior or present view
- settings changes do not rewrite historical truth
- surfaces may expose simplified controls
- simplified UI does not justify ambiguous infrastructure

---

# 21. SECURITY OWNERSHIP

Access control follows truth ownership.

Rules:

- canonical owners require explicit access boundaries
- Guide-owned settings require Guide-bound access
- service-role writes remain narrowly scoped
- missing RLS is an explicit security state
- policy must match ownership
- UI secrecy is not access control
- operational tables require intentional hardening

Security ownership answers:

> Who may read or change this owner’s truth?

---

# 22. GROWTH

Correct ownership may grow.

Growth alone does not imply failure.

Growth may create pressure.

Pressure may require decomposition.

Rules:

- split when one owner contains multiple internal responsibilities
- preserve the canonical owner during decomposition
- do not move truth merely because a file became large
- do not extract generic helpers before repeated ownership is proven
- do not centralize unrelated concerns under convenience

Large systems may require more files.

They do not require more owners.

---

# 23. EVOLUTION

When pressure appears, choose one action.

## KEEP

Ownership is correct.

No action required.

## WATCH

Ownership is correct.

Observe future pressure.

## SPLIT

Ownership is correct.

Responsibility has grown enough to decompose.

Ownership remains unchanged.

## MOVE

Ownership is incorrect.

Responsibility transfers to the correct owner.

## MERGE

Two structures duplicate one responsibility.

The singular owner absorbs the duplicate.

## RETIRE

Responsibility no longer exists.

Its read path, write path, imports, files, settings, and documentation are removed.

Evolution follows ownership.

Convenience does not.

---

# 24. MIGRATION OWNERSHIP

Migration must preserve one owner throughout transition.

Rules:

- name the old owner
- name the new owner
- declare the transition write path
- declare the transition read path
- prohibit dual canonical ownership
- define rollback behavior
- define completion proof
- retire the old owner completely

Temporary compatibility may exist.

Temporary duplicate truth ownership may not.

---

# 25. CONFLICT RESOLUTION

When two files, systems, or documents claim the same responsibility:

1. identify the truth type
2. identify the lawful owner
3. inspect actual runtime and database behavior
4. compare the latest locked laws
5. remove or demote the competing owner

Priority:

```txt
Latest locked law
→ actual ownership evidence
→ canonical owner
→ supporting implementation
→ stale documentation
```

The system must not preserve two interpretations for convenience.

---

# 26. DEAD OWNERSHIP

Removing output is not enough.

When a responsibility dies, remove:

- canonical claim
- write path
- read path
- applicator
- consumers
- imports
- helpers
- files
- routes
- settings
- tokens
- documentation references

Dead ownership left in the repo creates future drift.

Removal must be complete.

---

# 27. PROHIBITED PATTERNS

The following are prohibited:

- multiple canonical owners for one concept
- UI-owned canonical truth
- compiler-owned permission
- provider-owned canonical meaning
- theme-owned semantic classification
- orchestration-owned business meaning
- duplicate Guide settings
- duplicated formulas
- current-state rows treated as immutable event history
- associations treated as ownership
- caches treated as truth
- generic utility folders hiding domain ownership
- silent ownership transfer
- dual writes without a declared migration
- dead owners left behind after feature removal

---

# 28. INVARIANTS

The following must always remain true:

- everything has one owner
- Guide authority is distinct from system implementation ownership
- canonical ownership is singular
- admission ownership is explicit
- current-state ownership is distinct from historical ownership
- one reusable formula has one owner
- support is not ownership
- association is not canonical ownership
- projection is not canonical ownership
- orchestration is not canonical ownership
- operational state is not substrate truth
- presentation does not rewrite truth
- interpretation belongs to canonical domain owners
- splitting preserves ownership
- movement corrects ownership
- migration does not create dual canonical truth
- retirement removes dead ownership completely
- security follows ownership

---

# 29. SYSTEM SUMMARY

```txt
Guide
→ permission, posture, presentation choices

Emitter / Provider
→ source observation

Runtime Admission
→ lawful entry

Canonical Owner
→ historical or current truth

Computation Owner
→ derived truth

Projection Owner
→ organization

Global
→ presentation settings

UI + Theme
→ rendered experience
```

Supporting roles remain distinct:

```txt
Association
→ connects

Orchestration
→ coordinates

Operations
→ processes

Security
→ protects
```

Everything has one owner.

Every owner has one responsibility.

---

# 30. FINAL PRINCIPLE

Correct ownership creates clarity.

Correct admission preserves permission.

Correct canonical ownership preserves truth.

Correct computation preserves meaning.

Correct presentation preserves the Guide relationship.

Growth may change structure.

Migration may change placement.

Truth remains singular.

Everything has one owner.

Outflō resolves because ownership does not drift.

---

End of Document