import type { GameListItem } from "../src/lib/types"

export let geography: Array<GameListItem> = [
  {
    groups: {
      "Not Located in the Americas": [
        "Taj Mahal",
        "Great Wall of China",
        "Petra",
        "Colosseum"
      ],
      "Completed After 1400 AD": [
        "Taj Mahal",
        "Great Wall of China",
        "Machu Picchu",
        "Christ the Redeemer"
      ],
      "Name is not Translated": [
        "Taj Mahal",
        "Petra",
        "Machu Picchu",
        "Chichén Itzá"
      ]
    },
    hint: "Region, Completion, Name",
    published: true,
    title: "Wonders of the World"
  },
  {
    groups: {
      "UNESCO World Heritage Site": [
        "Mont-Saint-Michel",
        "Acropolis of Athens",
        "Robben Island",
        "Machu Picchu"
      ],
      "Located in Europe": [
        "Mont-Saint-Michel",
        "Acropolis of Athens",
        "Blue Lagoon",
        "Eiffel Tower"
      ],
      "Located on an Island": [
        "Mont-Saint-Michel",
        "Robben Island",
        "Blue Lagoon",
        "Alcatraz"
      ]
    },
    hint: "UNESCO, Region, Island",
    published: true,
    title: "Landmarks"
  },
  {
    groups: {
      "Flows through Europe": ["Danube", "Volga", "Southern Bug", "Seine"],
      "Longer than 1,000 km": ["Danube", "Volga", "Kizilirmak", "Nile"],
      "Empties into the Black Sea": [
        "Danube",
        "Southern Bug",
        "Kizilirmak",
        "Sakarya"
      ]
    },
    hint: "Region, Length, Black Sea",
    published: false,
    title: "Rivers"
  },
  {
    groups: {
      "Touches Manhattan": [
        "Brooklyn Bridge",
        "St. Patrick's Cathedral",
        "Manhattan Bridge",
        "One World Trade Center"
      ],
      "Completed in the 19th Century": [
        "Brooklyn Bridge",
        "St. Patrick's Cathedral",
        "Prospect Park",
        "Bronx Zoo"
      ],
      Bridge: [
        "Brooklyn Bridge",
        "Manhattan Bridge",
        "Hell Gate Bridge",
        "Verrazzano-Narrows Bridge"
      ]
    },
    hint: "Burough, Century, Bridge",
    title: "New York City Landmarks",
    published: false
  },
  {
    groups: {
      "Highest Point in its Country": [
        "Kilimanjaro",
        "Mount Fuji",
        "Aconcagua",
        "Ben Nevis"
      ],
      Volcanic: [
        "Kilimanjaro",
        "Mount Fuji",
        "Mount Rainier",
        "Mount Vesuvius"
      ],
      "Over 4,000 Meters Tall": [
        "Kilimanjaro",
        "Aconcagua",
        "Mount Rainier",
        "Mount Whitney"
      ]
    },
    hint: "National Record, Lava, Height",
    published: true,
    title: "Mountains"
  }
]
