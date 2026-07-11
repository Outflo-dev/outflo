# OUTFLŌ — UI CONTRACT (v3)

**Status:** READY FOR MUTUAL LOCK  
**Scope:** Canonical ownership, construction, primitive selection, theming, migration, inspection, and verification law for all Outflō interface work

**Replaces:** UI Contract v1

**Discovery:**

- **unix_ms:** 1783777578257
- **iso_utc:** 2026-07-11T13:46:18.257Z
- **human:** 2026-07-11 13:46:18.257 UTC
- **reason:** expanded after the complete VISUAL primitive system moved from `0–10` to `0–20`, introduced complete and sparse dial shapes, split mixed primitive families by ownership, and added canonical structural selections for display, position, and stacking order

---

# 1. PURPOSE

Define how Outflō interfaces are built, read, inspected, tuned, and evolved.

This contract establishes:

- where visual and structural precision lives
- who owns state, structure, shared form, paint, geometry, and exceptions
- how canonical primitive values become complete component recipes
- how complete calibrated dials differ from sparse categorical selections
- how numbered primitives separate normal reusable CSS from local form
- how themes participate without owning component structure
- how primitive families are split and exposed
- how migrations proceed without mass rewriting
- how rendered evidence refines the system
- how dead visual ownership is removed

This contract exists so future threads build from proven system law rather than rediscovering interface architecture.

---

# 2. CORE PRINCIPLE

> **Precision lives at the unit level. Build outward.**

Outflō does not begin with finished visual presets.

Outflō resolves a visible result into independently controllable units, preserves the ownership of those units, and composes the final interface outward.

```txt
canonical state
→ display model
→ shared structure
→ canonical visual units
→ component recipe
→ theme resolution
→ rendered interface
→ Guide experience
```

The aggregate is never treated as a mystery.

The final form is derived from owned parts.

---

# 3. UI IS A PROJECTION

The UI does not own canonical application truth.

The UI reads persisted or derived state and presents it to the Guide.

Rules:

- runtime and models own data meaning
- components receive display-ready state
- components do not invent canonical truth
- components do not become alternate state owners
- styling does not redefine participation, computation, database truth, or emission truth
- visual selection changes presentation, not canonical reality

The interface reveals the system.

The interface does not replace the system.

---

# 4. CANONICAL OWNERSHIP MODEL

## Runtime and models

Own:

- persisted state
- derived state
- semantic classification
- display-ready values
- interaction outcomes

Do not own:

- visual paint
- card shape
- typography construction
- theme appearance
- primitive-number selection inside component recipes

---

## Components

Own:

- local layout
- hierarchy
- composition
- behavior
- interaction
- assembly of visual and structural units
- selection of the numbered primitive used by the component
- genuinely local form and exceptions

A component decides the final recipe for its own form.

> **The component is the recipe.**

The primitive defines the exact reusable value.

The component selects the unit.

---

## Shared UI primitives

Own:

- repeated shared form
- repeated structural behavior
- repeated composition boundaries
- shared component-level recipes

Examples:

- card frame
- tile frame
- row frame
- navigation control
- reusable mark frame

A leaf component may customize a shared primitive.

A leaf component may not silently recreate the same shared form.

---

## VISUAL primitives

Own:

- canonical atomic CSS values
- the shared numbered domain
- complete calibrated dials
- sparse categorical selections
- stable TypeScript access
- stable CSS-variable access where CSS variables are warranted
- the translation layer between visual judgment and CSS syntax
- an inspectable ownership signal inside component recipes

VISUAL does not own:

- finished components
- semantic component presets
- local measured geometry
- content-derived values
- interaction logic
- application state

---

## Themes

Own:

- paint sources
- appearance
- visual feeling
- theme-specific color identity
- semantic state color identity
- future modulation of primitive character when explicitly contracted

Themes do not own:

- layout
- spacing selection
- geometry
- hierarchy
- interaction
- component-number selection

No theme-selected component-number behavior is implied by this contract.

---

## Geometry

Owns:

- measured placement
- SVG coordinates
- physical alignment
- instrument dimensions
- mathematically constrained form
- values whose correctness depends on the rendered object rather than a reusable CSS scale

Geometry may use precise local values when a generic dial would weaken correctness.

---

# 5. VISUAL SYSTEM

The canonical visual system lives at:

```txt
components/system/primitives/visuals/
```

Shared TypeScript boundary:

```txt
index.ts
visual.config.ts
visual.dial.ts
visual.types.ts
```

Shared CSS boundary:

```txt
visual.tokens.css
```

The root CSS manifest is imported once through the application stylesheet boundary.

Current root families include:

```txt
accent
border
color
display
fill
glow
inset
opacity
position
radius
shadow
spacing
state
stroke
text
type
weight
z-index
```

Future families may be added only when reusable ownership is proven.

---

# 6. CANONICAL NUMBER DOMAIN

The canonical VISUAL number domain is:

```txt
0–20
```

Canonical type:

```ts
export type VisualDialNumber =
    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
```

The domain provides a shared language across primitive families.

The domain does **not** require every family to assign every number.

Numbers are stable selection handles.

Their exact meaning belongs to the family that owns them.

---

# 7. COMPLETE CALIBRATED DIAL LAW

A complete calibrated family exposes every unit from `0` through `20`.

Canonical shape:

```ts
export type VisualDial<TValue = string> = Readonly<
    Record<VisualDialNumber, TValue>
>;
```

Use a complete dial when the family expresses a meaningful progression or calibrated range.

Examples:

```txt
spacing
opacity
radius
border width
stroke width
stroke opacity
stroke dash pattern
glow blur
glow spread
shadow construction
fill intensity
text intensity
state intensity
type size
line height
tracking
z-index
```

A complete dial must define all `0–20` units.

A component may rely on every unit existing.

---

# 8. SPARSE SELECTION LAW

A closed or finite categorical family assigns only valid selections.

Canonical shape:

```ts
export type VisualSelectionDial<TValue = string> = Readonly<
    Partial<Record<VisualDialNumber, TValue>>
>;
```

Examples:

```txt
display
position
border style
stroke cap
stroke join
text transform
font family
font weight
```

Rules:

- valid categories receive stable numbers
- unneeded numbers remain unassigned
- values are not duplicated merely to fill `0–20`
- invalid or invented CSS meanings are prohibited
- a sparse selection must not use a constructor that falsely promises a complete dial

The `0–20` domain is shared.

Selection occupancy remains family-specific.

---

# 9. EXPANSION LAW

The original calibrated `0–10` system expanded to `0–20` by preserving prior values on even units:

```txt
old 0  → new 0
old 1  → new 2
old 2  → new 4
old 3  → new 6
old 4  → new 8
old 5  → new 10
old 6  → new 12
old 7  → new 14
old 8  → new 16
old 9  → new 18
old 10 → new 20
```

Odd units provide intermediate precision.

Rules:

- previous calibrated meaning remains recoverable
- odd units may be tuned through rendered evidence
- the expansion is not required for sparse categorical families
- future tuning may refine exact values without changing family ownership

The number is the stable selection.

The primitive owns the exact value.

---

# 10. STRUCTURAL PRIMITIVE LAW

VISUAL includes normal reusable structural CSS, not only paint and measurement.

Initial structural families:

```txt
display
position
z-index
```

Examples:

```ts
display: VISUAL.display[2],
position: VISUAL.position[1],
zIndex: VISUAL.zIndex[4],
```

Ownership:

- `display` is a sparse categorical selection
- `position` is a sparse categorical selection
- `zIndex` is a complete calibrated stacking ladder

Structural primitives make normal CSS immediately recognizable and keep true local decisions visually exposed.

---

# 11. SCAN AND INSPECTION LAW

The code-reading distinction is canonical:

```ts
position: VISUAL.position[1],
display: VISUAL.display[2],
zIndex: VISUAL.zIndex[4],
rowGap: VISUAL.spacing[8],

marginTop: -20,
```

Meaning:

```txt
VISUAL.*
= canonical normal reusable primitive

raw literal
= measured geometry, content-derived value, local composition,
  unsupported exact need, or true exception
```

This distinction creates:

- faster code scanning
- visible ownership boundaries
- easier audits
- easier detection of local geometry
- easier detection of drift
- a future linting surface
- a clearer bridge between visual judgment and implementation syntax

Raw values are not forbidden.

Raw values must remain meaningful because canonical normal values no longer need to appear raw.

---

# 12. ATOMIC UNIT LAW

Each visual property remains independently controllable.

A family may not collapse several CSS properties into a finished recipe.

Allowed:

```ts
borderWidth: VISUAL.border.width[4],
borderStyle: VISUAL.border.style[1],
borderColor: VISUAL.border.color[6],
```

Forbidden:

```ts
border: VISUAL.border[4]
```

Allowed:

```ts
fontFamily: VISUAL.type.family[2],
fontSize: VISUAL.type.size[8],
fontWeight: VISUAL.type.weight[7],
lineHeight: VISUAL.type.line[4],
letterSpacing: VISUAL.type.tracking[12],
textTransform: VISUAL.type.transform[2],
```

Forbidden:

```ts
typography: VISUAL.type.label[4]
```

Atomicity preserves precision.

Composition creates form.

---

# 13. COMPONENT RECIPE LAW

A component composes the exact visual result it needs from canonical units.

Example:

```ts
const CARD_STYLE: CSSProperties = {
    display: VISUAL.display[2],
    position: VISUAL.position[1],
    padding: `${VISUAL.spacing[10]} ${VISUAL.spacing[12]}`,
    borderRadius: VISUAL.radius[12],
    borderWidth: VISUAL.border.width[4],
    borderStyle: VISUAL.border.style[1],
    borderColor: VISUAL.border.color[4],
    background: VISUAL.fill[2],
};
```

The component remains readable because the recipe is visible.

The system remains coherent because the ingredients are canonical.

Outflō avoids both failure modes:

```txt
raw literals everywhere
finished presets everywhere
```

Outflō keeps canonical ingredients and local composition.

---

# 14. PRIMITIVE FILE OWNERSHIP LAW

Primitive source structure follows ownership.

When a family contains independently calibrated groups, each group owns its own source file.

Example:

```txt
glow/
  visual-glow.config.ts
  visual-glow.tokens.css
  visual-glow-x.tokens.css
  visual-glow-y.tokens.css
  visual-glow-blur.tokens.css
  visual-glow-spread.tokens.css
  visual-glow-color.tokens.css
```

The family-level token file becomes a manifest when child groups are split.

Rules:

- one independently calibrated group per file
- family manifest imports child token files
- config composes the public family shape
- categorical groups may resolve directly through TypeScript
- do not create CSS variables for a categorical group merely for symmetry
- do not split a genuinely singular family without earned ownership pressure

Examples of earned splits include:

```txt
shadow
state
border
stroke
glow
inset
type
```

File structure must reveal ownership.

---

# 15. TYPE LAW

Typography remains atomic.

The canonical type family exposes:

```txt
family
size
weight
line
tracking
transform
```

Each property is selected independently.

Rules:

- type size may use a complete calibrated dial
- line height and tracking may use complete calibrated dials
- family, weight, and transform may remain sparse selections
- invalid font weights are not invented to fill the number domain
- large instrument readouts may remain local until repetition proves canon
- typography must not return to finished presets such as body, label, title, display, or value

The component owns the typographic recipe.

---

# 16. PAINT SOURCE LAW

Themes own appearance.

VISUAL paint families resolve from direct theme source values.

Theme sources use opaque base colors where intensity is subsequently derived through `color-mix()` against transparency.

Example:

```css
--visual-text-source: rgb(248, 251, 255);
--visual-fill-source: rgb(0, 132, 255);
--visual-accent-source: rgb(0, 132, 255);
```

The source must not contain alpha when the dial itself owns intensity.

Reason:

- source defines hue and base paint
- dial defines intensity
- alpha in both places compounds opacity and weakens calibration

VISUAL source values must not alias legacy theme roles.

Allowed:

```css
--visual-text-source: rgb(248, 251, 255);
```

Forbidden:

```css
--visual-text-source: var(--theme-text-primary);
```

---

# 17. TOTAL THEME PARTICIPATION

All visual appearance participates in the active theme unless the design explicitly defines a fixed instrument or brand exception.

Theme-participating properties include:

- text
- surfaces
- accents
- semantic state
- borders
- strokes
- shadows
- glows
- insets
- atmospheric paint

Structural properties do not require theme participation:

- display
- position
- grid
- flex
- spacing
- radius
- z-index
- geometry
- interaction behavior

A component must not change only one appearance role while leaving adjacent roles stranded in another theme.

Participation is total.

---

# 18. STATE PAINT LAW

Semantic meaning and visual intensity are separate concerns.

The model or component selects the semantic family:

```txt
normal
good
warning
danger
muted
```

The component selects intensity:

```ts
VISUAL.state.good[18]
VISUAL.state.warning[18]
VISUAL.state.danger[18]
VISUAL.state.muted[12]
```

The active theme owns the source color for each state.

State meaning remains stable.

Theme feeling may change.

---

# 19. SHARED FORM LAW

Repeated form has one owner.

When several leaf components share the same card, row, control, or surface construction, a shared primitive owns:

- repeated structure
- repeated base recipe
- repeated border construction
- repeated surface behavior
- repeated overflow or isolation behavior

Leaf components own only their local composition and content-specific needs.

Shared form is not copied between leaf components.

Shared form is composed through the shared owner.

---

# 20. EXCEPTION AND REFINEMENT LAW

The dial is the default.

The dial is not a cage.

Use a precise local value when correctness genuinely requires it, especially for:

- instrument geometry
- SVG dimensions
- optical alignment
- unusual display readouts
- content-derived dimensions
- responsive calculations
- one-off physical placement

Exceptions are interpreted through evidence:

```txt
single exception
→ local precision

repeated exception
→ missing canonical unit

shared evidenced need
→ refine or expand the primitive
```

Do not distort a component to obey an insufficient scale.

Do not expand a global scale for one isolated value.

The rendered interface teaches the system what to canonize.

---

# 21. MIGRATION LAW

VISUAL is additive infrastructure and the canonical destination for active interface work.

Rules:

- do not mass rewrite the repository
- migrate one declared surface at a time
- migrate shared owners before leaf components
- inspect ownership before replacing raw values
- preserve genuinely local values
- promote repeated form only after it is proven
- do not alias VISUAL back into legacy tokens
- do not rebuild unrelated surfaces during a focused pass
- partially migrated components must remain bounded and understandable

Migration must reduce ambiguity.

Migration must not spread it.

---

# 22. TOP-DOWN EXECUTION LAW

UI work proceeds from shared owners into leaf components.

Canonical sequence:

```txt
shared primitive
→ surface component
→ local content
→ build
→ browser rendering
→ theme verification
→ adjacent shared-form proof
```

One file at a time remains the default working mode.

Closed files are not reopened without a proven mismatch.

Do not broadly migrate components until the required primitive base exists and the current build remains green.

---

# 23. DEAD OWNERSHIP LAW

Removing a visual feature requires removing its ownership, not merely hiding its output.

Complete removal includes:

- render path
- imports
- components
- primitives
- tokens
- theme values
- references
- dead folders

The Environment context map was removed under this law.

> **The map is gone. It is not an active Environment path.**

A future thread must not revive it unless the Guide explicitly creates a new map scope.

---

# 24. PROOF REQUIREMENT

A visual architecture is not complete because its types compile.

It must render.

The VISUAL system has been proven through:

- the original `0–10` component migrations
- Environment Air tile rendering
- Context Card reconstruction
- shared theme propagation
- type-scale correction from browser evidence
- successful expansion to the `0–20` number domain
- successful use of complete and sparse family shapes
- successful root composition of structural primitives

Required verification for future passes:

```txt
build passes
component renders
active themes resolve
shared form aligns
raw values remain meaningfully local
no dead references remain
```

The browser is part of the contract test.

---

# 25. PROHIBITED PATTERNS

The following are not allowed:

- finished recipe presets inside VISUAL
- hidden multi-property recipe constructors
- forcing sparse categorical families to occupy all `0–20` units
- using a complete-dial constructor for missing CSS variables
- inventing invalid CSS values to preserve superficial symmetry
- raw hardcoded theme colors in rebuilt components
- VISUAL sources aliased to legacy theme tokens
- duplicated shared form across leaf components
- UI components owning canonical application truth
- replacing measured geometry with an inaccurate generic unit
- global dial changes based on one unsupported exception
- retaining dead visual files after removal
- opportunistic rewrites outside the declared surface
- reopening closed files without evidence
- reviving the Environment map by drift

---

# 26. FUTURE THREAD START BLOCK

Before writing UI code, a future thread must declare:

```txt
TARGET SURFACE:
What exact interface area is being changed?

STATE / MODEL:
What persisted or derived state does it render?

SHARED OWNER:
Which primitive owns repeated form?

LOCAL OWNER:
Which component owns the final recipe?

VISUAL FAMILIES:
Which complete dials or sparse selections are required?

LOCAL VALUES:
Which values are measured geometry, content-derived, or true exceptions?

THEME PARTICIPATION:
Which appearance roles must respond to themes?

ALLOWED FILES:
Which files may change?

FORBIDDEN FILES:
Which nearby systems must remain untouched?

VERIFICATION:
How will build, browser rendering, themes, and dead references be checked?
```

If shared ownership or the local-value boundary is unclear, stop before implementation.

---

# 27. INVARIANTS

The following must always remain true:

- precision lives at the unit level
- components own final composition
- shared primitives own shared form
- VISUAL owns canonical atomic values
- the canonical number domain is `0–20`
- complete calibrated dials expose every unit
- sparse selections expose only valid meanings
- structural normality is visible through `VISUAL.*`
- raw values remain available for local form and true exceptions
- themes own paint sources
- geometry owns measured placement
- UI projects truth but does not own canonical truth
- theme participation is total
- file structure reveals primitive ownership
- migrations proceed top-down and within declared boundaries
- dead ownership is removed completely
- browser rendering verifies the contract

---

# 28. SYSTEM SUMMARY

```txt
Canonical Truth
↓
Display Model
↓
Shared Structure
↓
VISUAL Number Domain
↓
Complete Dials + Sparse Selections
↓
Component Recipe
↓
Theme Resolution
↓
Rendered Interface
↓
Guide Experience
```

The system resolves inward.

The interface builds outward.

Normal primitives become visible.

Local decisions remain exposed.

---

## FINAL PRINCIPLE

> **Precision lives at the unit level. Build outward.**

> **`VISUAL.*` marks canonical normal primitives. Raw values mark local form, measured geometry, content-derived behavior, or true exceptions.**

Outflō does not approximate the finished form.

Outflō resolves the units that make the form possible.

Ownership preserves precision.

Numbered selection creates a shared language.

Composition creates coherence.

The Guide receives the result.

---

End of Document.