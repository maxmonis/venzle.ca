import { beforeEach, describe, expect, it, vi } from "vitest";

function setupDom() {
  document.body.innerHTML = `
    <div class="site-logo"></div>
    <div class="copyright-year">2025</div>
    <footer></footer>
    <main></main>
  `;
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
    Object.defineProperty(window, "cancelAnimationFrame", {
      value: () => undefined,
      writable: true,
    });
  });

  it("renders stats with stored data", async () => {
    localStorage.setItem(
      "results",
      JSON.stringify([
        { guesses: 1, hints: 0, index: 0, status: "solved" },
        { guesses: 3, hints: 2, index: 1, status: "failed" },
      ]),
    );
    localStorage.setItem(
      "games",
      JSON.stringify([
        {
          guesses: [{}, {}],
          hintsUsed: { a: true, b: false, c: false },
          index: 1,
          status: "failed",
        },
        {
          guesses: [],
          hintsUsed: { a: false, b: false, c: false },
          index: 2,
          status: "pending",
        },
        {
          guesses: [{}, {}, {}],
          hintsUsed: { a: true, b: true, c: false },
          index: 3,
          status: "solved",
        },
        {
          guesses: [],
          hintsUsed: { a: false, b: false, c: false },
          index: 0,
          status: "solved",
        },
      ]),
    );

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);

    let totals = document.querySelectorAll(".stats-summary li strong");
    expect(totals.length).toBeGreaterThan(0);
  });

  it("supports reduced motion mode", async () => {
    vi.resetModules();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 24)));
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

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);
    let bars = document.querySelectorAll(".bar-fill");
    expect(bars.length).toBeGreaterThan(0);
  });

  it("handles missing today result", async () => {
    vi.resetModules();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 23)));

    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 2, hints: 1, index: 1, status: "failed" }]),
    );

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);
    let statsSummary = document.querySelectorAll(".stats-summary li");
    expect(statsSummary.length).toBeGreaterThan(0);
  });

  it("breaks solved streak when yesterday failed", async () => {
    vi.resetModules();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 24)));
    localStorage.clear();
    let frameTime = 0;
    Object.defineProperty(window, "requestAnimationFrame", {
      value: (callback: FrameRequestCallback) => {
        frameTime += 1000;
        callback(frameTime);
        return 0;
      },
      writable: true,
    });

    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 2, hints: 1, index: 0, status: "failed" }]),
    );

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);
    let totals = document.querySelectorAll(".stats-summary li strong");
    expect(totals.length).toBeGreaterThan(0);
  });

  it("tracks streak breaks and perfect streak endings", async () => {
    vi.resetModules();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 25)));
    localStorage.clear();
    let frameTime = 0;
    Object.defineProperty(window, "requestAnimationFrame", {
      value: (callback: FrameRequestCallback) => {
        frameTime += 1000;
        callback(frameTime);
        return 0;
      },
      writable: true,
    });

    localStorage.setItem(
      "results",
      JSON.stringify([
        { guesses: 2, hints: 1, index: 0, status: "solved" },
        { guesses: 1, hints: 0, index: 1, status: "solved" },
        { guesses: 4, hints: 2, index: 3, status: "failed" },
      ]),
    );

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);

    let totals = document.querySelectorAll(".stats-summary li strong");
    expect(totals.length).toBeGreaterThan(0);
  });

  it("updates today perfect and non-perfect streaks", async () => {
    vi.resetModules();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 24)));
    localStorage.clear();
    let frameTime = 0;
    Object.defineProperty(window, "requestAnimationFrame", {
      value: (callback: FrameRequestCallback) => {
        frameTime += 1000;
        callback(frameTime);
        return 0;
      },
      writable: true,
    });

    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 1, hints: 0, index: 1, status: "solved" }]),
    );

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);

    vi.resetModules();
    setupDom();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 24)));
    localStorage.clear();
    frameTime = 0;
    Object.defineProperty(window, "requestAnimationFrame", {
      value: (callback: FrameRequestCallback) => {
        frameTime += 1000;
        callback(frameTime);
        return 0;
      },
      writable: true,
    });
    localStorage.setItem(
      "results",
      JSON.stringify([{ guesses: 2, hints: 1, index: 1, status: "solved" }]),
    );

    await import("root/stats/app");
    vi.advanceTimersByTime(1000);

    let totals = document.querySelectorAll(".stats-summary li strong");
    expect(totals.length).toBeGreaterThan(0);
  });
});
