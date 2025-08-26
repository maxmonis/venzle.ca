import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    creator: "Paul T",
    groups: {
      British: [
        "Aston Martin Vanquish",
        "Jaguar E-Type",
        "Land Rover Series III",
        "Bentley Bentayga"
      ],
      "2-Door Coupe": [
        "Aston Martin Vanquish",
        "Jaguar E-Type",
        "Ford Mustang Mach 1",
        "Chevrolet Camaro"
      ],
      "Driven By James Bond": [
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
    title: "Languages"
  }
]
