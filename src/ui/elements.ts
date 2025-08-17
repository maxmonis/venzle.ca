import { gameList } from "../game/list"
import { getGameText, todayIndex } from "../game/state"

export let circleContainer = document.querySelector(".circle-container")!
export let howToPlay = document.querySelector(".how-to-play")!
export let instructionText = document.querySelector(".instruction-text")!
export let main = document.querySelector("main")!

export let categoryHint = document.createElement("div")

export let draggableContainer = document.createElement("div")
draggableContainer.classList.add("draggable-container")

export let gameSummary = document.createElement("p")
gameSummary.classList.add("game-summary")

export let guessesText = document.createElement("p")
guessesText.classList.add("guesses-text")

export let hintsContainer = document.createElement("div")
hintsContainer.classList.add("hints-container")

export let pageSubtitle = document.createElement("h2")

export let pageTitle = document.createElement("h1")

export let previousGameLabel = document.createElement("label")
previousGameLabel.textContent = "Available Puzzles:"
export let previousGameSelect = document.createElement("select")
let options: Array<HTMLOptionElement> = []
gameList.slice(0, todayIndex + 1).forEach((game, index) => {
  let option = document.createElement("option")
  option.value = index.toString()
  option.textContent = getGameText(game.title, index)
  options.unshift(option)
})
options.forEach(option => {
  previousGameSelect.appendChild(option)
})
previousGameSelect.addEventListener("change", () => {
  new BroadcastChannel("game").postMessage(Number(previousGameSelect.value))
})
previousGameLabel.appendChild(previousGameSelect)

export let statsText = document.createElement("p")
statsText.classList.add("stats-text")

export let submitButton = document.createElement("button")
submitButton.classList.add("submit-button")
submitButton.textContent = "Submit Solution"
submitButton.addEventListener("click", () => {
  new BroadcastChannel("game").postMessage("submit")
})

export let themeToggle = document.createElement("button")
themeToggle.classList.add("theme-toggle")
themeToggle.setAttribute("aria-label", "toggle dark mode")

export let toast = document.createElement("div")
toast.classList.add("toast")
toast.role = "alert"

main.prepend(pageTitle)
instructionText.after(draggableContainer)
draggableContainer.after(hintsContainer)
main.append(statsText)
