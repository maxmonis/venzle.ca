import { localAudio, localDark } from "../lib/utils"
import { audioToggle, darkToggle } from "./elements"

let audio = localAudio.get()

let defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches
let dark = localDark.get() ?? defaultDark

audioToggle.addEventListener("click", () => {
  localAudio.set(!audio)
  new BroadcastChannel("theme").postMessage("audio")
})

function applyAudio() {
  audioToggle.innerText = audio ? "🔊" : "🔇"
}
applyAudio()

darkToggle.addEventListener("click", () => {
  localDark.set(!dark)
  new BroadcastChannel("theme").postMessage("dark")
})

export function applyDark() {
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
