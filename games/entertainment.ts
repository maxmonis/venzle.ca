import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
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
    published: true,
    title: "Entertainment"
  },
  {
    creator: "Andrea Alcalá Vásquez",
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
        "Hugh Laurie",
        "Idris Elba"
      ],
      "Born in the 1950s": [
        "Daniel Day-Lewis",
        "Tom Hanks",
        "Hugh Laurie",
        "Bruce Willis"
      ]
    },
    hint: "Academy, Nationality, DOB",
    published: true,
    title: "Actors"
  },
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
    published: false,
    title: "Plays"
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
    published: true,
    title: "Entertainment 2"
  },
  {
    groups: {
      "Oscar Winner": [
        "Anthony Hopkins",
        "Brie Larson",
        "Gary Oldman",
        "Frances McDormand"
      ],
      "Appeared in the MCU": [
        "Anthony Hopkins",
        "Brie Larson",
        "Tom Hiddleston",
        "Chris Evans"
      ],
      British: [
        "Anthony Hopkins",
        "Gary Oldman",
        "Tom Hiddleston",
        "Hugh Grant"
      ]
    },
    hint: "Academy, MCU, Nationality",
    published: false,
    title: "Actors 2"
  },
  {
    groups: {
      "Won an Acting Oscar": [
        "Anthony Hopkins",
        "Sean Penn",
        "Colin Firth",
        "Julia Roberts"
      ],
      "Has Directed a Feature Film": [
        "Anthony Hopkins",
        "Sean Penn",
        "Idris Elba",
        "Ben Affleck"
      ],
      British: [
        "Anthony Hopkins",
        "Colin Firth",
        "Idris Elba",
        "Keira Knightley"
      ]
    },
    hint: "Academy, Director, Nationality",
    published: false,
    title: "Actors 3"
  }
]
