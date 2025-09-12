import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      Fragrant: ["Rose", "Carnation", "Jasmine", "Lavender"],
      "Common in bouquets": ["Rose", "Carnation", "Orchid", "Baby's Breath"],
      "Native to Asia": ["Rose", "Jasmine", "Orchid", "Lotus"]
    },
    hint: "Scent, Floristry, Origin",
    published: false,
    title: "Flowers"
  },
  {
    groups: {
      "Bird of Prey": [
        "American Kestrel",
        "Common Kestrel",
        "Bald Eagle",
        "Eurasian Eagle-Owl"
      ],
      "Can Hover": [
        "American Kestrel",
        "Common Kestrel",
        "Ruby-throated Hummingbird",
        "Pied Kingfisher"
      ],
      "Native to the Americas": [
        "American Kestrel",
        "Bald Eagle",
        "Ruby-throated Hummingbird",
        "Blue Jay"
      ]
    },
    hint: "Raptor, Hover, Region",
    published: false,
    title: "Birds"
  },
  {
    groups: {
      "Has Legs": [
        "Perentie",
        "Gila Monster",
        "Blue-tongued Skink",
        "Green Iguana"
      ],
      Venomous: ["Perentie", "Gila Monster", "Inland Taipan", "King Cobra"],
      "Found in Australia": [
        "Perentie",
        "Blue-tongued Skink",
        "Inland Taipan",
        "Woma Python"
      ]
    },
    hint: "Limbs, Poison, Region",
    published: false,
    title: "Reptiles"
  },
  {
    groups: {
      "Lived in the Cretaceous": [
        "Tyrannosaurus",
        "Triceratops",
        "Velociraptor",
        "Argentinosaurus"
      ],
      "Found in North America": [
        "Tyrannosaurus",
        "Triceratops",
        "Allosaurus",
        "Stegosaurus"
      ],
      Carnivore: ["Tyrannosaurus", "Velociraptor", "Allosaurus", "Megalosaurus"]
    },
    hint: "Period, Region, Diet",
    published: false,
    title: "Dinosaurs"
  },
  {
    groups: {
      "Flowering plant": [
        "Cabbage",
        "Tomato",
        "English Oak",
        "Bird of Paradise"
      ],
      "Used as food": ["Cabbage", "Tomato", "Stone Pine", "Ginkgo"],
      "Native to Europe": ["Cabbage", "English Oak", "Stone Pine", "Yew"]
    },
    hint: "Angiosperm, Edible, Region",
    published: false,
    title: "Plants"
  },
  {
    groups: {
      Edible: ["Common Carp", "Tilapia", "Atlantic Cod", "Mahi-mahi"],
      Freshwater: ["Common Carp", "Tilapia", "European Minnow", "Electric Eel"],
      "Found in Europe": [
        "Common Carp",
        "Atlantic Cod",
        "European Minnow",
        "Long-snouted Seahorse"
      ]
    },
    hint: "Taste, Habitat, Continent",
    published: false,
    title: "Fish"
  },
  {
    groups: {
      "Experiences Metamorphosis": ["Honeybee", "Butterfly", "Wasp", "Ladybug"],
      "Feeds on Nectar": ["Honeybee", "Butterfly", "Ant", "Moth"],
      "Lives in Colonies": ["Honeybee", "Wasp", "Ant", "Termite"]
    },
    hint: "Evolution, Feeding, Social",
    published: false,
    title: "Insects"
  },
  {
    groups: {
      Deciduous: ["Hickory", "Sweet Chestnut", "Maple", "Silver Birch"],
      "Produces edible nuts": [
        "Hickory",
        "Sweet Chestnut",
        "Pinyon Pine",
        "Coconut palm"
      ],
      "Native to North America": ["Hickory", "Maple", "Pinyon Pine", "Sequoia"]
    },
    hint: "Leaves, Nuts, Region",
    published: false,
    title: "Trees"
  }
]
