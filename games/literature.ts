import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    creator: "Margaret Monis",
    groups: {
      British: [
        "Jane Austen",
        "J. K. Rowling",
        "Charles Dickens",
        "Ian McEwan"
      ],
      Female: [
        "Jane Austen",
        "J. K. Rowling",
        "Louisa May Alcott",
        "Margaret Atwood"
      ],
      Victorian: [
        "Jane Austen",
        "Charles Dickens",
        "Louisa May Alcott",
        "Jules Verne"
      ]
    },
    hint: "Nationality, Gender, Era",
    published: false,
    title: "Authors"
  },
  {
    groups: {
      "Published in the 19th Century": [
        "Little Women",
        "Adventures of Huckleberry Finn",
        "Jane Eyre",
        "Crime and Punishment"
      ],
      "Set in the United States": [
        "Little Women",
        "Adventures of Huckleberry Finn",
        "Beloved",
        "The Great Gatsby"
      ],
      "Written by a Woman": [
        "Little Women",
        "Jane Eyre",
        "Beloved",
        "Mrs Dalloway"
      ]
    },
    hint: "Century, Setting, Author",
    published: false,
    title: "Literature"
  },
  {
    groups: {
      "Appears in a Novel": [
        "Jay Gatsby",
        "Atticus Finch",
        "Tess Durbeyfield",
        "Elizabeth Bennet"
      ],
      Male: ["Jay Gatsby", "Atticus Finch", "Romeo", "Prospero"],
      "Dies by the End": ["Jay Gatsby", "Tess Durbeyfield", "Romeo", "Ophelia"]
    },
    hint: "Book, Gender, Death",
    published: false,
    title: "Literary Characters"
  }
]
