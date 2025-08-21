import type { imageFormats } from "./utils"

export interface Game {
  creator: string
  currentGuess: Guess
  groups: Record<string, Array<string>>
  guesses: Array<Guess>
  hint: string
  hintsUsed: { a: boolean; b: boolean; c: boolean }
  index: number
  status: "failed" | "pending" | "solved"
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
