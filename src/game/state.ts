import type { Game } from "lib/types"
import { removeToast, showToast } from "lib/ui"
import {
  localAudio,
  localGame,
  localResults,
  sessionGames,
  sessionIndex
} from "lib/utils"
import { startConfetti } from "./confetti"
import {
  circleContainer,
  creatorText,
  gameControls,
  gameSummary,
  guessesText,
  hintsContainer,
  main,
  pageSubtitle,
  previousGameSelect,
  submitButtonContainer,
  winAudio
} from "./elements"
import { gameList, getTodayIndex } from "./list"

function appendCircleTitles(titles: [string, string, string]) {
  let keys = ["a", "b", "c"]
  circleContainer.append(
    ...titles.map((text, i) => {
      let title = document.createElement("div")
      title.textContent = text
      title.classList.add("circle-title", "circle-title-" + keys[i])
      return title
    })
  )
}

export function checkGame(game: Game, clicked: boolean) {
  removeToast()
  let todayIndex = getTodayIndex()
  let groupEntries = Object.entries(game.groups)
  let { currentGuess } = game
  let guessKeys: Record<"a" | "b" | "c", Array<keyof typeof currentGuess>> = {
    a: ["a", "ab", "abc", "ac"],
    b: ["ab", "abc", "b", "bc"],
    c: ["abc", "ac", "bc", "c"]
  }
  let [titleA] =
    groupEntries.find(([, values]) =>
      guessKeys.a.every(key => values.includes(currentGuess[key]))
    ) ?? []
  let [titleB] =
    groupEntries.find(([, values]) =>
      guessKeys.b.every(key => values.includes(currentGuess[key]))
    ) ?? []
  let [titleC] =
    groupEntries.find(([, values]) =>
      guessKeys.c.every(key => values.includes(currentGuess[key]))
    ) ?? []
  if (titleA && titleB && titleC) {
    pageSubtitle.textContent = "You got it! Congratulations 🥳"
    creatorText.after(pageSubtitle)
    appendCircleTitles([titleA, titleB, titleC])
    let hintCount = Object.values(game.hintsUsed).filter(Boolean).length
    let guessCount = game.guesses.length
    gameSummary.innerHTML =
      guessCount == 1 && hintCount == 0
        ? "First try with no hints, that's a perfect game 😎"
        : `You used ${hintCount} hint${
            hintCount == 1 ? "" : "s"
          } and ${guessCount} guess${guessCount == 1 ? "" : "es"} 😄`
    if (game.index == todayIndex)
      gameSummary.innerHTML +=
        "<br />Come back tomorrow for a new puzzle!<br />" +
        "<div><a href='./share-results/'>Share Results</a></div>"
    for (let dropzone of document.querySelectorAll(".dropzone")) {
      dropzone.removeAttribute("data-dnd-value")
      dropzone.removeAttribute("draggable")
    }
    circleContainer.after(gameSummary)
    gameControls.remove()
    submitButtonContainer.remove()
    hintsContainer.remove()
    if (clicked) {
      game.status = "solved"
      saveGame(game)
      updateResults(game)
      startConfetti()
      if (localAudio.get()) {
        document.body.append(winAudio)
        winAudio.play()
        setTimeout(() => {
          winAudio.remove()
        }, 4000)
      }
    }
    return
  }
  let remainingGuesses = 5 - game.guesses.length
  if (remainingGuesses) {
    let guessesTextContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`
    guessesText.textContent = guessesTextContent
    if (clicked) {
      let correctPart = ""
      if (getCenter(game) == game.currentGuess.abc) {
        let allItems = Object.values(game.groups).flatMap(v => v)
        if (
          titleA &&
          allItems.filter(item => item == game.currentGuess.a).length == 1
        )
          correctPart = "🟡 yellow circle"
        else if (
          titleB &&
          allItems.filter(item => item == game.currentGuess.b).length == 1
        )
          correctPart = "🔵 blue circle"
        else if (
          titleC &&
          allItems.filter(item => item == game.currentGuess.c).length == 1
        )
          correctPart = "🔴 red circle"
        else correctPart = "The center"
      }
      showToast(
        (correctPart
          ? `${correctPart} is correct ✅`
          : "That's not the answer but keep trying!") +
          "<br />You have " +
          guessesTextContent,
        correctPart ? 5000 : 3000
      )
    }
  } else {
    pageSubtitle.textContent = "Better luck next time!"
    creatorText.after(pageSubtitle)
    submitButtonContainer.remove()
    hintsContainer.remove()
    let [titleA, valuesA] = groupEntries[0]!
    let [titleB, valuesB] = groupEntries[1]!
    let [titleC, valuesC] = groupEntries[2]!
    let solution: typeof game.currentGuess = {
      a: valuesA.find(p => !valuesB.includes(p) && !valuesC.includes(p))!,
      b: valuesB.find(p => !valuesA.includes(p) && !valuesC.includes(p))!,
      c: valuesC.find(p => !valuesA.includes(p) && !valuesB.includes(p))!,
      ab: valuesA.find(p => valuesB.includes(p) && !valuesC.includes(p))!,
      ac: valuesA.find(p => !valuesB.includes(p) && valuesC.includes(p))!,
      bc: valuesB.find(p => !valuesA.includes(p) && valuesC.includes(p))!,
      abc: valuesA.find(p => valuesB.includes(p) && valuesC.includes(p))!
    }
    for (let [key, value] of Object.entries(solution)) {
      let dropzone = main.querySelector(`#dropzone-${key}`)
      if (!dropzone) continue
      dropzone.textContent = value
      dropzone.removeAttribute("data-dnd-value")
      dropzone.removeAttribute("draggable")
    }
    appendCircleTitles([titleA, titleB, titleC])
    gameSummary.innerHTML = "This was a tough one and you're out of guesses 😔"
    if (game.index == todayIndex)
      gameSummary.innerHTML += "<br />Come back tomorrow for a new puzzle!"
    circleContainer.after(gameSummary)
    if (clicked) {
      game.status = "failed"
      saveGame(game)
      updateResults(game)
    }
  }
}

export function getCenter(game: Game) {
  let values = Object.values(game.groups)
  return values
    .flatMap(v => v)
    .find(value => values.every(v => v.includes(value)))!
}

export function getGame(index: number): Game {
  let todayIndex = getTodayIndex()
  if (index == todayIndex) {
    let game = localGame.get()
    if (game && game.index == todayIndex) return game
  }
  let game = sessionGames.get()?.find(g => g.index == index)
  if (game) return game
  if (index >= gameList.length) {
    window.location.reload()
    throw "Caching issue"
  }
  let { creator = "Max Monis", ...newGame } = gameList[index]!
  return {
    ...newGame,
    creator,
    currentGuess: {
      a: "",
      ab: "",
      abc: "",
      ac: "",
      b: "",
      bc: "",
      c: ""
    },
    guesses: [],
    hintsUsed: { a: false, b: false, c: false },
    index,
    status: "pending"
  }
}

export function getGameText(title: string, index: number) {
  return `${
    index == 0
      ? "How to Play"
      : index == getTodayIndex()
        ? "Today's Puzzle"
        : `Puzzle ${index}`
  }: ${title}`
}

export function initPreviousGameSelect() {
  let todayIndex = getTodayIndex()
  let selectedGameIndex = sessionIndex.get() ?? todayIndex
  previousGameSelect.innerHTML = ""
  previousGameSelect.append(
    ...gameList
      .slice(0, todayIndex + 1)
      .map((game, index) => {
        let option = document.createElement("option")
        option.selected = index == selectedGameIndex
        option.textContent = getGameText(game.title, index)
        option.value = index.toString()
        return option
      })
      .reverse()
  )
}

export function resetGame() {
  pageSubtitle.remove()
  gameSummary.remove()
  hintsContainer.innerHTML = ""
  for (let element of document.querySelectorAll(
    "[draggable=true],.dropzone,.circle-title"
  ))
    element.remove()
  circleContainer.after(gameControls, hintsContainer)
}

export function saveGame(game: Game) {
  if (game.index == getTodayIndex()) {
    localGame.set(game)
    return
  }
  let games = sessionGames.get() ?? []
  let mapped = false
  games = games.map(g => {
    if (g.index == game.index) {
      mapped = true
      return game
    }
    return g
  })
  if (!mapped) games.push(game)
  sessionGames.set(games)
}

export function updateGameState(game: Game) {
  for (let dropzone of document.querySelectorAll(".dropzone")) {
    let id = dropzone.id.split("-")[1] as keyof typeof game.currentGuess
    if (id in game.currentGuess)
      game.currentGuess[id] = dropzone.getAttribute("data-dnd-value") ?? ""
  }
  if (Object.values(game.currentGuess).every(Boolean)) {
    gameControls.remove()
    let remainingGuesses = 5 - game.guesses.length
    guessesText.textContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`
    circleContainer.after(submitButtonContainer)
  } else {
    if (!main.contains(gameControls)) circleContainer.after(gameControls)
    submitButtonContainer.remove()
  }
  saveGame(game)
}

function updateResults(game: Game) {
  if (game.index != getTodayIndex()) return
  let results = localResults.get() ?? []
  results.push({
    hints: Object.values(game.hintsUsed).filter(Boolean).length,
    guesses: game.guesses.length,
    index: game.index,
    status: game.status
  })
  localResults.set(results)
}
