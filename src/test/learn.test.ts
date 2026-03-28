import { beforeEach, describe, expect, it, vi } from "vitest";

describe("root/learn/app", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = `
      <div class="site-logo"></div>
      <div class="copyright-year">2025</div>
      <footer></footer>
      <main></main>
    `;
  });

  it("creates the demo link and stores session index on click", async () => {
    await import("root/learn/app");

    let link = document.querySelector<HTMLAnchorElement>("main a")!;
    expect(link.textContent).toBe("Play Demo Puzzle");

    link.dispatchEvent(new Event("click"));
    expect(sessionStorage.getItem("index")).toBe("0");
  });
});
