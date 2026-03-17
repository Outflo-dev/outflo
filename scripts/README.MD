## Printing the Repository Tree

This script generates a complete snapshot of the Outflō repository structure.

Run from the project root:

    .\scripts\print-repo-tree.ps1 -WriteToDocs

### What It Does

Each time the script runs, it writes to **two locations inside `docs/repository/`**:

1. Current State (Overwritten)
   - Path:
     docs/repository/current/repository-tree.txt
   - This file is overwritten on every run
   - Always represents the **latest repository structure**

2. Snapshot (Persistent)
   - Path:
     docs/repository/snapshots/
   - A new file is created on each run
   - Filename format:
     <unix>__YYYY-MM-DD_HH-mm.txt
   - Each snapshot is preserved and never overwritten

### Previewing in the Terminal

To view the repository tree without writing any files:

    .\scripts\print-repo-tree.ps1

To view a specific section of the repository:

    .\scripts\print-repo-tree.ps1 -Only docs/product

Example:

    .\scripts\print-repo-tree.ps1 -Only docs/architecture

- Outputs are printed to the terminal only
- No files are written
- Safe for inspection and debugging

### Explanation

The script scans the repository, builds a clean and deterministic tree view, and records both the current state and a historical snapshot.

This creates a system where:
- The latest structure is always accessible
- The evolution of the repository is permanently recorded

### Mental Model

- current/ → “What is the system right now?”
- snapshots/ → “How did the system become what it is?”

Together, they give the repository **state + memory**.