import type { Game, ImageFormat } from "./types"

class LocalStorage<
  K extends "audio" | "dark" | "format" | "game" | "name" | "results",
  T extends K extends "audio" | "dark"
    ? boolean
    : K extends "format"
      ? ImageFormat
      : K extends "game"
        ? Game
        : K extends "name"
          ? string
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
}

class SessionStorage<
  K extends "games" | "index",
  T extends K extends "games" ? Array<Game> : K extends "index" ? number : never
> {
  private readonly key: K
  constructor(key: K) {
    this.key = key
  }
  get(): T | null {
    let item = sessionStorage.getItem(this.key)
    return item ? JSON.parse(item) : null
  }
  set(item: T) {
    sessionStorage.setItem(this.key, JSON.stringify(item))
  }
  remove() {
    sessionStorage.removeItem(this.key)
  }
}

export let localAudio = new LocalStorage("audio")
export let localDark = new LocalStorage("dark")
export let localFormat = new LocalStorage("format")
export let localGame = new LocalStorage("game")
export let localName = new LocalStorage("name")
export let localResults = new LocalStorage("results")

export let sessionGames = new SessionStorage("games")
export let sessionIndex = new SessionStorage("index")
