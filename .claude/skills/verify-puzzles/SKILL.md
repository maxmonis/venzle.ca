---
name: verify-puzzles
description:
  Fact-check a week of puzzles in src/game/list.ts after the initial draft has
  been reviewed. Verifies every item belongs to each group it is listed in and
  does NOT belong to any group it is left out of, using neutral web searches.
  Use when asked to verify, fact-check, or validate the accuracy of a week.
---

# Verify Puzzles

Fact-check pass that runs **after** `create-puzzles` has drafted a week and the
user has reviewed it. Structure is checked by a script; facts are checked by web
search.

## Workflow

1. Run the deterministic check first: `npm run validate`. It verifies the 3x4
   shape, the 7-item overlap truth table, and label/item reuse. Never eyeball
   the truth table — the script exists because that check drifts. Fix any
   reported error before spending searches on facts.
2. Read the target week from `src/game/list.ts`.
3. For every puzzle, check all 7 items in **both directions**:
   - **Inclusion** — the item genuinely satisfies each group it is listed in.
   - **Exclusion** — the item genuinely fails every group it is left out of.
     This is where nearly all real errors hide, because a drafted item is
     usually chosen for its inclusions and its exclusions go unexamined.
4. Report findings to the user in the CLI (see Report Format). Do not edit
   `src/game/list.ts` until the user picks a fix.
5. After any swap, re-run `npm run validate` to confirm the grid still holds,
   and re-verify the replacement item in both directions.

## Search Discipline

**Query the fact, never the assertion.** Ask an open question that returns the
value, then compare that value against what the puzzle claims.

| Don't                                          | Do                                                         |
| ---------------------------------------------- | ---------------------------------------------------------- |
| `Fats Domino highest Hot 100 never number one` | `did Fats Domino ever have a #1 on the Billboard Hot 100?` |
| `Klay Thompson born Los Angeles California`    | `where was Klay Thompson born?`                            |
| `Denzel Washington no Emmy win`                | `has Denzel Washington won an Emmy?`                       |

A query containing the expected answer retrieves pages matching those words
whether or not the claim is true, and biases the result summary toward agreeing.
Such a search confirms nothing. An open query surfaces the actual value, so a
wrong assumption shows up as a mismatch instead of passing silently.

Also:

- One question per search. Don't bundle two claims into one query.
- Prefer queries that name the entity and the attribute, nothing else.
- Trust primary/reference sources over aggregator blogspam when they conflict,
  and say so in the report when sources disagree.

## What To Prioritize

Searches are the expensive part. Spend them on claims that can plausibly be
wrong, and reason from knowledge for the rest:

- **Exclusions on near-miss items** — someone who almost qualifies (nominated
  but didn't win, born just outside the city limits, played for the rival
  school).
- **Anything time-sensitive** — awards, records, chart positions, active
  rosters. These change after the knowledge cutoff.
- **Edge-case category membership** — concert films counting as films,
  metropolitan area vs city limits, pre-Hot-100 chart eras, territory that has
  changed countries.
- Skip searching claims that are stable and unambiguous (a butterfly is an
  invertebrate; Vienna is not in Poland).

## Report Format

Group findings by severity, most severe first:

- **Error** — a verifiable factual mistake that breaks the grid. State the item,
  the group, the evidence, the resulting membership pattern, and which cell now
  collides or sits empty. Offer concrete fixes: either retighten the group label
  or swap the item, with a named replacement.
- **Soft** — defensible but arguable placements (interpretive category
  boundaries). Explain the argument on both sides; let the user decide.
- **Clean** — one short line per remaining puzzle naming the specific exclusions
  that were verified, so the user can see what was actually checked rather than
  a bare pass.

End with a source list of markdown links to everything relied on.
