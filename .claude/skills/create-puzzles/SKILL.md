---
name: create-puzzles
description:
  Create a new block of 28 diverse puzzles in src/game/list.ts by appending a
  blockN list and wiring it into the exported puzzles. Use when asked to add or
  generate new puzzles based on project-specific rules and examples.
---

# Create Puzzles

## Overview

Create a new block of 28 puzzles in `src/game/list.ts` that follows the existing
format and the rules/examples stored in this skill's references. Puzzles before
`block1` are frozen history; all new content is authored as blocks of 28 with no
fixed category slots and enforced category diversity.

## Workflow

1. Load the rules and examples. Read `references/rules.md` and
   `references/examples.md`. If either is missing or empty, ask the user to
   provide the rules/examples before editing.
2. Inspect existing content. Open `src/game/list.ts`. Note the `Puzzle` shape
   (`groups`, `hint`, `title`, optional `creator`), the `Block` type, and the
   highest existing `blockN`. Scan recent titles and group labels so the new
   block does not repeat them. Before writing a label, search the catalog for
   the concept and reuse any existing label verbatim, per `references/rules.md`.
3. Draft 28 puzzles. Aim for breadth, not the old anchor rotation:
   - No single title appears more than 2 times in the block.
   - Puzzles with the same title are at least 10 days apart, counting back into
     the previous block.
   - At most 14 puzzles total use the familiar anchor categories (Actors,
     Animals, Albums, Bands, Baseball, Basketball, Football, Movies, Musicians,
     Songs, Sports, TV Shows). The other 14+ should explore new subjects.
   - Spread across at least 6 subject domains (Nature, Geography, Sports, Music,
     Screen, History, Science, Arts, ...), with no domain dominating (aim for <=
     8 of 28). See `titleDomains` in `scripts/validate-puzzles.ts`. Each puzzle
     still follows the 3x4 group shape and 7-item overlap truth table.
4. Validate before inserting. Write the drafted block to a temporary JSON file
   (an array of the 28 puzzle objects) and run
   `npm run validate -- path/to/draft.json --block`. The script checks the 3x4
   group shape, the 7-item overlap truth table, reuse of group labels / center
   items against every existing puzzle, and the block-diversity limits (title
   cap, anchor quota, domain spread), and title spacing against the catalog. Fix
   every reported error and re-run until it exits 0. Address warnings too, or
   explain why they are acceptable. Do not eyeball the truth table or the
   diversity counts.
5. Insert and wire up. Add the new `blockN: Block` list after the latest block
   and append it in the `puzzles = demo.concat(...)` list, preserving ordering
   and formatting.
6. Re-run `npm run validate` with no arguments to confirm the whole list still
   passes, then run `npx tsc --noEmit` to confirm the types.

Fact accuracy is not covered by the script. After the user reviews the draft,
run the `verify-puzzles` skill to fact-check every item in both directions.

## Reference Files

- `references/rules.md` contains the authoritative puzzle rules and constraints.
- `references/examples.md` contains example puzzles to emulate.

Read only the reference files you need. Do not invent rules that are not in the
references or the existing codebase.
