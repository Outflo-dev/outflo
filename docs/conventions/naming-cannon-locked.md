# OUTFLO — NAMING CANON (LOCKED)

Purpose:  
Remove naming as a variable. Prevent drift across the codebase.

Outflō prioritizes naming stability over stylistic preference. Once a naming convention is locked, it should not change unless it removes measurable development friction.

---

## 1. Core Identity

**Brand name (marketing / copy):** Outflō  
**Technical identifiers (code / URLs / DB / domains):** outflo

Rules:
- All technical surfaces remain **ASCII only** (no diacritics).
- All technical identifiers remain **lowercase**.

---

## 2. Filesystem Conventions

### 2.1 Folder Naming
All folders use **kebab-case**, except where the framework requires otherwise.

Examples:
- `email-mirror/`
- `home-integration-flow/`
- `environment-engine/`

Next.js dynamic route segments are reserved patterns:
- `[id]/`
- `[slug]/`
- `[...slug]/`

---

### 2.2 Next.js Reserved Filenames
These must match framework expectations exactly:

- `page.tsx`
- `layout.tsx`
- `route.ts`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

---

### 2.3 React Component Files
**PascalCase**.

Applies to files exporting React components (including Client components).

Examples:
- `LoginClient.tsx`
- `SwipeShell.tsx`
- `EmailMirrorClient.tsx`
- `Portal.tsx`

Notes:
- Component files are typically located in `components/` or adjacent to a route when tightly coupled to that page.

---

### 2.4 Non-Component TypeScript
**kebab-case**.

Applies to:
- libraries
- services
- hooks (non-component)
- utilities
- pure functions / helpers

Examples:
- `use-swipe.ts`
- `environment-engine.ts`
- `resolve-location.ts`
- `user-epoch.ts`
- `get-device-location.ts`
- `get-weather.ts`

---

## 3. Documentation

All documentation files use **kebab-case**.

Architecture documents are **versioned inside folders**.

Canonical structure:

```
docs/
  conventions/
    naming-canon.md
    code-style-locked.md

  architecture/
    routes/
      canonical.md

    database/
      contract.md

    environment-engine/
      v1.md

    home-environment/
      v1.md

    home-integration-flow/
      v1.md

    outflo-ledger/
      v1.md
```

Versioning pattern:

```
system-name/
  v1.md
  v2.md
  v3.md
```

Version numbers belong **inside the folder**, not in the filename.

---

## 4. Database Naming

Database objects use **snake_case**.

Examples:
- `user_epoch`
- `receipt_number`
- `merchant_slug`
- `ingest_events`

---

## 5. URL + Domain Naming

All technical identifiers remain lowercase.

Examples:
- `outflo.xyz`
- `github.com/outflo/outflo`

---

## 6. Repository Exceptions (Allowed Non-Canon Filenames)

These are permitted because they are ecosystem standards:

- `README.md`
- `LICENSE`
- `package.json`
- `package-lock.json` / `pnpm-lock.yaml` / `yarn.lock`
- `tsconfig.json`
- `next.config.js` / `next.config.mjs`
- `.gitignore`
- `.env*`
- `.eslintrc*`
- `prettier.config.*`

---

## 7. Invariant

**Components → PascalCase**  
**Everything else → kebab-case**  

This rule should hold across the repository.