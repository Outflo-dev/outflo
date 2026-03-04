# Outflō Documentation

This directory contains the permanent documentation for the Outflō codebase.

The documentation system is organized into layers so that philosophy, repository laws, and system architecture remain clearly separated.

---

## Documentation Map

```
docs/

  README.md            → Documentation entry point
  repository.md        → Repository structure and project map

  philosophy/          → Project philosophy and operating principles

  conventions/         → Repository rules, standards, and documentation templates

  architecture/        → Active system architecture and technical contracts

  archive/             → Historical or inactive system designs
```

---

## Philosophy

Philosophy documents describe **how systems are built** and the principles guiding the project.

Location:

```
docs/philosophy/
```

Example:

```
outflo-way.md
```

These documents define the conceptual foundation of the project rather than specific engineering systems.

---

## Conventions

Conventions define repository laws and are **not versioned**.

Location:

```
docs/conventions/
```

Examples:

- naming-canon.md
- code-style-locked.md

Templates used when writing documentation also live here.

Examples:

- convention-template.md
- architecture-template.md
- placeholder-readme-template.md

---

## Architecture

Architecture documents describe **active system designs and technical contracts**.

Architecture documents are **versioned inside folders**.

Example:

```
environment-engine/
  v1.md
```

Each architecture system owns its own folder.

---

## Archive

The archive contains system designs that are not currently part of the active architecture.

Archived systems remain documented but are excluded from the live architecture surface.

Example:

```
archive/environment-engine/
  v1.md
```

The archive preserves historical exploration without affecting active system contracts.

---

End of Document.