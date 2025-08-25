import type { Game, ImageFormat } from "./types"

export let imageFormats = ["jpg", "png", "webp"] as const

export let todayIndex = Math.floor(
  (Date.now() - Date.UTC(2025, 7, 23)) / 86400000
)

class Channel<
  K extends "game" | "theme",
  T extends K extends "game"
    ? Game
    : K extends "theme"
      ? "audio" | "dark"
      : never
> {
  private readonly channel: BroadcastChannel
  constructor(key: K) {
    this.channel = new BroadcastChannel(key)
  }
  post(data: T) {
    this.channel.postMessage(data)
  }
  listen(callback: (data: T) => void) {
    this.channel.onmessage = e => {
      callback(e.data)
    }
  }
}

class Event<
  K extends "game",
  T extends K extends "game"
    ? "reset" | "save" | "submit" | "update" | number
    : never
> {
  private readonly key: `CustomEvent:${K}`
  constructor(key: K) {
    this.key = `CustomEvent:${key}`
  }
  post(data: T) {
    document.dispatchEvent(new CustomEvent(this.key, { detail: { data } }))
  }
  listen(callback: (data: T) => void) {
    document.addEventListener(this.key, event => {
      let customEvent = event as CustomEvent
      callback(customEvent.detail.data)
    })
  }
}

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
            ? Array<{
                guesses: number
                hints: number
                index: number
                status: Game["status"]
              }>
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
  K extends "games" | "index" | "load",
  T extends K extends "games"
    ? Array<Game>
    : K extends "index" | "load"
      ? number
      : never
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

export let gameChannel = new Channel("game")
export let themeChannel = new Channel("theme")

export let gameEvent = new Event("game")

export let localAudio = new LocalStorage("audio")
export let localDark = new LocalStorage("dark")
export let localFormat = new LocalStorage("format")
export let localGame = new LocalStorage("game")
export let localName = new LocalStorage("name")
export let localResults = new LocalStorage("results")

export let sessionGames = new SessionStorage("games")
export let sessionIndex = new SessionStorage("index")
export let sessionLoad = new SessionStorage("load")
