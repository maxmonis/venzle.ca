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

interface StatValues {
  first: number
  last: number
  streakStart: number
  total: number
}

export interface Stats {
  played: StatValues
  solved: StatValues
}
