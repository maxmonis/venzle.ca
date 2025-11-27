import type { Game } from "lib/types";
import { gameEvent } from "lib/utils";
import { circleContainer, draggables } from "./elements";

let isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints;
let draggedElement: HTMLElement | null = null;

if (!isTouchScreen) {
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  document.addEventListener("dragend", (e) => {
    e.preventDefault();
    handleEnd(e.clientX, e.clientY);
  });
} else {
  document.addEventListener("touchend", (e) => {
    let touch = e.changedTouches[0];
    if (!draggedElement || !touch) return;
    e.preventDefault();
    handleEnd(touch.clientX, touch.clientY);
  });
  document.addEventListener(
    "touchmove",
    (e) => {
      let touch = e.touches[0];
      if (!draggedElement || !touch) return;
      e.preventDefault();
      draggedElement.style.position = "fixed";
      draggedElement.style.opacity = "100%";
      draggedElement.style.zIndex = "10";
      draggedElement.style.left = `${touch.clientX - 40}px`;
      draggedElement.style.top = `${touch.clientY - 40}px`;
      for (let zone of document.querySelectorAll<HTMLElement>(".dropzone")) {
        let rect = zone.getBoundingClientRect();
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

export function createDraggable(text: string, value: string) {
  let draggable = document.createElement("div");
  makeElementDraggable(draggable, text, value);
  draggables.append(draggable);
}

function handleEnd(clientX: number, clientY: number) {
  if (!draggedElement) return;
  draggedElement.classList.remove("dragover");
  let draggedElementText = draggedElement.textContent;
  let draggedElementValue = draggedElement.getAttribute("data-dnd-value");
  let newDropzone: HTMLElement | null = null;
  let oldDropzone: HTMLElement | null = null;
  for (let zone of document.querySelectorAll<HTMLElement>(".dropzone")) {
    zone.classList.remove("dragover");
    if (
      draggedElementValue &&
      zone.getAttribute("data-dnd-value") == draggedElementValue
    ) {
      oldDropzone = zone;
      continue;
    }
    let rect = zone.getBoundingClientRect();
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    )
      newDropzone = zone;
  }
  if (!draggedElementText || !draggedElementValue) return;
  let newDropzoneText = newDropzone?.textContent;
  let newDropzoneValue = newDropzone?.getAttribute("data-dnd-value");
  if (newDropzone)
    makeElementDraggable(newDropzone, draggedElementText, draggedElementValue);
  if (oldDropzone && newDropzone) {
    if (newDropzoneText && newDropzoneValue) {
      oldDropzone.innerHTML = `<span>${newDropzoneText}</span>`;
      oldDropzone.setAttribute("data-dnd-value", newDropzoneValue);
    } else {
      oldDropzone.innerHTML = "";
      oldDropzone.removeAttribute("data-dnd-value");
      oldDropzone.removeAttribute("draggable");
    }
  } else if (oldDropzone) {
    let rect = circleContainer.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      oldDropzone.innerHTML = "";
      oldDropzone.removeAttribute("data-dnd-value");
      oldDropzone.removeAttribute("draggable");
      createDraggable(draggedElementText, draggedElementValue);
    }
  } else if (newDropzone) {
    draggedElement.remove();
    if (newDropzoneText && newDropzoneValue)
      createDraggable(newDropzoneText, newDropzoneValue);
  }
  draggedElement.style.cssText = "";
  draggedElement = null;
  gameEvent.post("update");
}

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
  ))
    createDraggable(text, text);
}

export function initDropzones(game: Game) {
  circleContainer.append(
    ...Object.entries(game.currentGuess).map(([key, value]) => {
      let dropzone = document.createElement("div");
      let id = `dropzone-${key}`;
      dropzone.id = id;
      dropzone.classList.add("dropzone", id);
      if (value) makeElementDraggable(dropzone, value, value);
      if (!isTouchScreen) {
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

function makeElementDraggable(
  element: HTMLElement,
  text: string,
  value: string,
) {
  element.innerHTML = `<span>${text}</span>`;
  element.setAttribute("data-dnd-value", value);
  element.setAttribute("draggable", "true");
  if (!isTouchScreen)
    element.addEventListener("dragstart", (e) => {
      if (!e.dataTransfer) return;
      let dragImage = document.createElement("div");
      dragImage.textContent = element.textContent;
      dragImage.setAttribute("draggable", "true");
      document.body.append(dragImage);
      e.dataTransfer.setDragImage(dragImage, 40, 40);
      setTimeout(() => {
        dragImage.remove();
      }, 0);
      draggedElement = element;
    });
  else
    element.addEventListener(
      "touchstart",
      (e) => {
        let touch = e.touches[0];
        if (!touch || !element.getAttribute("draggable")) return;
        e.preventDefault();
        draggedElement = element;
      },
      {
        passive: false,
      },
    );
}

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
