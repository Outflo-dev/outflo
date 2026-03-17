# OUTFLO — NAMING CANON (LOCKED)

Purpose  
Remove naming as a variable and prevent drift across the codebase.

Outflō prioritizes naming stability over stylistic preference. Once a naming convention is locked, it should not change unless it removes measurable development friction.

---

# Rules

## Core Identity

Brand name (marketing / copy): Outflō  
Technical identifiers (code / URLs / DB / domains): outflo

Rules:

- All technical surfaces remain **ASCII only** (no diacritics).
- All technical identifiers remain **lowercase**.

---

## Filesystem Conventions

### Folder Naming

All folders use **kebab-case**, except where the framework requires otherwise.

Next.js dynamic route segments are reserved patterns:

- `[id]/`
- `[slug]/`
- `[...slug]/`

---

### Next.js Reserved Filenames

These must match framework expectations exactly:

- `page.tsx`
- `layout.tsx`
- `route.ts`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

---

### React Component Files

React component files use **PascalCase**.

Applies to files exporting React components (including Client components).

---

### Non-Component TypeScript

Non-component TypeScript files use **kebab-case**.

Applies to:

- libraries
- services
- hooks
- utilities
- pure functions

---

## Documentation

All documentation files use **kebab-case**.

Architecture documents are **versioned inside folders**, not inside filenames.

---

## Database Naming

Database objects use **snake_case**.

---

## URL + Domain Naming

All technical identifiers remain lowercase.

---

## Repository Exceptions

The following filenames are allowed because they are ecosystem standards:

- `README.md`
- `LICENSE`
- `package.json`
- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `tsconfig.json`
- `next.config.js`
- `next.config.mjs`
- `.gitignore`
- `.env*`
- `.eslintrc*`
- `prettier.config.*`

---

# Examples

Folder examples:

- `email-mirror/`
- `home-integration-flow/`
- `environment-engine/`

Component examples:

- `LoginClient.tsx`
- `SwipeShell.tsx`
- `EmailMirrorClient.tsx`
- `Portal.tsx`

Utility examples:

- `use-swipe.ts`
- `environment-engine.ts`
- `resolve-location.ts`
- `user-epoch.ts`
- `get-device-location.ts`
- `get-weather.ts`

Documentation structure example:

```
docs/
  conventions/
    naming-canon.md
    code-style-locked.md

  architecture/
    routes/
      canonical.md

    database/
      v1.md

    environment-engine/
      v1.md

    home-environment/
      v1.md

    home-integration-flow/
      v1.md

    outflo-ledger/
      v1.md
```

Database examples:

- `user_epoch`
- `receipt_number`
- `merchant_slug`
- `ingest_events`

URL examples:

- `outflo.xyz`
- `github.com/outflo/outflo`

---

# Invariant

Components → PascalCase  
Everything else → kebab-case  

This rule holds across the repository.

---

End of Document.