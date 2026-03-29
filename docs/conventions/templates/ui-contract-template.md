# OUTFLO — UI CONTRACT TEMPLATE (v1)

Status: Draft | Locked

Scope  
Defines the user-facing contract for a single Outflō UI surface.  
This document governs **what is shown**, **where it is shown**, and **what must never appear**.  
It does not define internal algorithms or system law.

---

## 1. Purpose

Describe the UI surface in one sentence.

- What is this screen/module for?
- What user question does it answer?

---

## 2. Principles

List the non-negotiable UI principles for this surface.

Examples:
- Calm surface: show only meaning
- No algorithm leakage: no formulas, no symbolic law
- No drift: layout order is fixed once locked
- Facts over interpretation (interpretation belongs to AI layer)

---

## 3. Surface Definition

Name the surface and its boundaries.

- Surface Name:
- Route(s):
- Entry points:
- Exit points:
- Primary user action:

---

## 4. Layout Contract

Define the canonical layout order.

- Section order is fixed once Locked.
- Each section below must specify: purpose, visible fields, hidden fields, and interactions.

### Sections (in order)
1.
2.
3.
4.
5.
6.

---

## 5. Section Contracts

For each section, fill in the following template.

### <SECTION NAME>

Purpose  
One sentence.

Visible (Always)  
- Field:
- Field:
- Field:

Reveal (Expand / Tap)  
- Field:
- Field:

Hidden (Captured but not shown here)  
- Field:
- Field:

Formatting Rules  
- Example:
- Units:
- Precision:
- Ordering:
- Separators:

Interaction Rules  
- Tap behavior:
- Long-press behavior (if any):
- Navigation targets (if any):

Empty / Missing Data Rules  
- If field missing:
- If section missing:
- Placeholder style:

Never Rules  
- Must never show:
- Must never imply:

Repeat for each section in the surface.

---

## 6. Display Rules

Global rendering rules for this surface.

- Currency display rules:
- Time display rules:
- Number formatting:
- Units (metric storage vs display conversion):
- Capitalization / punctuation:
- “No symbols” rules (if applicable):

---

## 7. Navigation Contract

Define what navigation exists and what it opens.

- Link label:
- Destination:
- Required params:
- Fallback behavior:

Rules:
- Navigation is permitted only if it does not mutate truth.
- No hidden side effects.

---

## 8. State Rules

Define permitted states.

- Loading:
- Empty:
- Error:
- Offline (if applicable):

Rules:
- Must not block core render if enrichment data missing.
- Must not invent data.

---

## 9. Invariants

The “laws” of this UI surface.

Examples:
- Section order is fixed once Locked.
- No deletes / no hides (if applicable to the surface).
- No algorithm exposure.
- Truth anchors must be present if data exists.

---

## 10. Versioning

- Locked documents are immutable.
- Any change to layout order, visible fields, or meaning requires a new version.

Rules:
- v1 Locked → changes require v2 Draft → v2 Locked.

---

## 11. System Summary

In 3–6 bullets, restate the contract.

- This surface shows:
- This surface never shows:
- This surface links to:
- This surface remains calm by:

---

End of Document.