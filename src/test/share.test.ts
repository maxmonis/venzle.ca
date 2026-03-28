import type { Game } from "lib/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

function setupBaseDom() {
  document.body.innerHTML = `
    <div class="site-logo"></div>
    <div class="copyright-year">2025</div>
    <footer></footer>
    <main></main>
  `;
}

function seedSolvedGame(index = 0, overrides: Partial<Game> = {}) {
  let game: Game = {
    creator: "Tester",
    currentGuess: {
      a: "A1",
      ab: "A2",
      abc: "A3",
      ac: "A4",
      b: "B1",
      bc: "B2",
      c: "C1",
    },
    groups: {
      Alpha: ["A1", "A2", "A3", "A4"],
      Beta: ["A3", "B1", "B2", "B3"],
      Gamma: ["A3", "C1", "C2", "C3"],
    },
    guesses: [
      {
        a: "A1",
        ab: "A2",
        abc: "A3",
        ac: "A4",
        b: "B1",
        bc: "B2",
        c: "C1",
      },
    ],
    hint: "hint",
    hintsUsed: { a: true, b: true, c: false },
    index,
    status: "solved",
    timestamp: new Date("2025-01-01T00:00:00Z").getTime(),
    title: "Test Puzzle",
    ...overrides,
  };
  localStorage.setItem("games", JSON.stringify([game]));
}

describe("root/share/app", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    sessionStorage.clear();
    setupBaseDom();
  });

  it("redirects if no solved game exists", async () => {
    let replace = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        origin: "http://localhost",
        pathname: "/",
        reload: vi.fn(),
        replace,
      },
      writable: true,
    });

    try {
      await import("root/share/app");
    } catch {
      // expected since the module continues without a solved game
    }
    expect(replace).toHaveBeenCalledWith("../");
  });

  it("renders share UI and clipboard text", async () => {
    setupBaseDom();
    seedSolvedGame(0, {
      guesses: [
        {
          a: "A1x",
          ab: "A2",
          abc: "A3",
          ac: "A4",
          b: "B1",
          bc: "B2",
          c: "C1",
        },
      ],
      hintsUsed: { a: true, b: false, c: false },
      title:
        "A very long title that should definitely wrap across multiple lines when rendered on the certificate",
    });
    sessionStorage.setItem("index", "0");
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 4,
    });

    await import("root/share/app");
    await Promise.resolve();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));

    let pre = document.querySelector("pre")!;
    expect(pre.textContent).toContain("Puzzle 0");

    let copyButton = Array.from(document.querySelectorAll("button")).find(
      (el) => el.textContent == "Copy to Clipboard",
    )!;
    copyButton.dispatchEvent(new Event("click"));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    let downloadForm = document.querySelector("form")!;
    downloadForm.dispatchEvent(new Event("submit"));

    let canvas = document.querySelector("canvas")!;
    expect(canvas).toBeTruthy();
  });

  it("renders a perfect badge", async () => {
    setupBaseDom();
    seedSolvedGame(0, {
      guesses: [
        {
          a: "A1",
          ab: "A2",
          abc: "A3",
          ac: "A4",
          b: "B1",
          bc: "B2",
          c: "C1",
        },
      ],
      hintsUsed: { a: false, b: false, c: false },
    });
    sessionStorage.setItem("index", "0");
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 0,
    });

    await import("root/share/app");
    await Promise.resolve();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
    let canvas = document.querySelector("canvas")!;
    expect(canvas).toBeTruthy();
  });

  it("debounces certificate name input", async () => {
    setupBaseDom();
    seedSolvedGame(0);
    sessionStorage.setItem("index", "0");

    vi.useFakeTimers();
    await import("root/share/app");

    let input = document.querySelector<HTMLInputElement>("input")!;
    input.value = "Case";
    input.dispatchEvent(new Event("input"));

    input.value = "Casey";
    input.dispatchEvent(new Event("input"));

    vi.runAllTimers();
    await Promise.resolve();

    expect(JSON.parse(localStorage.getItem("name") || "null")).toBe("Casey");

    input.value = "Casey";
    input.dispatchEvent(new Event("input"));
    vi.runAllTimers();

    input.value = "   ";
    input.dispatchEvent(new Event("input"));
    vi.runAllTimers();
  });

  it("handles font readiness edge cases", async () => {
    setupBaseDom();
    seedSolvedGame(0, {
      guesses: [
        {
          a: "A1",
          ab: "A2",
          abc: "A3",
          ac: "A4",
          b: "B1",
          bc: "B2",
          c: "C1",
        },
        {
          a: "A1",
          ab: "A2",
          abc: "A3",
          ac: "A4",
          b: "B1",
          bc: "B2",
          c: "C1",
        },
      ],
      hintsUsed: { a: true, b: true, c: true },
      timestamp: 0,
      title: "",
    });
    sessionStorage.setItem("index", "0");

    let rejected = Promise.reject(new Error("fail"));
    rejected.catch(() => undefined);
    Object.defineProperty(document, "fonts", {
      value: {
        ready: rejected,
      },
      writable: true,
    });

    let errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    await import("root/share/app");
    await Promise.resolve();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();

    let select = document.querySelector("select")!;
    select.value = "png";
    select.dispatchEvent(new Event("change"));
  });

  it("skips font waiting when fonts API missing", async () => {
    setupBaseDom();
    seedSolvedGame(0);
    sessionStorage.setItem("index", "0");

    Object.defineProperty(document, "fonts", {
      value: {
        ready: null,
      },
      writable: true,
    });

    await import("root/share/app");
    await Promise.resolve();
    await Promise.resolve();
    let canvas = document.querySelector("canvas")!;
    expect(canvas).toBeTruthy();
  });
});
