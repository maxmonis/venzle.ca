---
name: create-puzzles
description:
  Create a new week of puzzles in src/game/list.ts by extending the existing
  week lists and updating the exported puzzles. Use when asked to add or
  generate a new week of puzzles based on project-specific rules and examples.
---

# Create Puzzles

## Overview

Create a new week of puzzles in `src/game/list.ts` that follows the existing
format and the rules/examples stored in this skill's references.

## Workflow

1. Load the rules and examples. Read `references/rules.md` and
   `references/examples.md`. If either is missing or empty, ask the user to
   provide the rules/examples before editing.
2. Inspect existing weeks. Open `src/game/list.ts`, locate the latest `weekN`
   block, and note the type used (`Week`), the puzzle ordering, and any
   consistent formatting patterns.
3. Draft the next week. Create `week{N+1}` with the same structural conventions
   as the latest week. Include `groups`, `hint`, `title`, and optional `creator`
   fields that match the rules/examples. Ensure that the titles which update
   weekly use the next item in the sequence (Movies/TV Shows, Musicians/Bands,
   Baseball/Basketball/Football) and that the miscellaneous title at index 0 has
   not been used for at least 3 weeks.
4. Validate before inserting. Write the drafted week to a temporary JSON file
   (an array of the 7 puzzle objects) and run
   `npm run validate -- path/to/draft.json`. The script checks the 3x4 group
   shape, the 7-item overlap truth table, and reuse of group labels / center
   items against every existing puzzle. Fix any reported error and re-run until
   it exits 0. Do not eyeball the truth table.
5. Insert and wire up. Add the new `week{N+1}` block after the latest week and
   append it in the `puzzles = demo.concat(...)` list, preserving ordering and
   formatting.
6. Re-run `npm run validate` with no arguments to confirm the whole list still
   passes, then confirm the week type and titles align with the rules/examples.

Fact accuracy is not covered by the script. After the user reviews the draft,
run the `verify-puzzles` skill to fact-check every item in both directions.

## Reference Files

- `references/rules.md` contains the authoritative puzzle rules and constraints.
- `references/examples.md` contains example weeks or puzzles to emulate.

Read only the reference files you need. Do not invent rules that are not in the
references or the existing codebase.
