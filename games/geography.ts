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
    published: false,
    title: "Wonders of the World"
  },
  {
    groups: {
      "Hosted Olympics": ["London", "Tokyo", "Turin", "Rio de Janeiro"],
      "National Capital": ["London", "Tokyo", "Cairo", "Panama City"],
      "Located Within Roman Empire": ["London", "Turin", "Cairo", "Istanbul"]
    },
    hint: "Olympiad, Capital, Rome",
    published: true,
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
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"]
    },
    hint: "Beaches, Trees, Language",
    published: false,
    title: "Countries 3"
  }
]
