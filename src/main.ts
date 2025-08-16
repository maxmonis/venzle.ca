import { createDraggable } from "./draggable"
import { initDropzones } from "./dropzones"
import {
  draggableContainer,
  guessesText,
  howToPlay,
  instructionText,
  main,
  pageTitle,
  previousGameLabel,
  previousGameSelect,
  submitButton
} from "./elements"
import {
  checkGame,
  getGame,
  getGameText,
  resetGame,
  saveGame,
  todayIndex,
  updateGameState
} from "./game"
import { initHints } from "./hints"
import { displayStats, stats, updateStats } from "./stats"
import "./style.css"
import { applyTheme } from "./theme"
import { showToast } from "./toast"

let game = getGame(todayIndex)

applyTheme()
displayStats()
initGame()

function initGame() {
  window.scrollTo({ behavior: "smooth", top: 0 })
  pageTitle.innerHTML = getGameText(game.title, game.index)
  initDropzones(game)
  initHints(game)
  updateGameState(game)
  if (stats.played.last == todayIndex) checkGame(game, false)
  if (game.index != todayIndex) main.insertBefore(previousGameLabel, howToPlay)
}

previousGameSelect.addEventListener("change", () => {
  resetGame()
  game = getGame(Number(previousGameSelect.value))
  initGame()
})

submitButton.addEventListener("click", () => {
  if (
    game.guesses.some(
      g => JSON.stringify(g) == JSON.stringify(game.currentGuess)
    )
  ) {
    showToast("You already guessed that!<br />Please try again")
    return
  }
  game.guesses.push({ ...game.currentGuess })
  saveGame(game)
  updateStats(checkGame(game, true), game.index)
})

document.addEventListener("dragover", e => {
  e.preventDefault()
})

document.addEventListener("drop", e => {
  e.preventDefault()
  let dragEvent = e as DragEvent
  let dragEventText = dragEvent.dataTransfer?.getData("text")
  let dragEventValue = dragEvent.dataTransfer?.getData("value")
  if (!dragEventText || !dragEventValue) return
  let sourceDropzone = Array.from(document.querySelectorAll(".dropzone")).find(
    el => el.getAttribute("data-value") == dragEventValue
  )
  if (!sourceDropzone) return
  sourceDropzone.textContent = ""
  sourceDropzone.removeAttribute("data-value")
  sourceDropzone.classList.remove("draggable")
  if (!main.contains(instructionText))
    main.insertBefore(instructionText, draggableContainer)
  guessesText.remove()
  submitButton.remove()
  createDraggable(dragEventText, dragEventValue)
  updateGameState(game)
})
