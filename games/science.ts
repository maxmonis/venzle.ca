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
    hint: "Prize, DOB, Physics",
    title: "Scientists"
  }
]
