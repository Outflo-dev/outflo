# OUTFLŌ — UI CONTRACT (v2)

**Status:** LOCKED  
**Scope:** Canonical ownership, construction, theming, migration, and verification law for all Outflō interface work

**Discovery:**

- **unix_ms:** 1783728239167
- **iso_utc:** 2026-07-11T00:03:59.167Z
- **human:** 2026-07-11 00:03:59.167 UTC
- **reason:** discovered through the Environment VISUAL build, Air tile browser proof, Context Card rebuild, type-scale correction, and complete removal of the abandoned context map system

---

# 1. PURPOSE

Define how Outflō interfaces are built.

This contract establishes:

- where visual precision lives
- who owns structure, form, paint, geometry, and state
- how atomic visual units become complete components
- how themes participate
- how exceptions refine the system
- how shared form is preserved
- how UI migrations proceed
- how dead visual ownership is removed

This contract exists so future threads do not rediscover the UI architecture.

---

# 2. CORE PRINCIPLE

> **Precision lives at the unit level. Build outward.**

Outflō does not begin with finished visual presets.

Outflō resolves a visible result into controllable units, preserves the ownership of those units, and composes the final interface outward.

```txt
canonical units
→ deliberate composition
→ shared form
→ rendered component
→ human experience
```

The aggregate is never treated as a mystery.

The final form is derived from owned parts.

---

# 3. UI IS A PROJECTION

The UI does not own canonical truth.

The UI reads persisted or derived state and presents it to the Guide.

Rules:

- models and runtime own data meaning
- components receive display-ready state
- components do not invent canonical truth
- components do not become alternate state owners
- styling does not redefine participation, computation, or database truth

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

---

## Components

Own:

- local layout
- hierarchy
- composition
- behavior
- interaction
- assembly of visual units

A component decides the final recipe for its own form.

> **The component is the recipe.**

---

## Shared UI primitives

Own:

- repeated shared form
- repeated structural behavior
- repeated composition boundaries

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

- canonical atomic visual units
- numbered selection dials
- stable TypeScript access
- stable CSS variable access

VISUAL does not own finished components or semantic presets.

---

## Themes

Own:

- paint sources
- appearance
- visual feeling
- theme-specific color identity
- semantic state color identity

Themes do not own layout, spacing, geometry, hierarchy, or interaction.

---

## Geometry

Owns:

- measured placement
- SVG coordinates
- physical alignment
- instrument dimensions
- mathematically constrained form

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

The CSS manifest is imported once through:

```txt
app/globals.css
```

Active families:

```txt
color
fill
text
accent
state
border
stroke
shadow
glow
inset
radius
opacity
weight
type
spacing
```

---

# 6. ATOMIC UNIT LAW

Every family exposes independently selectable units from `0` through `10`.

Examples:

```ts
VISUAL.spacing[5]
VISUAL.radius[6]
VISUAL.text[10]
VISUAL.type.size[3]
VISUAL.type.weight[8]
VISUAL.border.width[2]
VISUAL.stroke.cap[1]
VISUAL.glow.blur[4]
VISUAL.state.good[9]
```

Each visual property remains independently controllable.

A family may not collapse several CSS properties into a finished recipe.

Allowed:

```ts
borderWidth: VISUAL.border.width[2],
borderStyle: VISUAL.border.style[1],
borderColor: VISUAL.border.color[3],
```

Forbidden:

```ts
border: VISUAL.border[2]
```

Allowed:

```ts
fontFamily: VISUAL.type.family[2],
fontSize: VISUAL.type.size[3],
fontWeight: VISUAL.type.weight[8],
lineHeight: VISUAL.type.line[1],
letterSpacing: VISUAL.type.tracking[9],
textTransform: VISUAL.type.transform[2],
```

Forbidden:

```ts
typography: VISUAL.type.label[4]
```

Atomicity preserves precision.

---

# 7. COMPONENT RECIPE LAW

A component composes the exact visual result it needs from canonical units.

Example:

```ts
const CARD_STYLE: CSSProperties = {
    padding: `${VISUAL.spacing[5]} ${VISUAL.spacing[6]}`,
    borderRadius: VISUAL.radius[6],
    borderWidth: VISUAL.border.width[2],
    borderStyle: VISUAL.border.style[1],
    borderColor: VISUAL.border.color[2],
    background: VISUAL.fill[1],
};
```

The component remains readable because the recipe is visible.

The system remains coherent because the ingredients are canonical.

This avoids both failure modes:

```txt
raw literals everywhere
finished presets everywhere
```

Outflō keeps canonical ingredients and local composition.

---

# 8. THEME PARTICIPATION LAW

Themes own appearance.

VISUAL paint families resolve from direct theme source values.

Theme sources are opaque RGB values:

```css
--visual-text-source: rgb(248, 251, 255);
--visual-fill-source: rgb(0, 132, 255);
--visual-accent-source: rgb(0, 132, 255);
```

Dial intensity is derived through `color-mix()` against transparency.

The source must not contain alpha.

Reason:

- the source defines hue and base paint
- the dial defines intensity
- alpha in both places would compound opacity and weaken the scale

VISUAL source values must not alias legacy theme roles.

Allowed:

```css
--visual-text-source: rgb(248, 251, 255);
```

Forbidden:

```css
--visual-text-source: var(--theme-text-primary);
```

Current selectable themes own VISUAL sources directly:

```txt
dark
light
funky
dawn
day
dusk
night
environment
```

---

# 9. TOTAL PARTICIPATION

All visual appearance must participate in the active theme unless the design explicitly defines a fixed instrument or brand exception.

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
- geometry
- interaction behavior

A component must not change only its background while leaving its other visual roles stranded in another theme.

Participation is total.

---

# 10. SHARED FORM LAW

Repeated form has one owner.

If Context Card and tile cards are meant to share a surface, the shared card primitive owns:

- radius
- border construction
- base surface
- base text paint
- shared shadow behavior
- overflow and isolation behavior

The Context Card owns only its context-specific recipe:

- padding
- content hierarchy
- place typography
- precision state
- local spacing

The Air tile owns only its Air-specific recipe:

- gauge geometry
- gauge stroke
- AQI value
- status state

Shared form is not copied between leaf components.

Shared form is composed through the shared owner.

---

# 11. EXCEPTION AND REFINEMENT LAW

The dial is the default.

The dial is not a cage.

Use a precise local value when correctness genuinely requires it, especially for:

- instrument geometry
- SVG dimensions
- optical alignment
- unusual display readouts
- one-off responsive constraints

Exceptions are interpreted through evidence:

```txt
single exception        → local precision
repeated exception      → missing canonical unit
shared evidenced need   → refine the dial
```

Do not distort a component to obey an insufficient scale.

Do not expand a global scale for one isolated value.

The rendered interface teaches the system what to canonize.

---

# 12. TYPE LAW

Typography is atomic.

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

The initial type-size dial began too high for the real Environment interface.

Real component evidence required smaller canonical values, including `6px`, `8px`, and `9px` equivalents.

The type dial was corrected from the interface outward.

Large instrument readouts may remain local until repetition proves they belong in the canonical scale.

Typography must not return to finished presets such as:

```txt
body
label
title
display
value
```

The component owns the typographic recipe.

---

# 13. STATE PAINT LAW

Semantic meaning and visual intensity are separate concerns.

The model or component selects the semantic family:

```txt
normal
good
warning
danger
muted
```

The component selects the intensity:

```ts
VISUAL.state.good[9]
VISUAL.state.warning[9]
VISUAL.state.danger[9]
VISUAL.state.muted[6]
```

The active theme owns the source color for each state.

State meaning remains stable.

Theme feeling may change.

---

# 14. MIGRATION LAW

VISUAL is additive infrastructure.

Existing legacy components may remain on the legacy visual system until a deliberate migration reaches them.

Rules:

- do not mass rewrite the repository
- migrate top-down by active surface
- inspect ownership before changing styles
- promote repeated form only after it is proven
- do not alias VISUAL back into legacy tokens
- do not rebuild unrelated surfaces during a focused pass

New or fully rebuilt components should use VISUAL.

Partially migrated components must remain bounded and understandable.

Migration must reduce ambiguity, not spread it.

---

# 15. TOP-DOWN EXECUTION LAW

UI work proceeds from shared owners into leaf components.

Canonical sequence:

```txt
shared primitive
→ surface component
→ local content
→ theme verification
→ adjacent shared-form proof
```

For the current Environment pass:

```txt
EnvironmentCard
→ EnvironmentContextCard
→ EnvironmentTileFrame
→ Environment tiles
```

The header is outside the current boundary and must remain untouched until a dedicated header pass is declared.

One file at a time remains the default working mode.

Closed files are not reopened without a proven mismatch.

---

# 16. DEAD OWNERSHIP LAW

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

Deleted primitive stack:

```txt
EnvironmentContextAtmosphere.tsx
EnvironmentContextLimb.tsx
EnvironmentContextMap.tsx
EnvironmentContextMapFrame.tsx
EnvironmentContextMapStatusDot.tsx
EnvironmentContextMapVignette.tsx
EnvironmentContextPlanet.tsx
EnvironmentContextShadow.tsx
```

All `environment-context-map` and `environment-context-planet` theme references were removed.

Repository search returned zero remaining references.

> **The map is gone. It is not an active Environment path.**

A future thread must not revive it unless the Guide explicitly creates a new map scope.

---

# 17. PROOF REQUIREMENT

A visual architecture is not complete because its types compile.

It must render.

The VISUAL system was proven in the Environment Air tile through:

- spacing
- radius
- glow construction
- text paint
- typography
- stroke construction
- semantic state
- theme propagation

The Context Card then proved that the scales could be refined from real visual evidence.

Required verification for future passes:

```txt
build passes
component renders
active themes resolve
shared form aligns
no dead references remain
```

The browser is part of the contract test.

---

# 18. PROHIBITED PATTERNS

The following are not allowed:

- finished recipe presets inside VISUAL
- hidden multi-property recipe constructors
- raw hardcoded theme colors in rebuilt components
- VISUAL sources aliased to legacy theme tokens
- duplicated shared card form across leaf components
- UI components owning canonical application truth
- global dial changes based on one unsupported exception
- retaining dead visual files after removal
- opportunistic rewrites outside the declared surface
- reopening closed files without evidence
- reviving the Environment map by drift

---

# 19. FUTURE THREAD START BLOCK

Before writing UI code, a future thread must declare:

```txt
TARGET SURFACE:
What exact interface area is being changed?

STATE / MODEL:
What persisted or derived state does it render?

SHARED OWNER:
Which primitive owns repeated form?

LOCAL OWNER:
Which component owns the local recipe?

VISUAL FAMILIES:
Which atomic families are required?

THEME PARTICIPATION:
Which visual roles must respond to themes?

ALLOWED FILES:
Which files may change?

FORBIDDEN FILES:
Which nearby systems must remain untouched?

VERIFICATION:
How will build, browser rendering, themes, and dead references be checked?
```

If shared ownership is unclear, stop before implementation.

---

# 20. INVARIANTS

The following must always remain true:

- precision lives at the unit level
- components own final composition
- shared primitives own shared form
- VISUAL owns canonical atomic units
- themes own paint sources
- geometry owns measured placement
- UI projects truth but does not own canonical truth
- theme participation is total
- exceptions remain local until repetition proves canon
- migrations proceed top-down and within declared boundaries
- dead ownership is removed completely
- browser rendering verifies the contract

---

# 21. SYSTEM SUMMARY

```txt
Canonical State
↓
Display Model
↓
Shared Structure
↓
VISUAL Units
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

---

## FINAL PRINCIPLE

> **Precision lives at the unit level. Build outward.**

Outflō does not approximate the finished form.

Outflō resolves the units that make the form possible.

Ownership preserves precision.

Composition creates coherence.

The Guide receives the result.

---

End of Document.