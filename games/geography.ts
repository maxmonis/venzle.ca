import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
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
    published: true,
    title: "Countries"
  },
  {
    groups: {
      "Not Located in the Americas": [
        "Taj Mahal",
        "Great Wall of China",
        "Petra",
        "Colosseum"
      ],
      "Built Since 1000 AD": [
        "Taj Mahal",
        "Great Wall of China",
        "Machu Pichu",
        "Christ the Redeemer"
      ],
      "Name is not Translated to English": [
        "Taj Mahal",
        "Petra",
        "Machu Pichu",
        "Chichen Itza"
      ]
    },
    hint: "Region, Era, Name",
    published: false,
    title: "Wonders of the World"
  },
  {
    groups: {
      "Hosted Olympics": ["London", "Tokyo", "Turin", "Rio de Janeiro"],
      "National Capital": ["London", "Tokyo", "Cairo", "Panama City"],
      "Part of Roman Empire": ["London", "Turin", "Cairo", "Istanbul"]
    },
    hint: "Olympiad, Capital, Rome",
    published: false,
    title: "Cities"
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
    published: false,
    title: "Countries 2"
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
    published: false,
    title: "Landmarks"
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
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"]
    },
    hint: "Beaches, Trees, Language",
    published: false,
    title: "Countries 3"
  }
]
