import { gameList, todayIndex } from "../game/list"
import { getGameText } from "../game/state"
import { imageFormats } from "../lib/constants"
import type { ImageFormat } from "../lib/types"
import { localSettings, sessionCurrentIndex } from "../lib/utils"

export let circleContainer = document.querySelector(".circle-container")!
export let howToPlay = document.querySelector(".how-to-play")!
export let instructionText = document.querySelector(".instruction-text")!
export let main = document.querySelector("main")!

export let audioToggle = document.createElement("button")
audioToggle.title = "Toggle audio"

export let certificateCanvasContainer = document.createElement("div")
certificateCanvasContainer.classList.add("certificate-canvas-container")
export let certificateCanvas = document.createElement("canvas")
certificateCanvasContainer.append(certificateCanvas)

let certificateDownloadDialog = document.createElement("dialog")
let certificateDownloadDialogContent = document.createElement("div")
let certificateDialogTitle = document.createElement("h1")
certificateDialogTitle.textContent = "Share Certificate"
let certificateNameLabel = document.createElement("label")
certificateNameLabel.textContent = "Your name:"
let certificateNameInput = document.createElement("input")
certificateNameInput.autofocus = true
certificateNameInput.required = true
certificateNameInput.maxLength = 27
certificateNameInput.value = localSettings.get()?.name.trim() || ""
certificateNameLabel.append(certificateNameInput)
let certificateFormatLabel = document.createElement("label")
certificateFormatLabel.textContent = "Format:"
let certificateFormatSelect = document.createElement("select")
certificateFormatSelect.append(
  ...imageFormats.map(format => {
    let option = document.createElement("option")
    option.value = format
    option.selected = localSettings.get()?.format == format
    option.textContent = format.toUpperCase()
    return option
  })
)
certificateFormatLabel.append(certificateFormatSelect)
let certificateDialogButtons = document.createElement("div")
certificateDialogButtons.classList.add("dialog-button-container")
let certificateDialogCancel = document.createElement("button")
certificateDialogCancel.type = "button"
certificateDialogCancel.textContent = "Cancel"
certificateDialogCancel.addEventListener("click", () => {
  let format = certificateFormatSelect.value as ImageFormat
  let name = certificateNameInput.value.trim()
  if (name && !localSettings.get()) localSettings.set({ format, name })
  certificateDownloadDialog.close()
})
let certificateDialogSubmit = document.createElement("button")
certificateDialogSubmit.type = "button"
certificateDialogSubmit.textContent = "Download"
certificateDialogSubmit.classList.add("btn")
certificateDialogSubmit.addEventListener("click", () => {
  let format = certificateFormatSelect.value as ImageFormat
  let name = certificateNameInput.value.trim()
  if (!name) {
    certificateNameInput.focus()
    return
  }
  localSettings.set({ format, name })
  new BroadcastChannel("certificate").postMessage("download")
  certificateDownloadDialog.close()
  certificateDownloadDialog.remove()
})
certificateDialogButtons.append(
  certificateDialogCancel,
  certificateDialogSubmit
)
certificateDownloadDialog.addEventListener("click", e => {
  if (e.target == certificateDownloadDialog) certificateDownloadDialog.close()
})
certificateDownloadDialogContent.append(
  certificateDialogTitle,
  certificateNameLabel,
  certificateFormatLabel,
  certificateDialogButtons
)
certificateDownloadDialog.append(certificateDownloadDialogContent)

export let certificateDownloadButton = document.createElement("button")
certificateDownloadButton.classList.add("download-certificate-button", "btn")
certificateDownloadButton.textContent = "Share Certificate"
certificateDownloadButton.addEventListener("click", () => {
  document.body.append(certificateDownloadDialog)
  certificateDownloadDialog.showModal()
})

export let creatorText = document.createElement("p")
creatorText.classList.add("creator-text")

export let darkToggle = document.createElement("button")
darkToggle.title = "Toggle dark mode"

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

export let previousGameLabel = document.createElement("label")
previousGameLabel.textContent = "Available Puzzles:"
let previousGameSelect = document.createElement("select")
let selectedGameIndex = sessionCurrentIndex.get() ?? todayIndex
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

export let statsText = document.createElement("p")
statsText.classList.add("stats-text")

export let submitButton = document.createElement("button")
submitButton.classList.add("submit-button", "btn")
submitButton.textContent = "Submit Solution"
submitButton.addEventListener("click", () => {
  new BroadcastChannel("game").postMessage("submit")
})

export let themeToggleContainer = document.createElement("div")
themeToggleContainer.classList.add("theme-toggle-container")
themeToggleContainer.append(darkToggle, audioToggle)

export let toast = document.createElement("div")
toast.classList.add("toast")
toast.role = "alert"

export let winAudio = document.createElement("audio")
winAudio.setAttribute("type", "audio/mpeg")
winAudio.volume = 0.1
winAudio.preload = "auto"
winAudio.src = "/audio/win.mp3"

main.before(header)
main.prepend(pageTitle, creatorText)
instructionText.after(draggableContainer)
draggableContainer.after(hintsContainer)
main.append(statsText)
main.append(themeToggleContainer)

setTimeout(() => {
  document.body.classList.add("loaded")
}, 2000)
