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
    hint: "Conflict, Death, Money",
    title: "Historical Figures"
  },
  {
    groups: {
      Book: [
        "The Handmaid's Tale",
        "No Country For Old Men",
        "Big Little Lies",
        "A Confederacy of Dunces"
      ],
      Movie: [
        "The Handmaid's Tale",
        "No Country For Old Men",
        "Fargo",
        "The Big Lebowski"
      ],
      "TV Show": ["The Handmaid's Tale", "Fargo", "Big Little Lies", "Lost"]
    },
    hint: "Read, Premiere, Series",
    title: "Media"
  },
  {
    groups: {
      "Oscar Winner": [
        "Daniel Day-Lewis",
        "Rachel Weisz",
        "Tom Hanks",
        "Emma Stone"
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
    hint: "Award, Nationality, DOB",
    title: "Actors"
  }
]
