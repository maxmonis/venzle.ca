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
    title: "Entertainment"
  },
  {
    groups: {
      "Oscar Winner": [
        "Anthony Hopkins",
        "Brie Larson",
        "Kate Winslet",
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
        "Kate Winslet",
        "Tom Hiddleston",
        "Hugh Grant"
      ]
    },
    hint: "Academy, Marvel, Nationality",
    published: true,
    title: "Actors"
  },
  {
    groups: {
      "Won an Acting Oscar": [
        "Gary Oldman",
        "Sean Penn",
        "Eddie Redmayne",
        "Julia Roberts"
      ],
      "Has Directed a Feature Film": [
        "Gary Oldman",
        "Sean Penn",
        "Ralph Fiennes",
        "Ben Affleck"
      ],
      British: [
        "Gary Oldman",
        "Eddie Redmayne",
        "Ralph Fiennes",
        "Keira Knightley"
      ]
    },
    hint: "Academy, Director, Nationality",
    published: false,
    title: "Actors"
  },
  {
    groups: {
      "Has Played a Superhero": [
        "Anne Hathaway",
        "Zachary Levi",
        "Christian Bale",
        "Robert Downey Jr."
      ],
      "Born in the 1980s": [
        "Anne Hathaway",
        "Zachary Levi",
        "Joseph Gordon-Levitt",
        "Emily Blunt"
      ],
      "Appeared in a Christopher Nolan Film": [
        "Anne Hathaway",
        "Christian Bale",
        "Joseph Gordon-Levitt",
        "Michael Caine"
      ]
    },
    hint: "Superhero, DOB, Nolan",
    published: false,
    title: "Actors"
  },
  {
    groups: {
      "Appeared in a Quentin Tarantino film": [
        "Leonardo DiCaprio",
        "Christoph Waltz",
        "Eli Roth",
        "Michael Madsen"
      ],
      "Golden Globe Winner": [
        "Leonardo DiCaprio",
        "Christoph Waltz",
        "Joaquin Phoenix",
        "Meryl Streep"
      ],
      "Born in the 1970s": [
        "Leonardo DiCaprio",
        "Eli Roth",
        "Joaquin Phoenix",
        "Rachel McAdams"
      ]
    },
    hint: "Tarantino, Globes, DOB",
    published: false,
    title: "Actors"
  },
  {
    groups: {
      "Appeared in a Harry Potter Film": [
        "Daniel Radcliffe",
        "Imelda Staunton",
        "Rupert Grint",
        "Emma Watson"
      ],
      "BAFTA Nominee": [
        "Daniel Radcliffe",
        "Imelda Staunton",
        "Andrew Garfield",
        "Meryl Streep"
      ],
      "Born in the 1980s": [
        "Daniel Radcliffe",
        "Rupert Grint",
        "Andrew Garfield",
        "Chris Pine"
      ]
    },
    hint: "Potter, BAFTA, DOB",
    published: false,
    title: "Actors"
  },
  {
    groups: {
      "Appeared in a Coen Brothers Film": [
        "Javier Bardem",
        "Jeff Bridges",
        "Josh Brolin",
        "John Goodman"
      ],
      "Academy Award Winner": [
        "Javier Bardem",
        "Jeff Bridges",
        "Forest Whitaker",
        "Mahershala Ali"
      ],
      "Born in the 1960s": [
        "Javier Bardem",
        "Josh Brolin",
        "Forest Whitaker",
        "Keanu Reeves"
      ]
    },
    hint: "Coens, Academy, DOB",
    published: false,
    title: "Actors"
  },
  {
    groups: {
      "Appeared in a Christopher Nolan Film": [
        "Christian Bale",
        "Michael Caine",
        "Tom Hardy",
        "Joseph Gordon-Levitt"
      ],
      "Golden Globe Winner": [
        "Christian Bale",
        "Michael Caine",
        "Joaquin Phoenix",
        "Denzel Washington"
      ],
      "Born in the 1970s": [
        "Christian Bale",
        "Tom Hardy",
        "Joaquin Phoenix",
        "Kate Beckinsale"
      ]
    },
    hint: "Nolan, Globes, DOB",
    published: false,
    title: "Actors"
  }
]
