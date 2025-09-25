import type { GameListItem } from "../src/lib/types"

export let entertainment: Array<GameListItem> = [
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
    hint: "Bestseller, Premiere, Series",
    published: true
  },
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      British: [
        "Elton John",
        "Jeremy Irons",
        "Andrew Lloyd Webber",
        "Hugh Grant"
      ],
      "Contributed to Disney Soundtrack": [
        "Elton John",
        "Jeremy Irons",
        "Alan Menken",
        "Josh Gad"
      ],
      "EGOT Winner": [
        "Elton John",
        "Andrew Lloyd Webber",
        "Alan Menken",
        "Viola Davis"
      ]
    },
    hint: "Nationality, Disney, Awards",
    published: true
  }
]

export let plays: Array<GameListItem> = [
  {
    groups: {
      "Written by Shakespeare": [
        "The Winter's Tale",
        "A Midsummer Night's Dream",
        "King Lear",
        "Timon of Athens"
      ],
      Comedy: [
        "The Winter's Tale",
        "A Midsummer Night's Dream",
        "The King and I",
        "Noises Off"
      ],
      "Features a Royal Family": [
        "The Winter's Tale",
        "King Lear",
        "The King and I",
        "The Lion in Winter"
      ]
    },
    hint: "Playwright, Tone, Royalty",
    published: false
  }
]
