# Puzzle Rules

Each puzzle has exactly 3 groups. Each group has exactly 4 items.

Each puzzle contains exactly 7 unique items total. The 7 items must fit this
truth table against the 3 groups:

- `a = ✅✅✅`
- `b = ✅✅❌`
- `c = ✅❌✅`
- `d = ✅❌❌`
- `e = ❌✅✅`
- `f = ❌✅❌`
- `g = ❌❌✅`

Interpret the table as follows:

- Item `a` belongs to all 3 groups.
- Item `b` belongs to groups 1 and 2 only.
- Item `c` belongs to groups 1 and 3 only.
- Item `d` belongs to group 1 only.
- Item `e` belongs to groups 2 and 3 only.
- Item `f` belongs to group 2 only.
- Item `g` belongs to group 3 only.

This means:

- No item appears in zero groups.
- No item may appear more than once within the same group.
- Across the whole puzzle, the overlap pattern must produce exactly the 7
  combinations above.

Construction checklist for every puzzle:

- Choose a clear title.
- Choose 3 group labels that are distinct, meaningful criteria.
  - Do not use the exact same 3 group labels as any existing puzzle.
  - Do not reuse group labels (including rewordings with the same meaning like
    "Won Oscar(s)" -> "Academy Award Winner") which:
    - appear in any puzzle from the last 5 weeks
    - appear in any of the prior 5 puzzles with the same name as this one
    - are among the top 50% most common for puzzles with this title
- Ensure each group list has 4 items.
  - Do not have the same Item `a` as any existing puzzle.
  - Prefer using new items to ones which have already been used.
  - Do not reuse items which:
    - appear in any puzzle from the last 5 weeks
    - appear in any of the prior 5 puzzles with the same name as this one
    - are among the top 50% most common for puzzles with this title
- Ensure the union of all listed items is exactly 7 unique items.
- Ensure the overlap pattern matches the 7-item truth table exactly.
- Write a 3-part hint that corresponds to the 3 group labels in order.

Future-proofing:

Every ❌ in the truth table is a claim that will stay false forever. A puzzle
breaks if an item later acquires a criterion it was excluded from, so pick
criteria and items whose non-membership is permanent.

- Prefer criteria that can never change: birthplace, birth decade/century,
  nationality, name/spelling, taxonomy, release or founding year, "appeared in
  <specific film>", "formed in <place>".
- Treat these as open-ended and therefore risky: awards not yet won, hall of
  fame membership, career milestones, "has directed a film", "voiced an animated
  character", "has a Hollywood Walk of Fame star", team played for, number of
  seasons, "hosted the Olympics" for a city that still bids.
- If a criterion is open-ended, every item outside that group must be one that
  realistically can never join it. Use retired or deceased people, defunct
  bands, and finished shows for the ❌ side. Do not exclude an active player
  from "Hall of Famer", an active actor from "Oscar Winner", or a running series
  from "Ran for 10+ Seasons" — an active career resolves the wrong way later. An
  active player is acceptable only when their career is mostly complete and they
  are clearly not on that trajectory.
- Broad criteria that most of a field will eventually satisfy (cameo-level
  credits, common awards, "has been on a streaming service") make weak groups
  even when currently accurate. Choose narrower, closed criteria instead.
- Prefer at most one open-ended criterion per puzzle; two or three multiply the
  ways the puzzle can rot.

Hint guidance:

- Write the hint as 3 short phrases separated by commas.
- Keep the hint aligned to the meaning of the 3 groups.
- Prefer concise category-style wording over full sentences.

When creating new puzzles, validate the membership pattern explicitly before
inserting the puzzle into `src/game/list.ts`.

Validate all facts using external sources to ensure puzzle accuracy.
