import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Won Best Picture": [
        "The King's Speech",
        "The Silence of the Lambs",
        "12 Years a Slave",
        "The Hurt Locker"
      ],
      "Set in the 20th Century": [
        "The King's Speech",
        "The Silence of the Lambs",
        "The Imitation Game",
        "Back to the Future"
      ],
      "Based on a True Story": [
        "The King's Speech",
        "12 Years a Slave",
        "The Imitation Game",
        "The Social Network"
      ]
    },
    hint: "Academy, Century, Inspiration",
    published: true,
    title: "Movies"
  },
  {
    groups: {
      "Won Best Director Oscar": [
        "Steven Spielberg",
        "Peter Jackson",
        "Clint Eastwood",
        "Alfonso Cuarón"
      ],
      "Directed a Film Which Grossed $1B": [
        "Steven Spielberg",
        "Peter Jackson",
        "J. J. Abrams",
        "David Yates"
      ],
      American: [
        "Steven Spielberg",
        "Clint Eastwood",
        "J. J. Abrams",
        "Quentin Tarantino"
      ]
    },
    hint: "Academy, Box Office, Nationality",
    published: true,
    title: "Directors"
  },
  {
    groups: {
      "Nominated for Best Picture": [
        "The Return of the King",
        "Inception",
        "Atonement",
        "Lady Bird"
      ],
      "Grossed over $300M worldwide": [
        "The Return of the King",
        "Inception",
        "Twilight",
        "Transformers"
      ],
      "Based on a Book": [
        "The Return of the King",
        "Atonement",
        "Twilight",
        "The Perks of Being a Wallflower"
      ]
    },
    hint: "Nomination, Box Office, Inspiration",
    published: true,
    title: "Movies 2"
  },
  {
    groups: {
      "Known for Science Fiction": [
        "Alex Garland",
        "James Cameron",
        "Ridley Scott",
        "Paul Verhoeven"
      ],
      "Also a Screenwriter": [
        "Alex Garland",
        "James Cameron",
        "Edgar Wright",
        "Greta Gerwig"
      ],
      "Born in the United Kingdom": [
        "Alex Garland",
        "Ridley Scott",
        "Edgar Wright",
        "Ken Loach"
      ]
    },
    hint: "Genre, Script, Nationality",
    published: false,
    title: "Directors 2"
  },
  {
    groups: {
      "Won Best Picture Oscar": [
        "The Apartment",
        "The Sound of Music",
        "The Artist",
        "The Godfather"
      ],
      "Released Before 1970": [
        "The Apartment",
        "The Sound of Music",
        "Psycho",
        "2001: A Space Odyssey"
      ],
      "Black-and-White": [
        "The Apartment",
        "The Artist",
        "Psycho",
        "Raging Bull"
      ]
    },
    hint: "Oscar, Era, Color",
    published: false,
    title: "Movies 3"
  }
]
