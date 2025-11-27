import type { GameListItem } from "../src/lib/types";

export let movies: Array<GameListItem> = [
  {
    groups: {
      "Won Best Picture": [
        "The King's Speech",
        "The Silence of the Lambs",
        "12 Years a Slave",
        "The Hurt Locker",
      ],
      "Set in the 20th Century": [
        "The King's Speech",
        "The Silence of the Lambs",
        "The Imitation Game",
        "Back to the Future",
      ],
      "Based on a True Story": [
        "The King's Speech",
        "12 Years a Slave",
        "The Imitation Game",
        "The Social Network",
      ],
    },
    hint: "Academy, Century, Inspiration",
    published: true,
  },
  {
    groups: {
      "Nominated for Best Picture": [
        "The Return of the King",
        "Inception",
        "Atonement",
        "Lady Bird",
      ],
      "Grossed over $300M worldwide": [
        "The Return of the King",
        "Inception",
        "Twilight",
        "Transformers",
      ],
      "Based on a Book": [
        "The Return of the King",
        "Atonement",
        "Twilight",
        "The Perks of Being a Wallflower",
      ],
    },
    hint: "Nomination, Box Office, Inspiration",
    published: true,
  },
  {
    groups: {
      "Won Best Picture Oscar": [
        "The Apartment",
        "The Sound of Music",
        "The Artist",
        "Gandhi",
      ],
      "Released Before 1970": [
        "The Apartment",
        "The Sound of Music",
        "Psycho",
        "2001: A Space Odyssey",
      ],
      "Black-and-White": [
        "The Apartment",
        "The Artist",
        "Psycho",
        "Raging Bull",
      ],
    },
    hint: "Academy, Era, Color",
    published: true,
  },
  {
    groups: {
      "Won Best Picture": [
        "The English Patient",
        "Braveheart",
        "The Godfather",
        "The Departed",
      ],
      "Released in the 1990s": [
        "The English Patient",
        "Braveheart",
        "Fight Club",
        "Pulp Fiction",
      ],
      "Based on a Book": [
        "The English Patient",
        "The Godfather",
        "Fight Club",
        "Gone Girl",
      ],
    },
    hint: "Academy, Decade, Source",
    published: true,
  },
  {
    groups: {
      "Won Best Actor Oscar": [
        "Ray",
        "My Left Foot",
        "Training Day",
        "Forrest Gump",
      ],
      "Based on a True Story": [
        "Ray",
        "My Left Foot",
        "A Beautiful Mind",
        "Apollo 13",
      ],
      "Released in the 2000s": [
        "Ray",
        "Training Day",
        "A Beautiful Mind",
        "Eternal Sunshine of the Spotless Mind",
      ],
    },
    hint: "Actor, True Story, Decade",
    published: true,
  },
  {
    groups: {
      "Animated Feature": [
        "Frozen",
        "Toy Story 3",
        "Tangled",
        "The Iron Giant",
      ],
      "Grossed over $1B worldwide": [
        "Frozen",
        "Toy Story 3",
        "Beauty and the Beast (2017)",
        "Titanic",
      ],
      "Fairy Tale": [
        "Frozen",
        "Tangled",
        "Beauty and the Beast (2017)",
        "Cinderella (2015)",
      ],
    },
    hint: "Animation, Box Office, Fairy Tale",
    published: true,
  },
  {
    groups: {
      "Won Best Picture": [
        "Schindler's List",
        "The Bridge on the River Kwai",
        "Argo",
        "The Artist",
      ],
      "Set during World War II": [
        "Schindler's List",
        "The Bridge on the River Kwai",
        "The Imitation Game",
        "Life Is Beautiful",
      ],
      "Based on a True Story": [
        "Schindler's List",
        "Argo",
        "The Imitation Game",
        "Catch Me If You Can",
      ],
    },
    hint: "War, Academy, Nonfiction",
    published: true,
  },
  {
    groups: {
      "Includes Time Travel": [
        "Happy Death Day 2U",
        "Looper",
        "The Time Traveler's Wife",
        "Primer",
      ],
      "Released after 2010": [
        "Happy Death Day 2U",
        "Looper",
        "The Hunger Games",
        "The Dark Knight Rises",
      ],
      "Has a Female Lead": [
        "Happy Death Day 2U",
        "The Time Traveler's Wife",
        "The Hunger Games",
        "Alien",
      ],
    },
    hint: "Loops, Decade, Lead",
    published: false,
  },
  {
    groups: {
      "Based on a Comic Book": [
        "Black Panther",
        "The Dark Knight",
        "Scott Pilgrim vs. the World",
        "Ghost World",
      ],
      "Features a Superhero": [
        "Black Panther",
        "The Dark Knight",
        "The Incredibles",
        "Brightburn",
      ],
      "Released in the 2010s": [
        "Black Panther",
        "Scott Pilgrim vs. the World",
        "Brightburn",
        "Gravity",
      ],
    },
    hint: "Comics, Capes, Decade",
    published: false,
  },
  {
    groups: {
      "Nominated for Best Picture": [
        "Nomadland",
        "The Hurt Locker",
        "La La Land",
        "Goodfellas",
      ],
      "Directed by a Woman": [
        "Nomadland",
        "The Hurt Locker",
        "Wonder Woman",
        "The Babadook",
      ],
      "Released after 2015": [
        "Nomadland",
        "La La Land",
        "Wonder Woman",
        "Baby Driver",
      ],
    },
    hint: "Nomination, Director, Recency",
    published: false,
  },
];
