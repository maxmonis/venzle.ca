import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      Color: ["Orange", "Grape", "Pine", "Purple"],
      Fruit: ["Orange", "Grape", "Apple", "Watermelon"],
      Tree: ["Orange", "Pine", "Apple", "Cedar"]
    },
    hint: "Palette, Food, Bark",
    published: true,
    title: "Demo Puzzle"
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
    published: true,
    title: "Food"
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
    published: true,
    title: "Cars"
  },
  {
    groups: {
      "Official language of the United Nations": [
        "English",
        "French",
        "Mandarin Chinese",
        "Russian"
      ],
      "Uses Latin script": ["English", "French", "Portuguese", "German"],
      "More than 200 million native speakers": [
        "English",
        "Mandarin Chinese",
        "Portuguese",
        "Hindi"
      ]
    },
    hint: "UN, Script, Large native population",
    published: false,
    title: "Languages"
  }
]
