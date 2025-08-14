import { game } from "./games"
import "./style.css"
import { localTheme, shuffle } from "./utils"

let main = document.querySelector("main")!
let circleContainer = document.querySelector(".circle-container")!
let howToPlay = document.querySelector(".how-to-play")!

let title = document.createElement("h1")
title.innerHTML = `Today's Puzzle: ${game.title}`
main.insertBefore(title, circleContainer)

let hints = { a: false, b: false }
let positions = {
  a: "",
  ab: "",
  abc: "",
  ac: "",
  b: "",
  bc: "",
  c: ""
}

Object.keys(positions).forEach(key => {
  let dropzone = document.createElement("div")
  dropzone.classList.add("dropzone")
  dropzone.id = `dropzone-${key}`
  circleContainer.appendChild(dropzone)
})

let draggableContainer = document.createElement("div")
draggableContainer.classList.add("draggable-container")
main.insertBefore(draggableContainer, howToPlay)

let entries = Object.entries(game.groups)
let allValues = entries.flatMap(([, value]) => value)
shuffle(Array.from(new Set(allValues))).forEach(createDraggable)

function createDraggable(value: string) {
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

function createDragImage(element: Element, dataTransfer: DataTransfer) {
  let dragImage = document.createElement("div")
  dragImage.textContent = element.textContent
  dragImage.classList.add("draggable")
  document.body.appendChild(dragImage)
  dataTransfer.setDragImage(dragImage, 40, 40)
  setTimeout(() => {
    dragImage.remove()
  }, 0)
}

document.querySelectorAll(".dropzone").forEach(dropzone => {
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
    document.querySelectorAll(".dropzone").forEach(dropzone => {
      positions[dropzone.id.split("-")[1] as keyof typeof positions] =
        dropzone.innerHTML
    })
    if (Object.entries(positions).every(([, value]) => value)) {
      draggableContainer.remove()
      main.insertBefore(submitButton, hintsContainer)
    }
  })
})

let submitButton = document.createElement("button")
submitButton.textContent = "Submit Solution"
submitButton.classList.add("submit-button")
submitButton.addEventListener("click", () => {
  let [a] =
    entries.find(([, value]) =>
      [positions.a, positions.ab, positions.ac, positions.abc].every(p =>
        value.includes(p)
      )
    ) ?? []
  let [b] =
    entries.find(([, value]) =>
      [positions.b, positions.ab, positions.bc, positions.abc].every(p =>
        value.includes(p)
      )
    ) ?? []
  let [c] =
    entries.find(([, value]) =>
      [positions.c, positions.ac, positions.bc, positions.abc].every(p =>
        value.includes(p)
      )
    ) ?? []
  if (a && b && c) {
    let successMessage = document.createElement("h2")
    successMessage.textContent = "You got it! Congratulations 🥳"
    main.insertBefore(successMessage, circleContainer)
    ;[a, b, c].forEach((text, i) => {
      let title = document.createElement("div")
      title.textContent = text
      title.classList.add("title")
      title.classList.add(`title-${["a", "b", "c"][i]}`)
      circleContainer.appendChild(title)
    })
    let gameSummary = document.createElement("div")
    gameSummary.classList.add("game-summary")
    main.insertBefore(gameSummary, howToPlay)
    let hintsText = document.createElement("p")
    let hintCount = Object.values(hints).filter(Boolean).length
    hintsText.textContent = `${hintCount} hint${hintCount == 1 ? "" : "s"} used`
    gameSummary.appendChild(hintsText)
    document.querySelectorAll(".dropzone").forEach(dropzone => {
      dropzone.classList.remove("draggable")
      dropzone.setAttribute("draggable", "false")
    })
    hintsContainer.remove()
    submitButton.remove()
  }
})

let hintsContainer = document.createElement("div")
hintsContainer.classList.add("hints-container")
main.insertBefore(hintsContainer, howToPlay)
Object.keys(hints).forEach(k => {
  let key = k as keyof typeof hints
  let hint = document.createElement("div")
  hintsContainer.appendChild(hint)
  let hintButton = document.createElement("button")
  hintButton.classList.add("hint-button")
  hintButton.textContent =
    key == "a" ? "Hint A: who's in the center" : "Hint B: category clues"
  hintButton.addEventListener("click", () => {
    hints[key] = true
    let hintText = document.createElement("p")
    hintText.textContent =
      key == "a"
        ? `Hint A: ${allValues.find(value =>
            entries.every(([, v]) => v.includes(value))
          )} is in the center`
        : `Hint B: ${game.hint}`
    hintButton.remove()
    hint.appendChild(hintText)
  })
  hint.appendChild(hintButton)
})

let theme = localTheme.get()
if (!theme)
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
let toggle = document.createElement("button")
toggle.classList.add("theme-toggle")
toggle.setAttribute("aria-label", "toggle dark mode")
toggle.addEventListener("click", () => {
  theme = theme == "light" ? "dark" : "light"
  localTheme.set(theme)
  applyTheme()
})
main.appendChild(toggle)

function applyTheme() {
  document.body.classList.toggle("dark", theme == "dark")
  toggle.innerText = theme == "dark" ? "🌛" : "🌞"
}

applyTheme()
