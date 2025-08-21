import { initTheme } from "ui/theme"
import { initDraggables, initDropzones } from "../game/dnd"
import { initHints } from "../game/hints"
import { todayIndex } from "../game/list"
import {
  checkGame,
  getGame,
  getGameText,
  initPreviousGameSelect,
  resetGame,
  saveGame,
  updateGameState
} from "../game/state"
import { sessionIndex } from "../lib/utils"
import { creatorText, homeButton, main, pageTitle } from "../ui/elements"
import { displayStats } from "../ui/stats"
import { showToast } from "../ui/toast"
import "./index.css"

let game = getGame(sessionIndex.get() ?? todayIndex)

initTheme()
displayStats()
init()

function init() {
  window.scrollTo({ behavior: "smooth", top: 0 })
  pageTitle.innerHTML = getGameText(game.title, game.index)
  creatorText.innerHTML = `Created by ${game.creator}`
  initDropzones(game)
  initDraggables(game)
  initHints(game)
  updateGameState(game)
  if (game.index == todayIndex) {
    sessionIndex.remove()
    homeButton.remove()
  } else {
    main.prepend(homeButton)
    sessionIndex.set(game.index)
  }
  initPreviousGameSelect()
  if (game.submitted) checkGame(game, false)
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
    checkGame(game, true)
  } else if (typeof e.data == "number") {
    resetGame()
    game = getGame(e.data)
    init()
  }
}
