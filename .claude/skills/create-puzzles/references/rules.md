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
  - If a label for the same concept already exists anywhere in the catalog, use
    that exact string. Never reword it: "Won a Nobel Prize" must be "Nobel Prize
    Winner", "From the United Kingdom" must be "British". Prefer the most common
    spelling, and prefer one from the same title over another title. For a new
    value of an existing pattern, follow the pattern: "Touches the Atlantic
    Ocean" gives "Touches the Indian Ocean". A new string is only for a new
    concept.
  - Do not reuse group labels which:
    - appear in any of the most recent 28 puzzles (the previous block)
    - appear in any of the prior 5 puzzles with the same title as this one
    - are among the top 50% most common for puzzles with this title
  - When a concept is unavailable under these limits, choose a different
    concept. Rewording it does not make it available.
- Ensure each group list has 4 items.
  - Do not have the same Item `a` as any existing puzzle.
  - Prefer using new items to ones which have already been used.
  - Do not reuse items which:
    - appear in any of the most recent 28 puzzles (the previous block)
    - appear in any of the prior 5 puzzles with the same title as this one
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

Block diversity (a block is 28 puzzles):

Puzzles are authored in blocks of 28. A block has no fixed category slots; every
puzzle's title is chosen freely, subject to these limits (enforced by
`scripts/validate-puzzles.ts` with `--block`):

- No single title may appear more than 2 times in a block.
- Puzzles with the same title must be at least 10 days apart, including across
  block boundaries. One puzzle releases per day, so positions 10 apart qualify.
- At most 14 of the 28 puzzles may use the familiar anchor categories: Actors,
  Animals, Albums, Bands, Baseball, Basketball, Football, Movies, Musicians,
  Songs, Sports, TV Shows. The remaining 14+ must explore other subjects.
- The block should span at least 6 subject domains (Nature, Geography, Sports,
  Music, Screen, History, Science, Arts, ...), with no domain exceeding 8 of the
  28 puzzles. Title-to-domain tags live in `titleDomains` in the validator; add
  new titles there when the validator warns they are untagged.
- Favor fresh, specific subjects (Rivers, Philosophers, Video Games, Bridges,
  Volcanoes, Constellations, ...) over the same handful of recurring titles.

Hint guidance:

- Write the hint as 3 short phrases separated by commas.
- Keep the hint aligned to the meaning of the 3 groups.
- Prefer concise category-style wording over full sentences.
- Name the kind of criterion, not its value, so the hint narrows without giving
  the answer away: "Nationality" not "Britain", "Decade" not "Seventies",
  "Century" not "Victorian", "Continent" not "Americas", "Team" not "Lakers",
  "Genre" not "Sci-Fi", "Director" not "Spielberg", "Company" not "Nintendo",
  "Network" not "Fox". Other good words: Position, Era, Ocean, Sea, Size,
  Discipline, Prize, Purpose, Temperature, Artist.
- Yes/no traits may keep a direct word when no broader category fits: "Debut",
  "Opera", "Animated", "Edible", "Clay", "Grass", "Track", "Wings".
- For a group that would otherwise need a specific name, use an oblique pointer
  instead of the label's own subject: "Rowling" for Harry Potter, "Lucas" for
  Star Wars, "VPOTUS" for "Former Vice President".
- The same generic word may repeat across puzzles in a block.

When creating new puzzles, validate the membership pattern explicitly before
inserting the puzzle into `src/game/list.ts`.

Validate all facts using external sources to ensure puzzle accuracy.
