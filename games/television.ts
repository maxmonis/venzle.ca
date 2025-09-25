import type { GameListItem } from "../src/lib/types"

export let television: Array<GameListItem> = [
  {
    creator: "Margaret Monis",
    groups: {
      "Police Show": [
        "Cagney and Lacey",
        "Blue Bloods",
        "Rizzoli and Isles",
        "Miami Vice"
      ],
      "Set in New York City": [
        "Cagney and Lacey",
        "Blue Bloods",
        "Sex and the City",
        "Friends"
      ],
      "Female Leads": [
        "Cagney and Lacey",
        "Rizzoli and Isles",
        "Sex and the City",
        "Designing Women"
      ]
    },
    hint: "Justice, Metropolis, Heroines",
    published: true
  },
  {
    groups: {
      Animated: [
        "The Simpsons",
        "SpongeBob SquarePants",
        "Bob's Burgers",
        "Avatar: The Last Airbender"
      ],
      "Aired in the 1990s": [
        "The Simpsons",
        "SpongeBob SquarePants",
        "The X-Files",
        "ER"
      ],
      "Originally Aired on FOX": [
        "The Simpsons",
        "Bob's Burgers",
        "The X-Files",
        "Prison Break"
      ]
    },
    hint: "Animation, Decade, Network",
    published: true
  },
  {
    groups: {
      "Female Leads": ["Girls", "Insecure", "Broad City", "Charmed"],
      "Aired On HBO": ["Girls", "Insecure", "Succession", "Westworld"],
      "Set in New York City": [
        "Girls",
        "Broad City",
        "Succession",
        "How I Met Your Mother"
      ]
    },
    hint: "Heroines, Network, Metropolis",
    published: false
  },
  {
    groups: {
      Animated: [
        "Rick and Morty",
        "South Park",
        "Gravity Falls",
        "The Flintstones"
      ],
      "Contain Mature Content": [
        "Rick and Morty",
        "South Park",
        "Fleabag",
        "Breaking Bad"
      ],
      "Premiered in the 2010s": [
        "Rick and Morty",
        "Gravity Falls",
        "Fleabag",
        "Young Sheldon"
      ]
    },
    hint: "Animation, Rating, Decade",
    published: false
  },
  {
    groups: {
      "Set in New York City": [
        "30 Rock",
        "Broad City",
        "Seinfeld",
        "How I Met Your Mother"
      ],
      "Single-Camera": [
        "30 Rock",
        "Broad City",
        "The Office (US)",
        "Arrested Development"
      ],
      "Originally Aired on NBC": [
        "30 Rock",
        "Seinfeld",
        "The Office (US)",
        "Frasier"
      ]
    },
    hint: "City, Format, Network",
    published: false
  },
  {
    groups: {
      Sitcom: [
        "Roseanne",
        "Happy Days",
        "The Cosby Show",
        "The Big Bang Theory"
      ],
      "Aired on ABC": ["Roseanne", "Happy Days", "Jimmy Kimmel Live!", "Lost"],
      "Headlined by a Comedian": [
        "Roseanne",
        "The Cosby Show",
        "Jimmy Kimmel Live!",
        "The Tonight Show"
      ]
    },
    hint: "Genre, Network, Comedian",
    published: false
  },
  {
    groups: {
      "Competition show": [
        "The Great British Bake Off",
        "The Voice (US)",
        "Strictly Come Dancing",
        "Survivor"
      ],
      "Premiered in the 2010s": [
        "The Great British Bake Off",
        "The Voice (US)",
        "Peaky Blinders",
        "House of Cards"
      ],
      "Produced in the UK": [
        "The Great British Bake Off",
        "Strictly Come Dancing",
        "Peaky Blinders",
        "Doctor Who"
      ]
    },
    hint: "Contests, Decade, UK",
    published: false
  },
  {
    groups: {
      "Set in the 19th Century": [
        "Pride and Prejudice (1995)",
        "Ripper Street",
        "The Alienist",
        "Hell on Wheels"
      ],
      "Aired on BBC": [
        "Pride and Prejudice (1995)",
        "Ripper Street",
        "Wolf Hall",
        "Luther"
      ],
      "Adapted from a Novel": [
        "Pride and Prejudice (1995)",
        "The Alienist",
        "Wolf Hall",
        "The Handmaid's Tale"
      ]
    },
    hint: "Century, Network, Source Material",
    published: false
  },
  {
    groups: {
      "Detective Show": [
        "Bosch",
        "True Detective",
        "Inspector Morse",
        "Columbo"
      ],
      "Premiered in the 2010s": [
        "Bosch",
        "True Detective",
        "Outlander",
        "Black Mirror"
      ],
      "Adapted from a Book": [
        "Bosch",
        "Inspector Morse",
        "Outlander",
        "Band of Brothers"
      ]
    },
    hint: "Police, Decade, Source Material",
    published: false
  }
]
