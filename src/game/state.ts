import type { Game } from "../lib/types"
import { localGame } from "../lib/utils"
import {
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
import { gameList } from "./list"

export let todayIndex =
  Math.floor((Date.now() - Date.UTC(2025, 7, 16)) / 86400000) % gameList.length

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
    pageSubtitle.textContent = "You got it! Congratulations 🥳"
    pageTitle.after(pageSubtitle)
    appendCircleTitles([titleA, titleB, titleC])
    let hintCount = Object.values(game.hintsUsed).filter(Boolean).length
    let guessCount = game.guesses.length
    gameSummary.innerHTML =
      guessCount == 1 && hintCount == 0
        ? "Great job, you got it on the first try without using any hints 😎"
        : `You used ${hintCount} hint${
            hintCount == 1 ? "" : "s"
          } and ${guessCount} guess${guessCount == 1 ? "" : "es"} 😄`
    if (game.index == todayIndex)
      gameSummary.innerHTML += "<br />Come back tomorrow for a new puzzle!"
    for (let dropzone of document.querySelectorAll(".dropzone"))
      dropzone.removeAttribute("draggable")
    circleContainer.after(gameSummary)
    previousGameLabel.remove()
    statsText.after(previousGameLabel)
    instructionText.remove()
    guessesText.remove()
    hintsContainer.remove()
    submitButton.remove()
    howToPlay.remove()
    return "success"
  }
  let remainingGuesses = 3 - game.guesses.length
  if (remainingGuesses) {
    let newText = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`
    guessesText.textContent = newText
    if (clicked)
      showToast(
        "That's not quite it but keep trying!<br /> You have " + newText
      )
    return "pending"
  } else {
    pageSubtitle.textContent = "Better luck next time!"
    pageTitle.after(pageSubtitle)
    guessesText.remove()
    submitButton.remove()
    hintsContainer.remove()
    let [titleA, playersA] = groupEntries[0]!
    let [titleB, playersB] = groupEntries[1]!
    let [titleC, playersC] = groupEntries[2]!
    let solution: typeof game.currentGuess = {
      a: playersA.find(p => !playersB.includes(p) && !playersC.includes(p))!,
      b: playersB.find(p => !playersA.includes(p) && !playersC.includes(p))!,
      c: playersC.find(p => !playersA.includes(p) && !playersB.includes(p))!,
      ab: playersA.find(p => playersB.includes(p) && !playersC.includes(p))!,
      ac: playersA.find(p => !playersB.includes(p) && playersC.includes(p))!,
      bc: playersB.find(p => !playersA.includes(p) && playersC.includes(p))!,
      abc: playersA.find(p => playersB.includes(p) && playersC.includes(p))!
    }
    for (let [key, value] of Object.entries(solution)) {
      let dropzone = main.querySelector(`#dropzone-${key}`)
      if (!dropzone) continue
      dropzone.textContent = value
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
    if (!main.contains(hintsContainer)) return
    main.insertBefore(submitButton, hintsContainer)
    let remainingGuesses = 3 - game.guesses.length
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
