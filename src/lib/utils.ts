import type { Game } from "./types"

class LocalStorage<
  K extends "dark" | "game" | "results",
  T extends K extends "dark"
    ? boolean
    : K extends "game"
      ? Game
      : K extends "results"
        ? Array<{ guesses: number; hints: number; index: number }>
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

export let localDark = new LocalStorage("dark")
export let localGame = new LocalStorage("game")
export let localResults = new LocalStorage("results")

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
