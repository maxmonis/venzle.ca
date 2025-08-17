import type { Game } from "../lib/types"
import { hintsContainer } from "../ui/elements"

export function initHints(game: Game) {
  let allValues = Object.values(game.groups).flatMap(v => v)
  hintsContainer.append(
    ...(["a", "b"] as const).map(key => {
      let hint = document.createElement("div")
      let hintText = document.createElement("p")
      hintText.textContent =
        key == "a"
          ? `Hint A: ${allValues.find(value =>
              Object.values(game.groups).every(v => v.includes(value))
            )} is in the center`
          : `Hint B: ${game.hint}`
      if (game.hintsUsed[key]) {
        hint.append(hintText)
        return hint
      }
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
        hint.append(hintText)
        appendBonusHint(game)
      })
      hint.append(hintButton)
      return hint
    })
  )
  appendBonusHint(game)
}

function appendBonusHint(game: Game) {
  if (!game.hintsUsed.a || !game.hintsUsed.b) return
  let bonusHint = document.createElement("div")
  let bonusHintText = document.createElement("p")
  let groupKeys = Object.keys(game.groups)
  bonusHintText.textContent = `Bonus Hint: the categories are ${groupKeys.reduce(
    (acc, key, i) => {
      acc += i == groupKeys.length - 1 ? `, and ${key}` : acc ? `, ${key}` : key
      return acc
    },
    ""
  )}`
  if (game.hintsUsed.c) bonusHint.append(bonusHintText)
  else {
    let bonusHintButton = document.createElement("button")
    bonusHintButton.classList.add("hint-button")
    bonusHintButton.textContent =
      "Still stuck? Click here to reveal the categories"
    bonusHintButton.addEventListener("click", () => {
      game.hintsUsed.c = true
      new BroadcastChannel("game").postMessage("save")
      bonusHintButton.remove()
      bonusHint.append(bonusHintText)
    })
    bonusHint.append(bonusHintButton)
  }
  hintsContainer.append(bonusHint)
}
