import type { Game } from "lib/types";
import { gameEvent } from "lib/utils";
import { hintsContainer } from "./elements";

/**
 * Gets the item which is in the center of the puzzle
 */
export function getCenter(game: Game) {
  let values = Object.values(game.groups);

  return values
    .flatMap((v) => v)
    .find((value) => values.every((v) => v.includes(value)))!;
}

/**
 * Initializes the puzzle's hint state
 */
export function initHints(game: Game) {
  hintsContainer.append(
    ...(["a", "b"] as const).map((key) => {
      let hint = document.createElement("div");
      let hintText = document.createElement("p");

      hintText.textContent =
        key == "a"
          ? `Hint A: ${getCenter(game)} is in the center`
          : `Hint B: ${game.hint}`;

      // if they've used the hint we just need to show its text
      if (game.hintsUsed[key]) {
        hint.append(hintText);
        return hint;
      }

      // otherwise we need to initially show its button
      let hintButton = document.createElement("button");
      hintButton.classList.add("hint-button");

      hintButton.textContent =
        key == "a"
          ? "Hint A: Click here to reveal who's in the center"
          : "Hint B: Click here to reveal clues about the categories";

      hintButton.addEventListener("click", () => {
        window.gtag("event", `hint_${key}_click`);

        game.hintsUsed[key] = true;
        gameEvent.post("save");

        hintButton.remove();
        hint.append(hintText);
        appendBonusHint(game);
      });

      hint.append(hintButton);
      return hint;
    }),
  );

  appendBonusHint(game);
}

/**
 * Adds the bonus hint, but only if both initial hints have been used
 */
function appendBonusHint(game: Game) {
  if (!game.hintsUsed.a || !game.hintsUsed.b) {
    // don't add the bonus hint, they haven't used both initial hints
    return;
  }

  let bonusHint = document.createElement("div");
  let bonusHintText = document.createElement("p");

  let groupKeys = Object.keys(game.groups);
  bonusHintText.textContent = `Bonus Hint: the categories are ${groupKeys.reduce(
    (acc, key, i) => {
      acc +=
        i == groupKeys.length - 1 ? `, and ${key}` : acc ? `, ${key}` : key;
      return acc;
    },
    "",
  )}`;

  if (game.hintsUsed.c) {
    // they've used the hint, display its text
    bonusHint.append(bonusHintText);
  } else {
    // they haven't used the hint, display its button

    let bonusHintButton = document.createElement("button");
    bonusHintButton.classList.add("hint-button");
    bonusHintButton.textContent =
      "Still stuck? Click here to reveal the categories";

    bonusHintButton.addEventListener("click", () => {
      window.gtag("event", "hint_c_click");

      game.hintsUsed.c = true;
      gameEvent.post("save");

      bonusHintButton.remove();
      bonusHint.append(bonusHintText);
    });

    bonusHint.append(bonusHintButton);
  }

  hintsContainer.append(bonusHint);
}
