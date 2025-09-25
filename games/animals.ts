import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      Aquatic: ["Penguin", "Duck", "Seal", "Flying Fish"],
      Bird: ["Penguin", "Duck", "Ostrich", "Eagle"],
      "Does Not Fly": ["Penguin", "Seal", "Ostrich", "Zebra"]
    },
    hint: "Habitat, Feathers, Grounded",
    published: true,
    title: "Animals"
  },
  {
    creator: "Hannah Monis",
    groups: {
      "Commonly Eaten": ["Shrimp", "Rabbit", "Lobster", "Cow"],
      "Often Kept as Pet": ["Shrimp", "Rabbit", "Newt", "Dog"],
      "Lives in Water": ["Shrimp", "Lobster", "Newt", "Box Jellyfish"]
    },
    hint: "Food, Friend, Habitat",
    published: true,
    title: "Animals 2"
  },
  {
    groups: {
      "Big Cat": ["Leopard", "Cheetah", "Tiger", "Puma"],
      "Has Spots": ["Leopard", "Cheetah", "Spotted Deer", "Giraffe"],
      "Found in India": [
        "Leopard",
        "Tiger",
        "Spotted Deer",
        "Indian Rhinoceros"
      ]
    },
    hint: "Feline, Fur, Region",
    published: true,
    title: "Animals 3"
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
    published: true,
    title: "Animals 4"
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
    published: true,
    title: "Animals 5"
  },
  {
    groups: {
      "Found in North America": ["Beaver", "Mouse", "Otter", "Raccoon"],
      Rodent: ["Beaver", "Mouse", "Capybara", "Guinea Pig"],
      "Semi-Aquatic": ["Beaver", "Capybara", "Otter", "Hippopotamus"]
    },
    hint: "Region, Teeth, Habitat",
    published: true,
    title: "Animals 6"
  },
  {
    groups: {
      "Can Fly": ["Elf Owl", "Roadrunner", "Fruit Bat", "Swan"],
      "Lives in the Desert": ["Elf Owl", "Roadrunner", "Scorpion", "Camel"],
      Nocturnal: ["Elf Owl", "Fruit Bat", "Scorpion", "Raccoon"]
    },
    hint: "Wings, Arid, Night",
    published: false,
    title: "Animals 7"
  },
  {
    groups: {
      Venomous: [
        "Inland Taipan",
        "King Cobra",
        "Common Death Adder",
        "Rattlesnake"
      ],
      "Lays Eggs": ["Inland Taipan", "King Cobra", "Emu", "Chicken"],
      "Found in Australia": [
        "Inland Taipan",
        "Common Death Adder",
        "Emu",
        "Koala"
      ]
    },
    hint: "Venom, Eggs, Region",
    published: false,
    title: "Animals 8"
  },
  {
    groups: {
      "Has Feathers": ["Barn Owl", "Sparrow", "Kakapo", "Ostrich"],
      "Can Fly": ["Barn Owl", "Sparrow", "Bat", "Dragonfly"],
      "Is Nocturnal": ["Barn Owl", "Kakapo", "Bat", "Hedgehog"]
    },
    hint: "Feathers, Flight, Night",
    published: false,
    title: "Animals 9"
  }
]
