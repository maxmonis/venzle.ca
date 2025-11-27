import type { Game } from "lib/types";
import { gameEvent } from "lib/utils";
import { circleContainer, draggables } from "./elements";

// the element currently being dragged
let draggedElement: HTMLElement | null = null;

// the events are different for touch screens
let isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints;

if (!isTouchScreen) {
  // it's not a touch screen so init drag events

  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("dragend", (e) => {
    e.preventDefault();
    handleEnd(e.clientX, e.clientY);
  });
} else {
  // it is a touch screen so init touch events

  document.addEventListener("touchend", (e) => {
    let touch = e.changedTouches[0];

    if (draggedElement && touch) {
      e.preventDefault();
      handleEnd(touch.clientX, touch.clientY);
    }
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      let touch = e.touches[0];

      if (!draggedElement || !touch) {
        return;
      }

      e.preventDefault();

      draggedElement.style.position = "fixed";
      draggedElement.style.opacity = "100%";
      draggedElement.style.zIndex = "10";
      draggedElement.style.left = `${touch.clientX - 40}px`;
      draggedElement.style.top = `${touch.clientY - 40}px`;

      // check whether currently dragging over any dropzones
      for (let zone of document.querySelectorAll<HTMLElement>(".dropzone")) {
        let rect = zone.getBoundingClientRect();

        // toggle "dragover" class of dropzone as appropriate
        zone.classList.toggle(
          "dragover",
          touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom,
        );
      }
    },
    {
      passive: false,
    },
  );
}

/**
 * Makes a draggable element and appends it to the list
 */
export function createDraggable(text: string, value: string) {
  let draggable = document.createElement("div");
  makeElementDraggable(draggable, text, value);
  draggables.append(draggable);
}

/**
 * Handler for when the user stops dragging an element
 */
function handleEnd(clientX: number, clientY: number) {
  if (!draggedElement) {
    return;
  }

  draggedElement.classList.remove("dragover");

  // text and value are separate because the user may have localized the UI,
  // but even if the text is "perro" we need the value to be "dog"
  let draggedElementText = draggedElement.textContent;
  let draggedElementValue = draggedElement.getAttribute("data-dnd-value");

  let newDropzone: HTMLElement | null = null; // where they dropped
  let oldDropzone: HTMLElement | null = null; // where they dragged from

  for (let zone of document.querySelectorAll<HTMLElement>(".dropzone")) {
    zone.classList.remove("dragover");

    if (
      draggedElementValue &&
      zone.getAttribute("data-dnd-value") == draggedElementValue
    ) {
      // this is the previous dropzone the dragged element had been occupying
      oldDropzone = zone;
      continue;
    }

    // get the position of the dropzone
    let rect = zone.getBoundingClientRect();

    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      // this is the new dropzone the dragged element was dropped into
      newDropzone = zone;
    }
  }

  if (!draggedElementText || !draggedElementValue) {
    return;
  }

  let newDropzoneText = newDropzone?.textContent;
  let newDropzoneValue = newDropzone?.getAttribute("data-dnd-value");

  if (newDropzone) {
    // they dropped in a dropzone and need to be able to drag again
    makeElementDraggable(newDropzone, draggedElementText, draggedElementValue);
  }

  if (oldDropzone && newDropzone) {
    // they moved an element from one dropzone to another

    if (newDropzoneText && newDropzoneValue) {
      // the new dropzone was occupied so move its value to the prior one
      oldDropzone.innerHTML = `<span>${newDropzoneText}</span>`;
      oldDropzone.setAttribute("data-dnd-value", newDropzoneValue);
    } else {
      // the new dropzone was unoccupied so clear the prior one
      oldDropzone.innerHTML = "";
      oldDropzone.removeAttribute("data-dnd-value");
      oldDropzone.removeAttribute("draggable");
    }
  } else if (oldDropzone) {
    // they moved an element from a dropzone to NOT a dropzone

    // get the position of the puzzle
    let rect = circleContainer.getBoundingClientRect();

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      // they dropped it outside the puzzle, so remove it from the puzzle
      oldDropzone.innerHTML = "";
      oldDropzone.removeAttribute("data-dnd-value");
      oldDropzone.removeAttribute("draggable");

      // add it to the draggables
      createDraggable(draggedElementText, draggedElementValue);
    }
  } else if (newDropzone) {
    // they moved an element from NOT a dropzone to a dropzone

    draggedElement.remove();

    if (newDropzoneText && newDropzoneValue) {
      // the new dropzone was occupied so return it to the draggables
      createDraggable(newDropzoneText, newDropzoneValue);
    }
  }

  // reset dragged element
  draggedElement.style.cssText = "";
  draggedElement = null;

  // ensure game state reflects new position(s)
  gameEvent.post("update");
}

/**
 * Displays all draggable items below the puzzle
 */
export function initDraggables(game: Game) {
  for (let text of shuffle(
    Array.from(
      new Set(
        Object.values(game.groups)
          .flatMap((v) => v)
          .filter(
            (value) =>
              !Object.values(game.currentGuess).some((v) => v == value),
          ),
      ),
    ),
  )) {
    createDraggable(text, text);
  }
}

/**
 * Initializes the available areas where elements can be dropped
 */
export function initDropzones(game: Game) {
  circleContainer.append(
    ...Object.entries(game.currentGuess).map(([key, value]) => {
      let id = `dropzone-${key}`;
      let dropzone = document.createElement("div");

      dropzone.id = id;
      dropzone.classList.add("dropzone", id);

      if (value) {
        // something has been dropped here and must be actionable
        makeElementDraggable(dropzone, value, value);
      }

      if (!isTouchScreen) {
        // toggle "dragover" class as appropriate

        dropzone.addEventListener("dragenter", (e) => {
          e.preventDefault();
          dropzone.classList.add("dragover");
        });

        dropzone.addEventListener("dragleave", (e) => {
          e.preventDefault();
          dropzone.classList.remove("dragover");
        });

        dropzone.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
      }

      return dropzone;
    }),
  );
}

/**
 * Makes an element available for dragging
 */
function makeElementDraggable(
  element: HTMLElement,
  text: string,
  value: string,
) {
  element.innerHTML = `<span>${text}</span>`;
  element.setAttribute("data-dnd-value", value);
  element.setAttribute("draggable", "true");

  if (!isTouchScreen) {
    element.addEventListener("dragstart", (e) => {
      if (!e.dataTransfer) {
        return;
      }

      // create and append the new draggable element
      let dragImage = document.createElement("div");
      dragImage.textContent = element.textContent;
      dragImage.setAttribute("draggable", "true");
      document.body.append(dragImage);
      e.dataTransfer.setDragImage(dragImage, 40, 40);
      setTimeout(() => {
        dragImage.remove();
      }, 0);

      // updated dragged element
      draggedElement = element;
    });
  } else {
    element.addEventListener(
      "touchstart",
      (e) => {
        let touch = e.touches[0];

        if (touch && element.getAttribute("draggable")) {
          e.preventDefault();
          // update dragged element
          draggedElement = element;
        }
      },
      {
        passive: false,
      },
    );
  }
}

/**
 * Randomizes the order of a list
 */
function shuffle<T>(items: Array<T>) {
  let res = [...items];
  let len = res.length;

  for (let i = 0; i < len; i++) {
    let item = res[i]!;
    let randomIndex = Math.floor(Math.random() * len);

    res[i] = res[randomIndex]!;
    res[randomIndex] = item;
  }

  return res;
}
