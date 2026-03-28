import { beforeEach, describe, expect, it, vi } from "vitest";

function setupBaseDom() {
  document.body.innerHTML = `
    <div class="site-logo"></div>
    <div class="copyright-year">2025</div>
    <footer></footer>
    <a class="local-link" href="./foo">Local</a>
    <a class="external-link" href="/bar">External</a>
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

  it("initializes UI, toggles theme/audio, and handles resize + reload", async () => {
    vi.useFakeTimers();
    Object.defineProperty(document, "readyState", {
      configurable: true,
      value: "loading",
    });
    let ui = await import("lib/ui");
    let { toast } = ui;

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

    // trigger theme channel updates
    let broadcaster = new BroadcastChannel("theme");
    broadcaster.postMessage("audio");
    broadcaster.postMessage("dark");
    let Broadcast = window.BroadcastChannel as unknown as {
      channels?: Map<
        string,
        Set<{ onmessage: ((event: MessageEvent) => void) | null }>
      >;
    };
    Broadcast.channels?.get("theme")?.forEach((channel) => {
      channel.onmessage?.({ data: "dark" } as MessageEvent);
    });

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
    let utils = await import("lib/utils");
    let channel = (
      utils.themeChannel as unknown as {
        channel?: { onmessage?: (e: MessageEvent) => void };
      }
    ).channel;
    expect(channel).toBeTruthy();
    channel?.onmessage?.({ data: "dark" } as MessageEvent);
    expect(ui.reduceMotion).toBe(true);

    // trigger DOMContentLoaded for domReady block
    document.dispatchEvent(new Event("DOMContentLoaded"));

    // simulate clicking a local link to show spinner
    let link = document.querySelector<HTMLAnchorElement>(".local-link")!;
    link.dispatchEvent(new Event("click"));
    vi.runAllTimers();

    expect(document.body.style.pointerEvents).toBe("none");
    expect(document.body.innerHTML).not.toBe("");

    vi.runAllTimers();
    expect(toast.show).toHaveBeenCalled();
  });

  it("updates svg size on resize", async () => {
    setupBaseDom();
    let ui = await import("lib/ui");
    let svg = await import("lib/svg");

    expect(svg.chevronLeft.getAttribute("height")).toBe("24px");

    document.documentElement.style.fontSize = "20px";
    window.dispatchEvent(new Event("resize"));

    expect(ui.rem).toBe(20);
    expect(svg.chevronLeft.getAttribute("height")).toBe("30px");
  });

  it("runs domReady immediately when document is complete", async () => {
    setupBaseDom();
    Object.defineProperty(document, "readyState", {
      configurable: true,
      value: "complete",
    });
    document.body.style.cssText = "color: red;";

    await import("lib/ui");

    expect(document.body.style.cssText).toBe("");
  });

  it("handles theme channel audio and default dark", async () => {
    setupBaseDom();
    localStorage.setItem("audio", "true");
    localStorage.removeItem("dark");

    let ui = await import("lib/ui");
    let utils = await import("lib/utils");

    let channel = (
      utils.themeChannel as unknown as {
        channel?: { onmessage?: (e: MessageEvent) => void };
      }
    ).channel;

    channel?.onmessage?.({ data: "audio" } as MessageEvent);
    channel?.onmessage?.({ data: "noop" } as MessageEvent);
    channel?.onmessage?.({ data: "dark" } as MessageEvent);

    let toggleContainer = document.querySelector(".theme-toggle-container")!;
    let [darkToggle, audioToggle] = Array.from(
      toggleContainer.querySelectorAll("button"),
    );

    expect(audioToggle?.innerText).toBe("🔊");
    expect(darkToggle?.innerText).toBe("🌞");
    expect(ui.reduceMotion).toBe(false);
  });
});
