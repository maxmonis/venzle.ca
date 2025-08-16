import { createDragImage, createDraggable } from "./draggable"
import { circleContainer } from "./elements"
import { updateGameState } from "./game"
import type { Game } from "./types"

export function initDropzones(game: Game) {
  Object.entries(game.currentGuess).forEach(([key, value]) => {
    let dropzone = document.createElement("div")
    dropzone.classList.add("dropzone")
    dropzone.id = `dropzone-${key}`
    if (value) {
      dropzone.textContent = value
      dropzone.setAttribute("data-value", value)
      dropzone.setAttribute("draggable", "true")
      dropzone.classList.add("draggable")
      dropzone.addEventListener("dragstart", e => {
        let dragEvent = e as DragEvent
        let dropzoneText = dropzone.textContent
        let dropzoneValue = dropzone.getAttribute("data-value")
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
      let dropzoneValue = dropzone.getAttribute("data-value")
      dropzone.classList.add("draggable")
      dropzone.setAttribute("draggable", "true")
      let sourceDropzone = Array.from(
        document.querySelectorAll(".dropzone")
      ).find(el => el.getAttribute("data-value") == dragEventValue)
      if (sourceDropzone) {
        sourceDropzone.textContent = dropzoneText
        sourceDropzone.classList.toggle("draggable", Boolean(dropzoneValue))
        if (dropzoneValue)
          sourceDropzone.setAttribute("data-value", dropzoneValue)
        else sourceDropzone.removeAttribute("data-value")
      } else {
        let draggedElement = Array.from(
          document.querySelectorAll(".draggable")
        ).find(el => el.getAttribute("data-value") == dragEventValue)
        if (draggedElement) draggedElement.remove()
        if (dropzoneText && dropzoneValue)
          createDraggable(dropzoneText, dropzoneValue)
      }
      dropzone.textContent = dragEventText
      dropzone.setAttribute("data-value", dragEventValue)
      dropzone.addEventListener("dragstart", e => {
        let dragEvent = e as DragEvent
        let dropzoneText = dropzone.textContent
        let dropzoneValue = dropzone.getAttribute("data-value")
        if (!dragEvent.dataTransfer || !dropzoneText || !dropzoneValue) return
        dragEvent.dataTransfer.setData("text", dropzoneText)
        dragEvent.dataTransfer.setData("value", dropzoneValue)
        createDragImage(dropzoneText, dropzoneValue, dragEvent.dataTransfer)
      })
      updateGameState(game)
    })
  })
}
