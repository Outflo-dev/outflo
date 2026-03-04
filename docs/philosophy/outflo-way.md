# OUTFLO — THE OUTFLO WAY

Status: Locked  
Scope: How Outflō is built and kept drift-free.

---

## 1. Principle

Outflō is built as a system of laws.

We eliminate drift by defining invariants first, then implementing to them.

---

## 2. The Outflō Loop

Outflō follows a single build loop:

1. Whiteboard the system boundary  
2. Write the contract  
3. Implement the contract  
4. Ship  
5. Only then: UI polish and feature expansion

No system is built by accident.

---

## 3. Substrate Contracts

Every substrate has a contract.

A substrate is a system boundary that produces reality in Outflō (money, time, identity/ledger, ingest, computation).

Contracts live in:

- `docs/architecture/<system>/v1.md`

Implementation lives in:

- `app/`
- `components/`
- `lib/`

Contracts do not mirror files one-to-one.  
They describe the substrate laws that the code implements.

---

## 4. Contract-First Engineering

A system is considered “real” only when it has a contract.

If behavior changes, the contract version changes first.

---

## 5. Invariants Over Preference

Naming, formatting, routing, and schema are treated as invariants.

Conventions live in:

- `docs/conventions/*`

Once locked, these rules do not change unless they remove measurable development friction.

---

## 6. One System, One Owner Document

Each system has one canonical architecture document.

- `architecture/<system>/v1.md` is the source of truth.

No parallel docs describe the same system.

---

## 7. Archive, Don’t Delete

Inactive designs are moved to:

- `docs/archive/*`

Architecture describes the active system surface. Archive preserves history without polluting the present.

---

## 8. Atomic Substrates

Outflō reduces complexity to atomic units:

- money → cents
- time → milliseconds

Everything else is derived.

---

## 9. The Goal

Build a coherent system that never requires revisiting foundational decisions.

Outflō should feel inevitable.

---

End of Document.