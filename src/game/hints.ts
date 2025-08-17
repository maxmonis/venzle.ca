import type { Game } from "../lib/types"
import { categoryHint, hintsContainer } from "../ui/elements"

export function initHints(game: Game) {
  let allValues = Object.values(game.groups).flatMap(v => v)
  for (let k in game.hintsUsed) {
    let key = k as keyof typeof game.hintsUsed
    if (key == "c") continue
    let hint = document.createElement("div")
    hintsContainer.appendChild(hint)
    let hintText = document.createElement("p")
    hintText.textContent =
      key == "a"
        ? `Hint A: ${allValues.find(value =>
            Object.values(game.groups).every(v => v.includes(value))
          )} is in the center`
        : `Hint B: ${game.hint}`
    let hintButton = document.createElement("button")
    hintButton.classList.add("hint-button")
    hintButton.textContent =
      key == "a"
        ? "Hint A: Click here to reveal who's in the center"
        : "Hint B: Click here to reveal clues about the categories"
    hintButton.addEventListener("click", () => {
      game.hintsUsed[key] = true
      new BroadcastChannel("game").postMessage("save")
      hintButton.remove()
      hint.appendChild(hintText)
      appendCategoryHint(game)
    })
    hint.appendChild(game.hintsUsed[key] ? hintText : hintButton)
  }
  appendCategoryHint(game)
}

function appendCategoryHint(game: Game) {
  if (!game.hintsUsed.a || !game.hintsUsed.b) return
  let categoryHintText = document.createElement("p")
  let groupKeys = Object.keys(game.groups)
  categoryHintText.textContent = `Bonus Hint: the categories are ${groupKeys.reduce(
    (acc, key, i) => {
      acc += i == groupKeys.length - 1 ? `, and ${key}` : acc ? `, ${key}` : key
      return acc
    },
    ""
  )}`
  let categoryHintButton = document.createElement("button")
  categoryHintButton.classList.add("hint-button")
  categoryHintButton.textContent =
    "Still stuck? Click here to reveal the categories"
  categoryHintButton.addEventListener("click", () => {
    game.hintsUsed.c = true
    new BroadcastChannel("game").postMessage("save")
    categoryHintButton.remove()
    categoryHint.appendChild(categoryHintText)
  })
  categoryHint.appendChild(
    game.hintsUsed.c ? categoryHintText : categoryHintButton
  )
  hintsContainer.appendChild(categoryHint)
}
