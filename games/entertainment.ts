import type { Game } from "../src/lib/types"

interface GameListItem extends Pick<Game, "groups" | "hint" | "title"> {
  creator?: string
}

export let gameList: Array<GameListItem> = [
  {
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
        "Alfred Molina",
        "Idris Elba"
      ],
      "Born in the 1950s": [
        "Daniel Day-Lewis",
        "Tom Hanks",
        "Alfred Molina",
        "Bruce Willis"
      ]
    },
    hint: "Academy, Nationality, DOB",
    title: "Actors"
  },
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
    title: "Authors"
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
    title: "Entertainment 2"
  },
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      "100 Million Physical Records Sold": [
        "Michael Jackson",
        "Eagles",
        "Celine Dion",
        "Led Zeppelin"
      ],
      American: ["Michael Jackson", "Eagles", "Lady Gaga", "Kings of Leon"],
      "Pop Singer": ["Michael Jackson", "Celine Dion", "Lady Gaga", "Dua Lipa"]
    },
    hint: "Sales, Nationality, Genre",
    title: "Musicians"
  },
  {
    groups: {
      "Female Leads": ["Girls", "Insecure", "Broad City", "Charmed"],
      "On HBO": ["Girls", "Insecure", "Succession", "Westworld"],
      "Set in New York City": [
        "Girls",
        "Broad City",
        "Succession",
        "How I Met Your Mother"
      ]
    },
    hint: "Heroines, Premium, Metropolis",
    title: "TV Shows 2"
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
    title: "Literature"
  }
]
