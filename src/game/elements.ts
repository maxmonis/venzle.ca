import { chevronLeft } from "lib/svg"
import { getTodayIndex } from "./list"

export let header = document.querySelector("header")!
export let circleContainer = document.querySelector(".circle-container")!
export let gameControls = document.querySelector(".game-controls")!
export let main = document.querySelector("main")!

export let creatorText = document.createElement("p")
creatorText.classList.add("creator-text")

export let draggables = document.createElement("div")
draggables.classList.add("draggables")

export let gameSummary = document.createElement("p")
gameSummary.classList.add("game-summary")

export let guessesText = document.createElement("p")
guessesText.classList.add("guesses-text")

export let hintsContainer = document.createElement("div")
hintsContainer.classList.add("hints-container")

export let homeButton = document.createElement("button")
homeButton.classList.add("home-button")
homeButton.append(chevronLeft, "Back to Today's Puzzle")
homeButton.addEventListener("click", () => {
  new BroadcastChannel("game").postMessage(getTodayIndex())
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
export let previousGameSelect = document.createElement("select")
previousGameSelect.addEventListener("change", () => {
  new BroadcastChannel("game").postMessage(Number(previousGameSelect.value))
})
previousGameLabel.append(previousGameSelect)
previousGameContainer.append(previousGameText, previousGameLabel)

let submitButton = document.createElement("button")
submitButton.classList.add("btn")
submitButton.textContent = "Submit Solution"
submitButton.addEventListener("click", () => {
  new BroadcastChannel("game").postMessage("submit")
})

export let submitButtonContainer = document.createElement("div")
submitButtonContainer.append(guessesText, submitButton)

export let winAudio = document.createElement("audio")
winAudio.setAttribute("type", "audio/mpeg")
winAudio.volume = 0.1
winAudio.preload = "auto"
winAudio.src = "/audio/win.mp3"

main.prepend(pageTitle, creatorText)
gameControls.append(draggables)
gameControls.after(hintsContainer, previousGameContainer)
