import { gameList } from "../game/list";
import type { Game, ImageFormat } from "./types";

export let imageFormats = ["jpg", "png", "webp"] as const;

export let todayIndex = Math.floor(
  (Date.now() - Date.UTC(2025, 7, 23)) / 86400000,
);

let finalIndex = gameList.length - 1;

if (todayIndex > finalIndex) {
  todayIndex = finalIndex;
}

class Channel<
  K extends "game" | "theme",
  T extends K extends "game"
    ? Game
    : K extends "theme"
      ? "audio" | "dark"
      : never,
> {
  private readonly channel: BroadcastChannel;

  constructor(key: K) {
    this.channel = new BroadcastChannel(key);
  }

  post(data: T) {
    this.channel.postMessage(data);
  }

  listen(callback: (data: T) => void) {
    this.channel.onmessage = (e) => {
      callback(e.data);
    };
  }
}

class Event<
  K extends "game",
  T extends K extends "game"
    ? "reset" | "save" | "submit" | "update" | number
    : never,
> {
  private readonly key: `CustomEvent:${K}`;

  constructor(key: K) {
    this.key = `CustomEvent:${key}`;
  }

  post(data: T) {
    document.dispatchEvent(
      new CustomEvent(this.key, {
        detail: {
          data,
        },
      }),
    );
  }

  listen(callback: (data: T) => void) {
    document.addEventListener(this.key, (event) => {
      let customEvent = event as CustomEvent;
      callback(customEvent.detail.data);
    });
  }
}

class LocalStorage<
  K extends "audio" | "dark" | "format" | "games" | "load" | "name" | "results",
  T extends K extends "audio" | "dark"
    ? boolean
    : K extends "format"
      ? ImageFormat
      : K extends "games"
        ? Array<Game>
        : K extends "load"
          ? number
          : K extends "name"
            ? string
            : K extends "results"
              ? Array<{
                  guesses: number;
                  hints: number;
                  index: number;
                  status: Game["status"];
                }>
              : never,
> {
  private readonly key: K;

  constructor(key: K) {
    this.key = key;
  }

  get(): T | null {
    let item = localStorage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }

  set(item: T) {
    localStorage.setItem(this.key, JSON.stringify(item));
  }
}

class SessionStorage<
  K extends "index",
  T extends K extends "index" ? number : never,
> {
  private readonly key: K;

  constructor(key: K) {
    this.key = key;
  }
  get(): T | null {
    let item = sessionStorage.getItem(this.key);
    return item ? JSON.parse(item) : null;
  }

  set(item: T) {
    sessionStorage.setItem(this.key, JSON.stringify(item));
  }

  remove() {
    sessionStorage.removeItem(this.key);
  }
}

export let gameChannel = new Channel("game");
export let themeChannel = new Channel("theme");

export let gameEvent = new Event("game");

export let localAudio = new LocalStorage("audio");
export let localDark = new LocalStorage("dark");
export let localFormat = new LocalStorage("format");
export let localGames = new LocalStorage("games");
export let localLoad = new LocalStorage("load");
export let localName = new LocalStorage("name");

/**
 * Deprecated now that all games are saved to localStorage, but still
 * used on stats page since some browsers may contain old data
 */
export let localResults = new LocalStorage("results");

export let sessionIndex = new SessionStorage("index");
