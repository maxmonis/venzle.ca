import type { Game } from "lib/types"

interface GameListItem extends Pick<Game, "groups" | "hint" | "title"> {
  creator?: string
}

export let gameList: Array<GameListItem> = [
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
    hint: "War, Death, Currency",
    title: "Historical Figures"
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
    title: "Basketball"
  },
  {
    groups: {
      Color: ["Orange", "Grape", "Pine", "Purple"],
      Fruit: ["Orange", "Grape", "Apple", "Watermelon"],
      Tree: ["Orange", "Pine", "Apple", "Cedar"]
    },
    hint: "Palette, Food, Bark",
    title: "Miscellaneous"
  },
  {
    creator: "Hannah Monis",
    groups: {
      "Commonly Eaten": ["Shrimp", "Rabbit", "Lobster", "Cow"],
      "Often Kept as Pet": ["Shrimp", "Rabbit", "Newt", "Dog"],
      "Lives in Water": ["Shrimp", "Lobster", "Newt", "Box Jellyfish"]
    },
    hint: "Food, Friend, Swim",
    title: "Animals"
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
    groups: {
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"]
    },
    hint: "Beaches, Trees, Language",
    title: "Countries 2"
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
    title: "Television"
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
        "John Legend"
      ]
    },
    hint: "Nationality, Mickey, Awards",
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
    creator: "Andrea Alcalá Vásquez",
    groups: {
      Aquatic: ["Penguin", "Seal", "Duck", "Flying Fish"],
      "Does Not Fly": ["Penguin", "Seal", "Ostrich", "Elephant"],
      Feathered: ["Penguin", "Duck", "Ostrich", "Eagle"]
    },
    hint: "Water, Ground, Nest",
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
    title: "Basketball 2"
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

export function getTodayIndex() {
  return (
    gameList.length - 1
    // Math.floor((Date.now() - Date.UTC(2025, 7, 14)) / 86400000) % gameList.length
  )
}
