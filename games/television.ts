import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    creator: "Margaret Monis",
    groups: {
      "Police Show": [
        "Cagney and Lacey",
        "Blue Bloods",
        "Rizzoli and Isles",
        "Miami Vice"
      ],
      "Set in New York City": [
        "Cagney and Lacey",
        "Blue Bloods",
        "Sex and the City",
        "Friends"
      ],
      "Female Leads": [
        "Cagney and Lacey",
        "Rizzoli and Isles",
        "Sex and the City",
        "Designing Women"
      ]
    },
    hint: "Justice, Metropolis, Heroines",
    published: true,
    title: "TV Shows"
  },
  {
    groups: {
      "Female Leads": ["Girls", "Insecure", "Broad City", "Charmed"],
      "On HBO": ["Girls", "Insecure", "Succession", "Westworld"],
      "Set in New York City": [
        "Girls",
        "Broad City",
        "Succession",
        "How I Met Your Mother"
      ]
    },
    hint: "Heroines, Premium, Metropolis",
    published: false,
    title: "TV Shows 2"
  },

  {
    groups: {
      "Set in New York City": [
        "30 Rock",
        "Broad City",
        "Seinfeld",
        "How I Met Your Mother"
      ],
      "Single-Camera": [
        "30 Rock",
        "Broad City",
        "The Office (US)",
        "Arrested Development"
      ],
      "Originally Aired on NBC": [
        "30 Rock",
        "Seinfeld",
        "The Office (US)",
        "Frasier"
      ]
    },
    hint: "City, Format, Network",
    published: false,
    title: "TV Shows 3"
  }
]
