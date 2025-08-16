import { createDragImage, createDraggable } from "./draggable"
import { circleContainer } from "./elements"
import { updateGameState } from "./game"
import type { Game } from "./types"

export function initDropzones(game: Game) {
  Object.entries(game.currentGuess).forEach(([key, value]) => {
    let dropzone = document.createElement("div")
    let id = `dropzone-${key}`
    dropzone.id = id
    dropzone.classList.add("dropzone", id)
    if (value) {
      dropzone.textContent = value
      dropzone.setAttribute("data-dnd-value", value)
      dropzone.setAttribute("draggable", "true")
      dropzone.addEventListener("dragstart", e => {
        let dragEvent = e as DragEvent
        let dropzoneText = dropzone.textContent
        let dropzoneValue = dropzone.getAttribute("data-dnd-value")
        if (!dragEvent.dataTransfer || !dropzoneText || !dropzoneValue) return
        dragEvent.dataTransfer.setData("text", dropzoneText)
        dragEvent.dataTransfer.setData("value", dropzoneValue)
        createDragImage(dropzoneText, dropzoneValue, dragEvent.dataTransfer)
      })
    }
    circleContainer.appendChild(dropzone)
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
      dropzone.addEventListener("dragstart", e => {
        let dragEvent = e as DragEvent
        let dropzoneText = dropzone.textContent
        let dropzoneValue = dropzone.getAttribute("data-dnd-value")
        if (!dragEvent.dataTransfer || !dropzoneText || !dropzoneValue) return
        dragEvent.dataTransfer.setData("text", dropzoneText)
        dragEvent.dataTransfer.setData("value", dropzoneValue)
        createDragImage(dropzoneText, dropzoneValue, dragEvent.dataTransfer)
      })
      updateGameState(game)
    })
  })
}
