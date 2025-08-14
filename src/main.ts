import { gameList } from "./games"
import "./style.css"
import { localGame, localTheme, shuffle } from "./utils"

let main = document.querySelector("main")!
let circleContainer = document.querySelector(".circle-container")!
let howToPlay = document.querySelector(".how-to-play")!

let gameIndex =
  Math.floor(
    (new Date().getTime() - new Date("2025-08-14").getTime()) /
      (1000 * 3600 * 24)
  ) % gameList.length
let game = gameList[gameIndex]!

let title = document.createElement("h1")
title.innerHTML = `Today's Puzzle: ${game.title}`
main.insertBefore(title, circleContainer)

let storageGame = localGame.get()
if (storageGame && storageGame.index != gameIndex) {
  storageGame = null
  localGame.remove()
}

let currentGame: NonNullable<typeof storageGame> = storageGame ?? {
  ...game,
  currentGuess: {
    a: "",
    ab: "",
    abc: "",
    ac: "",
    b: "",
    bc: "",
    c: ""
  },
  hints: { a: false, b: false },
  guesses: [],
  index: gameIndex
}
let { currentGuess, guesses, hints } = currentGame

Object.entries(currentGuess).forEach(([key, value]) => {
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
})

let draggableContainer = document.createElement("div")
draggableContainer.classList.add("draggable-container")
main.insertBefore(draggableContainer, howToPlay)

let allValues = Object.entries(game.groups).flatMap(([, value]) => value)
let values = allValues.filter(
  v => !Object.values(currentGuess).some(value => v == value)
)
shuffle(Array.from(new Set(values))).forEach(createDraggable)

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
      currentGuess[dropzone.id.split("-")[1] as keyof typeof currentGuess] =
        dropzone.innerHTML
    })
    localGame.set(currentGame)
    appendSubmitButton()
  })
})

let submitButton = document.createElement("button")
submitButton.textContent = "Submit Solution"
submitButton.classList.add("submit-button")
submitButton.addEventListener("click", () => {
  if (guesses.some(g => JSON.stringify(g) == JSON.stringify(currentGuess))) {
    alert("You already guessed that! Please try again")
    return
  }
  guesses.push({ ...currentGuess })
  localGame.set(currentGame)
  evaluateGuess(true)
})

let hintsContainer = document.createElement("div")
hintsContainer.classList.add("hints-container")
main.insertBefore(hintsContainer, howToPlay)
Object.keys(hints).forEach(k => {
  let key = k as keyof typeof hints
  let hint = document.createElement("div")
  hintsContainer.appendChild(hint)
  let hintText = document.createElement("p")
  hintText.textContent =
    key == "a"
      ? `Hint A: ${allValues.find(value =>
          Object.values(game.groups).every(v => v.includes(value))
        )} is in the center`
      : `Hint B: ${game.hint}`
  let hintButton = document.createElement("button")
  hintButton.classList.add("hint-button")
  hintButton.textContent =
    key == "a"
      ? "Hint A: Click here to reveal who's in the center"
      : "Hint B: Click here to reveal clues about the categories"
  hintButton.addEventListener("click", () => {
    hints[key] = true
    localGame.set(currentGame)
    hintButton.remove()
    hint.appendChild(hintText)
  })
  hints[key] ? hint.appendChild(hintText) : hint.appendChild(hintButton)
})

let guessesText = document.createElement("p")
let remainingGuesses = 3 - guesses.length
guessesText.textContent = `${remainingGuesses} guess${
  remainingGuesses == 1 ? "" : "es"
} remaining`

appendSubmitButton()
function appendSubmitButton() {
  if (Object.values(currentGuess).every(v => v)) {
    draggableContainer.remove()
    main.insertBefore(submitButton, hintsContainer)
    main.insertBefore(guessesText, submitButton)
  }
}

evaluateGuess()
function evaluateGuess(clicked = false) {
  let groupEntries = Object.entries(game.groups)
  let [titleA] =
    groupEntries.find(([, value]) =>
      [
        currentGuess.a,
        currentGuess.ab,
        currentGuess.ac,
        currentGuess.abc
      ].every(p => value.includes(p))
    ) ?? []
  let [titleB] =
    groupEntries.find(([, value]) =>
      [
        currentGuess.b,
        currentGuess.ab,
        currentGuess.bc,
        currentGuess.abc
      ].every(p => value.includes(p))
    ) ?? []
  let [titleC] =
    groupEntries.find(([, value]) =>
      [
        currentGuess.c,
        currentGuess.ac,
        currentGuess.bc,
        currentGuess.abc
      ].every(p => value.includes(p))
    ) ?? []
  if (titleA && titleB && titleC) {
    let successMessage = document.createElement("h2")
    successMessage.textContent = "You got it! Congratulations 🥳"
    main.insertBefore(successMessage, circleContainer)
    ;[titleA, titleB, titleC].forEach((text, i) => {
      let title = document.createElement("div")
      title.textContent = text
      title.classList.add("title")
      title.classList.add(`title-${["a", "b", "c"][i]}`)
      circleContainer.appendChild(title)
    })
    let gameSummary = document.createElement("p")
    gameSummary.classList.add("game-summary")
    let hintCount = Object.values(hints).filter(Boolean).length
    let guessCount = guesses.length
    let summaryHTML =
      guessCount == 1 && hintCount == 0
        ? "Great job, you got it on the first try without using any hints"
        : `You used ${hintCount} hint${hintCount == 1 ? "" : "s"} and ${guessCount} guess${guessCount == 1 ? "" : "es"}`
    summaryHTML += " 😎<br />Come back tomorrow for a new puzzle!"
    gameSummary.innerHTML = summaryHTML
    main.insertBefore(gameSummary, howToPlay)
    document.querySelectorAll(".dropzone").forEach(dropzone => {
      dropzone.classList.remove("draggable")
      dropzone.setAttribute("draggable", "false")
    })
    guessesText.remove()
    hintsContainer.remove()
    submitButton.remove()
    return
  }
  let remainingGuesses = 3 - guesses.length
  if (remainingGuesses) {
    guessesText.textContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`
    if (clicked)
      alert(
        "That's not quite it but keep trying! " +
          `You have ${remainingGuesses} guess${
            remainingGuesses == 1 ? "" : "es"
          } remaining`
      )
  } else {
    let failureMessage = document.createElement("h2")
    failureMessage.textContent = "Better luck next time!"
    main.insertBefore(failureMessage, circleContainer)
    guessesText.remove()
    submitButton.remove()
    hintsContainer.remove()
    let entries = Object.entries(currentGame.groups)
    let [titleA, playersA] = entries[0]!
    let [titleB, playersB] = entries[1]!
    let [titleC, playersC] = entries[2]!
    let solution = {
      a: playersA.find(p => !playersB.includes(p) && !playersC.includes(p))!,
      b: playersB.find(p => !playersA.includes(p) && !playersC.includes(p))!,
      c: playersC.find(p => !playersA.includes(p) && !playersB.includes(p))!,
      ab: playersA.find(p => playersB.includes(p) && !playersC.includes(p))!,
      ac: playersA.find(p => !playersB.includes(p) && playersC.includes(p))!,
      bc: playersB.find(p => !playersA.includes(p) && playersC.includes(p))!,
      abc: playersA.find(p => playersB.includes(p) && playersC.includes(p))!
    }
    Object.entries(solution).forEach(([k, value]) => {
      let key = k as keyof typeof solution
      let dropzone = main.querySelector(`#dropzone-${key}`)
      if (!dropzone) return
      dropzone.textContent = value
      dropzone.classList.remove("draggable")
    })
    ;[titleA, titleB, titleC].forEach((text, i) => {
      let title = document.createElement("div")
      title.textContent = text
      title.classList.add("title")
      title.classList.add(`title-${["a", "b", "c"][i]}`)
      circleContainer.appendChild(title)
    })
    let gameSummary = document.createElement("p")
    gameSummary.classList.add("game-summary")
    gameSummary.innerHTML =
      "This was a tough one and you're out of guesses 😔" +
      "<br />Come back tomorrow for a new puzzle!"
    main.insertBefore(gameSummary, howToPlay)
  }
}

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
