import { getGameDateFromIndex, todayIndex } from "./game"
import { gameList } from "./gameList"

export let circleContainer = document.querySelector(".circle-container")!
export let howToPlay = document.querySelector(".how-to-play")!
export let instructionText = document.querySelector(".instruction-text")!
export let main = document.querySelector("main")!

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
let allGames = gameList.slice(0, todayIndex + 1)
let options: Array<HTMLOptionElement> = []
allGames.forEach((game, index) => {
  let option = document.createElement("option")
  option.value = index.toString()
  option.textContent = `${getGameDateFromIndex(index)}: ${game.title}`
  options.unshift(option)
})
options.forEach(option => {
  previousGameSelect.appendChild(option)
})
previousGameLabel.appendChild(previousGameSelect)

export let statsText = document.createElement("p")
statsText.classList.add("stats-text")

export let submitButton = document.createElement("button")
submitButton.classList.add("submit-button")
submitButton.textContent = "Submit Solution"

main.prepend(pageTitle)
instructionText.after(draggableContainer)
draggableContainer.after(hintsContainer)
main.append(statsText)
