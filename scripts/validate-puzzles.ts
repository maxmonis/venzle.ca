import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { puzzles } from "../src/game/list.ts";

interface Candidate {
  creator?: string;
  groups: Record<string, Array<string>>;
  hint: string;
  title: string;
}

let requiredSignatures = ["111", "110", "101", "100", "011", "010", "001"];
let warnings: Array<string> = [];

function signatures(groups: Record<string, Array<string>>) {
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

function validate(puzzle: Candidate, label: string) {
  let errors: Array<string> = [];
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

  if (errors.length) return errors;

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

  return errors.map((error) => `${label}: ${error}`);
}

function collisions(candidates: Array<Candidate>, existing: Array<Candidate>) {
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

let args = process.argv.slice(2);
let strict = args.includes("--strict");
let file = args.find((arg) => !arg.startsWith("--"));
let candidates: Array<Candidate>;
let existing: Array<Candidate>;

if (file) {
  let parsed = JSON.parse(await readFile(resolve(file), "utf8"));
  candidates = Array.isArray(parsed) ? parsed : [parsed];
  existing = puzzles;
} else {
  candidates = puzzles;
  existing = [];
}

let errors = candidates.flatMap((puzzle, index) =>
  validate(puzzle, `${puzzle.title} (#${index})`),
);

// Historical puzzles predate the reuse rules, so only check collisions for
// candidates being validated before insertion (or when --strict is passed).
if (!errors.length && (file || strict)) {
  errors = collisions(candidates, existing);
}

if (warnings.length) {
  console.warn(warnings.join("\n"));
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OK: ${candidates.length} puzzle(s) valid`);
