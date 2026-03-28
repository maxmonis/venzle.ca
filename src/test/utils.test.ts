import { beforeEach, describe, expect, it, vi } from "vitest";

function setSystemTime(date: Date) {
  vi.useFakeTimers();
  vi.setSystemTime(date);
}

describe("lib/utils", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.useRealTimers();
    vi.resetModules();
  });

  it("clamps todayIndex when beyond game list", async () => {
    setSystemTime(new Date(Date.UTC(2100, 0, 1)));
    let { gameList } = await import("game/list");
    let utils = await import("lib/utils");
    expect(utils.todayIndex).toBe(gameList.length - 1);
  });

  it("computes todayIndex at zero on launch date", async () => {
    setSystemTime(new Date(Date.UTC(2025, 7, 23)));
    let utils = await import("lib/utils");
    expect(utils.todayIndex).toBe(0);
  });

  it("stores and retrieves local/session data", async () => {
    let utils = await import("lib/utils");

    utils.localAudio.set(true);
    utils.localDark.set(false);
    utils.localName.set("Test");
    utils.localLoad.set(123);

    expect(utils.localAudio.get()).toBe(true);
    expect(utils.localDark.get()).toBe(false);
    expect(utils.localName.get()).toBe("Test");
    expect(utils.localLoad.get()).toBe(123);

    utils.sessionIndex.set(42);
    expect(utils.sessionIndex.get()).toBe(42);
    utils.sessionIndex.remove();
    expect(utils.sessionIndex.get()).toBeNull();
  });

  it("posts and receives channel messages", async () => {
    let utils = await import("lib/utils");
    let received: string | null = null;

    utils.themeChannel.listen((data) => {
      received = data;
    });

    let broadcaster = new BroadcastChannel("theme");
    broadcaster.postMessage("dark");

    expect(received).toBe("dark");
  });

  it("posts and receives custom events", async () => {
    let utils = await import("lib/utils");
    let received: string | null = null;

    utils.gameEvent.listen((data) => {
      received = data as string;
    });

    utils.gameEvent.post("reset");
    expect(received).toBe("reset");
  });

  it("exposes runtime types marker", async () => {
    let types = await import("lib/types");
    expect(types.__types).toBe(true);
  });
});
