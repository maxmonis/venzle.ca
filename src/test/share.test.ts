import type { Game } from "lib/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

function setupBaseDom() {
  document.body.innerHTML = "<main></main>";
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
    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");

    mountSharePage(document.querySelector("main")!, navigate);

    expect(navigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("renders share UI and clipboard text", async () => {
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

    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");

    mountSharePage(document.querySelector("main")!, navigate);
    await Promise.resolve();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.querySelector("pre")?.textContent).toContain("Puzzle 0");

    let copyButton = Array.from(document.querySelectorAll("button")).find(
      (element) => element.textContent == "Copy to Clipboard",
    )!;
    copyButton.dispatchEvent(new Event("click"));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    let formatSelect = document.querySelector<HTMLSelectElement>("select")!;
    formatSelect.value = "webp";
    formatSelect.dispatchEvent(new Event("change"));
    expect(JSON.parse(localStorage.getItem("format") || "null")).toBe("webp");

    document.querySelector("form")?.dispatchEvent(new Event("submit"));
    expect(document.querySelector("canvas")).toBeTruthy();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("debounces certificate name input", async () => {
    seedSolvedGame(0);
    sessionStorage.setItem("index", "0");

    vi.useFakeTimers();
    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");

    let cleanup = mountSharePage(document.querySelector("main")!, navigate);

    let input = document.querySelector<HTMLInputElement>("input")!;
    input.value = "Case";
    input.dispatchEvent(new Event("input"));

    input.value = "Casey";
    input.dispatchEvent(new Event("input"));

    vi.runAllTimers();
    await Promise.resolve();

    expect(JSON.parse(localStorage.getItem("name") || "null")).toBe("Casey");
    cleanup?.();
  });

  it("skips certificate updates for blank or unchanged names", async () => {
    seedSolvedGame(0);
    sessionStorage.setItem("index", "0");
    localStorage.setItem("name", JSON.stringify("Casey"));

    vi.useFakeTimers();
    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");
    let cleanup = mountSharePage(document.querySelector("main")!, navigate);

    let input = document.querySelector<HTMLInputElement>("input")!;

    input.value = "   ";
    input.dispatchEvent(new Event("input"));
    vi.runAllTimers();
    await Promise.resolve();
    expect(JSON.parse(localStorage.getItem("name") || "null")).toBe("Casey");

    input.value = "Casey";
    input.dispatchEvent(new Event("input"));
    vi.runAllTimers();
    await Promise.resolve();
    expect(JSON.parse(localStorage.getItem("name") || "null")).toBe("Casey");

    cleanup?.();
  });

  it("cleans up without a pending debounce timer", async () => {
    seedSolvedGame(0);
    sessionStorage.setItem("index", "0");

    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");
    let cleanup = mountSharePage(document.querySelector("main")!, navigate);

    cleanup?.();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("handles font readiness edge cases", async () => {
    seedSolvedGame(0);
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

    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");
    mountSharePage(document.querySelector("main")!, navigate);

    await Promise.resolve();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("renders a perfect badge and skips font waiting when fonts are missing", async () => {
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
      title: "",
    });
    sessionStorage.setItem("index", "0");
    Object.defineProperty(document, "fonts", {
      value: {
        ready: null,
      },
      writable: true,
    });

    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");
    mountSharePage(document.querySelector("main")!, navigate);

    await Promise.resolve();
    await Promise.resolve();

    expect(document.querySelector("canvas")).toBeTruthy();
  });

  it("renders plural certificate text and falls back to the current date", async () => {
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
      hintsUsed: { a: true, b: true, c: false },
      timestamp: undefined,
    });
    sessionStorage.setItem("index", "0");

    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");
    mountSharePage(document.querySelector("main")!, navigate);

    await Promise.resolve();
    await Promise.resolve();

    expect(document.querySelector("canvas")).toBeTruthy();
  });

  it("falls back to a 1x scale when devicePixelRatio is falsy", async () => {
    seedSolvedGame(0);
    sessionStorage.setItem("index", "0");
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 0,
    });

    let navigate = vi.fn();
    let { mountSharePage } = await import("share/app");
    mountSharePage(document.querySelector("main")!, navigate);

    await Promise.resolve();
    await Promise.resolve();

    let canvas = document.querySelector("canvas");
    expect(canvas?.width).toBe(1200);
    expect(canvas?.height).toBe(1600);
  });
});
