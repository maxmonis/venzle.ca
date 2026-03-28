import type { Game } from "lib/types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { puzzles } from "../.puzzles/list";

let cleanup: undefined | (() => void);

function setupDom() {
  document.body.innerHTML = "<main></main>";
  document.documentElement.style.fontSize = "16px";
}

function computeSolution(
  groups: Record<string, [string, string, string, string]>,
) {
  let values = Object.values(groups);
  let [aVals, bVals, cVals] = values;
  let center = values
    .flatMap((value) => value)
    .find((value) => values.every((group) => group.includes(value)))!;

  return {
    a: aVals!.find((p) => !bVals!.includes(p) && !cVals!.includes(p))!,
    ab: aVals!.find((p) => bVals!.includes(p) && !cVals!.includes(p))!,
    abc: center,
    ac: aVals!.find((p) => !bVals!.includes(p) && cVals!.includes(p))!,
    b: bVals!.find((p) => !aVals!.includes(p) && !cVals!.includes(p))!,
    bc: bVals!.find((p) => aVals!.includes(p) && cVals!.includes(p))!,
    c: cVals!.find((p) => !aVals!.includes(p) && !bVals!.includes(p))!,
  };
}

function seedGame(
  index: number,
  overrides: Partial<ReturnType<typeof baseGame>>,
) {
  let game = { ...baseGame(index), ...overrides };
  localStorage.setItem("games", JSON.stringify([game]));
}

function baseGame(index: number): Game {
  let entry = puzzles[index]!;
  return {
    creator: entry.creator ?? "Max Monis",
    currentGuess: {
      a: "",
      ab: "",
      abc: "",
      ac: "",
      b: "",
      bc: "",
      c: "",
    },
    groups: entry.groups,
    guesses: [],
    hint: entry.hint,
    hintsUsed: { a: false, b: false, c: false },
    index,
    status: "pending",
    title: entry.title,
  };
}

function fillDropzones(values: Record<string, string>) {
  for (let [key, value] of Object.entries(values)) {
    let dropzone = document.querySelector<HTMLElement>(`#dropzone-${key}`);
    if (!dropzone) {
      continue;
    }

    dropzone.setAttribute("data-dnd-value", value);
    dropzone.textContent = value;
  }
}

async function mountHomePage() {
  let { mountHomePage } = await import("home/app");
  cleanup = mountHomePage(document.querySelector("main")!);
}

describe("root/app", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    sessionStorage.clear();
    setupDom();
    Object.defineProperty(window, "gtag", {
      value: vi.fn(),
      writable: true,
    });
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 23)));
  });

  afterEach(() => {
    cleanup?.();
    cleanup = undefined;
  });

  it("shows welcome dialog and handles update/reset", async () => {
    await mountHomePage();

    let dialog = document.querySelector("dialog")!;
    expect(dialog).toBeTruthy();

    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    dialog.querySelector("button")?.dispatchEvent(new Event("click"));

    let { gameEvent } = await import("lib/utils");

    let solution = computeSolution(puzzles[0]!.groups);
    fillDropzones(solution);
    gameEvent.post("update");

    let dropzone = document.querySelector<HTMLElement>("#dropzone-a");
    dropzone?.removeAttribute("data-dnd-value");
    if (dropzone) {
      dropzone.textContent = "";
    }

    gameEvent.post("reset");
    gameEvent.post("save");

    expect(JSON.parse(localStorage.getItem("games") || "[]").length).toBe(1);
  });

  it("skips welcome dialog on repeat visit", async () => {
    localStorage.setItem("load", JSON.stringify(Date.now()));

    await mountHomePage();

    expect(document.querySelector("dialog")).toBeNull();
  });

  it("shows yellow circle feedback", async () => {
    let solution = computeSolution(puzzles[0]!.groups);

    seedGame(0, {
      currentGuess: {
        a: solution.a,
        ab: solution.ab,
        abc: solution.abc,
        ac: solution.ac,
        b: "x",
        bc: "y",
        c: "z",
      },
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("🟡 yellow circle");
  });

  it("shows blue circle feedback", async () => {
    let solution = computeSolution(puzzles[0]!.groups);

    seedGame(0, {
      currentGuess: {
        a: "x",
        ab: solution.ab,
        abc: solution.abc,
        ac: "y",
        b: solution.b,
        bc: solution.bc,
        c: "z",
      },
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("🔵 blue circle");
  });

  it("shows red circle feedback", async () => {
    let solution = computeSolution(puzzles[0]!.groups);

    seedGame(0, {
      currentGuess: {
        a: "x",
        ab: "y",
        abc: solution.abc,
        ac: solution.ac,
        b: "z",
        bc: solution.bc,
        c: solution.c,
      },
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("🔴 red circle");
  });

  it("shows center-only feedback", async () => {
    let solution = computeSolution(puzzles[0]!.groups);

    seedGame(0, {
      currentGuess: {
        a: "x",
        ab: "y",
        abc: solution.abc,
        ac: "z",
        b: "m",
        bc: "n",
        c: "o",
      },
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("The center");
  });

  it("shows incorrect feedback with no center", async () => {
    seedGame(0, {
      currentGuess: {
        a: "x",
        ab: "y",
        abc: "wrong",
        ac: "z",
        b: "m",
        bc: "n",
        c: "o",
      },
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("That's not the answer");
  });

  it("submits a correct guess and marks solved", async () => {
    localStorage.setItem("audio", "true");
    let solution = computeSolution(puzzles[0]!.groups);

    seedGame(0, {
      currentGuess: solution,
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");

    gameEvent.post("submit");
    let stored = JSON.parse(localStorage.getItem("games") || "[]")[0];
    expect(stored.status).toBe("solved");

    vi.runAllTimers();
  });

  it("shows singular remaining guess text", async () => {
    seedGame(0, {
      currentGuess: {
        a: "x",
        ab: "y",
        abc: "wrong",
        ac: "z",
        b: "m",
        bc: "n",
        c: "o",
      },
      guesses: Array.from({ length: 3 }, (_, i) => {
        return {
          a: `g${i}`,
          ab: "y",
          abc: "z",
          ac: "w",
          b: "m",
          bc: "n",
          c: "o",
        };
      }),
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("1 guess remaining");
  });

  it("fails a puzzle on final guess", async () => {
    let game = baseGame(0);
    game.currentGuess = {
      a: "x",
      ab: "y",
      abc: "wrong",
      ac: "z",
      b: "m",
      bc: "n",
      c: "o",
    };
    game.guesses = Array.from({ length: 4 }, (_, i) => {
      return {
        ...game.currentGuess,
        a: `x${i}`,
      };
    });
    localStorage.setItem("games", JSON.stringify([game]));

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");

    document.querySelector("#dropzone-abc")?.remove();
    gameEvent.post("submit");

    expect(window.gtag).toHaveBeenCalledWith("event", "puzzle_fail");
    expect(window.gtag).toHaveBeenCalledWith("event", "daily_puzzle_fail");
  });

  it("blocks duplicate guesses", async () => {
    let solution = computeSolution(puzzles[0]!.groups);
    seedGame(0, {
      currentGuess: { ...solution },
      guesses: [{ ...solution }],
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    fillDropzones(solution);
    gameEvent.post("update");
    gameEvent.post("submit");

    expect(toast.show).toHaveBeenCalled();
  });

  it("handles practice puzzle selection and broadcasts", async () => {
    sessionStorage.setItem("index", "1");

    await mountHomePage();

    let stored = JSON.parse(localStorage.getItem("games") || "[]")[0];
    let channel = new BroadcastChannel("game");
    channel.postMessage(stored);
    channel.postMessage({ ...stored, index: stored.index + 1 });

    let { gameEvent } = await import("lib/utils");
    gameEvent.post(9999);

    expect(document.querySelector(".home-button")).toBeTruthy();
  });

  it("renders solved and failed games from storage", async () => {
    let solution = computeSolution(puzzles[0]!.groups);
    seedGame(0, {
      currentGuess: solution,
      guesses: [{ ...solution }],
      hintsUsed: { a: true, b: false, c: false },
      status: "solved",
    });

    await mountHomePage();
    expect(document.querySelector(".game-summary")).toBeTruthy();

    cleanup?.();
    cleanup = undefined;
    setupDom();
    localStorage.clear();

    let failedGame = baseGame(0);
    failedGame.status = "failed";
    failedGame.guesses = new Array(5).fill({
      ...failedGame.currentGuess,
    });
    localStorage.setItem("games", JSON.stringify([failedGame]));

    await mountHomePage();
    expect(document.querySelector(".game-summary")?.textContent).toContain(
      "out of guesses",
    );
  });

  it("renders plural solved summary text from storage", async () => {
    let solution = computeSolution(puzzles[0]!.groups);
    seedGame(0, {
      currentGuess: solution,
      guesses: [{ ...solution }, { ...solution }],
      hintsUsed: { a: true, b: true, c: false },
      status: "solved",
    });

    await mountHomePage();
    expect(document.querySelector(".game-summary")?.textContent).toContain(
      "You used 2 hints and 2 guesses",
    );
  });

  it("covers non-daily solved and failed branches from storage", async () => {
    sessionStorage.setItem("index", "1");

    let solution = computeSolution(puzzles[1]!.groups);
    seedGame(1, {
      currentGuess: solution,
    });

    await mountHomePage();
    let { gameEvent } = await import("lib/utils");
    gameEvent.post("submit");

    expect(window.gtag).toHaveBeenCalledWith("event", "puzzle_solve");
    expect(window.gtag).not.toHaveBeenCalledWith("event", "daily_puzzle_solve");
    expect(document.querySelector("audio")).toBeNull();

    cleanup?.();
    cleanup = undefined;
    setupDom();
    localStorage.clear();
    sessionStorage.setItem("index", "1");

    let failedGame = baseGame(1);
    failedGame.currentGuess = {
      a: "x",
      ab: "y",
      abc: "wrong",
      ac: "z",
      b: "m",
      bc: "n",
      c: "o",
    };
    failedGame.guesses = Array.from({ length: 4 }, (_, i) => {
      return {
        ...failedGame.currentGuess,
        a: `x${i}`,
      };
    });
    localStorage.setItem("games", JSON.stringify([failedGame]));

    await mountHomePage();
    let utils = await import("lib/utils");
    utils.gameEvent.post("submit");

    expect(window.gtag).toHaveBeenCalledWith("event", "puzzle_fail");
    expect(window.gtag).not.toHaveBeenCalledWith("event", "daily_puzzle_fail");
  });

  it("covers passive dialog and puzzle state update branches", async () => {
    let game = baseGame(0);
    game.status = "solved";
    game.currentGuess = {
      a: "wrong-a",
      ab: "",
      abc: "",
      ac: "",
      b: "",
      bc: "",
      c: "",
    };
    game.guesses = [{ ...game.currentGuess }];
    localStorage.setItem("games", JSON.stringify([game]));

    await mountHomePage();

    let dialog = document.querySelector("dialog");
    dialog?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    let bogusDropzone = document.createElement("div");
    bogusDropzone.id = "dropzone-missing";
    bogusDropzone.className = "dropzone";
    bogusDropzone.setAttribute("data-dnd-value", "bogus");
    document.querySelector("main")?.append(bogusDropzone);

    let { gameEvent } = await import("lib/utils");
    gameEvent.post("update");
    gameEvent.post("save");

    let resetButton = document.querySelector(".reset-button");
    expect(resetButton).toBeTruthy();

    gameEvent.post("update");
    expect(document.querySelector(".reset-button")).toBe(resetButton);
  });
});
