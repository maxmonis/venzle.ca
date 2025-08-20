import { gameList, todayIndex } from "../game/list"
import { getGameText } from "../game/state"
import { sessionIndex } from "../lib/utils"
import { statsText } from "./stats"
import { themeToggleContainer } from "./theme"

export let circleContainer = document.querySelector(".circle-container")!
export let instructionText = document.querySelector(".instruction-text")!
export let main = document.querySelector("main")!

export let creatorText = document.createElement("p")
creatorText.classList.add("creator-text")

export let draggableContainer = document.createElement("div")
draggableContainer.classList.add("draggable-container")

export let gameSummary = document.createElement("p")
gameSummary.classList.add("game-summary")

export let guessesText = document.createElement("p")
guessesText.classList.add("guesses-text")

export let header = document.createElement("header")

export let hintsContainer = document.createElement("div")
hintsContainer.classList.add("hints-container")

export let homeButton = document.createElement("button")
homeButton.classList.add("home-button")
homeButton.textContent = "< Back to Today's Puzzle"
homeButton.addEventListener("click", () => {
  new BroadcastChannel("game").postMessage(todayIndex)
  homeButton.remove()
})

export let pageSubtitle = document.createElement("h2")

export let pageTitle = document.createElement("h1")

export let previousGameContainer = document.createElement("div")
previousGameContainer.classList.add("previous-game-container")
let previousGameText = document.createElement("p")
previousGameText.textContent =
  "You can practice for the daily puzzle by playing any previous puzzle." +
  " These practice rounds do not impact your stats."
let previousGameLabel = document.createElement("label")
previousGameLabel.textContent = "Available Puzzles:"
let previousGameSelect = document.createElement("select")
let selectedGameIndex = sessionIndex.get() ?? todayIndex
previousGameSelect.append(
  ...gameList
    .slice(0, todayIndex + 1)
    .map((game, index) => {
      let option = document.createElement("option")
      option.selected = index == selectedGameIndex
      option.textContent = getGameText(game.title, index)
      option.value = index.toString()
      return option
    })
    .reverse()
)
previousGameSelect.addEventListener("change", () => {
  new BroadcastChannel("game").postMessage(Number(previousGameSelect.value))
})
previousGameLabel.append(previousGameSelect)
previousGameContainer.append(previousGameText, previousGameLabel)

export let submitButton = document.createElement("button")
submitButton.classList.add("submit-button", "btn")
submitButton.textContent = "Submit Solution"
submitButton.addEventListener("click", () => {
  new BroadcastChannel("game").postMessage("submit")
})

export let winAudio = document.createElement("audio")
winAudio.setAttribute("type", "audio/mpeg")
winAudio.volume = 0.1
winAudio.preload = "auto"
winAudio.src = "/audio/win.mp3"

main.before(header)
main.prepend(pageTitle, creatorText)
instructionText.after(
  draggableContainer,
  hintsContainer,
  previousGameContainer,
  statsText
)
main.append(themeToggleContainer)

setTimeout(() => {
  document.body.classList.add("loaded")
}, 2000)
