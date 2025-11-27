import type { GameListItem } from "../src/lib/types";

export let miscellaneous: Array<GameListItem> = [
  {
    groups: {
      Color: ["Orange", "Grape", "Pine", "Purple"],
      Fruit: ["Orange", "Grape", "Apple", "Watermelon"],
      Tree: ["Orange", "Pine", "Apple", "Cedar"],
    },
    hint: "Palette, Food, Bark",
    published: true,
    title: "Demo Puzzle",
  },
  {
    creator: "Hannah Monis",
    groups: {
      "Contains Alcohol": [
        "French Onion",
        "Coq au Vin",
        "Beer Cheese",
        "Chicken Marsala",
      ],
      French: ["French Onion", "Coq au Vin", "Vichyssoise", "Brioche"],
      Soup: ["French Onion", "Beer Cheese", "Vichyssoise", "Italian Wedding"],
    },
    hint: "Liquor, Nationality, Broth",
    published: true,
    title: "Food",
  },
  {
    creator: "Paul T",
    groups: {
      British: [
        "Aston Martin Vanquish",
        "Jaguar E-Type",
        "Land Rover Series III",
        "Bentley Bentayga",
      ],
      "Two-Door Coupe": [
        "Aston Martin Vanquish",
        "Jaguar E-Type",
        "Ford Mustang Mach 1",
        "Chevrolet Camaro",
      ],
      "Driven by James Bond": [
        "Aston Martin Vanquish",
        "Ford Mustang Mach 1",
        "Land Rover Series III",
        "Mercedes-Benz S 300",
      ],
    },
    hint: "Nationality, Doors, 007",
    published: true,
    title: "Cars",
  },
  {
    groups: {
      "Tech Founder": ["Elon Musk", "Jack Ma", "Bill Gates", "Michael Dell"],
      "Born Outside the United States": [
        "Elon Musk",
        "Jack Ma",
        "Bernard Arnault",
        "Roman Abramovich",
      ],
      "Has Topped Forbes List": [
        "Elon Musk",
        "Bill Gates",
        "Bernard Arnault",
        "Warren Buffett",
      ],
    },
    hint: "Tech, Nationality, Forbes",
    published: true,
    title: "Billionaires",
  },
  {
    groups: {
      "Commonly Used in Desserts": [
        "Mango",
        "Cherry",
        "Pineapple",
        "Strawberry",
      ],
      "Has a Pit": ["Mango", "Cherry", "Avocado", "Olive"],
      Tropical: ["Mango", "Pineapple", "Avocado", "Breadfruit"],
    },
    hint: "Sweet, Stone, Climate",
    published: true,
    title: "Fruits",
  },
  {
    groups: {
      "Official Language of the UN": [
        "English",
        "French",
        "Mandarin Chinese",
        "Russian",
      ],
      "Uses Latin Script": ["English", "French", "Portuguese", "Vietnamese"],
      "200M+ Native Speakers": [
        "English",
        "Mandarin Chinese",
        "Portuguese",
        "Hindi",
      ],
    },
    hint: "UN, Script, Native Speakers",
    published: true,
    title: "Languages",
  },
  {
    groups: {
      "Jet-powered": [
        "Lockheed SR-71",
        "F-22 Raptor",
        "Boeing 747",
        "Airbus A320",
      ],
      "Used in Military": [
        "Lockheed SR-71",
        "F-22 Raptor",
        "Lockheed C-130 Hercules",
        "MQ-9 Reaper",
      ],
      "First flown before 1970": [
        "Lockheed SR-71",
        "Boeing 747",
        "Lockheed C-130 Hercules",
        "Cessna 172",
      ],
    },
    hint: "Propulsion, Combat, Debut",
    published: false,
    title: "Aircraft",
  },
  {
    groups: {
      German: [
        "Martin Heidegger",
        "Friedrich Nietzsche",
        "Jürgen Habermas",
        "Gottfried Wilhelm Leibniz",
      ],
      Existentialist: [
        "Martin Heidegger",
        "Friedrich Nietzsche",
        "Jean-Paul Sartre",
        "Søren Kierkegaard",
      ],
      "Major 20th-Century Work": [
        "Martin Heidegger",
        "Jürgen Habermas",
        "Jean-Paul Sartre",
        "Ludwig Wittgenstein",
      ],
    },
    hint: "Nationality, Movement, Century",
    published: true,
    title: "Philosophers",
  },
];
