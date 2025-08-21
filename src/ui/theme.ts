import { localAudio, localDark } from "../lib/utils"
import "../style/global.css"

let audio = localAudio.get()

let defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches
let dark = localDark.get() ?? defaultDark

let audioToggle = document.createElement("button")
audioToggle.title = "Toggle audio"
let darkToggle = document.createElement("button")
darkToggle.title = "Toggle dark mode"

audioToggle.addEventListener("click", () => {
  localAudio.set(!audio)
  new BroadcastChannel("theme").postMessage("audio")
})

function applyAudio() {
  audioToggle.innerText = audio ? "🔊" : "🔇"
}

darkToggle.addEventListener("click", () => {
  localDark.set(!dark)
  new BroadcastChannel("theme").postMessage("dark")
})

function applyDark() {
  document.body.classList.toggle("dark", dark)
  darkToggle.innerText = dark ? "🌛" : "🌞"
}

new BroadcastChannel("theme").onmessage = e => {
  if (e.data == "audio") {
    audio = localAudio.get()
    applyAudio()
  }
  if (e.data == "dark") {
    dark = localDark.get() ?? defaultDark
    applyDark()
  }
}

let themeToggleContainer = document.createElement("div")
themeToggleContainer.classList.add("theme-toggle-container")
themeToggleContainer.append(darkToggle, audioToggle)

document.querySelector("footer")!.prepend(themeToggleContainer)

export function initTheme() {
  applyAudio()
  applyDark()
  for (let link of document.querySelectorAll("a"))
    if (link.getAttribute("href")?.startsWith("."))
      link.addEventListener("click", () => {
        sessionStorage.setItem("redirect", "internal")
      })
}
