import type { GameListItem } from "../src/lib/types"

export let albums: Array<GameListItem> = [
  {
    groups: {
      "Released in the 1990s": ["Spice", "Ten", "OK Computer", "Nevermind"],
      "Debut Album": ["Spice", "Ten", "Led Zeppelin", "The Doors"],
      British: ["Spice", "OK Computer", "Led Zeppelin", "Abbey Road"]
    },
    hint: "Decade, Debut, Nationality",
    published: true,
    title: "Albums"
  },
  {
    groups: {
      "Released in the 1970s": [
        "Horses",
        "Boston",
        "Blue",
        "The Dark Side of the Moon"
      ],
      "Debut Album": [
        "Horses",
        "Boston",
        "Suzanne Vega",
        "Are You Experienced"
      ],
      "Female Artist": ["Horses", "Blue", "Suzanne Vega", "Back to Black"]
    },
    hint: "Decade, Debut, Artist",
    published: false,
    title: "Albums"
  },
  {
    groups: {
      "Debut Studio Album": [
        "The Miseducation of Lauryn Hill",
        "Are You Experienced",
        "When We All Fall Asleep, Where Do We Go?",
        "Parachutes"
      ],
      "Released Before 2000": [
        "The Miseducation of Lauryn Hill",
        "Are You Experienced",
        "Rumours",
        "OK Computer"
      ],
      "Won Grammy (Album of the Year)": [
        "The Miseducation of Lauryn Hill",
        "When We All Fall Asleep, Where Do We Go?",
        "Rumours",
        "Golden Hour"
      ]
    },
    hint: "Debut, Era, Grammy",
    published: false,
    title: "Albums"
  }
]

export let composers: Array<GameListItem> = [
  {
    groups: {
      "Romantic Era": [
        "Frédéric Chopin",
        "Pyotr Ilyich Tchaikovsky",
        "Franz Schubert",
        "Richard Wagner"
      ],
      "Wrote Piano Concertos": [
        "Frédéric Chopin",
        "Pyotr Ilyich Tchaikovsky",
        "Wolfgang Amadeus Mozart",
        "Sergei Prokofiev"
      ],
      "Died before 40": [
        "Frédéric Chopin",
        "Franz Schubert",
        "Wolfgang Amadeus Mozart",
        "Henry Purcell"
      ]
    },
    hint: "Era, Concertos, Age",
    published: false,
    title: "Composers"
  }
]

export let musicians: Array<GameListItem> = [
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
    published: true,
    title: "Musicians"
  },
  {
    groups: {
      "One-Word Stage Name": ["Beyoncé", "Cher", "Adele", "Shakira"],
      "Started in a Group/Duo": [
        "Beyoncé",
        "Cher",
        "Paul McCartney",
        "Brandon Flowers"
      ],
      "Has 10+ Grammy Wins": [
        "Beyoncé",
        "Adele",
        "Paul McCartney",
        "Stevie Wonder"
      ]
    },
    hint: "Name, Band, Grammys",
    published: true,
    title: "Musicians"
  }
]

export let songs: Array<GameListItem> = [
  {
    groups: {
      "One-Word Title": ["Believe", "Bad", "Linger", "Clocks"],
      "Billboard Hot 100 #1 Hit": [
        "Believe",
        "Bad",
        "I Will Always Love You",
        "Hey Jude"
      ],
      "Released in the 1990s": [
        "Believe",
        "Linger",
        "Smells Like Teen Spirit",
        "I Will Always Love You"
      ]
    },
    hint: "Title, Peak, Decade",
    published: true,
    title: "Songs"
  },
  {
    groups: {
      "Released in the 1980s": [
        "Careless Whisper",
        "Billie Jean",
        "Love Will Tear Us Apart",
        "Blister in the Sun"
      ],
      "#1 on Billboard Hot 100": [
        "Careless Whisper",
        "Billie Jean",
        "Rolling in the Deep",
        "Please Please Please"
      ],
      "By a British Artist": [
        "Careless Whisper",
        "Love Will Tear Us Apart",
        "Rolling in the Deep",
        "Wonderwall"
      ]
    },
    hint: "Decade, Chart, Nationality",
    published: false,
    title: "Songs"
  }
]
