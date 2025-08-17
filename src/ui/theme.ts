import { localTheme } from "../lib/utils"
import { main, themeToggle } from "./elements"

let theme = localTheme.get()
if (!theme)
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
themeToggle.addEventListener("click", () => {
  theme = theme == "light" ? "dark" : "light"
  localTheme.set(theme)
  applyTheme()
})
main.appendChild(themeToggle)

export function applyTheme() {
  document.body.classList.toggle("dark", theme == "dark")
  themeToggle.innerText = theme == "dark" ? "🌛" : "🌞"
}
