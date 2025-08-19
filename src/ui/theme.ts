import { localAudio, localDark } from "../lib/utils"
import { audioToggle, darkToggle } from "./elements"

let storageAudio = localAudio.get()
if (typeof storageAudio != "boolean") localAudio.set(true)
let audio = localAudio.get()

let defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches
let dark = localDark.get() ?? defaultDark

audioToggle.addEventListener("click", () => {
  audio = !audio
  localAudio.set(audio)
  applyAudio()
  new BroadcastChannel("theme").postMessage("audio")
})

function applyAudio() {
  audioToggle.innerText = audio ? "🔊" : "🔇"
}
applyAudio()

darkToggle.addEventListener("click", () => {
  dark = !dark
  localDark.set(dark)
  applyDark()
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
