OUTFLO — THREAD TRANSITION SOP (v7)

STATUS:
Replaces v6 as primary working thread SOP.

PURPOSE:
Prevent drift by enforcing state ownership before implementation.
Align all threads to persisted app state propagation.

---

CORE SHIFT:

v6:
Load kernel → orient → execute

v7:
Declare state → assign ownership → constrain files → execute

---

THREAD START — REQUIRED BLOCK

Before writing ANY code, the thread must declare:

STATE:
What persisted or derived state is being worked on?

OWNER:
Who owns the user action?

SOURCE OF TRUTH:
Where does the canonical value live? (DB, constant, computation)

WRITE PATH:
How does state change?
(Profile → API → DB)

READ PATH:
Where is state read into runtime?
(layout, selector, hook)

APPLICATOR (if needed):
What applies the state to the system?
(e.g. data-theme, DOM, computation)

CONSUMERS:
Which surfaces/pages/components read this?

---

FILE BOUNDARY DECLARATION

ALLOWED FILES:
Explicit list of files that may be modified.

FORBIDDEN FILES:
Explicit list of files that must NOT be touched.

If unclear → STOP.

---

CANONICAL OWNERSHIP MODEL

Profile
→ owns persisted user-state actions

API routes
→ own writes to DB

Database
→ owns truth

Layouts (app/*/layout.tsx)
→ own DB reads + runtime handoff

lib/app-state/*
→ owns validation + propagation helpers
→ no UI
→ no styling

styles/themes + globals.css
→ own all visual tokens

AppShell / AppFrame
→ own structure only
→ no state ownership

Surfaces (/app/*)
→ read-only projections

Components
→ presentation only

Legacy pages
→ may render
→ must not write/reset global state

---

BUILD RULE

Do not build pages to solve ownership.

Define ownership first.
Pages are projections of state.

---

PATCH RULE

If a change:
- touches multiple layers
- introduces duplicate side effects
- fixes behavior without ownership clarity

→ STOP

Return to ownership declaration.

---

LEGACY RULE

Wrap legacy.
Do not repair legacy unless it blocks propagation.

Legacy may:
- look outdated

Legacy may NOT:
- override global state
- introduce alternate truth
- apply conflicting side effects

---

CONTRACT RULE

Existing contracts may be pre–state ownership.

When conflict exists:

STATE OWNERSHIP WINS

until contracts are updated.

---

THREAD VALIDITY CHECK

A thread is valid ONLY if:

- state is named
- owner is assigned
- write path is declared
- read path is declared
- applicator is declared (if needed)
- consumers are listed
- allowed files are listed
- forbidden files are listed

If any are missing:

DO NOT WRITE CODE

---

FAILURE SIGNALS

If observed:

- state resets across routes
- multiple files writing same state
- UI breaks when side effects removed
- fixes require “just one more patch”

→ ownership is broken

STOP and re-evaluate.

---

ONE-LINE LOCK

We do not implement until ownership is explicit.