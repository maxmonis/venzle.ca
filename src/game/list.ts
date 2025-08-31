import type { GameListItem } from "lib/types"

type GameList = Array<Omit<GameListItem, "published">>

let demo: GameList = [
  {
    groups: {
      Color: ["Orange", "Grape", "Pine", "Purple"],
      Fruit: ["Orange", "Grape", "Apple", "Watermelon"],
      Tree: ["Orange", "Pine", "Apple", "Cedar"]
    },
    hint: "Palette, Food, Bark",
    title: "Demo Puzzle"
  }
  // {
  //   groups: {
  //     "Yellow Circle": ["Brown", "Green", "Orange", "Yellow"],
  //     "Blue Circle": ["Brown", "Green", "Purple", "Blue"],
  //     "Red Circle": ["Brown", "Orange", "Purple", "Red"]
  //   },
  //   hint: "",
  //   title: ""
  // }
]

let weekOne: GameList = [
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      Aquatic: ["Penguin", "Duck", "Seal", "Flying Fish"],
      Bird: ["Penguin", "Duck", "Ostrich", "Eagle"],
      "Does Not Fly": ["Penguin", "Seal", "Ostrich", "Zebra"]
    },
    hint: "Habitat, Feathers, Grounded",
    title: "Animals"
  },
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
    title: "TV Shows"
  },
  {
    creator: "Hannah Monis",
    groups: {
      "Contains Alcohol": [
        "French Onion",
        "Coq au Vin",
        "Beer Cheese",
        "Chicken Marsala"
      ],
      French: ["French Onion", "Coq au Vin", "Vichyssoise", "Brioche"],
      Soup: ["French Onion", "Beer Cheese", "Vichyssoise", "Italian Wedding"]
    },
    hint: "Liquor, Nationality, Broth",
    title: "Food"
  },
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
    title: "Movies"
  },
  {
    groups: {
      "Constitutional Monarchy": ["Canada", "Sweden", "Australia", "Japan"],
      "Touches the Arctic Circle": ["Canada", "Sweden", "USA", "Russia"],
      "English is Official Language": [
        "Canada",
        "Australia",
        "USA",
        "South Africa"
      ]
    },
    hint: "Government, Latitude, Language",
    title: "Countries"
  },
  {
    groups: {
      "Released in the 1990s": ["Spice", "Ten", "OK Computer", "Nevermind"],
      "Debut Album": ["Spice", "Ten", "Led Zeppelin", "The Doors"],
      British: ["Spice", "OK Computer", "Led Zeppelin", "Abbey Road"]
    },
    hint: "Decade, Debut, Nationality",
    title: "Albums"
  },
  {
    creator: "Evan Williams",
    groups: {
      "Drafted Out of High School": [
        "Dwight Howard",
        "LeBron James",
        "Kevin Garnett",
        "Kobe Bryant"
      ],
      "Drafted First Overall": [
        "Dwight Howard",
        "LeBron James",
        "Hakeem Olajuwon",
        "Shaquille O'Neal"
      ],
      "Won Defensive Player of the Year": [
        "Dwight Howard",
        "Kevin Garnett",
        "Hakeem Olajuwon",
        "Ben Wallace"
      ]
    },
    hint: "School, Draft, Defense",
    title: "Basketball"
  }
]

let weekTwo: GameList = [
  {
    creator: "Hannah Monis",
    groups: {
      "Commonly Eaten": ["Shrimp", "Rabbit", "Lobster", "Cow"],
      "Often Kept as Pet": ["Shrimp", "Rabbit", "Newt", "Dog"],
      "Lives in Water": ["Shrimp", "Lobster", "Newt", "Box Jellyfish"]
    },
    hint: "Food, Friend, Habitat",
    title: "Animals 2"
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
    creator: "Paul T",
    groups: {
      British: [
        "Aston Martin Vanquish",
        "Jaguar E-Type",
        "Land Rover Series III",
        "Bentley Bentayga"
      ],
      "Two-Door Coupe": [
        "Aston Martin Vanquish",
        "Jaguar E-Type",
        "Ford Mustang Mach 1",
        "Chevrolet Camaro"
      ],
      "Driven by James Bond": [
        "Aston Martin Vanquish",
        "Ford Mustang Mach 1",
        "Land Rover Series III",
        "Mercedes-Benz S 300"
      ]
    },
    hint: "Nationality, Doors, 007",
    title: "Cars"
  },
  {
    groups: {
      Book: [
        "The Handmaid's Tale",
        "No Country For Old Men",
        "Big Little Lies",
        "A Confederacy of Dunces"
      ],
      Movie: [
        "The Handmaid's Tale",
        "No Country For Old Men",
        "Fargo",
        "The Big Lebowski"
      ],
      "TV Show": ["The Handmaid's Tale", "Fargo", "Big Little Lies", "Lost"]
    },
    hint: "Bestseller, Premiere, Series",
    title: "Entertainment"
  },
  {
    groups: {
      Italian: ["Michelangelo", "Raphael", "Donatello", "Antonio Vivaldi"],
      Painter: ["Michelangelo", "Raphael", "Pablo Picasso", "Frida Kahlo"],
      Sculptor: ["Michelangelo", "Donatello", "Pablo Picasso", "Auguste Rodin"]
    },
    hint: "Nationality, Canvas, Marble",
    title: "Artists"
  },
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
    title: "Historical Figures"
  },
  {
    groups: {
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"]
    },
    hint: "Throw, Helmet, Clock",
    title: "Sports"
  }
]

let weekThree: GameList = [
  {
    groups: {
      "Big Cat": ["Leopard", "Cheetah", "Tiger", "Puma"],
      "Has Spots": ["Leopard", "Cheetah", "Spotted Deer", "Giraffe"],
      "Found in India": ["Leopard", "Tiger", "Spotted Deer", "Rhinoceros"]
    },
    hint: "Feline, Fur, Region",
    title: "Animals 3"
  },
  {
    creator: "Andrea Alcalá Vásquez",
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
    groups: {
      "Hosted Olympics": ["London", "Tokyo", "Turin", "Rio de Janeiro"],
      "National Capital": ["London", "Tokyo", "Cairo", "Panama City"],
      "Located Within Roman Empire": ["London", "Turin", "Cairo", "Istanbul"]
    },
    hint: "Olympiad, Capital, Rome",
    title: "Cities"
  },
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
      Victorian: [
        "Charlotte Brontë",
        "Charles Dickens",
        "Louisa May Alcott",
        "Jules Verne"
      ]
    },
    hint: "Nationality, Gender, Era",
    title: "Authors"
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
    title: "Directors"
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
    title: "20th Century History"
  },
  {
    groups: {
      "Track & Field Athlete": [
        "Usain Bolt",
        "Merlene Ottey",
        "Carl Lewis",
        "Steve Prefontaine"
      ],
      "Not American": [
        "Usain Bolt",
        "Merlene Ottey",
        "Nadia Comăneci",
        "Elvis Stojko"
      ],
      "Gold Medalist": [
        "Usain Bolt",
        "Carl Lewis",
        "Michael Phelps",
        "Nadia Comăneci"
      ]
    },
    hint: "Sport, Nationality, Medal",
    title: "Olympians"
  }
]

export let gameList = demo.concat(weekOne, weekTwo, weekThree)
