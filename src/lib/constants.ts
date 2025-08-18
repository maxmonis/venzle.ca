import { gameList } from "../game/list"
import type { Game } from "./types"

export let guessKeys: Record<
  "a" | "b" | "c",
  Array<keyof Game["currentGuess"]>
> = {
  a: ["a", "ab", "abc", "ac"],
  b: ["ab", "abc", "b", "bc"],
  c: ["abc", "ac", "bc", "c"]
}

export let todayIndex =
  Math.floor((Date.now() - Date.UTC(2025, 7, 13)) / 86400000) % gameList.length
