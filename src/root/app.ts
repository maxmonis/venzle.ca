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
import { gameChannel, gameEvent, sessionIndex } from "lib/utils"
import "./style.css"

if (location.pathname != "/") location.replace(location.origin)

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

gameChannel.listen(data => {
  if (JSON.stringify(data) == JSON.stringify(game)) return
  resetGame()
  game = data
  initGame()
})

gameEvent.listen(data => {
  if (data == "update") updateGameState(game)
  else if (data == "save") saveGame(game)
  else if (data == "submit") {
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
    gameChannel.post(game)
  } else if (typeof data == "number") {
    resetGame()
    game = getGame(data)
    initGame()
  }
})
