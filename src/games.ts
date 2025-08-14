import type { Game } from "./types"

export let gameList: Array<Game> = [
  {
    groups: {
      "Constitutional Monarchy": ["Canada", "Sweden", "Australia", "Japan"],
      "Touches the Arctic Circle": [
        "Canada",
        "Sweden",
        "United States",
        "Russia"
      ],
      "English is Official Language": [
        "Canada",
        "Australia",
        "United States",
        "South Africa"
      ]
    },
    hint: "Geography, Government, Language",
    title: "Countries"
  },
  {
    groups: {
      "Led a Nation During Wartime": [
        "Abraham Lincoln",
        "Winston Churchill",
        "Czar Nicholas II",
        "Adolf Hitler"
      ],
      "Killed with a Firearm": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Czar Nicholas II",
        "Shinzo Abe"
      ],
      "Appears on Modern Currency": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Winston Churchill",
        "Thomas Jefferson"
      ]
    },
    hint: "Conflict, Death, Money",
    title: "World Leaders"
  },
  {
    groups: {
      "Oscar Winner": [
        "Daniel Day-Lewis",
        "Rachel Weisz",
        "Tom Hanks",
        "Meryl Streep"
      ],
      British: [
        "Daniel Day-Lewis",
        "Rachel Weisz",
        "Alfred Molina",
        "Idris Elba"
      ],
      "Born in the 1950s": [
        "Daniel Day-Lewis",
        "Tom Hanks",
        "Alfred Molina",
        "Bruce Willis"
      ]
    },
    hint: "Award, Country, Decade",
    title: "Actors"
  }
]
