import type { Game } from "../src/lib/types"

interface GameListItem extends Pick<Game, "groups" | "hint" | "title"> {
  creator?: string
}

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Led a Nation During Wartime": [
        "Abraham Lincoln",
        "Winston Churchill",
        "Czar Nicholas II",
        "Joseph Stalin"
      ],
      "Killed with a Firearm": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Czar Nicholas II",
        "Franz Ferdinand"
      ],
      "Appears on Modern Currency": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Winston Churchill",
        "Thomas Jefferson"
      ]
    },
    hint: "War, Death, Money",
    title: "Historical Figures"
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
    title: "Countries 2"
  },
  {
    groups: {
      "Happened in the 18th Century": [
        "American Revolution",
        "Boston Tea Party",
        "French Revolution",
        "Cook's First Voyage"
      ],
      "Happened in North America": [
        "American Revolution",
        "Boston Tea Party",
        "Mexican Revolution",
        "California Gold Rush"
      ],
      Revolution: [
        "American Revolution",
        "Mexican Revolution",
        "French Revolution",
        "Russian Revolution"
      ]
    },
    hint: "Century, Continent, Uprising",
    title: "History"
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
      British: ["Charles I", "Queen Victoria", "Anne Boleyn", "Charles Darwin"],
      Executed: ["Charles I", "Louis XVI", "Anne Boleyn", "Socrates"],
      Monarch: [
        "Charles I",
        "Queen Victoria",
        "Louis XVI",
        "Suleiman the Magnificent"
      ]
    },
    hint: "Nationality, Death, Throne",
    title: "Historical Figures 2"
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
