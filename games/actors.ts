import type { GameListItem } from "../src/lib/types"

export let actors: Array<GameListItem> = [
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
    published: true
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
    published: true
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
    published: false
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
    published: false
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
    published: false
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
    published: false
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
    published: false
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
    published: false
  }
]
