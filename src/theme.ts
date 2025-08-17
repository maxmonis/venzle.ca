import { main } from "./elements"
import { localTheme } from "./utils"

let theme = localTheme.get()
if (!theme)
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
let themeToggle = document.createElement("button")
themeToggle.classList.add("theme-toggle")
themeToggle.setAttribute("aria-label", "toggle dark mode")
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
