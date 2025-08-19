import type { Game } from "../lib/types"
import { localGame } from "../lib/utils"
import { startConfetti } from "../ui/confetti"
import {
  certificateCanvasContainer,
  certificateDownloadButton,
  circleContainer,
  draggableContainer,
  gameSummary,
  guessesText,
  hintsContainer,
  howToPlay,
  instructionText,
  main,
  pageSubtitle,
  pageTitle,
  previousGameLabel,
  statsText,
  submitButton
} from "../ui/elements"
import { removeToast, showToast } from "../ui/toast"
import { appendCertificate } from "./certificate"
import { gameList } from "./list"

export let todayIndex = gameList.length - 1
// Math.floor((Date.now() - Date.UTC(2025, 7, 14)) / 86400000) % gameList.length

function appendCircleTitles(titles: [string, string, string]) {
  let keys = ["a", "b", "c"]
  circleContainer.append(
    ...titles.map((text, i) => {
      let title = document.createElement("div")
      title.textContent = text
      title.classList.add("circle-title", "circle-title-" + keys[i])
      return title
    })
  )
}

export function checkGame(game: Game, clicked: boolean) {
  removeToast()
  let groupEntries = Object.entries(game.groups)
  let { currentGuess } = game
  let guessKeys: Record<"a" | "b" | "c", Array<keyof typeof currentGuess>> = {
    a: ["a", "ab", "abc", "ac"],
    b: ["ab", "abc", "b", "bc"],
    c: ["abc", "ac", "bc", "c"]
  }
  let [titleA] =
    groupEntries.find(([, values]) =>
      guessKeys.a.every(key => values.includes(currentGuess[key]))
    ) ?? []
  let [titleB] =
    groupEntries.find(([, values]) =>
      guessKeys.b.every(key => values.includes(currentGuess[key]))
    ) ?? []
  let [titleC] =
    groupEntries.find(([, values]) =>
      guessKeys.c.every(key => values.includes(currentGuess[key]))
    ) ?? []
  if (titleA && titleB && titleC) {
    pageSubtitle.textContent = "You got it! Congratulations 🥳"
    pageTitle.after(pageSubtitle)
    appendCircleTitles([titleA, titleB, titleC])
    let hintCount = Object.values(game.hintsUsed).filter(Boolean).length
    let guessCount = game.guesses.length
    gameSummary.innerHTML =
      guessCount == 1 && hintCount == 0
        ? "First try with no hints, that's a perfect game 😎"
        : `You used ${hintCount} hint${
            hintCount == 1 ? "" : "s"
          } and ${guessCount} guess${guessCount == 1 ? "" : "es"} 😄`
    if (game.index == todayIndex)
      gameSummary.innerHTML += "<br />Come back tomorrow for a new puzzle!"
    for (let dropzone of document.querySelectorAll(".dropzone")) {
      dropzone.removeAttribute("data-dnd-value")
      dropzone.removeAttribute("draggable")
    }
    circleContainer.after(gameSummary)
    previousGameLabel.remove()
    statsText.after(previousGameLabel)
    instructionText.remove()
    guessesText.remove()
    hintsContainer.remove()
    submitButton.remove()
    howToPlay.remove()
    appendCertificate(game)
    if (clicked) startConfetti()
    return "success"
  }
  let remainingGuesses = 5 - game.guesses.length
  if (remainingGuesses) {
    let guessesTextContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`
    guessesText.textContent = guessesTextContent
    if (clicked) {
      let correctPart = ""
      if (getCenter(game) == game.currentGuess.abc) {
        let allItems = Object.values(game.groups).flatMap(v => v)
        if (
          titleA &&
          allItems.filter(item => item == game.currentGuess.a).length == 1
        )
          correctPart = "🟡 yellow circle"
        else if (
          titleB &&
          allItems.filter(item => item == game.currentGuess.b).length == 1
        )
          correctPart = "🔵 blue circle"
        else if (
          titleC &&
          allItems.filter(item => item == game.currentGuess.c).length == 1
        )
          correctPart = "🔴 red circle"
        else correctPart = "The center"
      }
      showToast(
        (correctPart
          ? `${correctPart} is correct ✅`
          : "That's not the answer but keep trying!") +
          "<br />You have " +
          guessesTextContent,
        correctPart ? 5000 : 3000
      )
    }
    return "pending"
  } else {
    pageSubtitle.textContent = "Better luck next time!"
    pageTitle.after(pageSubtitle)
    guessesText.remove()
    submitButton.remove()
    hintsContainer.remove()
    let [titleA, valuesA] = groupEntries[0]!
    let [titleB, valuesB] = groupEntries[1]!
    let [titleC, valuesC] = groupEntries[2]!
    let solution: typeof game.currentGuess = {
      a: valuesA.find(p => !valuesB.includes(p) && !valuesC.includes(p))!,
      b: valuesB.find(p => !valuesA.includes(p) && !valuesC.includes(p))!,
      c: valuesC.find(p => !valuesA.includes(p) && !valuesB.includes(p))!,
      ab: valuesA.find(p => valuesB.includes(p) && !valuesC.includes(p))!,
      ac: valuesA.find(p => !valuesB.includes(p) && valuesC.includes(p))!,
      bc: valuesB.find(p => !valuesA.includes(p) && valuesC.includes(p))!,
      abc: valuesA.find(p => valuesB.includes(p) && valuesC.includes(p))!
    }
    for (let [key, value] of Object.entries(solution)) {
      let dropzone = main.querySelector(`#dropzone-${key}`)
      if (!dropzone) continue
      dropzone.textContent = value
      dropzone.removeAttribute("data-dnd-value")
      dropzone.removeAttribute("draggable")
    }
    appendCircleTitles([titleA, titleB, titleC])
    gameSummary.innerHTML = "This was a tough one and you're out of guesses 😔"
    if (game.index == todayIndex)
      gameSummary.innerHTML += "<br />Come back tomorrow for a new puzzle!"
    circleContainer.after(gameSummary)
    previousGameLabel.remove()
    gameSummary.after(previousGameLabel)
    return "failure"
  }
}

export function getCenter(game: Game) {
  let values = Object.values(game.groups)
  return values
    .flatMap(v => v)
    .find(value => values.every(v => v.includes(value)))!
}

export function getGame(index: number) {
  if (index == todayIndex) {
    let storageGame = localGame.get()
    if (storageGame && storageGame.index == todayIndex) return storageGame
  }
  return {
    ...gameList[index]!,
    currentGuess: {
      a: "",
      ab: "",
      abc: "",
      ac: "",
      b: "",
      bc: "",
      c: ""
    },
    guesses: [],
    hintsUsed: { a: false, b: false, c: false },
    index
  }
}

export function getGameText(title: string, index: number) {
  return `${
    index == todayIndex ? "Today's Puzzle" : `Puzzle ${index + 1}`
  }: ${title}`
}

export function resetGame() {
  pageSubtitle.remove()
  gameSummary.remove()
  previousGameLabel.remove()
  certificateCanvasContainer.remove()
  certificateDownloadButton.remove()
  hintsContainer.innerHTML = ""
  for (let element of document.querySelectorAll(
    "[draggable=true],.dropzone,.circle-title"
  ))
    if (!element.closest(".how-to-play")) element.remove()
  if (!main.contains(howToPlay)) main.insertBefore(howToPlay, statsText)
  if (!main.contains(instructionText))
    main.insertBefore(instructionText, draggableContainer)
  if (!main.contains(hintsContainer))
    main.insertBefore(hintsContainer, howToPlay)
}

export function saveGame(game: Game) {
  if (game.index == todayIndex) localGame.set(game)
}

export function updateGameState(game: Game) {
  for (let dropzone of document.querySelectorAll(".dropzone")) {
    let id = dropzone.id.split("-")[1] as keyof typeof game.currentGuess
    if (id in game.currentGuess)
      game.currentGuess[id] = dropzone.getAttribute("data-dnd-value") ?? ""
  }
  if (Object.values(game.currentGuess).every(Boolean)) {
    instructionText.remove()
    if (!main.contains(hintsContainer) || main.contains(submitButton)) return
    main.insertBefore(submitButton, hintsContainer)
    let remainingGuesses = 5 - game.guesses.length
    guessesText.textContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`
    main.insertBefore(guessesText, submitButton)
  } else {
    if (!main.contains(instructionText))
      main.insertBefore(instructionText, draggableContainer)
    guessesText.remove()
    submitButton.remove()
  }
  saveGame(game)
}
