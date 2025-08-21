import { todayIndex } from "game/list"
import { initUI } from "lib/ui"
import { localResults } from "lib/utils"
import "./style.css"

initUI()

let main = document.querySelector("main")!

let results = localResults.get() ?? []

// let i = 20
// while (i < 200) {
//   results.push({
//     guesses: Math.floor(Math.random() * 5) + 1,
//     hints: Math.floor(Math.random() * 4),
//     index: i
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
for (let { guesses, hints, index } of [...results].sort(
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
  if (guesses < 5) {
    activeSolvedStreak++
    totalSolved++
    longestSolvedStreak = Math.max(longestSolvedStreak, activeSolvedStreak)
  } else activeSolvedStreak = 0
  if (guesses == 1 && hints == 0) {
    perfectGames++
    activePerfectStreak++
    longestPerfectStreak = Math.max(activePerfectStreak, longestPerfectStreak)
  } else activePerfectStreak = 0
  lastIndex = index
}
activePerfectStreak = 0
activePlayedStreak = 0
activeSolvedStreak = 0
if (map.has(todayIndex - 1)) {
  let i = todayIndex - 1
  while (map.has(i)) {
    activePlayedStreak++
    if (map.get(i)!.guesses < 5) activeSolvedStreak++
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
  if (todayResult.guesses < 5) activeSolvedStreak++
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

let countsSection = document.createElement("section")
let totalsContainer = document.createElement("div")

let totalsUl = document.createElement("ul")
totalsUl.className = "stats-summary"
let totalsHeading = document.createElement("h3")
totalsHeading.textContent = "Summary"

totalsUl.append(
  ...[
    { value: stats.totalPlayed, text: "Played" },
    { value: stats.totalSolved, text: "Solved" },
    { value: stats.perfectGames, text: "Perfect" },
    { value: stats.successRate.toFixed(0) + "%", text: "Win Rate" },
    { value: stats.averageGuesses.toFixed(1), text: "Avg Guesses" },
    { value: stats.averageHints.toFixed(1), text: "Avg Hints" }
  ].map(item => {
    let li = document.createElement("li")
    let strong = document.createElement("strong")
    strong.textContent = item.value.toString()
    let span = document.createElement("span")
    span.textContent = item.text
    li.append(strong, span)
    return li
  })
)
totalsContainer.append(totalsHeading, totalsUl)

let streaksContainer = document.createElement("div")

let streaksHeading = document.createElement("h3")
streaksHeading.textContent = "Streaks"
let streaksUl = document.createElement("ul")
streaksUl.className = "stats-summary"

streaksUl.append(
  ...[
    { value: stats.activePlayedStreak, text: "Active Played" },
    { value: stats.activeSolvedStreak, text: "Active Solved" },
    { value: stats.activePerfectStreak, text: "Active Perfect" },
    { value: stats.longestPlayedStreak, text: "Best Played" },
    { value: stats.longestSolvedStreak, text: "Best Solved" },
    { value: stats.longestPerfectStreak, text: "Best Perfect" }
  ].map(item => {
    let li = document.createElement("li")
    let strong = document.createElement("strong")
    strong.textContent = item.value.toString()
    let span = document.createElement("span")
    span.textContent = item.text
    li.append(strong, span)
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
guessDistributionGraph.className = "distribution guess-distribution"
let guessHeading = document.createElement("h3")
guessHeading.textContent = "Guess Distribution"
guessDistributionGraph.append(guessHeading)

for (let i = 1; i <= 5; i++) {
  let count = stats.guessDistribution[i] ?? 0
  let bar = document.createElement("div")
  bar.className = "bar"

  let label = document.createElement("span")
  label.textContent = i.toString()

  let barFill = document.createElement("div")
  barFill.className = "bar-fill"
  barFill.style.width = `calc(${(count / maxCount) * 100}% - ${(count / maxCount) * 1.25}rem)`
  barFill.textContent = count.toString()

  bar.append(label, barFill)
  guessDistributionGraph.append(bar)
}
graphContainer.append(guessDistributionGraph)

let hintDistributionGraph = document.createElement("div")
hintDistributionGraph.className = "distribution hint-distribution"
let hintHeading = document.createElement("h3")
hintHeading.textContent = "Hint Distribution"
hintDistributionGraph.append(hintHeading)

for (let i = 0; i <= 3; i++) {
  let count = stats.hintDistribution[i] ?? 0
  let bar = document.createElement("div")
  bar.className = "bar"

  let label = document.createElement("span")
  label.className = "label"
  label.textContent = i.toString()

  let barFill = document.createElement("div")
  barFill.className = "bar-fill"
  barFill.style.width = `calc(${(count / maxCount) * 100}% - ${(count / maxCount) * 1.25}rem)`
  barFill.textContent = count.toString()

  bar.append(label, barFill)
  hintDistributionGraph.append(bar)
}
graphContainer.append(hintDistributionGraph)

main.append(countsSection, graphContainer)
