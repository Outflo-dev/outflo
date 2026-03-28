# OUTFLO — CONVENTIONS

Status: Active  
Scope: Defines repository laws and documentation templates.

---

## Purpose

The conventions layer defines the **rules that govern the repository**.

These rules ensure:
- consistency across the codebase
- predictable structure
- prevention of drift

Conventions are **not system design** and **not product behavior**.  
They are the **laws the system must follow**.

---

## Structure

```
conventions/
  laws/        → Locked repository rules
  templates/   → Reusable documentation templates
```

---

## Laws

Location:

```
conventions/laws/
```

Contains:

- Naming canon
- Code style rules
- Repository structure laws (future)

These documents are:

- versioned over time
- only one version is active at any time
- considered authoritative
- updated only when explicitly revised and re-locked

Prior versions must be removed from active directories and preserved in:

    docs/archive/

---

## Templates

Location:

```
conventions/templates/
```

Contains:

- Architecture contract templates
- Convention templates
- UI templates
- README templates

Templates are used to create new documents and ensure consistency.

---

## Mental Model

- `philosophy/` → why the system exists  
- `conventions/` → rules the system must follow  
- `architecture/` → how the system is built  
- `product/` → how the system is experienced  

---

## ACTIVE DOCUMENT RULE (LOCKED)

Each system directory must contain exactly one active document.

The active document represents the current canonical truth.

All prior versions must be removed from the active directory and preserved in:

    docs/archive/

No active directory may contain multiple versions of the same system.

Active = current truth  
Archive = historical truth  

Both layers are:

- complete
- immutable
- non-overlapping

---

## System Principle

Outflō documentation follows the same laws as the system:

- nothing is overwritten  
- everything is versioned  
- history is preserved  
- truth is singular at any given layer  

---

End of Document