import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Nobel Prize Winner": [
        "Albert Einstein",
        "Alexander Fleming",
        "Richard Feynman",
        "Dorothy Hodgkin"
      ],
      "Born before 1900": [
        "Albert Einstein",
        "Alexander Fleming",
        "James Clerk Maxwell",
        "Gregor Mendel"
      ],
      Physicist: [
        "Albert Einstein",
        "Richard Feynman",
        "James Clerk Maxwell",
        "Stephen Hawking"
      ]
    },
    hint: "Prize, DOB, Field",
    published: false,
    title: "Scientists"
  },
  {
    groups: {
      "Nobel Prize Winner": [
        "Ahmed Zewail",
        "John Bardeen",
        "Marie Curie",
        "Wilhelm Röntgen"
      ],
      "Born after 1900": [
        "Ahmed Zewail",
        "John Bardeen",
        "Rosalind Franklin",
        "Alan Turing"
      ],
      Chemist: [
        "Ahmed Zewail",
        "Marie Curie",
        "Rosalind Franklin",
        "Dmitri Mendeleev"
      ]
    },
    hint: "Prize, DOB, Field",
    published: false,
    title: "Scientists 2"
  }
]
