import type { Game } from "../src/lib/types"

interface GameListItem extends Pick<Game, "groups" | "hint" | "title"> {
  creator?: string
}

export let gameList: Array<GameListItem> = [
  {
    groups: {
      Italian: ["Michelangelo", "Raphael", "Donatello", "Antonio Vivaldi"],
      Painter: ["Michelangelo", "Raphael", "Pablo Picasso", "Frida Kahlo"],
      Sculptor: ["Michelangelo", "Donatello", "Pablo Picasso", "Auguste Rodin"]
    },
    hint: "Nationality, Canvas, Marble",
    title: "Artists"
  },
  {
    groups: {
      Sculpture: [
        "Mount Rushmore",
        "Venus de Milo",
        "Statue of Liberty",
        "The Thinker"
      ],
      "Made of Stone": [
        "Mount Rushmore",
        "Venus de Milo",
        "Great Pyramid of Giza",
        "Rosetta Stone"
      ],
      Commemorative: [
        "Mount Rushmore",
        "Statue of Liberty",
        "Great Pyramid of Giza",
        "Liberty Bell"
      ]
    },
    hint: "Medium, Material, Memorial",
    title: "Works of Art"
  },
  {
    groups: {
      Spanish: [
        "Salvador Dalí",
        "Francisco Goya",
        "Eduardo Chillida",
        "Miguel de Cervantes"
      ],
      Painter: [
        "Salvador Dalí",
        "Francisco Goya",
        "Jackson Pollock",
        "Jan van Eyck"
      ],
      "Active in the 20th Century": [
        "Salvador Dalí",
        "Eduardo Chillida",
        "Jackson Pollock",
        "Igor Stravinsky"
      ]
    },
    hint: "Nationality, Easel, Century",
    title: "Artists 2"
  }
]

// {
//     groups: {
//       Italian: [
//         "The Creation of Adam",
//         "Lamentation (The Mourning of Christ)",
//         "Mona Lisa",
//         "The Birth of Venus"
//       ],
//       Religious: [
//         "The Creation of Adam",
//         "Lamentation (The Mourning of Christ)",
//         "Isenheim Altarpiece",
//         "Ghent Altarpiece"
//       ],
//       "16th Century": [
//         "The Creation of Adam",
//         "Mona Lisa",
//         "Isenheim Altarpiece",
//         "The Ambassadors"
//       ]
//     },
//     hint: "Country, Faith, Century",
//     title: "Works of Art 2"
//   },
//   {
//     title: "Works of Art 3",
//     hint: "Dutch, 1600s, Portraiture",
//     groups: {
//       Dutch: [
//         "The Night Watch",
//         "View of Delft",
//         "Self-Portrait (Vincent van Gogh)",
//         "The Potato Eaters"
//       ],
//       "17th Century": [
//         "The Night Watch",
//         "View of Delft",
//         "Las Meninas",
//         "The Surrender of Breda"
//       ],
//       Portrait: [
//         "The Night Watch",
//         "Self-Portrait (Vincent van Gogh)",
//         "Las Meninas",
//         "Portrait of Adele Bloch-Bauer I"
//       ]
//     }
//   },
//   {
//     title: "Works of Art 4",
//     hint: "France, Countryside, 1800s",
//     groups: {
//       French: [
//         "The Gleaners",
//         "Embarkation of the Queen of Sheba",
//         "Grande Odalisque",
//         "The Swing"
//       ],
//       Landscape: [
//         "The Gleaners",
//         "Embarkation of the Queen of Sheba",
//         "The Hay Wain",
//         "View of Toledo"
//       ],
//       "19th Century": [
//         "The Gleaners",
//         "Grande Odalisque",
//         "The Hay Wain",
//         "The Third of May 1808"
//       ]
//     }
//   },
//   {
//     title: "Works of Art 5",
//     hint: "Murals, Public, 20th Century",
//     groups: {
//       "Public Art": [
//         "Man at the Crossroads",
//         "Sistine Chapel Ceiling",
//         "Vietnam Veterans Memorial",
//         "Great Sphinx of Giza"
//       ],
//       Mural: [
//         "Man at the Crossroads",
//         "Sistine Chapel Ceiling",
//         "Guernica",
//         "Villa of the Mysteries frescoes"
//       ],
//       "20th Century": [
//         "Man at the Crossroads",
//         "Vietnam Veterans Memorial",
//         "Guernica",
//         "The Persistence of Memory"
//       ]
//     }
//   }
