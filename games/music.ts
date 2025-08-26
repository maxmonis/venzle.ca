import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
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
    title: "Musicians"
  },
  {
    groups: {
      "Released in the 1990s": [
        "Definitely Maybe (Oasis)",
        "Ten (Pearl Jam)",
        "OK Computer (Radiohead)",
        "Nevermind (Nirvana)"
      ],
      "Debut Album": [
        "Definitely Maybe (Oasis)",
        "Ten (Pearl Jam)",
        "Please Please Me (The Beatles)",
        "Appetite for Destruction (Guns N' Roses)"
      ],
      British: [
        "Definitely Maybe (Oasis)",
        "OK Computer (Radiohead)",
        "Please Please Me (The Beatles)",
        "Houses of the Holy (Led Zeppelin)"
      ]
    },
    hint: "Decade, Debut, Nationality",
    title: "Albums"
  }
]
