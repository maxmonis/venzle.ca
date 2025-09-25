import type { GameListItem } from "../src/lib/types"

export let history: Array<GameListItem> = [
  {
    groups: {
      "Led a Nation During Wartime": [
        "Abraham Lincoln",
        "Winston Churchill",
        "Czar Nicholas II",
        "Joseph Stalin"
      ],
      "Killed with a Firearm": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Czar Nicholas II",
        "Franz Ferdinand"
      ],
      "Appears on Modern Currency": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Winston Churchill",
        "Thomas Jefferson"
      ]
    },
    hint: "War, Death, Money",
    published: true,
    title: "Historical Figures"
  },
  {
    groups: {
      "Happened in the 18th Century": [
        "American Revolution",
        "Boston Tea Party",
        "French Revolution",
        "Cook's First Voyage"
      ],
      "Happened in North America": [
        "American Revolution",
        "Boston Tea Party",
        "Mexican Revolution",
        "California Gold Rush"
      ],
      Revolution: [
        "American Revolution",
        "Mexican Revolution",
        "French Revolution",
        "Russian Revolution"
      ]
    },
    hint: "Century, Continent, Uprising",
    published: false,
    title: "History"
  },
  {
    groups: {
      Philosopher: ["Plato", "Socrates", "Aristotle", "Thales"],
      "From Athens": ["Plato", "Socrates", "Aristophanes", "Pericles"],
      "Wrote surviving works": ["Plato", "Aristotle", "Aristophanes", "Homer"]
    },
    hint: "School, City, Texts",
    published: false,
    title: "Ancient Greeks"
  },
  {
    groups: {
      "Happened in 1950s": [
        "Hungarian Revolution",
        "Cuban Revolution",
        "Treaty of Rome",
        "Korean War"
      ],
      "Political Revolution": [
        "Hungarian Revolution",
        "Cuban Revolution",
        "Russian Revolution",
        "Chinese Communist Revolution"
      ],
      "Happened in Europe": [
        "Hungarian Revolution",
        "Treaty of Rome",
        "Russian Revolution",
        "Creation of Berlin Wall"
      ]
    },
    hint: "Decade, Uprising, Region",
    published: true,
    title: "20th Century History"
  },
  {
    groups: {
      "Authored surviving works": [
        "Julius Caesar",
        "Cicero",
        "Pliny the Elder",
        "Virgil"
      ],
      "Held the Consulship": [
        "Julius Caesar",
        "Cicero",
        "Scipio Africanus",
        "Cato the Younger"
      ],
      "Major Military Commander": [
        "Julius Caesar",
        "Scipio Africanus",
        "Pliny the Elder",
        "Pompey the Great"
      ]
    },
    hint: "Text, Office, General",
    published: false,
    title: "Ancient Romans"
  },
  {
    groups: {
      "Former Vice President": [
        "Richard Nixon",
        "Joe Biden",
        "Theodore Roosevelt",
        "Thomas Jefferson"
      ],
      "Born in the 20th Century": [
        "Richard Nixon",
        "Joe Biden",
        "Ronald Reagan",
        "Barack Obama"
      ],
      Republican: [
        "Richard Nixon",
        "Theodore Roosevelt",
        "Ronald Reagan",
        "Abraham Lincoln"
      ]
    },
    hint: "VP, DOB, Party",
    published: true,
    title: "US Presidents"
  },
  {
    groups: {
      British: ["Charles I", "Queen Victoria", "Anne Boleyn", "Charles Darwin"],
      Executed: ["Charles I", "Louis XVI", "Anne Boleyn", "Socrates"],
      Monarch: [
        "Charles I",
        "Queen Victoria",
        "Louis XVI",
        "Suleiman the Magnificent"
      ]
    },
    hint: "Nationality, Death, Throne",
    published: true,
    title: "Historical Figures"
  }
]
