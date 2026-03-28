import type { Game } from "lib/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

function setupGameDom() {
  document.body.innerHTML = `
    <div class="site-logo"></div>
    <div class="copyright-year">2025</div>
    <footer></footer>
    <header></header>
    <main></main>
    <div class="circle-container"></div>
    <div class="game-controls"></div>
  `;
}

function sampleGame(): Game {
  return {
    creator: "Test",
    currentGuess: {
      a: "",
      ab: "",
      abc: "",
      ac: "",
      b: "",
      bc: "",
      c: "",
    },
    groups: {
      Alpha: ["A1", "A2", "A3", "A4"],
      Beta: ["A1", "B2", "B3", "B4"],
      Gamma: ["A1", "C2", "C3", "C4"],
    },
    guesses: [],
    hint: "Test hint",
    hintsUsed: { a: false, b: false, c: false },
    index: 1,
    status: "pending",
    title: "Test",
  };
}

describe("game/elements and game/hints", () => {
  beforeEach(() => {
    vi.resetModules();
    setupGameDom();
  });

  it("wires element events and hints", async () => {
    let { gameEvent } = await import("lib/utils");
    let received: Array<unknown> = [];
    gameEvent.listen((data) => {
      received.push(data);
    });

    let elements = await import("game/elements");
    let { initHints } = await import("game/hints");

    elements.previousGameSelect.append(
      ...[0, 1].map((i) => {
        let option = document.createElement("option");
        option.value = String(i);
        option.textContent = `Puzzle ${i}`;
        return option;
      }),
    );

    elements.previousGameSelect.value = "1";
    elements.previousGameSelect.dispatchEvent(new Event("change"));

    elements.resetButton.dispatchEvent(new Event("click"));
    let submitButton = elements.submitButtonContainer.querySelector("button")!;
    submitButton.dispatchEvent(new Event("click"));
    elements.homeButton.dispatchEvent(new Event("click"));

    expect(received).toContain("reset");
    expect(received).toContain("submit");

    let game = sampleGame();
    initHints(game);

    let hintButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".hint-button"),
    );
    expect(hintButtons.length).toBe(2);

    hintButtons[0]?.dispatchEvent(new Event("click"));
    hintButtons[1]?.dispatchEvent(new Event("click"));

    let bonusButton =
      document.querySelectorAll<HTMLButtonElement>(".hint-button")[0];
    bonusButton?.dispatchEvent(new Event("click"));

    expect(game.hintsUsed.a).toBe(true);
    expect(game.hintsUsed.b).toBe(true);
    expect(game.hintsUsed.c).toBe(true);
  });

  it("renders used hints immediately", async () => {
    let { initHints } = await import("game/hints");
    let game = sampleGame();
    game.hintsUsed = { a: true, b: true, c: true };

    initHints(game);
    let buttons = document.querySelectorAll(".hint-button");
    expect(buttons.length).toBe(0);
  });
});

describe("game/dnd (mouse)", () => {
  beforeEach(() => {
    vi.resetModules();
    setupGameDom();
    try {
      delete (window as unknown as { ontouchstart?: unknown }).ontouchstart;
      delete (Object.getPrototypeOf(window) as { ontouchstart?: unknown })
        .ontouchstart;
    } catch {
      // ignore if not configurable
    }
    Object.defineProperty(
      Object.getPrototypeOf(window.navigator),
      "maxTouchPoints",
      {
        configurable: true,
        get: () => 0,
      },
    );
  });

  it("handles drag and drop updates", async () => {
    let { initDropzones, initDraggables, createDraggable } = await import(
      "game/dnd"
    );
    let { circleContainer, draggables } = await import("game/elements");

    let game = sampleGame();
    initDropzones(game);
    initDraggables(game);

    // dragend with no dragged element
    let dragEndNoElement = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndNoElement, "clientX", { value: 0 });
    Object.defineProperty(dragEndNoElement, "clientY", { value: 0 });
    document.dispatchEvent(dragEndNoElement);

    let dropzones = Array.from(
      document.querySelectorAll<HTMLElement>(".dropzone"),
    );
    for (let i = 0; i < dropzones.length; i++) {
      let dz = dropzones[i]!;
      dz.getBoundingClientRect = () =>
        ({
          bottom: 50,
          left: i * 100,
          right: i * 100 + 50,
          top: 0,
        }) as DOMRect;
    }

    // cover document dragover preventDefault
    let documentDragOver = new Event("dragover", { cancelable: true });
    document.dispatchEvent(documentDragOver);
    expect(documentDragOver.defaultPrevented).toBe(true);

    // cover dropzone dragover preventDefault
    let dragOver = new Event("dragover", { cancelable: true });
    dropzones[0]?.dispatchEvent(dragOver);
    expect(dragOver.defaultPrevented).toBe(true);

    // cover dragenter/dragleave
    let dragEnter = new Event("dragenter", { cancelable: true });
    dropzones[0]?.dispatchEvent(dragEnter);
    expect(dropzones[0]?.classList.contains("dragover")).toBe(true);

    let dragLeave = new Event("dragleave", { cancelable: true });
    dropzones[0]?.dispatchEvent(dragLeave);
    expect(dropzones[0]?.classList.contains("dragover")).toBe(false);

    circleContainer.getBoundingClientRect = () =>
      ({
        bottom: 400,
        left: 0,
        right: 400,
        top: 0,
      }) as DOMRect;

    createDraggable("A1", "A1");
    let draggable = draggables.querySelector<HTMLElement>("div")!;

    let dragStart = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStart, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    draggable.dispatchEvent(dragStart);

    // cover dragstart early return when no dataTransfer
    let dragStartNoTransfer = new Event("dragstart") as DragEvent;
    draggable.dispatchEvent(dragStartNoTransfer);

    // cover early return when dragged element has no text/value
    draggable.textContent = "";
    draggable.removeAttribute("data-dnd-value");
    let dragEndEarly = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndEarly, "clientX", { value: 10 });
    Object.defineProperty(dragEndEarly, "clientY", { value: 10 });
    document.dispatchEvent(dragEndEarly);

    // restore and drag again
    draggable.textContent = "A1";
    draggable.setAttribute("data-dnd-value", "A1");

    let dragEnd = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEnd, "clientX", { value: 10 });
    Object.defineProperty(dragEnd, "clientY", { value: 10 });
    document.dispatchEvent(dragEnd);

    // drop into dropzone
    expect(dropzones[0]?.getAttribute("data-dnd-value")).toBe("A1");

    // move from one dropzone to another (occupied)
    dropzones[1]!.setAttribute("data-dnd-value", "B1");
    dropzones[1]!.textContent = "B1";

    let dragStartMove = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartMove, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzones[0]?.dispatchEvent(dragStartMove);

    let dragEndMove = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndMove, "clientX", { value: 110 });
    Object.defineProperty(dragEndMove, "clientY", { value: 10 });
    document.dispatchEvent(dragEndMove);

    // move from one dropzone to another (unoccupied)
    let dragStartMoveEmpty = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartMoveEmpty, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzones[1]?.dispatchEvent(dragStartMoveEmpty);
    let dragEndMoveEmpty = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndMoveEmpty, "clientX", { value: 210 });
    Object.defineProperty(dragEndMoveEmpty, "clientY", { value: 10 });
    document.dispatchEvent(dragEndMoveEmpty);

    // reset for outside-drag coverage
    dropzones[0]!.setAttribute("data-dnd-value", "A1");
    dropzones[0]!.textContent = "A1";

    // drag from dropzone to outside (Y bounds)
    let dragStartOutsideY = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartOutsideY, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzones[0]?.dispatchEvent(dragStartOutsideY);
    let dragEndOutsideY = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndOutsideY, "clientX", { value: 10 });
    Object.defineProperty(dragEndOutsideY, "clientY", { value: -10 });
    document.dispatchEvent(dragEndOutsideY);

    // reset and drag from dropzone to outside (Y bottom bounds)
    dropzones[0]!.setAttribute("data-dnd-value", "A1");
    dropzones[0]!.textContent = "A1";
    let dragStartOutsideBottom = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartOutsideBottom, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzones[0]?.dispatchEvent(dragStartOutsideBottom);
    let dragEndOutsideBottom = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndOutsideBottom, "clientX", { value: 10 });
    Object.defineProperty(dragEndOutsideBottom, "clientY", { value: 500 });
    document.dispatchEvent(dragEndOutsideBottom);

    // drag from draggables to an occupied dropzone
    dropzones[1]!.setAttribute("data-dnd-value", "B1");
    dropzones[1]!.textContent = "B1";
    createDraggable("C1", "C1");
    let allDraggables = draggables.querySelectorAll<HTMLElement>("div");
    let newDraggable = allDraggables[allDraggables.length - 1]!;
    let dragStartNew = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartNew, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    newDraggable.dispatchEvent(dragStartNew);
    let dragEndIntoOccupied = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndIntoOccupied, "clientX", { value: 110 });
    Object.defineProperty(dragEndIntoOccupied, "clientY", { value: 10 });
    document.dispatchEvent(dragEndIntoOccupied);

    // drag from dropzone to outside circle
    let dragStart2 = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStart2, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzones[0]?.dispatchEvent(dragStart2);

    let dragEnd2 = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEnd2, "clientX", { value: 999 });
    Object.defineProperty(dragEnd2, "clientY", { value: 999 });
    document.dispatchEvent(dragEnd2);

    // drag from dropzone to inside circle but not a dropzone
    dropzones[0]!.setAttribute("data-dnd-value", "A1");
    dropzones[0]!.textContent = "A1";
    let dragStartInside = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartInside, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzones[0]?.dispatchEvent(dragStartInside);
    let dragEndInside = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndInside, "clientX", { value: 70 });
    Object.defineProperty(dragEndInside, "clientY", { value: 10 });
    document.dispatchEvent(dragEndInside);
    expect(dropzones[0]?.getAttribute("data-dnd-value")).toBe("A1");

    // drag from draggables to empty dropzone
    createDraggable("D1", "D1");
    let emptyDropzone = dropzones[2]!;
    emptyDropzone.textContent = "";
    emptyDropzone.removeAttribute("data-dnd-value");
    let emptyDrag = draggables.querySelectorAll<HTMLElement>("div");
    let emptyDraggable = emptyDrag[emptyDrag.length - 1]!;
    let dragStartEmpty = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartEmpty, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    emptyDraggable.dispatchEvent(dragStartEmpty);
    let dragEndEmpty = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndEmpty, "clientX", { value: 210 });
    Object.defineProperty(dragEndEmpty, "clientY", { value: 10 });
    document.dispatchEvent(dragEndEmpty);

    // drag from draggables to outside any dropzone
    createDraggable("E1", "E1");
    let outsideDraggables = draggables.querySelectorAll<HTMLElement>("div");
    let outsideDraggable = outsideDraggables[outsideDraggables.length - 1]!;
    let dragStartOutside = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartOutside, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    outsideDraggable.dispatchEvent(dragStartOutside);
    let dragEndOutside = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndOutside, "clientX", { value: 70 });
    Object.defineProperty(dragEndOutside, "clientY", { value: 60 });
    document.dispatchEvent(dragEndOutside);

    expect(draggables.children.length).toBeGreaterThan(0);
  });
});

describe("game/dnd (touch)", () => {
  beforeEach(() => {
    vi.resetModules();
    setupGameDom();
    Object.defineProperty(window, "ontouchstart", {
      configurable: true,
      value: null,
    });
    Object.defineProperty(
      Object.getPrototypeOf(window.navigator),
      "maxTouchPoints",
      {
        configurable: true,
        get: () => 1,
      },
    );
  });

  it("handles touch drag movements", async () => {
    let { initDropzones, createDraggable } = await import("game/dnd");
    let { draggables } = await import("game/elements");

    let game = sampleGame();
    initDropzones(game);
    createDraggable("A1", "A1");

    // touchend with no dragged element or touch
    document.dispatchEvent(
      Object.assign(new Event("touchend"), {
        changedTouches: [],
      }),
    );

    let firstDropzone = document.querySelector<HTMLElement>(".dropzone")!;
    firstDropzone.getBoundingClientRect = () =>
      ({
        bottom: 50,
        left: 0,
        right: 50,
        top: 0,
      }) as DOMRect;

    let draggable = draggables.querySelector<HTMLElement>("div")!;
    // touchmove with no dragged element
    document.dispatchEvent(
      Object.assign(new Event("touchmove"), {
        touches: [{ clientX: 1, clientY: 1 }],
      }),
    );

    // touchstart when draggable attribute is missing
    draggable.removeAttribute("draggable");
    let touchStartNoDrag = new Event("touchstart") as TouchEvent;
    Object.defineProperty(touchStartNoDrag, "touches", {
      value: [{ clientX: 2, clientY: 2 }],
    });
    draggable.dispatchEvent(touchStartNoDrag);
    draggable.setAttribute("draggable", "true");

    let touchStart = new Event("touchstart") as TouchEvent;
    Object.defineProperty(touchStart, "touches", {
      value: [{ clientX: 5, clientY: 5 }],
    });
    draggable.dispatchEvent(touchStart);

    let touchMove = new Event("touchmove") as TouchEvent;
    Object.defineProperty(touchMove, "touches", {
      value: [{ clientX: 15, clientY: 15 }],
    });
    document.dispatchEvent(touchMove);
    expect(draggable.style.position).toBe("fixed");
    expect(firstDropzone.classList.contains("dragover")).toBe(true);

    let touchEnd = new Event("touchend") as TouchEvent;
    Object.defineProperty(touchEnd, "changedTouches", {
      value: [{ clientX: 15, clientY: 15 }],
    });
    document.dispatchEvent(touchEnd);
  });
});
