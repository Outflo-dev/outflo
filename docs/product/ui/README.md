# OUTFLO — UI LAYER

Status: Active  
Scope: Defines the structure of the product UI layer.

---

## Purpose

The UI layer defines **how the product is rendered and experienced by the user**.

It contains:
- UI surfaces (pages, views, components)
- UI contracts governing presentation and behavior

The UI layer does **not** define system logic or data structures.

---

## Structure

```
ui/
  contract/     → Global UI rules and design system
  <surface>/    → Individual UI surfaces
```

---

## UI Contract

Location:

```
ui/contract/
```

Contains:

- Global UI contract
- Tokens (future)
- Spacing, color, typography systems (future)

These define the **rules all UI must follow**.

---

## Surfaces

Each folder under `ui/` represents a **user-facing surface**.

Examples:

```
ui/profile/
ui/receipts/
ui/weather/
```

Surfaces may contain:

```
page/
detail/
tiles/
components/
```

Each surface documents how that part of the product is rendered.

---

## Mental Model

- `domains/` → what the product does  
- `ui/` → what the user sees  
- `ui/contract/` → rules governing all UI  

---

End of Document.