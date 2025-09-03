import { startConfetti } from "game/confetti"
import { createDraggable, initDraggables, initDropzones } from "game/dnd"
import {
  circleContainer,
  creatorText,
  gameControls,
  gameSummary,
  guessesText,
  hintsContainer,
  homeButton,
  main,
  pageSubtitle,
  pageTitle,
  previousGameSelect,
  resetButton,
  submitButtonContainer,
  winAudio
} from "game/elements"
import { getCenter, initHints } from "game/hints"
import { gameList } from "game/list"
import type { Game } from "lib/types"
import { initUI, reloadIfStale, removeToast, showToast } from "lib/ui"
import {
  gameChannel,
  gameEvent,
  localAudio,
  localGame,
  localLoad,
  localResults,
  sessionGames,
  sessionIndex,
  todayIndex
} from "lib/utils"
import "./style.css"

if (!localLoad.get()) showWelcomeDialog()
reloadIfStale()

if (location.pathname != "/") location.replace(location.origin)

let game = getGame(sessionIndex.get() ?? todayIndex)

initUI()
initGame()

function initGame() {
  window.scrollTo({ behavior: "smooth", top: 0 })
  pageTitle.textContent = getGameText(game.title, game.index)
  creatorText.textContent = `Created by ${game.creator}`
  initDropzones(game)
  initDraggables(game)
  initHints(game)
  updateGameState()
  if (game.index == todayIndex) {
    sessionIndex.remove()
    homeButton.remove()
  } else {
    main.prepend(homeButton)
    sessionIndex.set(game.index)
  }
  if (game.status != "pending") checkGame(false)
}

let selectedGameIndex = sessionIndex.get() ?? todayIndex
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

function checkGame(clicked: boolean) {
  removeToast()
  if (clicked && reloadIfStale()) return
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
        "<div><a href='./share/'>Share Results</a></div>"
    for (let dropzone of document.querySelectorAll(".dropzone")) {
      dropzone.removeAttribute("data-dnd-value")
      dropzone.removeAttribute("draggable")
    }
    circleContainer.after(gameSummary)
    gameControls.remove()
    submitButtonContainer.remove()
    resetButton.remove()
    hintsContainer.remove()
    if (clicked) {
      window.gtag("event", "puzzle_solve")
      if (game.index == todayIndex) window.gtag("event", "daily_puzzle_solve")
      game.status = "solved"
      saveGame()
      updateResults()
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
  let guessCount = game.guesses.length
  let remainingGuesses = 5 - guessCount
  if (remainingGuesses) {
    if (clicked) window.gtag("event", `incorrect_guess_${guessCount}`)
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
    resetButton.remove()
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
      dropzone.innerHTML = `<span>${value}</span>`
      dropzone.removeAttribute("data-dnd-value")
      dropzone.removeAttribute("draggable")
    }
    appendCircleTitles([titleA, titleB, titleC])
    gameSummary.innerHTML = "This was a tough one and you're out of guesses 😔"
    if (game.index == todayIndex)
      gameSummary.innerHTML += "<br />Come back tomorrow for a new puzzle!"
    circleContainer.after(gameSummary)
    if (clicked) {
      window.gtag("event", "puzzle_fail")
      if (game.index == todayIndex) window.gtag("event", "daily_puzzle_fail")
      game.status = "failed"
      saveGame()
      updateResults()
    }
  }
}

function clearPuzzle() {
  for (let key in game.currentGuess)
    game.currentGuess[key as keyof typeof game.currentGuess] = ""
  for (let dropzone of document.querySelectorAll<HTMLElement>(".dropzone")) {
    let dropzoneText = dropzone.textContent
    let dropzoneValue = dropzone.getAttribute("data-dnd-value")
    if (!dropzoneText || !dropzoneValue) continue
    dropzone.innerHTML = ""
    dropzone.removeAttribute("data-dnd-value")
    dropzone.removeAttribute("draggable")
    createDraggable(dropzoneText, dropzoneValue)
  }
  updateGameState()
}

function getGame(index: number): Game {
  if (index == todayIndex) {
    window.gtag("event", "puzzle_resume")
    if (index == todayIndex) window.gtag("event", "daily_puzzle_resume")
    let game = localGame.get()
    if (game && game.index == todayIndex) return game
  }
  let game = sessionGames.get()?.find(g => g.index == index)
  if (game) return game
  if (index >= gameList.length) {
    window.gtag("event", "invalid_puzzle_index")
    index = gameList.length - 1
    reloadIfStale()
  }
  window.gtag("event", "puzzle_start")
  if (index == todayIndex) window.gtag("event", "daily_puzzle_start")
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

function getGameText(title: string, index: number) {
  return `${
    index == 0
      ? "How to Play"
      : index == todayIndex
        ? "Today's Puzzle"
        : `Puzzle ${index}`
  }: ${title}`
}

function resetGame() {
  pageSubtitle.remove()
  gameSummary.remove()
  for (let element of document.querySelectorAll(
    "[draggable=true],.dropzone,.circle-title"
  ))
    element.remove()
  hintsContainer.innerHTML = ""
  circleContainer.after(gameControls, hintsContainer)
}

function saveGame() {
  if (game.index == todayIndex) {
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

function showWelcomeDialog() {
  let dialog = document.createElement("dialog")
  let content = document.createElement("div")
  let heading = document.createElement("h1")
  heading.textContent = "Welcome to Venzle!"
  let text = document.createElement("p")
  text.textContent = "Get started by learning to play"
  let ctaContainer = document.createElement("div")
  ctaContainer.classList.add("dialog-cta-container")
  let button = document.createElement("button")
  button.textContent = "Skip"
  button.classList.add("red-text")
  let link = document.createElement("a")
  link.textContent = "How to Play"
  link.autofocus = true
  link.setAttribute("href", "./learn/")
  for (let element of [button, link])
    element.addEventListener("click", () => {
      dialog.close()
      dialog.remove()
    })
  ctaContainer.append(button, link)
  content.append(heading, text, ctaContainer)
  dialog.append(content)
  document.body.append(dialog)
  dialog.showModal()
  dialog.addEventListener("keydown", e => {
    if (e.key == "Escape") e.preventDefault()
  })
}

function updateGameState() {
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
    if (!main.contains(submitButtonContainer))
      circleContainer.after(submitButtonContainer)
  } else {
    if (!main.contains(gameControls)) circleContainer.after(gameControls)
    submitButtonContainer.remove()
  }
  if (!Object.values(game.currentGuess).some(Boolean)) resetButton.remove()
  else if (!main.contains(resetButton)) gameControls.after(resetButton)
  saveGame()
  gameChannel.post(game)
}

function updateResults() {
  if (game.index != todayIndex) return
  let results = localResults.get() ?? []
  results.push({
    hints: Object.values(game.hintsUsed).filter(Boolean).length,
    guesses: game.guesses.length,
    index: game.index,
    status: game.status
  })
  localResults.set(results)
}

gameChannel.listen(data => {
  if (JSON.stringify(data) == JSON.stringify(game)) return
  resetGame()
  game = data
  initGame()
})

gameEvent.listen(data => {
  if (data == "update") updateGameState()
  else if (data == "save") saveGame()
  else if (data == "reset") clearPuzzle()
  else if (data == "submit") {
    if (
      game.guesses.some(
        guess => JSON.stringify(guess) == JSON.stringify(game.currentGuess)
      )
    ) {
      showToast("You already guessed that 😅<br />Please try again")
      return
    }
    game.guesses.push({ ...game.currentGuess })
    saveGame()
    checkGame(true)
    gameChannel.post(game)
  } else if (typeof data == "number") {
    resetGame()
    game = getGame(data)
    initGame()
  }
})
