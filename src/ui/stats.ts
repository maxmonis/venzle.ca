import { todayIndex } from "../game/state"
import type { Game } from "../lib/types"
import { localResults } from "../lib/utils"
import { statsText } from "./elements"
import { showToast } from "./toast"

let results = localResults.get() ?? []

export let stats = calculateStats()

if (stats.totalSolved == 0)
  setTimeout(() => {
    showToast("Welcome!<br />Scroll down to learn to play")
  }, 2000)

function calculateStats() {
  let map = new Map<number, (typeof results)[number]>()
  for (let r of results) map.set(r.index, r)
  let currentPlayedStreak = 0
  let currentSolvedStreak = 0
  let lastIndex = -1
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
    if (guesses == 1 && hints == 0) perfectGames++
    if (index != lastIndex + 1) {
      currentPlayedStreak = 0
      currentSolvedStreak = 0
    }
    currentPlayedStreak++
    longestPlayedStreak = Math.max(longestPlayedStreak, currentPlayedStreak)
    if (guesses < 5) {
      currentSolvedStreak++
      totalSolved++
      longestSolvedStreak = Math.max(longestSolvedStreak, currentSolvedStreak)
    } else currentSolvedStreak = 0
    lastIndex = index
  }
  currentPlayedStreak = 0
  currentSolvedStreak = 0
  if (map.has(todayIndex - 1)) {
    let i = todayIndex - 1
    while (map.has(i)) {
      currentPlayedStreak++
      if (map.get(i)!.guesses < 5) currentSolvedStreak++
      else break
      i--
    }
  }
  if (todayResult) {
    currentPlayedStreak++
    if (todayResult.guesses < 5) currentSolvedStreak++
  }
  return {
    averageGuesses: totalPlayed ? totalGuesses / totalPlayed : 0,
    averageHints: totalPlayed ? totalHints / totalPlayed : 0,
    currentPlayedStreak,
    currentSolvedStreak,
    longestPlayedStreak,
    longestSolvedStreak,
    perfectGames,
    playedToday: Boolean(todayResult),
    totalPlayed,
    totalSolved
  }
}

export function displayStats() {
  statsText.innerHTML = `<strong>Puzzles of the Day</strong><br />${
    stats.totalPlayed
  } played, ${stats.totalSolved} solved, ${stats.perfectGames} perfect game${
    stats.perfectGames == 1 ? "" : "s"
  }.<br />Current Streaks: ${stats.currentPlayedStreak} played, ${
    stats.currentSolvedStreak
  } solved.<br />Longest Streaks: ${stats.longestPlayedStreak} played, ${
    stats.longestSolvedStreak
  } solved.<br />Averages: ${(
    Math.round(stats.averageGuesses * 10) / 10
  ).toFixed(1)} guesses,  ${(Math.round(stats.averageHints * 10) / 10).toFixed(
    1
  )} hints.`
}

export function updateStats(
  status: "failure" | "pending" | "success",
  game: Game
) {
  if (status == "pending" || game.index != todayIndex) return
  results.push({
    hints: Object.values(game.hintsUsed).filter(Boolean).length,
    guesses: game.guesses.length,
    index: game.index
  })
  localResults.set(results)
  stats = calculateStats()
  displayStats()
}
