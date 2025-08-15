import { createDraggable } from "./draggable"
import { hintsContainer } from "./elements"
import { saveGame } from "./game"
import type { Game } from "./types"
import { shuffle } from "./utils"

export function initHints(game: Game) {
  let allValues = Object.values(game.groups).flatMap(v => v)
  let values = allValues.filter(
    value => !Object.values(game.currentGuess).some(v => v == value)
  )
  shuffle(Array.from(new Set(values))).forEach(createDraggable)

  let categoryHint = document.createElement("div")
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
    saveGame(game)
    categoryHintButton.remove()
    categoryHint.appendChild(categoryHintText)
  })

  for (let k in game.hintsUsed) {
    if (k == "c") continue
    let key = k as keyof typeof game.hintsUsed
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
      saveGame(game)
      hintButton.remove()
      hint.appendChild(hintText)
      appendCategoryHint()
    })
    hint.appendChild(game.hintsUsed[key] ? hintText : hintButton)
  }

  appendCategoryHint()
  function appendCategoryHint() {
    let { hintsUsed } = game
    if (!hintsUsed.a || !hintsUsed.b) return
    categoryHint.appendChild(
      hintsUsed.c ? categoryHintText : categoryHintButton
    )
    hintsContainer.appendChild(categoryHint)
  }
}
