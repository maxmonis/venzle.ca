import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function setupDom() {
  document.body.innerHTML = "<main></main>";
}

describe("root/stats/app", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 24)));
    let frameTime = 0;
    Object.defineProperty(window, "requestAnimationFrame", {
      value: (callback: FrameRequestCallback) => {
        frameTime += 1000;
        callback(frameTime);
        return 0;
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders stats with stored data", async () => {
    localStorage.setItem(
      "results",
      JSON.stringify([
        { guesses: 1, hints: 0, index: 0, status: "solved" },
        { guesses: 3, hints: 2, index: 1, status: "failed" },
      ]),
    );

    let { mountStatsPage } = await import("stats/app");
    mountStatsPage(document.querySelector("main")!);
    vi.advanceTimersByTime(1000);

    expect(document.querySelectorAll(".stats-summary li strong").length).toBe(
      12,
    );
    expect(document.querySelectorAll(".bar-fill").length).toBe(9);
  });

  it("supports reduced motion mode", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => {
        return {
          addEventListener: () => undefined,
          matches: true,
          removeEventListener: () => undefined,
        };
      },
    });

    vi.resetModules();
    setupDom();

    let { mountStatsPage } = await import("stats/app");
    mountStatsPage(document.querySelector("main")!);
    vi.advanceTimersByTime(1000);

    expect(document.querySelectorAll(".bar-fill").length).toBe(9);
  });

  it("handles missing today result", async () => {
    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 2, hints: 1, index: 1, status: "failed" }]),
    );

    let { mountStatsPage } = await import("stats/app");
    mountStatsPage(document.querySelector("main")!);
    vi.advanceTimersByTime(1000);

    expect(document.querySelectorAll(".stats-summary li").length).toBe(12);
  });

  it("tracks streak breaks and cleanup", async () => {
    localStorage.setItem(
      "results",
      JSON.stringify([
        { guesses: 2, hints: 1, index: 0, status: "solved" },
        { guesses: 1, hints: 0, index: 1, status: "solved" },
        { guesses: 4, hints: 2, index: 3, status: "failed" },
      ]),
    );

    let { mountStatsPage } = await import("stats/app");
    let cleanup = mountStatsPage(document.querySelector("main")!);
    cleanup?.();
    vi.advanceTimersByTime(1000);

    expect(document.querySelectorAll(".stats-summary li strong").length).toBe(
      12,
    );
  });

  it("updates today perfect and non-perfect streaks", async () => {
    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 1, hints: 0, index: 1, status: "solved" }]),
    );

    let { mountStatsPage } = await import("stats/app");
    mountStatsPage(document.querySelector("main")!);
    vi.advanceTimersByTime(1000);

    expect(document.querySelectorAll(".bar-fill").length).toBe(9);
  });

  it("covers duplicate/pending game merges and broken streak branches", async () => {
    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 4, hints: 2, index: 0, status: "failed" }]),
    );
    localStorage.setItem(
      "games",
      JSON.stringify([
        {
          currentGuess: {
            a: "",
            ab: "",
            abc: "",
            ac: "",
            b: "",
            bc: "",
            c: "",
          },
          guesses: [],
          groups: {
            Alpha: ["A1", "A2", "A3", "A4"],
            Beta: ["A1", "B2", "B3", "B4"],
            Gamma: ["A1", "C2", "C3", "C4"],
          },
          creator: "Tester",
          hint: "hint",
          hintsUsed: { a: false, b: false, c: false },
          index: 0,
          status: "solved",
          title: "Duplicate",
        },
        {
          currentGuess: {
            a: "",
            ab: "",
            abc: "",
            ac: "",
            b: "",
            bc: "",
            c: "",
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
          groups: {
            Alpha: ["A1", "A2", "A3", "A4"],
            Beta: ["A3", "B1", "B2", "B3"],
            Gamma: ["A3", "C1", "C2", "C3"],
          },
          creator: "Tester",
          hint: "hint",
          hintsUsed: { a: true, b: false, c: false },
          index: 1,
          status: "solved",
          title: "Today",
        },
        {
          currentGuess: {
            a: "",
            ab: "",
            abc: "",
            ac: "",
            b: "",
            bc: "",
            c: "",
          },
          guesses: [],
          groups: {
            Alpha: ["A1", "A2", "A3", "A4"],
            Beta: ["A3", "B1", "B2", "B3"],
            Gamma: ["A3", "C1", "C2", "C3"],
          },
          creator: "Tester",
          hint: "hint",
          hintsUsed: { a: false, b: false, c: false },
          index: 2,
          status: "pending",
          title: "Pending",
        },
      ]),
    );

    let { mountStatsPage } = await import("stats/app");
    mountStatsPage(document.querySelector("main")!);
    vi.advanceTimersByTime(1000);

    expect(document.querySelectorAll(".stats-summary li strong").length).toBe(
      12,
    );
  });

});
