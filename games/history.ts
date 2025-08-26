import type { GameListItem } from "../src/lib/types"

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
    published: true,
    title: "Historical Figures"
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
    published: false,
    title: "History"
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
    published: false,
    title: "Historical Figures 2"
  }
]
