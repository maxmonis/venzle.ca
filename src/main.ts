import { appendCertificate } from "./game/certificate"
import { initDraggables, initDropzones } from "./game/dnd"
import { initHints } from "./game/hints"
import { todayIndex } from "./game/list"
import {
  checkGame,
  getGame,
  getGameText,
  resetGame,
  saveGame,
  updateGameState
} from "./game/state"
import { localSettings } from "./lib/utils"
import "./style/global.css"
import {
  certificateCanvas,
  creatorText,
  howToPlay,
  pageTitle,
  previousGameLabel
} from "./ui/elements"
import { displayStats, stats } from "./ui/stats"
import { applyDark } from "./ui/theme"
import { showToast } from "./ui/toast"

let game = getGame(todayIndex)

applyDark()
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
  if (stats.playedToday) checkGame(game, false)
  if (game.index != todayIndex) howToPlay.before(previousGameLabel)
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

new BroadcastChannel("certificate").onmessage = async e => {
  if (e.data == "download") {
    let a = document.createElement("a")
    let format = localSettings.get()?.format
    if (!format) return
    await appendCertificate(game)
    a.href = certificateCanvas.toDataURL(`image/${format}`)
    a.download = `certificate.${format}`
    a.click()
    a.remove()
    showToast("Certificate downloaded 😁")
  }
}
