# OUTFLO — NAMING CANON (LOCKED)

Status: Locked  
Scope: Global naming rules for all documentation and system artifacts

This document defines how files, folders, and systems are named across the Outflō repository.

Naming is not stylistic.  
Naming is structural.

---

## 1. Core Principle

Every name must be:

- explicit  
- deterministic  
- self-contained  

A file must remain understandable:

- outside its folder  
- outside the repository  
- when viewed in isolation  

---

## 2. System Naming

All systems must use **kebab-case**.

Examples:

    outflo-ledger  
    ingest-pipeline  
    money-substrate  
    profile-page  

No:

- camelCase  
- PascalCase  
- spaces  
- abbreviations  

---

## 3. Folder Structure Rule

Each system owns its own folder.

Structure:

    <layer>/<category>/<system>/

Example:

    architecture/storage/outflo-ledger/  
    product/domains/profile/  
    product/ui/profile/page/  

Folders represent:

> system identity — not version

---

## 4. Versioned File Naming (Locked)

All versioned documents must follow:

    <system-name>-vN.md

Examples:

    outflo-ledger-v1.md  
    outflo-ledger-v2.md  
    database-v2.md  
    profile-page-v1.md  

Rules:

- Version number must be explicit (`v1`, `v2`, etc.)
- Filename must mirror the system name exactly
- Files must not be named:
  
      v1.md  
      final.md  
      new.md  

---

## 5. Versioning Behavior

When multiple versions exist:

- The **highest version number is canonical**
- Lower versions are historical

Example:

    system/
      system-v1.md  
      system-v2.md   ← active  

---

## 6. Active Architecture Rule

Only the **latest version** of a system may exist in:

    docs/architecture/

When a new version is created:

- Previous versions must be:
  - moved to `docs/archive/`, or
  - deleted  

Duplicate versions in active architecture are not permitted.

---

## 7. Archive Naming

Archive preserves historical versions without renaming.

Structure:

    docs/archive/<system>/
      <system>-v1.md  

Archive must:

- remain read-only  
- never contain active system definitions  

---

## 8. README Naming Rule

README.md is reserved strictly for:

- folder-level navigation  
- structural explanation  

README.md must not contain:

- system contracts  
- versioned documents  

---

## 9. Canonical Files

Some files are not versioned.

These represent:

- system entry points  
- routing definitions  
- canonical mappings  

Examples:

    canonical.md  

These files:

- must have descriptive names  
- must not use version suffixes  

---

## 10. Layer Consistency

Naming must reflect the layer:

- architecture → systems  
- product → user-facing constructs  
- conventions → laws and templates  
- philosophy → conceptual frameworks  

Names must not blur layers.

---

## 11. Prohibited Patterns

The following are not allowed:

- vague names (`test.md`, `new.md`)  
- duplicated meaning across layers  
- mismatched system/file names  
- version-only filenames (`v1.md`)  

---

## 12. System Principle

Outflō naming enforces:

- clarity over brevity  
- structure over convenience  
- determinism over preference  

If a file cannot be understood in isolation:

> it is incorrectly named  

---

End of Document.