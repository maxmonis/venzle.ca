import type { Game } from "lib/types"

interface GameListItem extends Pick<Game, "groups" | "hint" | "title"> {
  creator?: string
}

export let gameList: Array<GameListItem> = [
  {
    groups: {
      Color: ["Orange", "Grape", "Pine", "Purple"],
      Fruit: ["Orange", "Grape", "Apple", "Watermelon"],
      Tree: ["Orange", "Pine", "Apple", "Cedar"]
    },
    hint: "Palette, Food, Bark",
    title: "Demo Puzzle"
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
    groups: {
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"]
    },
    hint: "Throw, Helmet, Clock",
    title: "Sports"
  },
  {
    groups: {
      "Constitutional Monarchy": ["Canada", "Sweden", "Australia", "Japan"],
      "Touches the Arctic Circle": [
        "Canada",
        "Sweden",
        "United States",
        "Russia"
      ],
      "English is Official Language": [
        "Canada",
        "Australia",
        "United States",
        "South Africa"
      ]
    },
    hint: "Government, Latitude, Language",
    title: "Countries"
  },
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
    groups: {
      "Big Cat": ["Leopard", "Cheetah", "Tiger", "Puma"],
      "Has Spots": ["Leopard", "Cheetah", "Spotted Deer", "Giraffe"],
      "Found in India": ["Leopard", "Tiger", "Spotted Deer", "Rhinoceros"]
    },
    hint: "Feline, Fur, Region",
    title: "Animals 3"
  },
  {
    groups: {
      "3000 Career Hits": [
        "Miguel Cabrera",
        "Albert Pujols",
        "Ichiro Suzuki",
        "Cal Ripken, Jr."
      ],
      "500 Career Homeruns": [
        "Miguel Cabrera",
        "Albert Pujols",
        "Ted Williams",
        "Mickey Mantle"
      ],
      ".300 Career Batting Average": [
        "Miguel Cabrera",
        "Ichiro Suzuki",
        "Ted Williams",
        "Vladimir Guerrero"
      ]
    },
    hint: "Hits, Homers, Average",
    title: "Baseball"
  },
  {
    creator: "Hannah Monis",
    groups: {
      "Contains Alcohol": [
        "French Onion",
        "Coq au Vin",
        "Beer Cheese Soup",
        "Chicken Marsala"
      ],
      French: ["French Onion", "Coq au Vin", "Vichyssoise", "Brioche"],
      Soup: [
        "French Onion",
        "Beer Cheese Soup",
        "Vichyssoise",
        "Italian Wedding"
      ]
    },
    hint: "Booze, France, Broth",
    title: "Food"
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
    groups: {
      Carnivore: ["Crocodile", "Eagle", "Great White Shark", "Tasmanian Devil"],
      "Lays Eggs": ["Crocodile", "Eagle", "Sea Turtle", "Tortoise"],
      "Lives in Water": [
        "Crocodile",
        "Great White Shark",
        "Sea Turtle",
        "Manatee"
      ]
    },
    hint: "Diet, Reproduction, Habitat",
    title: "Animals 4"
  },
  {
    groups: {
      "60,000 Passing Yards": [
        "Peyton Manning",
        "Brett Favre",
        "Drew Brees",
        "Ben Roethlisberger"
      ],
      "Won MVP": ["Peyton Manning", "Brett Favre", "Joe Montana", "Cam Newton"],
      "Won Super Bowl MVP": [
        "Peyton Manning",
        "Drew Brees",
        "Joe Montana",
        "Eli Manning"
      ]
    },
    hint: "Yards, MVP, SB MVP",
    title: "Quarterbacks"
  },
  {
    groups: {
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"]
    },
    hint: "Beaches, Trees, Language",
    title: "Countries 2"
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
    groups: {
      "Commonly Ridden": ["Elephant", "Water Buffalo", "Camel", "Horse"],
      "Found in Southeast Asia": [
        "Elephant",
        "Water Buffalo",
        "Orangutan",
        "Bornean Bearded Pig"
      ],
      "No Hooves": ["Elephant", "Camel", "Orangutan", "Raccoon"]
    },
    hint: "Saddle, Region, Feet",
    title: "Animals 5"
  },
  {
    groups: {
      "Won Ballon d'Or": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Diego Maradona",
        "Johan Cruyff"
      ],
      "Won Champions League": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Andrés Iniesta",
        "Paolo Maldini"
      ],
      "Won World Cup": [
        "Lionel Messi",
        "Diego Maradona",
        "Andrés Iniesta",
        "Pelé"
      ]
    },
    hint: "MVP, Club, Country",
    title: "Soccer"
  },
  {
    groups: {
      "Majority Muslim": ["Indonesia", "Pakistan", "Maldives", "Afghanistan"],
      "Population Exceeds 100 Million": [
        "Indonesia",
        "Pakistan",
        "Brazil",
        "China"
      ],
      "Touches Equator": ["Indonesia", "Maldives", "Brazil", "Ecuador"]
    },
    hint: "Religion, Population, Latitude",
    title: "Countries 3"
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
      "Found in North America": ["Beaver", "Mouse", "Otter", "Raccoon"],
      Rodent: ["Beaver", "Mouse", "Capybara", "Guinea Pig"],
      "Semi-Aquatic": ["Beaver", "Capybara", "Otter", "Hippopotamus"]
    },
    hint: "Region, Rodentia, Habitat",
    title: "Animals 6"
  },
  {
    groups: {
      "Won MVP": ["Larry Bird", "Kevin Garnett", "Tim Duncan", "Derrick Rose"],
      "Won Finals MVP": [
        "Larry Bird",
        "Paul Pierce",
        "Tim Duncan",
        "Andre Iguodala"
      ],
      "Played for Boston Celtics": [
        "Larry Bird",
        "Kevin Garnett",
        "Paul Pierce",
        "Ray Allen"
      ]
    },
    hint: "Russell Trophy, Jordan Trophy, Red Auerbach",
    title: "Basketball 2"
  },
  {
    groups: {
      "Hosted Olympics": ["London", "Tokyo", "Turin", "Rio de Janeiro"],
      "National Capital": ["London", "Tokyo", "Cairo", "Panama City"],
      "Part of Roman Empire": ["London", "Turin", "Cairo", "Istanbul"]
    },
    hint: "Olympiad, Federal Government, Rome",
    title: "Cities"
  }
  // ,{
  //   groups: {
  //     "Yellow Circle": ["Brown", "Green", "Orange", "Yellow"],
  //     "Blue Circle": ["Brown", "Green", "Purple", "Blue"],
  //     "Red Circle": ["Brown", "Orange", "Purple", "Red"]
  //   },
  //   hint: "",
  //   title: ""
  // }
]
