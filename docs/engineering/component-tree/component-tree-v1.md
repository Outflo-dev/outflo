# OUTFLO — COMPONENT TREE CONTRACT (LOCKED)

## Canonical Tree

components/
+-- domains/
|   +-- <substrate>/
+-- system/
    +-- actions/
    +-- primitives/
    |   +-- display/
    |   +-- motion/
    |   +-- navigation/
    |   +-- marks/
    +-- shell/
    +-- surfaces/


## Purpose

Define a deterministic, non-drifting component system where every file has one obvious home.

No repeated debates.
No ambiguous placement.
No legacy carryover.

---

## Core Law

A component must have one clear owner.

If placement is unclear → the component is not ready.

---

## Domains

Path:
components/domains/<substrate>/

Own:
- substrate meaning
- domain orchestration
- route-specific content
- domain-local UI

Do NOT own:
- reusable primitives
- global shells
- reusable surface patterns

Rule:
If it carries meaning → it is domain.

---

## System

Path:
components/system/

Owns all reusable, substrate-agnostic components.

Contains ONLY:
- actions
- primitives
- shell
- surfaces

---

## System / Actions

Path:
components/system/actions/

Own:
- user-trigger boundary
- interaction entry point
- reusable action logic

Do NOT own:
- layout
- substrate meaning
- surface composition

Test:
“User does a thing” → action

---

## System / Primitives

Path:
components/system/primitives/

Definition:
Smallest unit with one capability.

Cannot own:
- layout
- orchestration
- meaning
- mixed responsibilities

### display/
Pure value rendering

### motion/
Transform, opacity, timing only

### navigation/
Directional cues (chevron, arrows)

### marks/
Symbols, logos, non-navigation visual identity

---

## System / Shell

Path:
components/system/shell/

Definition:
Reusable visual container

Own:
- radius
- background
- border
- padding
- visual containment

Do NOT own:
- logic
- routing
- meaning
- orchestration

Test:
“Is this just a visual container?” → shell

---

## System / Surfaces

Path:
components/system/surfaces/

Definition:
Reusable structural UI patterns

Own:
- layout structure
- overlay frames
- reusable composition above shell level

Do NOT own:
- domain meaning
- route logic
- controller state

Test:
“Is this a reusable screen structure?” → surface

---

## Anti-Drift Rules

### 1. No extra roots

Forbidden:
- ui/
- shared/
- common/
- misc/

---

### 2. No mixed ownership

A file cannot be:
- primitive + shell
- shell + surface
- surface + controller

---

### 3. No guessing

If you hesitate → do not create the file

---

### 4. No legacy survival

If a file does not fit:
→ delete or rewrite

---

## Final Principle

Placement is not a discussion.

Placement is a property of ownership.

If ownership is clear:
→ the file location is obvious

---

End of Document