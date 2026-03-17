# Outflō Documentation

This directory contains the permanent documentation for the Outflō codebase.

The documentation system is organized into layers so that philosophy, repository laws, system architecture, and product surfaces remain clearly separated.

---

## Documentation Map

docs/

  README.md            → Documentation entry point (index only)
  
  repository/          → Repository structure and project map

  philosophy/          → Project philosophy and operating principles

  conventions/         → Repository rules, standards, and documentation templates

  architecture/        → Active system architecture and technical contracts

  product/             → Product behavior, UI contracts, and user-facing flows

  archive/             → Historical or inactive system designs

---

## Core Rules

### 1. Layer Separation

Each top-level folder represents a distinct system layer:

- Philosophy defines how systems are built  
- Conventions define repository laws  
- Architecture defines system contracts  
- Product defines user-facing behavior  
- Archive preserves historical systems  

Layers must not overlap in responsibility.

---

### 2. Versioning Law (Locked)

Documentation may evolve through versioned files.

When multiple versions exist within a folder:

- The **highest version number is always the active canonical document**
- Lower versions are preserved as historical reference

Example:

```
system/
  system-v1.md
  system-v2.md   ← active
```

This rule applies across:

- architecture  
- product  
- and any versioned documentation systems  

#### Exception — Conventions

Conventions represent repository laws and are generally **not versioned**.

However, when versioning is used:

- The same rule applies  
- The highest version remains canonical  

---

### 3. Filename Independence (Locked)

All versioned documents must remain intelligible when separated from their folder path.

This ensures documents can be:

- exported  
- shared  
- uploaded  
- reviewed in isolation  

Rule:

Versioned files must use descriptive filenames:

    <system-name>-v1.md  
    <system-name>-v2.md  

Examples:

    outflo-ledger-v1.md  
    ingest-pipeline-v1.md  
    database-v2.md  
    profile-page-v1.md  

Files must never rely solely on:

    v1.md  

---

### 4. README Contract (Locked)

README.md is reserved for index and navigation purposes only.

It must not contain:

- system contracts  
- architecture definitions  
- versioned documents  

Usage:

- docs/README.md → documentation entry point  
- folder README.md → local index for that folder  

---

### 5. Active vs Archived Systems (Locked)

The architecture layer must contain **only active systems**.

Archived systems must:

- be moved entirely into `docs/archive/`
- not remain in `architecture/` in any form
- not leave behind placeholder or redirect files

Architecture must remain a clean representation of the **current system only**.

The archive serves as the sole location for historical system designs.

---

## Philosophy

Philosophy documents describe how systems are built and the principles guiding the project.

Location:

    docs/philosophy/

Example:

    outflo-way.md

These documents define the conceptual foundation of the project rather than specific engineering systems.

---

## Conventions

Conventions define repository laws and documentation standards.

Location:

    docs/conventions/

Structure:

    conventions/
      laws/        → Locked repository rules  
      templates/   → Reusable documentation templates  

Examples (laws):

- naming-canon-locked.md  
- code-style-locked.md  

Examples (templates):

- convention-template.md  
- architecture-template.md  
- placeholder-readme-template.md  
- UI-contract-template.md  

Conventions are authoritative and govern the entire repository.

---

## Architecture

Architecture documents describe active system designs and technical contracts.

Location:

    docs/architecture/<system>/

Each system owns its own folder.

Architecture documents are versioned and must follow:

- Versioning Law  
- Filename Independence rule  

Example:

    outflo-ledger/
      outflo-ledger-v1.md  

Architecture documents define system behavior and invariants.

---

## Product

Product documents describe user-facing behavior, UI contracts, and interaction flows.

Location:

    docs/product/

Structure:

    product/
      domains/     → Functional product capabilities  
      ui/          → UI surfaces and rendering layer  

Examples:

- UI surfaces  
- page-level contracts  
- interaction flows  
- user-visible system behavior  

Product documents may be versioned and must follow:

- Versioning Law  
- Filename Independence rule  

---

## Archive

The archive contains system designs that are not currently part of the active architecture.

Location:

    docs/archive/

Archived systems remain documented but are excluded from the live architecture surface.

Example:

    archive/environment-engine/
      environment-engine-v1.md  

The archive preserves historical exploration without affecting active system contracts.

---

## System Summary

Outflō documentation is structured to:

- separate system law from implementation  
- preserve clarity across layers  
- ensure documents remain readable in isolation  
- allow systems to evolve without ambiguity  
- prevent structural drift  

---

### Enforcement Rules (Locked)

- Only one version of a system may exist in the active architecture layer at any time.
- When a new version is created, the previous version must be immediately removed from `architecture/`.

- Previous versions must be either:
  - moved to `docs/archive/`, or
  - deleted if no longer needed

- Duplicate versions within `architecture/` are not permitted under any circumstance.

- The architecture layer must always represent:
  
  → one system  
  → one version  
  → one source of truth  

---

### AI Context Rule

- Only documents in `docs/architecture/` represent valid system state.
- Files in `docs/archive/` are strictly historical and must not influence implementation decisions.

---

### System Principle

Outflō enforces singular truth.

There is never:

- more than one active version  
- more than one interpretation of a system  

Drift is eliminated at the file system level.

---

End of Document.