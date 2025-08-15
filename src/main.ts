import { gameList } from "./games"
import "./style.css"
import { localGame, localStats, localTheme, shuffle } from "./utils"

let main = document.querySelector("main")!
let circleContainer = document.querySelector(".circle-container")!
let howToPlay = document.querySelector(".how-to-play")!
let instructionText = document.querySelector(".instruction-text")!

let gameIndex =
  Math.floor(
    (new Date().getTime() - new Date("2025-08-14").getTime()) /
      (1000 * 3600 * 24)
  ) % gameList.length
let game = gameList[gameIndex]!

let currentStats = localStats.get()
if (!currentStats)
  currentStats = {
    played: {
      first: -1,
      last: -1,
      streakStart: -1,
      total: 0
    },
    solved: {
      first: -1,
      last: -1,
      streakStart: -1,
      total: 0
    }
  }
let { played, solved } = currentStats
if (played.last < gameIndex - 1) played.streakStart = -1
if (solved.last < gameIndex - 1) solved.streakStart = -1
localStats.set(currentStats)

let statsText = document.createElement("p")
statsText.classList.add("stats-text")
main.append(statsText)
displayCurrentStats()

function displayCurrentStats() {
  statsText.innerHTML = `Current Streak: ${
    played.streakStart == -1 ? 0 : gameIndex - played.streakStart + 1
  } played and ${
    solved.streakStart == -1 ? 0 : gameIndex - solved.streakStart + 1
  } won.<br />Total Games: ${played.total} played and ${solved.total} won.`
}

let title = document.createElement("h1")
title.innerHTML = `Today's Puzzle: ${game.title}`
main.insertBefore(title, circleContainer)

let currentGame = localGame.get()
if (!currentGame || currentGame.index != gameIndex) {
  currentGame = {
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
    hints: { a: false, b: false, c: false },
    guesses: [],
    index: gameIndex
  }
  localGame.set(currentGame)
}
let groupEntries = Object.entries(currentGame.groups)
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

let allValues = groupEntries.flatMap(([, v]) => v)
let values = allValues.filter(
  v => !Object.values(currentGuess).some(value => v == value)
)
shuffle(Array.from(new Set(values))).forEach(createDraggable)

document.addEventListener("dragover", e => {
  e.preventDefault()
})

document.addEventListener("drop", e => {
  e.preventDefault()
  let dragEvent = e as DragEvent
  let textContent = dragEvent.dataTransfer?.getData("textContent")
  if (!textContent) return
  let sourceDropzone = Array.from(document.querySelectorAll(".dropzone")).find(
    el => el.textContent == textContent
  )
  if (!sourceDropzone) return
  sourceDropzone.textContent = ""
  sourceDropzone.classList.remove("draggable")
  if (!main.contains(instructionText))
    main.insertBefore(instructionText, draggableContainer)
  guessesText.remove()
  submitButton.remove()
  createDraggable(textContent)
})

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
;(["a", "b"] as const).forEach(key => {
  let hint = document.createElement("div")
  hintsContainer.appendChild(hint)
  let hintText = document.createElement("p")
  hintText.textContent =
    key == "a"
      ? `Hint A: ${allValues.find(value =>
          groupEntries.every(([, v]) => v.includes(value))
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
    appendCategoryHint()
  })
  hint.appendChild(hints[key] ? hintText : hintButton)
})

let categoryHint = document.createElement("div")
let categoryHintText = document.createElement("p")
categoryHintText.textContent = `Bonus Hint: the categories are ${groupEntries.reduce(
  (acc, [key], i) => {
    acc +=
      i == groupEntries.length - 1 ? `, and ${key}` : acc ? `, ${key}` : key
    return acc
  },
  ""
)}`
let categoryHintButton = document.createElement("button")
categoryHintButton.classList.add("hint-button")
categoryHintButton.textContent =
  "Still stuck? Click here to reveal the categories"
categoryHintButton.addEventListener("click", () => {
  hints.c = true
  localGame.set(currentGame)
  categoryHintButton.remove()
  categoryHint.appendChild(categoryHintText)
})

appendCategoryHint()
function appendCategoryHint() {
  if (!hints.a || !hints.b) return
  categoryHint.appendChild(hints.c ? categoryHintText : categoryHintButton)
  hintsContainer.appendChild(categoryHint)
}

let guessesText = document.createElement("p")
guessesText.classList.add("guesses-text")
let remainingGuesses = 3 - guesses.length
guessesText.textContent = `${remainingGuesses} guess${
  remainingGuesses == 1 ? "" : "es"
} remaining`

appendSubmitButton()
function appendSubmitButton() {
  if (!Object.values(currentGuess).every(v => v)) return
  instructionText.remove()
  main.insertBefore(submitButton, hintsContainer)
  main.insertBefore(guessesText, submitButton)
}

evaluateGuess()
function evaluateGuess(clicked = false) {
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
    howToPlay.remove()
    if (clicked) updateCurrentStats(true)
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
    let [titleA, playersA] = groupEntries[0]!
    let [titleB, playersB] = groupEntries[1]!
    let [titleC, playersC] = groupEntries[2]!
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
    if (clicked) updateCurrentStats(false)
  }
}

function updateCurrentStats(won: boolean) {
  if (played.last < gameIndex) played.total++
  if (played.streakStart == -1) played.streakStart = gameIndex
  if (played.first == -1) played.first = gameIndex
  played.last = gameIndex
  if (won) {
    if (solved.last < gameIndex) solved.total++
    if (solved.streakStart == -1) solved.streakStart = gameIndex
    if (solved.first == -1) solved.first = gameIndex
    solved.last = gameIndex
  }
  localStats.set({ played, solved })
  displayCurrentStats()
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
