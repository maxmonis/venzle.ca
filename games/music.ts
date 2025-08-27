import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Released in the 1990s": ["Spice", "Ten", "OK Computer", "Nevermind"],
      "Debut Album": ["Spice", "Ten", "Led Zeppelin", "The Doors"],
      British: ["Spice", "OK Computer", "Led Zeppelin", "Abbey Road"]
    },
    hint: "Decade, Debut, Nationality",
    published: true,
    title: "Albums"
  },
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      "100 Million Physical Records Sold": [
        "Michael Jackson",
        "Eagles",
        "Celine Dion",
        "Led Zeppelin"
      ],
      American: ["Michael Jackson", "Eagles", "Lady Gaga", "Kings of Leon"],
      "Pop Singer": ["Michael Jackson", "Celine Dion", "Lady Gaga", "Dua Lipa"]
    },
    hint: "Sales, Nationality, Genre",
    published: true,
    title: "Musicians"
  },
  {
    groups: {
      "Romantic Era": [
        "Frédéric Chopin",
        "Pyotr Ilyich Tchaikovsky",
        "Franz Schubert",
        "Richard Wagner"
      ],
      "Wrote Piano Concertos": [
        "Frédéric Chopin",
        "Pyotr Ilyich Tchaikovsky",
        "Wolfgang Amadeus Mozart",
        "Sergei Prokofiev"
      ],
      "Died before 40": [
        "Frédéric Chopin",
        "Franz Schubert",
        "Wolfgang Amadeus Mozart",
        "Henry Purcell"
      ]
    },
    hint: "Era, Concertos, Age",
    published: false,
    title: "Composers"
  },
  {
    groups: {
      "One-Word Title": ["Believe", "Bad", "Linger", "Clocks"],
      "Billboard Hot 100 #1 Hit": [
        "Believe",
        "Bad",
        "I Will Always Love You",
        "Hey Jude"
      ],
      "Released in the 1990s": [
        "Believe",
        "Linger",
        "Smells Like Teen Spirit",
        "I Will Always Love You"
      ]
    },
    hint: "Title, Peak, Decade",
    published: false,
    title: "Songs"
  },
  {
    groups: {
      "Released in the 1970s": [
        "Horses",
        "Boston",
        "Blue",
        "The Dark Side of the Moon"
      ],
      "Debut Album": [
        "Horses",
        "Boston",
        "Suzanne Vega",
        "Are You Experienced"
      ],
      "Female Artist": ["Horses", "Blue", "Suzanne Vega", "Back to Black"]
    },
    hint: "Decade, Debut, Artist",
    published: false,
    title: "Albums 2"
  }
]
