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
