import "style/global.css"
import { localAudio, localDark, localReload, themeChannel } from "./utils"

let audio = localAudio.get()

let defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches
let dark = localDark.get() ?? defaultDark

let audioToggle = document.createElement("button")
audioToggle.title = "Toggle audio"
let darkToggle = document.createElement("button")
darkToggle.title = "Toggle dark mode"

audioToggle.addEventListener("click", () => {
  audio = !audio
  localAudio.set(audio)
  applyAudio()
  themeChannel.post("audio")
})

function applyAudio() {
  audioToggle.innerText = audio ? "🔊" : "🔇"
}

darkToggle.addEventListener("click", () => {
  dark = !dark
  localDark.set(dark)
  applyDark()
  themeChannel.post("dark")
})

function applyDark() {
  document.body.classList.toggle("dark", dark)
  darkToggle.innerText = dark ? "🌛" : "🌞"
}

themeChannel.listen(data => {
  if (data == "audio") {
    audio = localAudio.get()
    applyAudio()
  } else if (data == "dark") {
    dark = localDark.get() ?? defaultDark
    applyDark()
  }
})

let toggleContainer = document.createElement("div")
toggleContainer.classList.add("theme-toggle-container")
toggleContainer.append(darkToggle, audioToggle)

document.querySelector("footer")!.prepend(toggleContainer)

export function initUI() {
  applyAudio()
  applyDark()
}

let toast = document.createElement("div")
toast.classList.add("toast")
toast.role = "alert"

let toastTimeout: ReturnType<typeof setTimeout>

export function removeToast() {
  if (!document.body.contains(toast)) return
  return new Promise(resolve => {
    clearTimeout(toastTimeout)
    toast.classList.add("exit")
    toastTimeout = setTimeout(() => {
      toast.classList.remove("enter", "exit")
      toast.remove()
      resolve(true)
    }, 250)
  })
}

export async function showToast(message: string, durationMS = 3000) {
  await removeToast()
  toast.innerHTML = message
  document.body.append(toast)
  toastTimeout = setTimeout(() => {
    toast.classList.add("enter")
    toastTimeout = setTimeout(removeToast, durationMS)
  }, 50)
}

export let rem = parseInt(getComputedStyle(document.documentElement).fontSize)

window.addEventListener("resize", () => {
  rem = parseInt(getComputedStyle(document.documentElement).fontSize)
})

function domReady(cb: () => void) {
  document.readyState == "complete" || document.readyState == "interactive"
    ? cb()
    : document.addEventListener("DOMContentLoaded", cb)
}

domReady(() => {
  document.body.style.cssText = ""
  for (let link of document.querySelectorAll("a"))
    if (link.getAttribute("href")?.startsWith("."))
      link.addEventListener("click", () => {
        document.body.style.pointerEvents = "none"
      })
})

let lastReload = localReload.get() ?? 0

reloadIfStale()
window.addEventListener("focus", reloadIfStale)
function reloadIfStale() {
  let now = new Date().getTime()
  if (now - lastReload > 36e5) {
    localReload.set(now)
    location.reload()
  }
}
