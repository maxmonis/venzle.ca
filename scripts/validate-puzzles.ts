import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { puzzles } from "../src/game/list.ts";

interface Candidate {
  creator?: string;
  groups: Record<string, Array<string>>;
  hint: string;
  title: string;
}

interface ValidationResult {
  errors: Array<string>;
  warnings: Array<string>;
}

let requiredSignatures = ["111", "110", "101", "100", "011", "010", "001"];

export function signatures(groups: Record<string, Array<string>>) {
  let labels = Object.keys(groups);
  let items = new Set(labels.flatMap((label) => groups[label]!));
  let byItem = new Map<string, string>();
  for (let item of items) {
    byItem.set(
      item,
      labels
        .map((label) => (groups[label]!.includes(item) ? "1" : "0"))
        .join(""),
    );
  }
  return byItem;
}

export function validate(puzzle: Candidate, label: string): ValidationResult {
  let errors: Array<string> = [];
  let warnings: Array<string> = [];
  let groupLabels = Object.keys(puzzle.groups);

  if (groupLabels.length !== 3) {
    errors.push(`expected 3 groups, got ${groupLabels.length}`);
  }

  for (let group of groupLabels) {
    let items = puzzle.groups[group]!;
    if (items.length !== 4) {
      errors.push(`group "${group}" has ${items.length} items, expected 4`);
    }
    let duplicates = items.filter((item, i) => items.indexOf(item) !== i);
    if (duplicates.length) {
      errors.push(
        `group "${group}" repeats: ${[...new Set(duplicates)].join(", ")}`,
      );
    }
  }

  if (errors.length) return { errors, warnings };

  let byItem = signatures(puzzle.groups);
  if (byItem.size !== 7) {
    errors.push(`expected 7 unique items, got ${byItem.size}`);
  }

  let seen = new Map<string, string>();
  for (let [item, signature] of byItem) {
    let taken = seen.get(signature);
    if (taken) {
      errors.push(
        `"${item}" and "${taken}" share membership pattern ${signature}`,
      );
    } else {
      seen.set(signature, item);
    }
  }
  for (let signature of requiredSignatures) {
    if (!seen.has(signature)) {
      errors.push(`no item with membership pattern ${signature}`);
    }
  }

  if (puzzle.hint.split(",").filter((part) => part.trim()).length !== 3) {
    warnings.push(
      `${label}: hint is not 3 comma-separated parts: "${puzzle.hint}"`,
    );
  }

  return { errors: errors.map((error) => `${label}: ${error}`), warnings };
}

export function collisions(
  candidates: Array<Candidate>,
  existing: Array<Candidate>,
) {
  let errors: Array<string> = [];
  let labelKey = (puzzle: Candidate) =>
    Object.keys(puzzle.groups)
      .map((label) => label.toLowerCase())
      .sort()
      .join(" | ");
  let centerItem = (puzzle: Candidate) => {
    for (let [item, signature] of signatures(puzzle.groups)) {
      if (signature === "111") return item.toLowerCase();
    }
    return null;
  };

  let seenLabels = new Map<string, string>();
  let seenCenters = new Map<string, string>();
  for (let puzzle of existing) {
    seenLabels.set(labelKey(puzzle), puzzle.title);
    let center = centerItem(puzzle);
    if (center) seenCenters.set(center, puzzle.title);
  }

  for (let [index, puzzle] of candidates.entries()) {
    let label = `${puzzle.title} (#${index})`;
    let takenLabels = seenLabels.get(labelKey(puzzle));
    if (takenLabels) {
      errors.push(`${label}: group labels already used by "${takenLabels}"`);
    }
    let center = centerItem(puzzle);
    let takenCenter = center && seenCenters.get(center);
    if (center && takenCenter) {
      errors.push(
        `${label}: center item "${center}" already used by "${takenCenter}"`,
      );
    }
    seenLabels.set(labelKey(puzzle), puzzle.title);
    if (center) seenCenters.set(center, puzzle.title);
  }

  return errors;
}

// Familiar recurring categories. Kept available but capped per block so blocks
// stay diverse instead of repeating the same handful of titles.
export let anchorTitles = new Set([
  "Actors",
  "Animals",
  "Albums",
  "Bands",
  "Baseball",
  "Basketball",
  "Football",
  "Movies",
  "Musicians",
  "Songs",
  "Sports",
  "TV Shows",
]);

// Maps a puzzle title to a broad subject domain, used to measure spread within
// a block. Titles absent here fall back to "Other" and are reported so the map
// can be extended.
export let titleDomains: Record<string, string> = {
  Actors: "Screen",
  Albums: "Music",
  Animals: "Nature",
  Artists: "Arts",
  Authors: "Arts",
  Bands: "Music",
  Baseball: "Sports",
  Basketball: "Sports",
  Battles: "History",
  Birds: "Nature",
  Books: "Arts",
  Bridges: "Geography",
  Cheeses: "Food",
  Cities: "Geography",
  Composers: "Music",
  Constellations: "Science",
  Countries: "Geography",
  Deserts: "Geography",
  Dinosaurs: "Nature",
  "Dog Breeds": "Nature",
  Entertainment: "Screen",
  Explorers: "History",
  Fish: "Nature",
  Football: "Sports",
  Fruits: "Nature",
  "Greek Mythology": "Culture",
  "Historical Events": "History",
  "Historical Figures": "History",
  Inventions: "Science",
  Islands: "Geography",
  Lakes: "Geography",
  Landmarks: "Geography",
  Mathematicians: "Science",
  Monarchs: "History",
  Mountains: "Geography",
  Movies: "Screen",
  Musicians: "Music",
  Olympians: "Sports",
  Olympics: "Sports",
  Painters: "Arts",
  Peaks: "Geography",
  Philosophers: "Science",
  Planets: "Geography",
  Plays: "Arts",
  Quarterbacks: "Sports",
  Reptiles: "Nature",
  Rivers: "Geography",
  Scientists: "Science",
  Soccer: "Sports",
  Songs: "Music",
  "Space Missions": "Science",
  Sports: "Sports",
  States: "Geography",
  "TV Shows": "Screen",
  Tennis: "Sports",
  Trees: "Nature",
  "US Presidents": "History",
  "Video Games": "Screen",
  Volcanoes: "Geography",
  "Wonders of the World": "Geography",
  "Works of Art": "Arts",
  "World Leaders": "History",
};

export let blockLimits = {
  anchorQuota: 14,
  maxPerDomain: 8,
  maxTitleRepeat: 2,
  minDomains: 6,
  minTitleGap: 10,
  size: 28,
};

// demo and week1..week62 predate the title-spacing rule, so only puzzles from
// block1 onward are checked. Earlier puzzles still count as previous occurrences.
export let firstBlockIndex = 435;

export function domainFor(title: string): string {
  return titleDomains[title] ?? "Other";
}

export function blockDiversity(
  candidates: Array<Candidate>,
  limits = blockLimits,
): ValidationResult {
  let errors: Array<string> = [];
  let warnings: Array<string> = [];

  if (candidates.length !== limits.size) {
    warnings.push(
      `block has ${candidates.length} puzzles, expected ${limits.size}`,
    );
  }

  let titleCounts = new Map<string, number>();
  let domainCounts = new Map<string, number>();
  let unmapped = new Set<string>();
  let anchorCount = 0;

  for (let puzzle of candidates) {
    titleCounts.set(puzzle.title, (titleCounts.get(puzzle.title) ?? 0) + 1);
    if (anchorTitles.has(puzzle.title)) anchorCount++;
    if (!(puzzle.title in titleDomains)) unmapped.add(puzzle.title);
    let domain = domainFor(puzzle.title);
    domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1);
  }

  for (let [title, count] of titleCounts) {
    if (count > limits.maxTitleRepeat) {
      errors.push(
        `title "${title}" used ${count} times, max ${limits.maxTitleRepeat} per block`,
      );
    }
  }

  if (anchorCount > limits.anchorQuota) {
    errors.push(
      `${anchorCount} anchor-category puzzles, max ${limits.anchorQuota} per block`,
    );
  }

  if (domainCounts.size < limits.minDomains) {
    warnings.push(
      `block spans ${domainCounts.size} domains, aim for at least ${limits.minDomains}`,
    );
  }

  for (let [domain, count] of domainCounts) {
    if (count > limits.maxPerDomain) {
      warnings.push(
        `domain "${domain}" has ${count} puzzles, aim for at most ${limits.maxPerDomain}`,
      );
    }
  }

  if (unmapped.size) {
    warnings.push(
      `untagged titles (add to titleDomains): ${[...unmapped].sort().join(", ")}`,
    );
  }

  return { errors, warnings };
}

// Puzzles release one per day, so index distance equals days apart.
export function titleSpacing(
  sequence: Array<Candidate>,
  from = firstBlockIndex,
  minGap = blockLimits.minTitleGap,
): Array<string> {
  let errors: Array<string> = [];
  let lastSeen = new Map<string, number>();

  for (let [index, { title }] of sequence.entries()) {
    let previous = lastSeen.get(title);
    if (index >= from && previous !== undefined && index - previous < minGap) {
      errors.push(
        `${title} (#${index}): ${index - previous} days after previous "${title}" (#${previous}), min ${minGap}`,
      );
    }
    lastSeen.set(title, index);
  }

  return errors;
}

export function validatePuzzles(
  candidates: Array<Candidate>,
  existing: Array<Candidate>,
  { collide }: { collide: boolean },
): ValidationResult {
  let warnings: Array<string> = [];
  let errors = candidates.flatMap((puzzle, index) => {
    let result = validate(puzzle, `${puzzle.title} (#${index})`);
    warnings.push(...result.warnings);
    return result.errors;
  });

  // Historical puzzles predate the reuse rules, so only check collisions for
  // candidates being validated before insertion (or when --strict is passed).
  if (!errors.length && collide) {
    errors = collisions(candidates, existing);
  }

  return { errors, warnings };
}

export function shouldRunFromCli(
  argv = process.argv,
  moduleUrl = import.meta.url,
): boolean {
  return argv[1] != undefined && fileURLToPath(moduleUrl) == resolve(argv[1]);
}

export async function runCli(
  argv = process.argv,
  moduleUrl = import.meta.url,
  {
    catalog = puzzles as Array<Candidate>,
    readFileFn = readFile,
    log = console.log,
    warn = console.warn,
    error = console.error,
    exit = process.exit,
  }: {
    catalog?: Array<Candidate>;
    readFileFn?: typeof readFile;
    log?: (message: string) => void;
    warn?: (message: string) => void;
    error?: (message: string) => void;
    exit?: (code: number) => never;
  } = {},
) {
  if (!shouldRunFromCli(argv, moduleUrl)) return;

  let args = argv.slice(2);
  let strict = args.includes("--strict");
  let block = args.includes("--block");
  let file = args.find((arg) => !arg.startsWith("--"));
  let candidates: Array<Candidate>;
  let existing: Array<Candidate>;

  if (file) {
    let parsed = JSON.parse(await readFileFn(resolve(file), "utf8"));
    candidates = Array.isArray(parsed) ? parsed : [parsed];
    existing = catalog;
  } else {
    candidates = catalog;
    existing = [];
  }

  let { errors, warnings } = validatePuzzles(candidates, existing, {
    collide: Boolean(file || strict),
  });

  if (block) {
    let diversity = blockDiversity(candidates);
    errors = [...errors, ...diversity.errors];
    warnings = [...warnings, ...diversity.warnings];
  }

  errors = [
    ...errors,
    ...(file
      ? titleSpacing([...catalog, ...candidates], catalog.length)
      : titleSpacing(catalog)),
  ];

  if (warnings.length) {
    warn(warnings.join("\n"));
  }

  if (errors.length) {
    error(errors.join("\n"));
    return exit(1);
  }

  log(`OK: ${candidates.length} puzzle(s) valid`);
}

await runCli();
