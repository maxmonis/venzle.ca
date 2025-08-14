import type { LocalGame, Stats } from "./types"

class LocalStorage<
  K extends "game" | "stats" | "theme",
  T extends K extends "game"
    ? LocalGame
    : K extends "stats"
      ? Stats
      : K extends "theme"
        ? "dark" | "light"
        : never
> {
  private readonly key: K
  constructor(key: K) {
    this.key = key
  }
  get(): T | null {
    let item = localStorage.getItem(this.key)
    return item ? JSON.parse(item) : null
  }
  set(item: T) {
    localStorage.setItem(this.key, JSON.stringify(item))
  }
  remove() {
    localStorage.removeItem(this.key)
  }
}

export let localGame = new LocalStorage("game")
export let localStats = new LocalStorage("stats")
export let localTheme = new LocalStorage("theme")

export function shuffle<T>(items: Array<T>) {
  let res = [...items]
  let len = res.length
  for (let i = 0; i < len; i++) {
    let item = res[i]!
    let randomIndex = Math.floor(Math.random() * len)
    res[i] = res[randomIndex]!
    res[randomIndex] = item
  }
  return res
}
