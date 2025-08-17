import { localDark } from "../lib/utils"
import { main, themeToggle } from "./elements"

let dark =
  localDark.get() ?? window.matchMedia("(prefers-color-scheme: dark)").matches

themeToggle.addEventListener("click", () => {
  dark = !dark
  localDark.set(dark)
  applyTheme()
})

main.append(themeToggle)

export function applyTheme() {
  document.body.classList.toggle("dark", dark)
  themeToggle.innerText = dark ? "🌛" : "🌞"
}
