import { initDraggables, initDropzones } from "game/dnd"
import { creatorText, homeButton, main, pageTitle } from "game/elements"
import { initHints } from "game/hints"
import { getTodayIndex } from "game/list"
import {
  checkGame,
  getGame,
  getGameText,
  initPreviousGameSelect,
  resetGame,
  saveGame,
  updateGameState
} from "game/state"
import { initUI, showToast } from "lib/ui"
import { sessionIndex } from "lib/utils"
import "./style.css"

if (window.location.pathname != "/")
  window.location.replace(window.location.origin)

let game = getGame(sessionIndex.get() ?? getTodayIndex())

initUI()
initGame()

function initGame() {
  window.scrollTo({ behavior: "smooth", top: 0 })
  pageTitle.textContent = getGameText(game.title, game.index)
  creatorText.textContent = `Created by ${game.creator}`
  initDropzones(game)
  initDraggables(game)
  initHints(game)
  updateGameState(game)
  if (game.index == getTodayIndex()) {
    sessionIndex.remove()
    homeButton.remove()
  } else {
    main.prepend(homeButton)
    sessionIndex.set(game.index)
  }
  initPreviousGameSelect()
  if (game.status != "pending") checkGame(game, false)
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
    initGame()
  }
}
