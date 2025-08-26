import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Big Cat": ["Leopard", "Cheetah", "Tiger", "Puma"],
      "Has Spots": ["Leopard", "Cheetah", "Spotted Deer", "Giraffe"],
      "Found in India": ["Leopard", "Tiger", "Spotted Deer", "Rhinoceros"]
    },
    hint: "Feline, Fur, Region",
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
    title: "Animals 5"
  },
  {
    groups: {
      "Found in North America": ["Beaver", "Mouse", "Otter", "Raccoon"],
      Rodent: ["Beaver", "Mouse", "Capybara", "Guinea Pig"],
      "Semi-Aquatic": ["Beaver", "Capybara", "Otter", "Hippopotamus"]
    },
    hint: "Region, Teeth, Habitat",
    title: "Animals 6"
  },
  {
    groups: {
      "Can Fly": ["Elf Owl", "Roadrunner", "Fruit Bat", "Swan"],
      "Lives in the Desert": ["Elf Owl", "Roadrunner", "Scorpion", "Camel"],
      Nocturnal: ["Elf Owl", "Fruit Bat", "Scorpion", "Raccoon"]
    },
    hint: "Wings, Arid, Night",
    title: "Animals 7"
  }
]
