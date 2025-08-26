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
  }
]
