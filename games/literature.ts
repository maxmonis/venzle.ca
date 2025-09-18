import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    creator: "Margaret Monis",
    groups: {
      British: [
        "Charlotte Brontë",
        "J. K. Rowling",
        "Charles Dickens",
        "Ian McEwan"
      ],
      Female: [
        "Charlotte Brontë",
        "J. K. Rowling",
        "Louisa May Alcott",
        "Margaret Atwood"
      ],
      "Active in the 19th Century": [
        "Charlotte Brontë",
        "Charles Dickens",
        "Louisa May Alcott",
        "Jules Verne"
      ]
    },
    hint: "Nationality, Gender, Century",
    published: true,
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
    published: true,
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
