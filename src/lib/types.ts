import type { imageFormats } from "./constants"

export interface Game {
  currentGuess: Guess
  groups: Record<string, Array<string>>
  guesses: Array<Guess>
  hint: string
  hintsUsed: { a: boolean; b: boolean; c: boolean }
  index: number
  title: string
}

interface Guess {
  a: string
  ab: string
  abc: string
  ac: string
  b: string
  bc: string
  c: string
}

export type ImageFormat = (typeof imageFormats)[number]
