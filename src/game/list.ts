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
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"]
    },
    hint: "Throw, Helmet, Clock",
    title: "Sports"
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
