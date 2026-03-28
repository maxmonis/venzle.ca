// @vitest-environment node

import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  buildGeneratedOutputs,
  extractPuzzleArrays,
  generatePuzzleFiles,
  resolvePuzzlePaths,
  runCli,
  shouldRunFromCli,
} from "../../build";

let tempDirs: Array<string> = [];

afterEach(async () => {
  await Promise.all(
    tempDirs.map((dir) => rm(dir, { force: true, recursive: true })),
  );
  tempDirs = [];
});

describe("generate", () => {
  it("extracts demo and week arrays from the source file", () => {
    let arrays = extractPuzzleArrays(`
      let demo = [{ title: "Demo Puzzle", hint: "", groups: {} }];
      let week1: Week = [{ title: "Actors", hint: "", groups: {} }];
    `);

    expect(arrays.map((entry) => entry.name)).toEqual(["demo", "week1"]);
    expect(arrays.flatMap((entry) => entry.puzzles)).toHaveLength(2);
  });

  it("ignores non-puzzle arrays in the source file", () => {
    let arrays = extractPuzzleArrays(`
      let metadata = [{ title: "Ignored" }];
      let demo = [{ title: "Demo Puzzle", hint: "", groups: {} }];
      let week12 = [{ title: "Animals", hint: "", groups: {} }];
    `);

    expect(arrays.map((entry) => entry.name)).toEqual(["demo", "week12"]);
  });

  it("builds chunked output modules", () => {
    let outputs = buildGeneratedOutputs(
      Array.from({ length: 205 }, (_, index) => ({
        groups: {},
        hint: `Hint ${index}`,
        title: `Puzzle ${index}`,
      })),
      {
        chunkDirectoryImport: "./",
        typeImport: "../../lib/types",
      },
    );

    expect(outputs.chunks.map((chunk) => chunk.filename)).toEqual([
      "list.chunk0.ts",
      "list.chunk1.ts",
      "list.chunk2.ts",
      "list.chunk3.ts",
    ]);
    expect(outputs.chunks[0]?.source).toContain(
      "// Edit src/game/list.ts instead.",
    );
    expect(outputs.meta).toContain("export let puzzleCount = 205;");
    expect(outputs.meta).toContain("export let puzzleChunkCount = 4;");
    expect(outputs.meta).toContain("export let puzzleChunkSize = 52;");
    expect(outputs.list).toContain(
      'import { puzzleChunk3 } from "./list.chunk3";',
    );
    expect(outputs.list).toContain("export let puzzles: Array<Puzzle<string>>");
  });

  it("normalizes trailing slashes in chunk imports", () => {
    let normalizedOutputs = buildGeneratedOutputs(
      [{ groups: {}, hint: "Hint 0", title: "Puzzle 0" }],
      {
        chunkDirectoryImport: "./nested/",
        typeImport: "../../lib/types",
      },
    );

    expect(normalizedOutputs.list).toContain(
      'import { puzzleChunk0 } from "./nested/list.chunk0";',
    );
    expect(normalizedOutputs.list).not.toContain("./nested//list.chunk0");

    let untouchedOutputs = buildGeneratedOutputs(
      [{ groups: {}, hint: "Hint 0", title: "Puzzle 0" }],
      {
        chunkDirectoryImport: "./nested",
        typeImport: "../../lib/types",
      },
    );

    expect(untouchedOutputs.list).toContain(
      'import { puzzleChunk0 } from "./nested/list.chunk0";',
    );
  });

  it("writes generated files from src/game/list.ts to src/.puzzles", async () => {
    let rootDir = await mkdtemp(join(tmpdir(), "venzle-games-"));
    tempDirs.push(rootDir);

    let sourceDir = join(rootDir, "src/game");
    let sourcePath = join(sourceDir, "list.ts");
    let outputDir = join(rootDir, "src/.puzzles");

    await mkdir(sourceDir, { recursive: true });

    await writeFile(
      sourcePath,
      `
        let demo = [
          { title: "Demo Puzzle", hint: "a,b,c", groups: { A: ["1","2","3","4"] } }
        ];
        let week1 = [
          { title: "Actors", hint: "d,e,f", groups: { B: ["1","2","3","4"] } }
        ];
      `,
    );

    await generatePuzzleFiles({
      outputDir,
      rootDir,
      sourcePath,
    });

    let list = await readFile(join(outputDir, "list.ts"), "utf8");
    let meta = await readFile(join(outputDir, "list.meta.ts"), "utf8");
    let chunk0 = await readFile(join(outputDir, "list.chunk0.ts"), "utf8");
    let chunk1 = await readFile(join(outputDir, "list.chunk1.ts"), "utf8");

    expect(list).toContain('import { puzzleChunk0 } from "./list.chunk0";');
    expect(list).toContain("export let puzzles: Array<Puzzle<string>> = [");
    expect(meta).toContain("export let puzzleCount = 2;");
    expect(meta).toContain("// Edit src/game/list.ts instead.");
    expect(chunk0).toContain('"title": "Demo Puzzle"');
    expect(chunk1).toContain('"title": "Actors"');
  });

  it("throws when no puzzle arrays are found", async () => {
    let rootDir = await mkdtemp(join(tmpdir(), "venzle-games-"));
    tempDirs.push(rootDir);

    let sourceDir = join(rootDir, "src/game");
    let sourcePath = join(sourceDir, "list.ts");

    await mkdir(sourceDir, { recursive: true });
    await writeFile(sourcePath, `let metadata = [];`);

    await expect(
      generatePuzzleFiles({
        rootDir,
        sourcePath,
      }),
    ).rejects.toThrow(`No puzzle arrays found in ${sourcePath}`);
  });

  it("detects when the module is running as the CLI entrypoint", () => {
    expect(
      shouldRunFromCli(
        ["/usr/local/bin/node", "/tmp/build.ts"],
        "file:///tmp/build.ts",
      ),
    ).toBe(true);
    expect(
      shouldRunFromCli(
        ["/usr/local/bin/node", "/tmp/other.ts"],
        "file:///tmp/build.ts",
      ),
    ).toBe(false);
    expect(
      shouldRunFromCli(["/usr/local/bin/node"], "file:///tmp/build.ts"),
    ).toBe(false);
  });

  it("resolves default and overridden puzzle paths", () => {
    expect(
      resolvePuzzlePaths(undefined, "file:///tmp/project/build.ts"),
    ).toEqual({
      outputDir: "/tmp/project/src/.puzzles",
      rootDir: "/tmp/project",
      sourcePath: "/tmp/project/src/game/list.ts",
    });

    expect(
      resolvePuzzlePaths(
        {
          outputDir: "/tmp/out",
          rootDir: "/tmp/root",
          sourcePath: "/tmp/source.ts",
        },
        "file:///tmp/project/build.ts",
      ),
    ).toEqual({
      outputDir: "/tmp/out",
      rootDir: "/tmp/root",
      sourcePath: "/tmp/source.ts",
    });
  });

  it("runs the generator from the CLI entrypoint", async () => {
    let rootDir = await mkdtemp(join(tmpdir(), "venzle-games-"));
    tempDirs.push(rootDir);

    let sourceDir = join(rootDir, "src/game");
    let sourcePath = join(sourceDir, "list.ts");
    let outputDir = join(rootDir, "src/.puzzles");
    let cliPath = join(rootDir, "build.ts");

    await mkdir(sourceDir, { recursive: true });
    await writeFile(
      sourcePath,
      `
        let demo = [
          { title: "Demo Puzzle", hint: "a,b,c", groups: { A: ["1","2","3","4"] } }
        ];
      `,
    );

    await runCli(["/usr/local/bin/node", cliPath], `file://${cliPath}`);

    let chunk0 = await readFile(join(outputDir, "list.chunk0.ts"), "utf8");
    expect(chunk0).toContain('"title": "Demo Puzzle"');
  });
});
