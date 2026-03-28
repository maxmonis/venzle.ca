import { gameList } from "game/list";
import type { Game } from "lib/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

let trackedListeners: Array<{
  type: string;
  listener: EventListenerOrEventListenerObject;
}> = [];

let originalAddEventListener = document.addEventListener.bind(document);
let originalRemoveEventListener = document.removeEventListener.bind(document);

document.addEventListener = ((
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  trackedListeners.push({
    listener,
    type,
  });
  return originalAddEventListener(type, listener, options);
}) as typeof document.addEventListener;

function clearTrackedListeners() {
  for (let { type, listener } of trackedListeners) {
    originalRemoveEventListener(type, listener);
  }
  trackedListeners = [];
}

function setupDom() {
  document.body.innerHTML = `
    <div class="site-logo"></div>
    <div class="copyright-year">2025</div>
    <footer></footer>
    <header></header>
    <main>
      <div class="circle-container"></div>
      <div class="game-controls"></div>
    </main>
  `;
  document.documentElement.style.fontSize = "16px";
}

function setLocation(pathname = "/") {
  Object.assign(window.location, {
    origin: "http://localhost",
    pathname,
    reload: vi.fn(),
    replace: vi.fn(),
  });
}

function computeSolution(
  groups: Record<string, [string, string, string, string]>,
) {
  let values = Object.values(groups);
  let [aVals, bVals, cVals] = values;
  let center = values
    .flatMap((v) => v)
    .find((value) => values.every((v) => v.includes(value)))!;

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
  let entry = gameList[index]!;
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
    if (!dropzone) continue;
    dropzone.setAttribute("data-dnd-value", value);
    dropzone.textContent = value;
  }
}

describe("root/app", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    sessionStorage.clear();
    clearTrackedListeners();
    setupDom();
    setLocation("/");
    Object.defineProperty(window, "gtag", {
      value: vi.fn(),
      writable: true,
    });
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 23)));
  });

  it("shows welcome dialog and handles update/reset", async () => {
    await import("root/app");

    let dialog = document.querySelector("dialog")!;
    expect(dialog).toBeTruthy();

    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    let skip = dialog.querySelector("button")!;
    skip.dispatchEvent(new Event("click"));

    let { gameEvent } = await import("lib/utils");

    let extraDropzone = document.createElement("div");
    extraDropzone.id = "dropzone-extra";
    extraDropzone.classList.add("dropzone");
    document.querySelector(".circle-container")?.append(extraDropzone);

    // partial update
    let solution = computeSolution(gameList[0]!.groups);
    fillDropzones({ a: solution.a });
    gameEvent.post("update");

    // full update
    fillDropzones(solution);
    gameEvent.post("update");

    // make one dropzone empty to cover clearPuzzle continue path
    let dz = document.querySelector<HTMLElement>("#dropzone-a");
    dz?.removeAttribute("data-dnd-value");
    dz!.textContent = "";

    gameEvent.post("reset");
    gameEvent.post("save");
  });

  it("skips welcome dialog on repeat visit", async () => {
    localStorage.setItem("load", JSON.stringify(Date.now()));

    await import("root/app");

    expect(document.querySelector("dialog")).toBeNull();
  });

  it("handles missing games storage", async () => {
    let originalGetItem = Storage.prototype.getItem;
    let getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(function (this: Storage, key: string) {
        if (key == "games") {
          return null;
        }
        return originalGetItem.call(this, key);
      });

    await import("root/app");

    getItemSpy.mockRestore();
  });

  it("shows yellow circle feedback", async () => {
    let solution = computeSolution(gameList[0]!.groups);

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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    expect(toast.show).toHaveBeenCalled();
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("🟡 yellow circle");
  });

  it("shows blue circle feedback", async () => {
    let solution = computeSolution(gameList[0]!.groups);

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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    expect(toast.show).toHaveBeenCalled();
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("🔵 blue circle");
  });

  it("shows red circle feedback", async () => {
    let solution = computeSolution(gameList[0]!.groups);

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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    expect(toast.show).toHaveBeenCalled();
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("🔴 red circle");
  });

  it("shows center-only feedback", async () => {
    let solution = computeSolution(gameList[0]!.groups);

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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    expect(toast.show).toHaveBeenCalled();
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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    gameEvent.post("submit");
    expect(toast.show).toHaveBeenCalled();
    let lastCall = (
      toast.show as unknown as { mock: { calls: Array<Array<unknown>> } }
    ).mock.calls.at(-1);
    expect(String(lastCall?.[0] ?? "")).toContain("That's not the answer");
  });

  it("submits a correct guess and marks solved", async () => {
    localStorage.setItem("audio", "true");
    let solution = computeSolution(gameList[0]!.groups);

    seedGame(0, {
      currentGuess: solution,
    });

    await import("root/app");
    let { gameEvent } = await import("lib/utils");

    let extraDropzone = document.createElement("div");
    extraDropzone.className = "dropzone";
    extraDropzone.setAttribute("data-dnd-value", "extra");
    document.querySelector(".circle-container")?.append(extraDropzone);

    gameEvent.post("submit");
    let stored = JSON.parse(localStorage.getItem("games") || "[]")[0];
    expect(stored.status).toBe("solved");

    vi.runAllTimers();
  });

  it("submits a correct practice guess without daily event", async () => {
    sessionStorage.setItem("index", "1");
    let solution = computeSolution(gameList[1]!.groups);

    seedGame(1, {
      currentGuess: solution,
    });

    await import("root/app");
    let { gameEvent } = await import("lib/utils");

    gameEvent.post("submit");

    expect(window.gtag).toHaveBeenCalledWith("event", "puzzle_solve");
  });

  it("submits a correct guess with a hint used", async () => {
    let solution = computeSolution(gameList[0]!.groups);
    seedGame(0, {
      currentGuess: solution,
      hintsUsed: { a: true, b: false, c: false },
    });

    await import("root/app");
    let { gameEvent } = await import("lib/utils");

    gameEvent.post("submit");
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

    await import("root/app");
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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");

    // remove a dropzone to cover missing element branch
    document.querySelector("#dropzone-abc")?.remove();

    gameEvent.post("submit");
    expect(window.gtag).toHaveBeenCalledWith("event", "puzzle_fail");
    expect(window.gtag).toHaveBeenCalledWith("event", "daily_puzzle_fail");
  });

  it("fails a practice puzzle without daily event", async () => {
    sessionStorage.setItem("index", "1");
    let game = baseGame(1);
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

    await import("root/app");
    let { gameEvent } = await import("lib/utils");

    gameEvent.post("submit");
    expect(window.gtag).toHaveBeenCalledWith("event", "puzzle_fail");
  });

  it("renders a non-pending game without click feedback", async () => {
    seedGame(0, {
      status: "solved",
      currentGuess: {
        a: "x",
        ab: "y",
        abc: "wrong",
        ac: "z",
        b: "m",
        bc: "n",
        c: "o",
      },
      guesses: [],
    });

    await import("root/app");

    let guessesText = document.querySelector(".guesses-text");
    expect(guessesText).toBeTruthy();
  });

  it("blocks duplicate guesses", async () => {
    let solution = computeSolution(gameList[0]!.groups);
    seedGame(0, {
      currentGuess: { ...solution },
      guesses: [{ ...solution }],
    });

    await import("root/app");
    let { gameEvent } = await import("lib/utils");
    let { toast } = await import("lib/ui");

    fillDropzones(solution);
    gameEvent.post("update");
    gameEvent.post("submit");

    expect(toast.show).toHaveBeenCalled();
  });

  it("handles practice puzzle and invalid index selection", async () => {
    sessionStorage.setItem("index", "1");
    await import("root/app");

    let stored = JSON.parse(localStorage.getItem("games") || "[]")[0];
    let bc = new BroadcastChannel("game");
    bc.postMessage(stored);
    bc.postMessage({ ...stored, index: stored.index + 1 });

    let { gameEvent } = await import("lib/utils");
    gameEvent.post(9999);
  });

  it("renders a solved game from storage with hints", async () => {
    let solution = computeSolution(gameList[0]!.groups);
    seedGame(0, {
      currentGuess: solution,
      guesses: [
        {
          ...solution,
        },
        {
          ...solution,
        },
      ],
      hintsUsed: { a: true, b: true, c: false },
      status: "solved",
    });

    await import("root/app");
  });

  it("renders a failed game from storage", async () => {
    let game = baseGame(0);
    game.status = "failed";
    game.guesses = new Array(5).fill({
      ...game.currentGuess,
    });
    seedGame(0, game);

    await import("root/app");
  });

  it("redirects when pathname is not root", async () => {
    setLocation("/foo");
    await import("root/app");

    expect(window.location.replace).toHaveBeenCalled();
  });
});
