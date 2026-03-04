# Outflō Routes — Canonical Map

This document defines the **canonical route structure** for the Outflō application.

Purpose:
- Prevent route drift
- Define stable product namespaces
- Preserve compatibility through legacy redirects

Legacy routes may exist for compatibility but **must never host new functionality**.

---

# Routing Model

Outflō uses the **Next.js App Router**.

Routing is implemented through the filesystem under:

```
app/
```

Dynamic route segments follow Next.js conventions:

```
[id]
[slug]
[...slug]
```

Routing architecture is defined here.  
Filesystem naming rules are defined separately in:

```
docs/conventions/naming-canon.md
```

---

# Canonical Namespaces

The application is divided into stable route namespaces.

```
/           → Public surface
/app/*      → Authenticated product
/account/*  → User identity surfaces
/tools/*    → Calculators + derived utilities
/admin/*    → Administrative operations
/api/*      → Backend route handlers
```

Each namespace has a specific responsibility and should remain stable.

---

# Public Routes

Accessible without authentication.

```
/                → Public home surface
/login           → Login page
/auth/callback   → Supabase auth callback
/logout          → Logout route
/reset           → Password reset flow
```

Public routes should remain minimal and act as entry points into the product.

---

# Authenticated Product Namespace

Primary product surfaces live under:

```
/app/*
```

Authentication is enforced by:

```
app/app/layout.tsx
```

Canonical routes:

```
/app/systems      → Product launcher
/app/money        → Money substrate root
/app/time         → System clock / runtime
/app/profile      → User profile
```

---

# Money Substrate

Primary Outflō product system.

Root:

```
/app/money
```

Subroutes:

```
/app/money/receipts
/app/money/receipts/[id]

/app/money/day/[key]

/app/money/place/[slug]

/app/money/about
```

These routes are primarily **auto-generated views derived from ledger state**.

---

# Tools Namespace

Tools are utilities derived from product data.

Protected via:

```
app/tools/layout.tsx
```

Canonical routes:

```
/tools
/tools/gain
/tools/compression
```

Tools should remain **stateless utilities**, not core product systems.

---

# Account Namespace

Identity and user configuration.

Protected via:

```
app/account/layout.tsx
```

Canonical routes:

```
/account/profile
/account/email-mirror
```

Account routes manage user identity and configuration only.

---

# Admin Namespace

Administrative operations.

Protected via:

```
app/admin/layout.tsx
```

Canonical routes:

```
/admin
```

Admin operations may include:

- export
- restore
- reset
- diagnostics

Admin surfaces must remain isolated from normal product flows.

---

# API Namespace

Server-side operations.

All API endpoints live under:

```
/api/*
```

Example endpoints:

```
/api/ingest/resend
/api/receipts
/api/receipts/[id]
/api/outflows
/api/email-mirror/*
/api/admin/*
```

API routes use the Next.js route handler pattern:

```
route.ts
```

---

# Legacy Redirect Layer

Legacy routes are preserved through redirects for compatibility.

They must **never contain product logic**.

---

## 365 Era (Deprecated)

```
/365 → /app/money
/365/* → /app/money/*
```

---

## Former Root Routes

```
/systems   → /app/systems
/profile   → /account/profile
/state     → /tools/gain
/merchant  → /tools/compression
/calculate → /tools
/export    → /admin
```

---

## Former Engine Nesting

```
/app/money/engine → /app/money
```

---

# Namespace Rules (Locked)

1. Substrates live under `/app/*`
2. Tools live under `/tools/*`
3. Identity lives under `/account/*`
4. Administrative operations live under `/admin/*`
5. API routes live under `/api/*`
6. Legacy routes exist **only for redirects**

---

# Authentication Model

Authentication is enforced via **namespace layout gates**.

```
app/app/layout.tsx
app/tools/layout.tsx
app/account/layout.tsx
app/admin/layout.tsx
```

This approach ensures new routes cannot accidentally bypass authentication.

---

# Invariant

All new functionality must be added to **canonical namespaces**.

Legacy routes must only redirect.