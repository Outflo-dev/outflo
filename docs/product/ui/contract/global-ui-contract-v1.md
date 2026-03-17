# OUTFLO — UI SYSTEM (v1)

Status: Locked

Scope  
Global UI structure governing layout, type, spacing, surfaces, tiles, navigation, and actions.

---

## 1. Purpose

Define a single, authoritative UI system for Outflō.

This system ensures:

- no visual drift
- no per-page styling decisions
- consistent composition across all surfaces

All UI must be constructed from defined systems.  
No element may exist outside of this contract.

---

## 2. Core Model

The UI is composed from discrete systems:

### 2.1 Layout System
- container (max-width: 640)
- page frame (top / bottom spacing)
- surface types (system vs tile)

### 2.2 Type System
- global type scale (14 / 12 / 11)
- no ad-hoc sizes

### 2.3 Spacing System
- fixed spacing tokens
- enforced vertical rhythm

### 2.4 Tile System (Data)
- invariant unit for event display

### 2.5 Entry Tile System
- system access surfaces (Money, Time, Carbon)

### 2.6 Navigation System
- persistent bottom frame control

### 2.7 Button System
- action triggers (primary, secondary, ghost, admin variant)

UI is constructed by composing these systems only.

---

## 3. Invariants

The following must always remain true:

### 3.1 No One-Off Styling
No page may introduce custom:
- spacing
- font sizes
- layout behavior

---

### 3.2 System Composition Only
All UI must map to:
- tile
- entry tile
- navigation
- button
- system surface

---

### 3.3 Type Lock
Type scale is fixed:

- Primary → 14  
- Secondary → 12  
- Tertiary → 11  

No additional sizes allowed.

---

### 3.4 Spacing Lock
All spacing resolves to defined tokens:

- 8 (tight)
- 12 (stack)
- 16 (internal)
- 24 (section)
- 40 (bottom clearance)

---

### 3.5 Container Lock
- max-width: 640
- centered
- applies globally

---

### 3.6 Surface Separation

Two surface types:

#### System Surface
- full bleed
- no horizontal padding

#### Tile Surface
- inset (16px horizontal padding)
- contained layout

---

### 3.7 Tile Invariance

Data tiles:
- structure does not change
- spacing does not change
- type roles do not change

Tiles are atomic units.

---

### 3.8 System Boundaries

- Navigation ≠ Buttons  
- Entry Tiles ≠ Buttons  
- Tiles ≠ Cards  

Definitions:

- Navigation → frame control  
- Entry Tiles → system access  
- Buttons → actions  
- Tiles → data display  

---

## 4. Contracts

### 4.1 Layout Contract

All pages must:

- use container (640 max)
- respect top spacing:
  - standard → 24
  - dense → 16
- respect bottom spacing:
  - 40 (nav clearance)

---

### 4.2 Tile Contract

Data tiles must:

- use fixed internal padding (16)
- use global type roles
- maintain structural layout:
  - top (context)
  - center (value)
  - bottom (metadata)

---

### 4.3 Entry Tile Contract

Entry tiles must:

- follow grid structure
- use:
  - title → 14
  - status → 11
- support states:
  - active
  - disabled ("Soon")

No icons, badges, or decorative elements.

---

### 4.4 Navigation Contract

Navigation must:

- be fixed bottom
- height: 56
- exist within container width
- use label size: 12

States:
- active → full opacity
- inactive → reduced opacity

No animation at system level.

---

### 4.5 Button Contract

Buttons must:

- height: 44
- padding-x: 16
- type: 14 (weight 500)

Types:
- primary
- secondary
- ghost

---

### 4.6 Admin Variant Contract

Admin buttons:

- muted red background
- white text
- subtle border

Used for:
- destructive
- privileged
- override actions

Must remain rare.

---

## 5. Operational Rules

### 5.1 Composition Rule

Pages are built by:

- stacking tiles
- arranging entry tiles
- invoking buttons
- switching navigation states

No page defines new UI behavior.

---

### 5.2 Extension Rule

If a UI change is needed:

1. Identify owning system
2. Update system definition
3. propagate globally

Never patch at page level.

---

### 5.3 System Evolution

System changes must:

- update this document first
- then update global implementation
- then propagate to UI

---

### 5.4 Drift Prevention

If something feels off:

Do not fix visually.

Locate the system:
- layout
- type
- spacing
- tile
- nav
- button

Fix at source only.

---

## 6. System Summary

Outflō UI is a system of composed primitives.

- Layout defines structure
- Type defines hierarchy
- Spacing defines rhythm
- Tiles define content
- Entry tiles define system access
- Navigation defines frame
- Buttons define action

All UI emerges from these systems.

No element exists outside them.

---

End of Document.