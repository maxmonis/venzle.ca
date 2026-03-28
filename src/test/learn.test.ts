import { beforeEach, describe, expect, it, vi } from "vitest";

describe("root/learn/app", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = "<main></main>";
  });

  it("creates the demo link and stores session index on click", async () => {
    let { mountLearnPage } = await import("learn/app");

    let cleanup = mountLearnPage(document.querySelector("main")!);

    let link = document.querySelector<HTMLAnchorElement>("main a")!;
    expect(link.textContent).toBe("Play Demo Puzzle");

    link.dispatchEvent(new Event("click"));
    expect(sessionStorage.getItem("index")).toBe("0");

    cleanup();
  });
});
