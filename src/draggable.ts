import { draggableContainer } from "./elements"

export function createDraggable(text: string, value: string) {
  let draggable = document.createElement("div")
  draggable.textContent = text
  draggable.setAttribute("data-dnd-value", value)
  draggable.setAttribute("draggable", "true")
  draggable.addEventListener("dragstart", e => {
    let draggableText = draggable.textContent
    let draggableValue = draggable.getAttribute("data-dnd-value")
    if (!e.dataTransfer || !draggableText || !draggableValue) return
    e.dataTransfer.setData("text", draggableText)
    e.dataTransfer.setData("value", draggableValue)
    createDragImage(draggableText, draggableValue, e.dataTransfer)
  })
  draggableContainer.appendChild(draggable)
}

export function createDragImage(
  text: string,
  value: string,
  dataTransfer: DataTransfer
) {
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
