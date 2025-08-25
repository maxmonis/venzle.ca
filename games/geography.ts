import type { Game } from "../src/lib/types"

interface GameListItem extends Pick<Game, "groups" | "hint" | "title"> {
  creator?: string
}

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Majority Muslim": ["Indonesia", "Pakistan", "Maldives", "Afghanistan"],
      "Population Exceeds 100 Million": [
        "Indonesia",
        "Pakistan",
        "Brazil",
        "China"
      ],
      "Touches Equator": ["Indonesia", "Maldives", "Brazil", "Ecuador"]
    },
    hint: "Religion, Population, Latitude",
    title: "Countries 2"
  },
  {
    groups: {
      "Hosted Olympics": ["London", "Tokyo", "Turin", "Rio de Janeiro"],
      "National Capital": ["London", "Tokyo", "Cairo", "Panama City"],
      "Part of Roman Empire": ["London", "Turin", "Cairo", "Istanbul"]
    },
    hint: "Olympiad, Capital, Rome",
    title: "Cities"
  },
  {
    groups: {
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"]
    },
    hint: "Beaches, Trees, Language",
    title: "Countries 3"
  }
]
