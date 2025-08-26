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
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"]
    },
    hint: "Throw, Helmet, Clock",
    title: "Sports"
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
