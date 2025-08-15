import { draggableContainer } from "./elements"

export function createDraggable(value: string) {
  let draggable = document.createElement("div")
  draggable.textContent = value
  draggable.classList.add("draggable")
  draggable.setAttribute("draggable", "true")
  draggable.addEventListener("dragstart", e => {
    if (!e.dataTransfer || !draggable.textContent) return
    e.dataTransfer.setData("textContent", draggable.textContent)
    createDragImage(draggable, e.dataTransfer)
  })
  draggableContainer.appendChild(draggable)
}

export function createDragImage(element: Element, dataTransfer: DataTransfer) {
  let dragImage = document.createElement("div")
  dragImage.textContent = element.textContent
  dragImage.classList.add("draggable")
  document.body.appendChild(dragImage)
  dataTransfer.setDragImage(dragImage, 40, 40)
  setTimeout(() => {
    dragImage.remove()
  }, 0)
}
