import type { GameListItem } from "../src/lib/types";

export let directors: Array<GameListItem> = [
  {
    groups: {
      "Won Best Director Oscar": [
        "Steven Spielberg",
        "Peter Jackson",
        "Clint Eastwood",
        "Alfonso Cuarón",
      ],
      "Directed a Film Which Grossed $1B": [
        "Steven Spielberg",
        "Peter Jackson",
        "J. J. Abrams",
        "David Yates",
      ],
      American: [
        "Steven Spielberg",
        "Clint Eastwood",
        "J. J. Abrams",
        "Quentin Tarantino",
      ],
    },
    hint: "Academy, Box Office, Nationality",
    published: true,
  },
  {
    groups: {
      "Known for Science Fiction": [
        "Alex Garland",
        "James Cameron",
        "Ridley Scott",
        "Paul Verhoeven",
      ],
      "Also a Screenwriter": [
        "Alex Garland",
        "James Cameron",
        "Edgar Wright",
        "Greta Gerwig",
      ],
      "Born in the United Kingdom": [
        "Alex Garland",
        "Ridley Scott",
        "Edgar Wright",
        "Ken Loach",
      ],
    },
    hint: "Genre, Script, Nationality",
    published: false,
  },
];
