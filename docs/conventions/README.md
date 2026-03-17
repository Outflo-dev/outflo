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

- **not versioned**
- **considered authoritative**
- updated only when explicitly revised and re-locked

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

End of Document.