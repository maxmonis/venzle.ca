import { beforeEach, describe, expect, it, vi } from "vitest";

function setupBaseDom() {
  document.body.innerHTML = `
    <div class="site-logo"></div>
    <div class="copyright-year">2025</div>
    <footer></footer>
  `;
  document.documentElement.style.fontSize = "16px";
}

describe("lib/ui and lib/svg", () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.resetModules();
    localStorage.clear();
    setupBaseDom();
  });

  it("initializes UI and toggles theme/audio", async () => {
    let ui = await import("lib/ui");
    ui.initUI();

    let toggleContainer = document.querySelector(".theme-toggle-container")!;
    let [darkToggle, audioToggle] = Array.from(
      toggleContainer.querySelectorAll("button"),
    );

    expect(darkToggle?.title).toBe("Toggle dark mode");
    expect(audioToggle?.title).toBe("Toggle audio");

    audioToggle?.dispatchEvent(new Event("click"));
    expect(localStorage.getItem("audio")).not.toBeNull();

    darkToggle?.dispatchEvent(new Event("click"));
    expect(document.body.classList.contains("dark")).toBe(true);
  });

  it("updates svg size on resize", async () => {
    let ui = await import("lib/ui");
    ui.initUI();
    let svg = await import("lib/svg");

    expect(svg.chevronLeft.getAttribute("height")).toBe("24px");

    document.documentElement.style.fontSize = "20px";
    window.dispatchEvent(new Event("resize"));

    expect(ui.rem).toBe(20);
    expect(svg.chevronLeft.getAttribute("height")).toBe("30px");
  });

  it("handles theme channel updates", async () => {
    localStorage.setItem("audio", "true");
    localStorage.removeItem("dark");

    let ui = await import("lib/ui");
    let utils = await import("lib/utils");
    ui.initUI();

    let channel = (
      utils.themeChannel as unknown as {
        channel?: { onmessage?: (e: MessageEvent) => void };
      }
    ).channel;

    channel?.onmessage?.({ data: "audio" } as MessageEvent);
    channel?.onmessage?.({ data: "dark" } as MessageEvent);
    channel?.onmessage?.({ data: "noop" } as MessageEvent);

    let toggleContainer = document.querySelector(".theme-toggle-container")!;
    let [darkToggle, audioToggle] = Array.from(
      toggleContainer.querySelectorAll("button"),
    );

    expect(audioToggle?.innerText).toBe("🔊");
    expect(darkToggle?.innerText).toBeTruthy();
    expect(document.body.style.cssText).toBe("");
  });

  it("supports reinitialization without site chrome", async () => {
    let ui = await import("lib/ui");

    ui.initUI();
    document.body.innerHTML = "";
    ui.initUI();

    expect(document.querySelector(".theme-toggle-container")).toBeNull();
  });

  it("updates reduced motion and schedules the midnight reload", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 7, 23, 23, 59, 59)));

    let ui = await import("lib/ui");
    ui.initUI();

    let matchMediaMap = (
      globalThis as typeof globalThis & {
        __matchMediaByQuery?: Record<
          string,
          { dispatchEvent: (event: MediaQueryListEvent) => boolean }
        >;
      }
    ).__matchMediaByQuery;
    matchMediaMap?.["(prefers-reduced-motion: reduce)"]?.dispatchEvent({
      matches: true,
    } as MediaQueryListEvent);

    expect(ui.reduceMotion).toBe(true);

    vi.advanceTimersByTime(4500);
    let { toast } = await import("lib/ui");

    expect(toast.show).toHaveBeenCalled();
    expect(location.reload).toHaveBeenCalled();
  });
});
