export interface Game {
  groups: Record<string, Array<string>>
  hint: string
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

export interface LocalGame extends Game {
  currentGuess: Guess
  guesses: Array<Guess>
  hints: { a: boolean; b: boolean }
  index: number
}
