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
      dropzone.classList.add("draggable")
      dropzone.setAttribute("draggable", "true")
      dropzone.addEventListener("dragstart", e => {
        let dragEvent = e as DragEvent
        if (!dragEvent.dataTransfer || !dropzone.textContent) return
        dragEvent.dataTransfer.setData("textContent", dropzone.textContent)
        createDragImage(dropzone, dragEvent.dataTransfer)
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
      if (!dragEvent.dataTransfer) return
      dropzone.classList.add("draggable")
      dropzone.setAttribute("draggable", "true")
      let textContent = dragEvent.dataTransfer.getData("textContent")
      let sourceDropzone = Array.from(
        document.querySelectorAll(".dropzone")
      ).find(el => el.textContent == textContent)
      if (sourceDropzone) {
        sourceDropzone.textContent = dropzone.textContent
        sourceDropzone.classList.toggle(
          "draggable",
          Boolean(dropzone.textContent)
        )
      } else {
        let draggedElement = Array.from(
          document.querySelectorAll(".draggable")
        ).find(el => el.textContent == textContent)
        if (draggedElement) draggedElement.remove()
        if (dropzone.textContent) createDraggable(dropzone.textContent)
      }
      dropzone.textContent = textContent
      dropzone.addEventListener("dragstart", e => {
        let dragEvent = e as DragEvent
        if (!dragEvent.dataTransfer || !dropzone.textContent) return
        dragEvent.dataTransfer.setData("textContent", dropzone.textContent)
        createDragImage(dropzone, dragEvent.dataTransfer)
      })
      updateGameState(game)
    })
  })
}
