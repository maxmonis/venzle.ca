import { todayIndex } from "../lib/constants"
import { localStats } from "../lib/utils"
import { statsText } from "./elements"
import { showToast } from "./toast"

export let stats = localStats.get() ?? {
  played: {
    first: -1,
    last: -1,
    streakStart: -1,
    total: 0
  },
  solved: {
    first: -1,
    last: -1,
    streakStart: -1,
    total: 0
  }
}

if (stats.played.last < todayIndex - 1) stats.played.streakStart = -1
if (stats.solved.last < todayIndex - 1) stats.solved.streakStart = -1

if (stats.solved.total == 0)
  setTimeout(() => {
    showToast("Welcome!<br />Scroll down to learn to play")
  }, 2000)

export function displayStats() {
  statsText.innerHTML = `Current Streak: ${
    stats.played.streakStart == -1
      ? 0
      : todayIndex - stats.played.streakStart + 1
  } played and ${
    stats.solved.streakStart == -1
      ? 0
      : todayIndex - stats.solved.streakStart + 1
  } won.<br />Total Games: ${stats.played.total} played and ${
    stats.solved.total
  } won.`
}

export function updateStats(
  status: "failure" | "pending" | "success",
  index: number
) {
  if (status == "pending" || index != todayIndex) return
  if (stats.played.last < todayIndex) stats.played.total++
  if (stats.played.streakStart == -1) stats.played.streakStart = todayIndex
  if (stats.played.first == -1) stats.played.first = todayIndex
  stats.played.last = todayIndex
  if (status == "success") {
    if (stats.solved.last < todayIndex) stats.solved.total++
    if (stats.solved.streakStart == -1) stats.solved.streakStart = todayIndex
    if (stats.solved.first == -1) stats.solved.first = todayIndex
    stats.solved.last = todayIndex
  }
  localStats.set(stats)
  displayStats()
}
