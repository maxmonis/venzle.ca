import type { Game } from "lib/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

function setupGameDom() {
  document.body.innerHTML = "<main></main>";
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
    let stopListening = gameEvent.listen((data) => {
      received.push(data);
    });

    let { createGameElements } = await import("game/elements");
    let { initHints } = await import("game/hints");

    let elements = createGameElements(document.querySelector("main")!);

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
    elements.submitButtonContainer
      .querySelector("button")
      ?.dispatchEvent(new Event("click"));
    elements.homeButton.dispatchEvent(new Event("click"));

    expect(received).toContain(1);
    expect(received).toContain("reset");
    expect(received).toContain("submit");
    expect(received).toContain(0);

    let game = sampleGame();
    initHints({
      game,
      hintsContainer: elements.hintsContainer,
    });

    let hintButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".hint-button"),
    );
    expect(hintButtons.length).toBe(2);

    hintButtons[0]?.dispatchEvent(new Event("click"));
    hintButtons[1]?.dispatchEvent(new Event("click"));

    let bonusButton =
      document.querySelectorAll<HTMLButtonElement>(".hint-button")[0];
    bonusButton?.dispatchEvent(new Event("click"));

    expect(game.hintsUsed).toEqual({ a: true, b: true, c: true });
    stopListening();
  });

  it("renders used hints immediately", async () => {
    let { createGameElements } = await import("game/elements");
    let { initHints } = await import("game/hints");
    let game = sampleGame();
    game.hintsUsed = { a: true, b: true, c: true };

    let elements = createGameElements(document.querySelector("main")!);

    initHints({
      game,
      hintsContainer: elements.hintsContainer,
    });
    initHints({
      game,
      hintsContainer: elements.hintsContainer,
    });

    expect(document.querySelectorAll(".hint-button").length).toBe(0);
    expect(document.querySelectorAll("[data-hint='bonus']").length).toBe(1);
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
    let { createGameElements } = await import("game/elements");
    let { createDndController } = await import("game/dnd");

    let elements = createGameElements(document.querySelector("main")!);
    let dnd = createDndController({
      circleContainer: elements.circleContainer,
      draggables: elements.draggables,
    });

    let game = sampleGame();
    dnd.initDropzones(game);
    dnd.initDraggables(game);

    let dragEndNoElement = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndNoElement, "clientX", { value: 0 });
    Object.defineProperty(dragEndNoElement, "clientY", { value: 0 });
    document.dispatchEvent(dragEndNoElement);

    let dropzones = Array.from(
      document.querySelectorAll<HTMLElement>(".dropzone"),
    );
    for (let i = 0; i < dropzones.length; i++) {
      let dropzone = dropzones[i]!;
      dropzone.getBoundingClientRect = () =>
        ({
          bottom: 50,
          left: i * 100,
          right: i * 100 + 50,
          top: 0,
        }) as DOMRect;
    }

    let documentDragOver = new Event("dragover", { cancelable: true });
    document.dispatchEvent(documentDragOver);
    expect(documentDragOver.defaultPrevented).toBe(true);

    let dragEnter = new Event("dragenter", { cancelable: true });
    dropzones[0]?.dispatchEvent(dragEnter);
    expect(dropzones[0]?.classList.contains("dragover")).toBe(true);

    let dragLeave = new Event("dragleave", { cancelable: true });
    dropzones[0]?.dispatchEvent(dragLeave);
    expect(dropzones[0]?.classList.contains("dragover")).toBe(false);

    let dropzoneDragOver = new Event("dragover", { cancelable: true });
    dropzones[0]?.dispatchEvent(dropzoneDragOver);
    expect(dropzoneDragOver.defaultPrevented).toBe(true);

    elements.circleContainer.getBoundingClientRect = () =>
      ({
        bottom: 400,
        left: 0,
        right: 400,
        top: 0,
      }) as DOMRect;

    dnd.createDraggable("A1", "A1");
    let draggable = elements.draggables
      .querySelectorAll<HTMLElement>("div")
      .item(
        elements.draggables.querySelectorAll<HTMLElement>("div").length - 1,
      )!;

    let dragStart = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStart, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    draggable.dispatchEvent(dragStart);

    draggable.dispatchEvent(new Event("dragstart"));

    let dragEnd = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEnd, "clientX", { value: 10 });
    Object.defineProperty(dragEnd, "clientY", { value: 10 });
    document.dispatchEvent(dragEnd);

    expect(dropzones[0]?.getAttribute("data-dnd-value")).toBe("A1");
    dnd.cleanup();
  });

  it("covers occupied and invalid drag branches", async () => {
    let { createGameElements } = await import("game/elements");
    let { createDndController } = await import("game/dnd");

    let elements = createGameElements(document.querySelector("main")!);
    let dnd = createDndController({
      circleContainer: elements.circleContainer,
      draggables: elements.draggables,
    });

    let game = sampleGame();
    game.currentGuess.a = "A1";
    game.currentGuess.b = "B1";
    dnd.initDropzones(game);

    let dropzoneA = document.querySelector<HTMLElement>("#dropzone-a")!;
    let dropzoneB = document.querySelector<HTMLElement>("#dropzone-b")!;

    dropzoneA.getBoundingClientRect = () =>
      ({ bottom: 50, left: 0, right: 50, top: 0 }) as DOMRect;
    dropzoneB.getBoundingClientRect = () =>
      ({ bottom: 50, left: 100, right: 150, top: 0 }) as DOMRect;
    elements.circleContainer.getBoundingClientRect = () =>
      ({ bottom: 400, left: 0, right: 400, top: 0 }) as DOMRect;

    let dragStart = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStart, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzoneA.dispatchEvent(dragStart);

    let dragEndToOccupied = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndToOccupied, "clientX", { value: 110 });
    Object.defineProperty(dragEndToOccupied, "clientY", { value: 10 });
    document.dispatchEvent(dragEndToOccupied);

    expect(dropzoneA.getAttribute("data-dnd-value")).toBe("B1");
    expect(dropzoneB.getAttribute("data-dnd-value")).toBe("A1");

    let dropzoneAb = document.querySelector<HTMLElement>("#dropzone-ab")!;
    dropzoneAb.getBoundingClientRect = () =>
      ({ bottom: 50, left: 200, right: 250, top: 0 }) as DOMRect;

    let dragStartToEmpty = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartToEmpty, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzoneB.dispatchEvent(dragStartToEmpty);

    let dragEndToEmpty = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndToEmpty, "clientX", { value: 210 });
    Object.defineProperty(dragEndToEmpty, "clientY", { value: 10 });
    document.dispatchEvent(dragEndToEmpty);

    expect(dropzoneB.getAttribute("data-dnd-value")).toBeNull();
    expect(dropzoneAb.getAttribute("data-dnd-value")).toBe("A1");

    let dragStartOutside = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartOutside, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzoneA.dispatchEvent(dragStartOutside);

    let dragEndOutside = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndOutside, "clientX", { value: 500 });
    Object.defineProperty(dragEndOutside, "clientY", { value: 500 });
    document.dispatchEvent(dragEndOutside);

    expect(dropzoneA.getAttribute("data-dnd-value")).toBeNull();
    expect(elements.draggables.textContent).toContain("B1");

    let dragStartInsidePuzzle = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartInsidePuzzle, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzoneAb.dispatchEvent(dragStartInsidePuzzle);

    let dragEndInsidePuzzle = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndInsidePuzzle, "clientX", { value: 300 });
    Object.defineProperty(dragEndInsidePuzzle, "clientY", { value: 300 });
    document.dispatchEvent(dragEndInsidePuzzle);

    expect(dropzoneAb.getAttribute("data-dnd-value")).toBe("A1");

    dnd.createDraggable("C1", "C1");
    let draggable = elements.draggables.lastElementChild as HTMLElement;

    let dragStartFromDraggables = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartFromDraggables, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    draggable.dispatchEvent(dragStartFromDraggables);

    let dragEndIntoOccupied = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndIntoOccupied, "clientX", { value: 210 });
    Object.defineProperty(dragEndIntoOccupied, "clientY", { value: 10 });
    document.dispatchEvent(dragEndIntoOccupied);

    expect(elements.draggables.textContent).toContain("A1");

    dnd.createDraggable("D1", "D1");
    let noDropTarget = elements.draggables.lastElementChild as HTMLElement;

    let dragStartNoDropzone = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartNoDropzone, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    noDropTarget.dispatchEvent(dragStartNoDropzone);

    let dragEndNoDropzone = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndNoDropzone, "clientX", { value: 500 });
    Object.defineProperty(dragEndNoDropzone, "clientY", { value: 500 });
    document.dispatchEvent(dragEndNoDropzone);

    expect(elements.draggables.textContent).toContain("D1");

    let dragStartInvalid = new Event("dragstart") as DragEvent;
    Object.defineProperty(dragStartInvalid, "dataTransfer", {
      value: {
        setDragImage: vi.fn(),
      },
    });
    dropzoneB.dispatchEvent(dragStartInvalid);
    dropzoneB.textContent = "";
    dropzoneB.removeAttribute("data-dnd-value");

    let dragEndInvalid = new Event("dragend") as DragEvent;
    Object.defineProperty(dragEndInvalid, "clientX", { value: 10 });
    Object.defineProperty(dragEndInvalid, "clientY", { value: 10 });
    document.dispatchEvent(dragEndInvalid);

    dnd.cleanup();
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
    let { createGameElements } = await import("game/elements");
    let { createDndController } = await import("game/dnd");

    let elements = createGameElements(document.querySelector("main")!);
    let dnd = createDndController({
      circleContainer: elements.circleContainer,
      draggables: elements.draggables,
    });

    dnd.initDropzones(sampleGame());
    dnd.createDraggable("A1", "A1");

    let firstDropzone = document.querySelector<HTMLElement>(".dropzone")!;
    firstDropzone.getBoundingClientRect = () =>
      ({
        bottom: 50,
        left: 0,
        right: 50,
        top: 0,
      }) as DOMRect;

    let draggable = elements.draggables.querySelector<HTMLElement>("div")!;
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
    dnd.cleanup();
  });

  it("covers touch guard branches", async () => {
    let { createGameElements } = await import("game/elements");
    let { createDndController } = await import("game/dnd");

    let elements = createGameElements(document.querySelector("main")!);
    let dnd = createDndController({
      circleContainer: elements.circleContainer,
      draggables: elements.draggables,
    });

    dnd.initDropzones(sampleGame());
    dnd.createDraggable("A1", "A1");

    let draggable = elements.draggables.querySelector<HTMLElement>("div")!;
    draggable.removeAttribute("draggable");

    let touchStart = new Event("touchstart", { cancelable: true }) as TouchEvent;
    Object.defineProperty(touchStart, "touches", {
      value: [{ clientX: 5, clientY: 5 }],
    });
    draggable.dispatchEvent(touchStart);
    expect(touchStart.defaultPrevented).toBe(false);

    let touchMove = new Event("touchmove", { cancelable: true }) as TouchEvent;
    Object.defineProperty(touchMove, "touches", {
      value: [{ clientX: 10, clientY: 10 }],
    });
    document.dispatchEvent(touchMove);
    expect(touchMove.defaultPrevented).toBe(false);

    let touchEnd = new Event("touchend", { cancelable: true }) as TouchEvent;
    Object.defineProperty(touchEnd, "changedTouches", {
      value: [{ clientX: 10, clientY: 10 }],
    });
    document.dispatchEvent(touchEnd);
    expect(touchEnd.defaultPrevented).toBe(false);

    dnd.cleanup();
  });
});
