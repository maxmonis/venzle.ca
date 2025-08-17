import { initDraggables, initDropzones } from "./game/dnd"
import { initHints } from "./game/hints"
import {
  checkGame,
  getGame,
  getGameText,
  resetGame,
  saveGame,
  todayIndex,
  updateGameState
} from "./game/state"
import "./style/global.css"
import { howToPlay, main, pageTitle, previousGameLabel } from "./ui/elements"
import { displayStats, stats, updateStats } from "./ui/stats"
import { applyTheme } from "./ui/theme"
import { showToast } from "./ui/toast"

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
  else if (e.data == "save") saveGame(game)
  else if (e.data == "submit") {
    if (
      game.guesses.some(
        guess => JSON.stringify(guess) == JSON.stringify(game.currentGuess)
      )
    ) {
      showToast("You already guessed that 😅<br />Please try again")
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
