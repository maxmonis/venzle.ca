import { initUI, reduceMotion } from "lib/ui"
import { localResults, todayIndex } from "lib/utils"
import "./style.css"

initUI()

let main = document.querySelector("main")!

let results = localResults.get() ?? []

// let i = 20
// while (i < 200) {
//   let guesses = Math.floor(Math.random() * 5) + 1
//   results.push({
//     guesses,
//     hints: Math.floor(Math.random() * 4),
//     index: i,
//     status: guesses == 5 && Math.round(Math.random()) ? "failed" : "solved"
//   })
//   i += Math.floor(Math.random() * 3) + 1
// }

let map = new Map<number, (typeof results)[number]>()
for (let r of results) map.set(r.index, r)
let activePerfectStreak = 0
let activePlayedStreak = 0
let activeSolvedStreak = 0
let guessDistribution: Record<number, number> = {}
let hintDistribution: Record<number, number> = {}
let lastIndex = -1
let longestPerfectStreak = 0
let longestPlayedStreak = 0
let longestSolvedStreak = 0
let perfectGames = 0
let todayResult = map.get(todayIndex)
let totalGuesses = 0
let totalHints = 0
let totalPlayed = results.length
let totalSolved = 0
for (let { guesses, hints, index, status } of [...results].sort(
  (a, b) => a.index - b.index
)) {
  totalGuesses += guesses
  totalHints += hints
  guessDistribution[guesses] ??= 0
  guessDistribution[guesses]++
  hintDistribution[hints] ??= 0
  hintDistribution[hints]++
  if (index != lastIndex + 1) {
    activePerfectStreak = 0
    activePlayedStreak = 0
    activeSolvedStreak = 0
  }
  activePlayedStreak++
  longestPlayedStreak = Math.max(longestPlayedStreak, activePlayedStreak)
  if (status == "solved") {
    activeSolvedStreak++
    totalSolved++
    longestSolvedStreak = Math.max(longestSolvedStreak, activeSolvedStreak)
    if (guesses == 1 && hints == 0) {
      perfectGames++
      activePerfectStreak++
      longestPerfectStreak = Math.max(activePerfectStreak, longestPerfectStreak)
    } else activePerfectStreak = 0
  } else activeSolvedStreak = 0
  lastIndex = index
}
activePerfectStreak = 0
activePlayedStreak = 0
activeSolvedStreak = 0
if (map.has(todayIndex - 1)) {
  let i = todayIndex - 1
  while (map.has(i)) {
    activePlayedStreak++
    if (map.get(i)!.status == "solved") activeSolvedStreak++
    else break
    i--
  }
}
if (map.has(todayIndex - 1)) {
  let i = todayIndex - 1
  while (map.has(i)) {
    if (map.get(i)!.guesses == 1 && map.get(i)!.hints == 0)
      activePerfectStreak++
    else break
    i--
  }
}
if (todayResult) {
  activePlayedStreak++
  if (todayResult.status == "solved") activeSolvedStreak++
  if (todayResult.guesses == 1 && todayResult.hints == 0) activePerfectStreak++
}
let stats = {
  averageGuesses: totalPlayed ? totalGuesses / totalPlayed : 0,
  averageHints: totalPlayed ? totalHints / totalPlayed : 0,
  activePerfectStreak,
  activePlayedStreak,
  activeSolvedStreak,
  guessDistribution,
  hintDistribution,
  longestPerfectStreak,
  longestPlayedStreak,
  longestSolvedStreak,
  perfectGames,
  playedToday: Boolean(todayResult),
  successRate: totalPlayed ? (totalSolved / totalPlayed) * 100 : 0,
  totalPlayed,
  totalSolved
}

let totalsList = [
  { value: stats.totalPlayed, text: "Played" },
  { value: stats.totalSolved, text: "Solved" },
  { value: stats.perfectGames, text: "Perfect" },
  { value: stats.successRate, text: "Win Rate", isPercentage: true },
  { value: stats.averageGuesses, text: "Avg Guesses", decimalPlaces: 1 },
  { value: stats.averageHints, text: "Avg Hints", decimalPlaces: 1 }
]

let streaksList = [
  { value: stats.activePlayedStreak, text: "Active Played" },
  { value: stats.activeSolvedStreak, text: "Active Solved" },
  { value: stats.activePerfectStreak, text: "Active Perfect" },
  { value: stats.longestPlayedStreak, text: "Best Played" },
  { value: stats.longestSolvedStreak, text: "Best Solved" },
  { value: stats.longestPerfectStreak, text: "Best Perfect" }
]

let countsSection = document.createElement("section")
let totalsContainer = document.createElement("div")

let totalsUl = document.createElement("ul")
totalsUl.classList.add("stats-summary")
let totalsHeading = document.createElement("h3")
totalsHeading.textContent = "Summary"

totalsUl.append(
  ...totalsList.map(({ text }) => {
    let li = document.createElement("li")
    let strong = document.createElement("strong")
    strong.textContent = "0"
    let small = document.createElement("small")
    small.textContent = text
    li.append(strong, small)
    return li
  })
)
totalsContainer.append(totalsHeading, totalsUl)

let streaksContainer = document.createElement("div")

let streaksHeading = document.createElement("h3")
streaksHeading.textContent = "Streaks"
let streaksUl = document.createElement("ul")
streaksUl.classList.add("stats-summary")

streaksUl.append(
  ...streaksList.map(({ text }) => {
    let li = document.createElement("li")
    let strong = document.createElement("strong")
    strong.textContent = "0"
    let small = document.createElement("small")
    small.textContent = text
    li.append(strong, small)
    return li
  })
)
streaksContainer.append(streaksHeading, streaksUl)

countsSection.append(totalsContainer, streaksContainer)

let graphContainer = document.createElement("section")

let maxCount = Math.max(
  Math.max(
    ...Object.values(stats.hintDistribution),
    ...Object.values(stats.guessDistribution),
    1
  )
)

let guessDistributionGraph = document.createElement("div")
guessDistributionGraph.classList.add("distribution")
let guessHeading = document.createElement("h3")
guessHeading.textContent = "Guess Distribution"
guessDistributionGraph.append(guessHeading)

for (let i = 1; i <= 5; i++) {
  let bar = document.createElement("div")
  bar.classList.add("bar")

  let label = document.createElement("span")
  label.textContent = i.toString()

  let barFill = document.createElement("div")
  barFill.classList.add("bar-fill")
  barFill.style.width = "0%"
  barFill.textContent = "0"

  bar.append(label, barFill)
  guessDistributionGraph.append(bar)
}
graphContainer.append(guessDistributionGraph)

let hintDistributionGraph = document.createElement("div")
hintDistributionGraph.classList.add("distribution")
let hintHeading = document.createElement("h3")
hintHeading.textContent = "Hint Distribution"
hintDistributionGraph.append(hintHeading)

for (let i = 0; i <= 3; i++) {
  let bar = document.createElement("div")
  bar.classList.add("bar")

  let label = document.createElement("span")
  label.textContent = i.toString()

  let barFill = document.createElement("div")
  barFill.classList.add("bar-fill")
  barFill.style.width = "0%"
  barFill.textContent = "0"

  bar.append(label, barFill)
  hintDistributionGraph.append(bar)
}
graphContainer.append(hintDistributionGraph)

main.append(countsSection, graphContainer)

function animateNumber(
  element: HTMLElement,
  endValue: number,
  duration: number,
  isPercentage = false,
  decimalPlaces = 0
) {
  if (reduceMotion) duration = 1
  let startTime = -1
  function step(timestamp: number) {
    if (startTime == -1) startTime = timestamp
    let progress = Math.min((timestamp - startTime) / duration, 1)
    let currentValue = progress * endValue
    element.textContent =
      (decimalPlaces
        ? currentValue.toFixed(decimalPlaces)
        : Math.floor(currentValue)) + (isPercentage ? "%" : "")
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

document.addEventListener("DOMContentLoaded", () => {
  totalsUl.querySelectorAll("li").forEach((li, index) => {
    let strong = li.querySelector("strong")!
    let { decimalPlaces, isPercentage, value } = totalsList[index]!
    animateNumber(strong, value, 1000, isPercentage, decimalPlaces)
  })

  streaksUl.querySelectorAll("li").forEach((li, index) => {
    let strong = li.querySelector("strong")!
    let { value } = streaksList[index]!
    animateNumber(strong, value, 1000)
  })

  guessDistributionGraph
    .querySelectorAll<HTMLElement>(".bar")
    .forEach((bar, i) => {
      let barFill = bar.querySelector<HTMLElement>(".bar-fill")!
      let count = stats.guessDistribution[i + 1] ?? 0
      setTimeout(
        () => {
          barFill.style.width = `calc(${(count / maxCount) * 100}% - ${(count / maxCount) * 1.25}rem)`
          animateNumber(barFill, count, 1000)
        },
        reduceMotion ? 0 : 300
      )
    })

  hintDistributionGraph
    .querySelectorAll<HTMLElement>(".bar")
    .forEach((bar, i) => {
      let barFill = bar.querySelector<HTMLElement>(".bar-fill")!
      let count = stats.hintDistribution[i] ?? 0
      setTimeout(
        () => {
          barFill.style.width = `calc(${(count / maxCount) * 100}% - ${(count / maxCount) * 1.25}rem)`
          animateNumber(barFill, count, 1000)
        },
        reduceMotion ? 0 : 300
      )
    })
})
