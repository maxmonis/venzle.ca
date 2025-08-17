import {
  circleContainer,
  draggableContainer,
  guessesText,
  instructionText,
  main,
  submitButton
} from "./elements"
import type { Game } from "./types"
import { shuffle } from "./utils"

let isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
let touchDraggable: HTMLElement | null = null

if (!isTouch) {
  document.addEventListener("dragover", e => {
    e.preventDefault()
  })
  document.addEventListener("drop", e => {
    e.preventDefault()
    let dragEvent = e as DragEvent
    let dragEventText = dragEvent.dataTransfer?.getData("text")
    let dragEventValue = dragEvent.dataTransfer?.getData("value")
    if (!dragEventText || !dragEventValue) return
    let sourceDropzone = Array.from(
      document.querySelectorAll(".dropzone")
    ).find(el => el.getAttribute("data-dnd-value") == dragEventValue)
    if (!sourceDropzone) return
    sourceDropzone.textContent = ""
    sourceDropzone.removeAttribute("data-dnd-value")
    sourceDropzone.removeAttribute("draggable")
    if (!main.contains(instructionText))
      main.insertBefore(instructionText, draggableContainer)
    guessesText.remove()
    submitButton.remove()
    createDraggable(dragEventText, dragEventValue)
    new BroadcastChannel("game").postMessage("update")
  })
} else {
  document.addEventListener(
    "touchmove",
    e => {
      let touch = e.touches[0]
      if (!touchDraggable || !touch) return
      e.preventDefault()
      touchDraggable.style.position = "fixed"
      touchDraggable.style.left = `${touch.clientX - 40}px`
      touchDraggable.style.top = `${touch.clientY - 40}px`
      for (let zone of document.querySelectorAll(".dropzone")) {
        let rect = (zone as HTMLElement).getBoundingClientRect()
        zone.classList.toggle(
          "dragover",
          touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom
        )
      }
    },
    { passive: false }
  )
  document.addEventListener("touchend", e => {
    let touch = e.changedTouches[0]
    if (!touchDraggable || !touch) return
    e.preventDefault()
    touchDraggable.classList.remove("dragover")
    let dropzone: HTMLElement | null = null
    for (let zone of document.querySelectorAll(".dropzone")) {
      zone.classList.remove("dragover")
      let rect = (zone as HTMLElement).getBoundingClientRect()
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom &&
        zone.textContent != touchDraggable.textContent
      )
        dropzone = zone as HTMLElement
    }
    let text = touchDraggable.textContent
    let value = touchDraggable.getAttribute("data-dnd-value")
    if (!text || !value) return
    let sourceDropzone = Array.from(
      document.querySelectorAll(".dropzone")
    ).find(el => el.getAttribute("data-dnd-value") == value)
    let dropzoneText = dropzone?.textContent
    let dropzoneValue = dropzone?.getAttribute("data-dnd-value")
    if (sourceDropzone) {
      sourceDropzone.textContent = dropzoneText ?? null
      if (dropzoneValue)
        sourceDropzone.setAttribute("data-dnd-value", dropzoneValue)
      else {
        sourceDropzone.removeAttribute("data-dnd-value")
        sourceDropzone.removeAttribute("draggable")
      }
    } else {
      let draggedElement = Array.from(
        document.querySelectorAll("[draggable=true]")
      ).find(el => el.getAttribute("data-dnd-value") == value)
      if (draggedElement) draggedElement.remove()
      if (dropzoneText && dropzoneValue)
        createDraggable(dropzoneText, dropzoneValue)
    }
    if (dropzone) {
      dropzone.textContent = text
      dropzone.setAttribute("data-dnd-value", value)
      makeElementDraggable(dropzone)
    } else createDraggable(text, value)
    touchDraggable.style.position = ""
    touchDraggable.style.left = ""
    touchDraggable.style.top = ""
    touchDraggable.style.opacity = ""
    touchDraggable = null
    new BroadcastChannel("game").postMessage("update")
  })
}

export function createDraggable(text: string, value: string) {
  let draggable = document.createElement("div")
  draggable.textContent = text
  draggable.setAttribute("data-dnd-value", value)
  makeElementDraggable(draggable)
  draggableContainer.appendChild(draggable)
}

export function createDragImage(dataTransfer: DataTransfer) {
  let text = dataTransfer.getData("text")
  let value = dataTransfer.getData("value")
  if (!text || !value) return
  let dragImage = document.createElement("div")
  dragImage.textContent = text
  dragImage.setAttribute("data-dnd-value", value)
  dragImage.setAttribute("draggable", "true")
  document.body.appendChild(dragImage)
  dataTransfer.setDragImage(dragImage, 40, 40)
  setTimeout(() => {
    dragImage.remove()
  }, 0)
}

export function initDraggables(game: Game) {
  for (let text of shuffle(
    Array.from(
      new Set(
        Object.values(game.groups)
          .flatMap(v => v)
          .filter(
            value => !Object.values(game.currentGuess).some(v => v == value)
          )
      )
    )
  ))
    createDraggable(text, text)
}

export function initDropzones(game: Game) {
  Object.entries(game.currentGuess).forEach(([key, value]) => {
    let dropzone = document.createElement("div")
    let id = `dropzone-${key}`
    dropzone.id = id
    dropzone.classList.add("dropzone", id)
    if (value) {
      dropzone.textContent = value
      dropzone.setAttribute("data-dnd-value", value)
      makeElementDraggable(dropzone)
    }
    circleContainer.appendChild(dropzone)
    if (isTouch) return
    dropzone.addEventListener("dragenter", e => {
      e.preventDefault()
      dropzone.classList.add("dragover")
    })
    dropzone.addEventListener("dragleave", e => {
      e.preventDefault()
      dropzone.classList.remove("dragover")
    })
    dropzone.addEventListener("dragover", e => {
      e.preventDefault()
    })
    dropzone.addEventListener("drop", e => {
      e.preventDefault()
      e.stopPropagation()
      dropzone.classList.remove("dragover")
      let dragEvent = e as DragEvent
      let dragEventText = dragEvent.dataTransfer?.getData("text")
      let dragEventValue = dragEvent.dataTransfer?.getData("value")
      if (!dragEventText || !dragEventValue) return
      let dropzoneText = dropzone.textContent
      let dropzoneValue = dropzone.getAttribute("data-dnd-value")
      dropzone.setAttribute("draggable", "true")
      let sourceDropzone = Array.from(
        document.querySelectorAll(".dropzone")
      ).find(el => el.getAttribute("data-dnd-value") == dragEventValue)
      if (sourceDropzone) {
        sourceDropzone.textContent = dropzoneText
        if (dropzoneValue)
          sourceDropzone.setAttribute("data-dnd-value", dropzoneValue)
        else {
          sourceDropzone.removeAttribute("data-dnd-value")
          sourceDropzone.removeAttribute("draggable")
        }
      } else {
        let draggedElement = Array.from(
          document.querySelectorAll("[draggable=true]")
        ).find(el => el.getAttribute("data-dnd-value") == dragEventValue)
        if (draggedElement) draggedElement.remove()
        if (dropzoneText && dropzoneValue)
          createDraggable(dropzoneText, dropzoneValue)
      }
      dropzone.textContent = dragEventText
      dropzone.setAttribute("data-dnd-value", dragEventValue)
      makeElementDraggable(dropzone)
      new BroadcastChannel("game").postMessage("update")
    })
  })
}

function makeElementDraggable(element: HTMLElement) {
  element.setAttribute("draggable", "true")
  if (!isTouch)
    element.addEventListener("dragstart", e => {
      let draggableText = element.textContent
      let draggableValue = element.getAttribute("data-dnd-value")
      if (!e.dataTransfer || !draggableText || !draggableValue) return
      e.dataTransfer.setData("text", draggableText)
      e.dataTransfer.setData("value", draggableValue)
      createDragImage(e.dataTransfer)
    })
  else
    element.addEventListener(
      "touchstart",
      e => {
        let touch = e.touches[0]
        if (!touch || !element.getAttribute("draggable")) return
        e.preventDefault()
        touchDraggable = element
        element.style.position = "fixed"
        element.style.opacity = "100%"
        element.style.left = `${touch.clientX - 40}px`
        element.style.top = `${touch.clientY - 40}px`
      },
      { passive: false }
    )
}
