// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import {
  blockDiversity,
  collisions,
  domainFor,
  runCli,
  shouldRunFromCli,
  signatures,
  titleSpacing,
  validate,
  validatePuzzles,
} from "../../scripts/validate-puzzles";

interface Candidate {
  creator?: string;
  groups: Record<string, Array<string>>;
  hint: string;
  title: string;
}

// A well-formed puzzle: 3 groups of 4, 7 unique items covering every required
// membership pattern, with "center" in all three groups (signature "111").
function validPuzzle(overrides: Partial<Candidate> = {}): Candidate {
  return {
    groups: {
      A: ["center", "ab", "ac", "a"],
      B: ["center", "ab", "bc", "b"],
      C: ["center", "ac", "bc", "c"],
    },
    hint: "one, two, three",
    title: "Valid",
    ...overrides,
  };
}

describe("signatures", () => {
  it("maps each item to its membership pattern across groups", () => {
    let byItem = signatures(validPuzzle().groups);

    expect(byItem.size).toBe(7);
    expect(byItem.get("center")).toBe("111");
    expect(byItem.get("ab")).toBe("110");
    expect(byItem.get("ac")).toBe("101");
    expect(byItem.get("a")).toBe("100");
    expect(byItem.get("bc")).toBe("011");
    expect(byItem.get("b")).toBe("010");
    expect(byItem.get("c")).toBe("001");
  });
});

describe("validate", () => {
  it("returns no errors or warnings for a well-formed puzzle", () => {
    expect(validate(validPuzzle(), "Valid (#0)")).toEqual({
      errors: [],
      warnings: [],
    });
  });

  it("flags the wrong number of groups", () => {
    let puzzle = validPuzzle({ groups: { A: [], B: [] } });

    expect(validate(puzzle, "Two (#0)").errors).toContain(
      "expected 3 groups, got 2",
    );
  });

  it("flags groups without exactly four items", () => {
    let puzzle = validPuzzle();
    puzzle.groups.A = ["center", "ab", "ac"];

    expect(validate(puzzle, "Short (#0)").errors).toContain(
      'group "A" has 3 items, expected 4',
    );
  });

  it("flags repeated items within a group", () => {
    let puzzle = validPuzzle();
    puzzle.groups.A = ["center", "center", "ac", "a"];

    expect(validate(puzzle, "Dupe (#0)").errors).toContain(
      'group "A" repeats: center',
    );
  });

  it("stops after structural errors before pattern checks", () => {
    let puzzle = validPuzzle({ groups: { A: [], B: [], C: [] } });
    let { errors } = validate(puzzle, "Empty (#0)");

    expect(errors.some((error) => error.includes("has 0 items"))).toBe(true);
    expect(errors.some((error) => error.includes("membership pattern"))).toBe(
      false,
    );
  });

  it("flags the wrong number of unique items", () => {
    // Four items per group with no overlap, so there are 12 unique items.
    let puzzle = validPuzzle({
      groups: {
        A: ["a1", "a2", "a3", "a4"],
        B: ["b1", "b2", "b3", "b4"],
        C: ["c1", "c2", "c3", "c4"],
      },
    });
    let { errors } = validate(puzzle, "Twelve (#0)");

    expect(errors).toContain("Twelve (#0): expected 7 unique items, got 12");
  });

  it("flags two items that share a membership pattern", () => {
    // Every item belongs to exactly one group, so all four items in a group
    // share that group's pattern (e.g. "a1".."a4" are all "100").
    let puzzle = validPuzzle({
      groups: {
        A: ["a1", "a2", "a3", "a4"],
        B: ["b1", "b2", "b3", "b4"],
        C: ["c1", "c2", "c3", "c4"],
      },
    });
    let { errors } = validate(puzzle, "Share (#0)");

    expect(
      errors.some((error) => error.includes("share membership pattern")),
    ).toBe(true);
  });

  it("flags a missing required membership pattern", () => {
    let puzzle = validPuzzle();
    // Swap "b" and "c" for a second B-and-C item, so patterns "010" and "001"
    // disappear.
    puzzle.groups.B = ["center", "ab", "bc", "bc2"];
    puzzle.groups.C = ["center", "ac", "bc", "bc2"];
    let { errors } = validate(puzzle, "Missing (#0)");

    expect(
      errors.some((error) =>
        error.includes("no item with membership pattern 010"),
      ),
    ).toBe(true);
  });

  it("warns when the hint is not three comma-separated parts", () => {
    let { warnings } = validate(
      validPuzzle({ hint: "only one part" }),
      "Hint (#0)",
    );

    expect(warnings).toEqual([
      'Hint (#0): hint is not 3 comma-separated parts: "only one part"',
    ]);
  });
});

describe("collisions", () => {
  it("flags reused group labels and center items", () => {
    let existing = [validPuzzle({ title: "First" })];
    let candidate = validPuzzle({ title: "Second" });
    let errors = collisions([candidate], existing);

    expect(errors).toEqual([
      'Second (#0): group labels already used by "First"',
      'Second (#0): center item "center" already used by "First"',
    ]);
  });

  it("ignores puzzles without a center item", () => {
    // No item appears in all three groups, so centerItem() returns null.
    let noCenter = validPuzzle({
      groups: {
        A: ["a1", "a2", "ab", "ac"],
        B: ["b1", "b2", "ab", "bc"],
        C: ["c1", "c2", "ac", "bc"],
      },
      title: "Centerless",
    });
    let errors = collisions([noCenter], [noCenter]);

    // Labels still collide, but no center collision is reported.
    expect(errors).toEqual([
      'Centerless (#0): group labels already used by "Centerless"',
    ]);
  });

  it("returns no errors for distinct labels and centers", () => {
    let existing = [validPuzzle({ title: "First" })];
    let candidate = validPuzzle({
      groups: {
        D: ["core", "de", "df", "d"],
        E: ["core", "de", "ef", "e"],
        F: ["core", "df", "ef", "f"],
      },
      title: "Fresh",
    });

    expect(collisions([candidate], existing)).toEqual([]);
  });
});

describe("validatePuzzles", () => {
  it("collects errors and warnings across candidates", () => {
    let bad = validPuzzle({ groups: { A: [], B: [] }, hint: "x" });
    let { errors, warnings } = validatePuzzles([bad], [], { collide: false });

    expect(errors).toContain("expected 3 groups, got 2");
    // Structural failure returns early, so no hint warning is produced.
    expect(warnings).toEqual([]);
  });

  it("gathers warnings from otherwise valid candidates", () => {
    let { errors, warnings } = validatePuzzles(
      [validPuzzle({ hint: "nope" })],
      [],
      { collide: false },
    );

    expect(errors).toEqual([]);
    expect(warnings).toEqual([
      'Valid (#0): hint is not 3 comma-separated parts: "nope"',
    ]);
  });

  it("checks collisions only when structurally valid and asked to", () => {
    let puzzle = validPuzzle({ title: "Dup" });

    expect(
      validatePuzzles([puzzle], [puzzle], { collide: true }).errors.length,
    ).toBeGreaterThan(0);
    expect(validatePuzzles([puzzle], [puzzle], { collide: false })).toEqual({
      errors: [],
      warnings: [],
    });
  });

  it("skips collision checks when a candidate is invalid", () => {
    let broken = validPuzzle({ groups: { A: [], B: [] } });
    let { errors } = validatePuzzles([broken], [broken], { collide: true });

    expect(errors.every((error) => !error.includes("already used"))).toBe(true);
  });
});

describe("domainFor", () => {
  it("maps known titles and falls back to Other", () => {
    expect(domainFor("Animals")).toBe("Nature");
    expect(domainFor("Countries")).toBe("Geography");
    expect(domainFor("Nonexistent Title")).toBe("Other");
  });
});

describe("titleSpacing", () => {
  function titled(titles: Array<string>) {
    return titles.map((title) => validPuzzle({ title }));
  }

  it("flags a repeat closer than the minimum gap", () => {
    expect(titleSpacing(titled(["A", "B", "A"]), 0, 3)).toEqual([
      'A (#2): 2 days after previous "A" (#0), min 3',
    ]);
  });

  it("allows a repeat exactly at the minimum gap", () => {
    expect(titleSpacing(titled(["A", "B", "C", "A"]), 0, 3)).toEqual([]);
  });

  it("uses earlier puzzles as history without flagging them", () => {
    let sequence = titled(["A", "A", "B", "A"]);

    expect(titleSpacing(sequence, 2, 3)).toEqual([
      'A (#3): 2 days after previous "A" (#1), min 3',
    ]);
  });
});

describe("blockDiversity", () => {
  let smallLimits = {
    anchorQuota: 12,
    maxPerDomain: 6,
    maxTitleRepeat: 2,
    minDomains: 3,
    minTitleGap: 10,
    size: 6,
  };

  function block(titles: Array<string>) {
    return titles.map((title) => validPuzzle({ title }));
  }

  it("passes a well-spread block with no findings", () => {
    let clean = block([
      "Animals", // Nature (anchor)
      "Countries", // Geography
      "Songs", // Music (anchor)
      "Actors", // Screen (anchor)
      "Books", // Arts
      "Scientists", // Science
    ]);

    expect(blockDiversity(clean, smallLimits)).toEqual({
      errors: [],
      warnings: [],
    });
  });

  it("errors when a title exceeds the repeat cap", () => {
    let repeated = block([
      "Animals",
      "Animals",
      "Animals",
      "Songs",
      "Actors",
      "Books",
    ]);

    expect(blockDiversity(repeated, smallLimits).errors).toContain(
      'title "Animals" used 3 times, max 2 per block',
    );
  });

  it("errors when anchor categories exceed the quota", () => {
    let anchors = block([
      "Animals",
      "Songs",
      "Actors",
      "Books",
      "Scientists",
      "Countries",
    ]);

    expect(
      blockDiversity(anchors, { ...smallLimits, anchorQuota: 2 }).errors,
    ).toContain("3 anchor-category puzzles, max 2 per block");
  });

  it("warns about size, thin domain spread, crowding, and untagged titles", () => {
    let thin = block(["Widgets", "Gadgets", "Doohickeys", "Widgets"]);
    let { errors, warnings } = blockDiversity(thin, {
      ...smallLimits,
      maxPerDomain: 3,
      maxTitleRepeat: 10,
      minDomains: 6,
    });

    expect(errors).toEqual([]);
    expect(warnings).toContain("block has 4 puzzles, expected 6");
    expect(warnings).toContain("block spans 1 domains, aim for at least 6");
    expect(warnings).toContain(
      'domain "Other" has 4 puzzles, aim for at most 3',
    );
    expect(warnings).toContain(
      "untagged titles (add to titleDomains): Doohickeys, Gadgets, Widgets",
    );
  });
});

describe("shouldRunFromCli", () => {
  it("detects when the module is the CLI entrypoint", () => {
    expect(
      shouldRunFromCli(
        ["/usr/local/bin/node", "/tmp/validate-puzzles.ts"],
        "file:///tmp/validate-puzzles.ts",
      ),
    ).toBe(true);
    expect(
      shouldRunFromCli(
        ["/usr/local/bin/node", "/tmp/other.ts"],
        "file:///tmp/validate-puzzles.ts",
      ),
    ).toBe(false);
    expect(
      shouldRunFromCli(
        ["/usr/local/bin/node"],
        "file:///tmp/validate-puzzles.ts",
      ),
    ).toBe(false);
  });
});

describe("runCli", () => {
  let moduleUrl = "file:///tmp/validate-puzzles.ts";
  let entry = ["/usr/local/bin/node", "/tmp/validate-puzzles.ts"];

  function deps(overrides: Record<string, unknown> = {}) {
    return {
      catalog: [validPuzzle()],
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      exit: vi.fn() as never,
      readFileFn: vi.fn() as never,
      ...overrides,
    };
  }

  it("does nothing when not run as the entrypoint", async () => {
    let d = deps();
    await runCli([...entry.slice(0, 1), "/tmp/other.ts"], moduleUrl, d);

    expect(d.log).not.toHaveBeenCalled();
  });

  it("validates the catalog and reports success", async () => {
    let d = deps();
    await runCli(entry, moduleUrl, d);

    expect(d.log).toHaveBeenCalledWith("OK: 1 puzzle(s) valid");
    expect(d.exit).not.toHaveBeenCalled();
  });

  it("emits warnings and still succeeds", async () => {
    let d = deps({ catalog: [validPuzzle({ hint: "nope" })] });
    await runCli(entry, moduleUrl, d);

    expect(d.warn).toHaveBeenCalledOnce();
    expect(d.log).toHaveBeenCalledWith("OK: 1 puzzle(s) valid");
  });

  it("reports errors and exits non-zero", async () => {
    let d = deps({ catalog: [validPuzzle({ groups: { A: [], B: [] } })] });
    await runCli(entry, moduleUrl, d);

    expect(d.error).toHaveBeenCalledOnce();
    expect(d.exit).toHaveBeenCalledWith(1);
    expect(d.log).not.toHaveBeenCalled();
  });

  it("validates an array of candidates from a file against the catalog", async () => {
    let d = deps({
      catalog: [],
      readFileFn: vi.fn().mockResolvedValue(JSON.stringify([validPuzzle()])),
    });
    await runCli([...entry, "candidates.json"], moduleUrl, d);

    expect(d.readFileFn).toHaveBeenCalledOnce();
    expect(d.log).toHaveBeenCalledWith("OK: 1 puzzle(s) valid");
  });

  it("wraps a single candidate object from a file", async () => {
    let d = deps({
      catalog: [],
      readFileFn: vi.fn().mockResolvedValue(JSON.stringify(validPuzzle())),
    });
    await runCli([...entry, "candidate.json"], moduleUrl, d);

    expect(d.log).toHaveBeenCalledWith("OK: 1 puzzle(s) valid");
  });

  it("runs block-diversity checks under --block", async () => {
    // A single-puzzle file trips the block-size and domain-spread warnings,
    // proving the --block path ran without any structural error.
    let d = deps({
      catalog: [],
      readFileFn: vi.fn().mockResolvedValue(JSON.stringify(validPuzzle())),
    });
    await runCli([...entry, "block.json", "--block"], moduleUrl, d);

    expect(d.warn).toHaveBeenCalledOnce();
    expect(d.log).toHaveBeenCalledWith("OK: 1 puzzle(s) valid");
  });

  it("checks title spacing against the end of the catalog", async () => {
    let d = deps({
      catalog: [validPuzzle({ title: "Dup" })],
      readFileFn: vi
        .fn()
        .mockResolvedValue(JSON.stringify(validPuzzle({ title: "Dup" }))),
    });
    await runCli([...entry, "candidate.json"], moduleUrl, d);

    expect(d.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Dup (#1): 1 days after previous "Dup" (#0), min 10',
      ),
    );
    expect(d.exit).toHaveBeenCalledWith(1);
  });

  it("runs collision checks under --strict without a file", async () => {
    let puzzle = validPuzzle({ title: "Dup" });
    let d = deps({ catalog: [puzzle, puzzle] });
    await runCli([...entry, "--strict"], moduleUrl, d);

    expect(d.error).toHaveBeenCalledOnce();
    expect(d.exit).toHaveBeenCalledWith(1);
  });
});
