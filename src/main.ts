import { initDraggables, initDropzones } from "./dnd"
import { howToPlay, main, pageTitle, previousGameLabel } from "./elements"
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
init()

function init() {
  window.scrollTo({ behavior: "smooth", top: 0 })
  pageTitle.innerHTML = getGameText(game.title, game.index)
  initDropzones(game)
  initDraggables(game)
  initHints(game)
  updateGameState(game)
  if (stats.played.last == todayIndex) checkGame(game, false)
  if (game.index != todayIndex) main.insertBefore(previousGameLabel, howToPlay)
}

new BroadcastChannel("game").onmessage = e => {
  if (e.data == "update") updateGameState(game)
  else if (e.data == "submit") {
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
  } else if (typeof e.data == "number") {
    resetGame()
    game = getGame(e.data)
    init()
  }
}
