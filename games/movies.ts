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
    title: "Movies"
  },
  {
    groups: {
      "Won Best Picture Oscar": [
        "The Apartment",
        "The Sound of Music",
        "The Artist",
        "Gandhi"
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
    hint: "Academy, Era, Color",
    published: true,
    title: "Movies"
  }
]
