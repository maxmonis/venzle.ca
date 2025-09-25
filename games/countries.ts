import type { GameListItem } from "../src/lib/types"

export let countries: Array<GameListItem> = [
  {
    groups: {
      "Constitutional Monarchy": ["Canada", "Sweden", "Australia", "Japan"],
      "Touches the Arctic Circle": ["Canada", "Sweden", "USA", "Russia"],
      "English is Official Language": [
        "Canada",
        "Australia",
        "USA",
        "South Africa"
      ]
    },
    hint: "Government, Latitude, Language",
    published: true,
    title: "Countries"
  },
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
    published: true,
    title: "Countries"
  },
  {
    groups: {
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"]
    },
    hint: "Beaches, Trees, Language",
    published: false,
    title: "Countries"
  }
]
