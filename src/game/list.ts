import type { GameListItem } from "lib/types";

interface PublishedGame extends Omit<GameListItem, "published" | "title"> {
  title: string;
}
type GameList = [
  PublishedGame,
  PublishedGame,
  PublishedGame,
  PublishedGame,
  PublishedGame,
  PublishedGame,
  PublishedGame,
];

interface Puzzle<T extends string>
  extends Omit<GameListItem, "published" | "title"> {
  title: T;
}

type Week = [
  Puzzle<string>,
  Puzzle<"Actors">,
  Puzzle<"Songs">,
  Puzzle<"Animals">,
  Puzzle<"Movies" | "TV Shows">,
  Puzzle<"Bands" | "Musicians">,
  Puzzle<"Baseball" | "Basketball" | "Football">,
];

let demo: [PublishedGame | Puzzle<"Demo Puzzle">] = [
  {
    groups: {
      Color: ["Orange", "Grape", "Pine", "Purple"],
      Fruit: ["Orange", "Grape", "Apple", "Watermelon"],
      Tree: ["Orange", "Pine", "Apple", "Cedar"],
    },
    hint: "Palette, Food, Bark",
    title: "Demo Puzzle",
  },
  // {
  //   groups: {
  //     "Yellow Circle": ["Brown", "Green", "Orange", "Yellow"],
  //     "Blue Circle": ["Brown", "Green", "Purple", "Blue"],
  //     "Red Circle": ["Brown", "Orange", "Purple", "Red"]
  //   },
  //   hint: "",
  //   title: ""
  // }
];

let week1: GameList = [
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      Aquatic: ["Penguin", "Duck", "Seal", "Flying Fish"],
      Bird: ["Penguin", "Duck", "Ostrich", "Eagle"],
      "Does Not Fly": ["Penguin", "Seal", "Ostrich", "Zebra"],
    },
    hint: "Habitat, Feathers, Grounded",
    title: "Animals",
  },
  {
    creator: "Margaret Monis",
    groups: {
      "Police Show": [
        "Cagney and Lacey",
        "Blue Bloods",
        "Rizzoli and Isles",
        "Miami Vice",
      ],
      "Set in New York City": [
        "Cagney and Lacey",
        "Blue Bloods",
        "Sex and the City",
        "Friends",
      ],
      "Female Leads": [
        "Cagney and Lacey",
        "Rizzoli and Isles",
        "Sex and the City",
        "Designing Women",
      ],
    },
    hint: "Justice, Metropolis, Heroines",
    title: "TV Shows",
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
    title: "Food",
  },
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
    title: "Movies",
  },
  {
    groups: {
      "Constitutional Monarchy": ["Canada", "Sweden", "Australia", "Japan"],
      "Touches the Arctic Circle": ["Canada", "Sweden", "USA", "Russia"],
      "English is Official Language": [
        "Canada",
        "Australia",
        "USA",
        "South Africa",
      ],
    },
    hint: "Government, Latitude, Language",
    title: "Countries",
  },
  {
    groups: {
      "Released in the 1990s": ["Spice", "Ten", "OK Computer", "Nevermind"],
      "Debut Album": ["Spice", "Ten", "Led Zeppelin", "The Doors"],
      British: ["Spice", "OK Computer", "Led Zeppelin", "Abbey Road"],
    },
    hint: "Decade, Debut, Nationality",
    title: "Albums",
  },
  {
    creator: "Evan Williams",
    groups: {
      "Drafted Out of High School": [
        "Dwight Howard",
        "LeBron James",
        "Kevin Garnett",
        "Kobe Bryant",
      ],
      "Drafted First Overall": [
        "Dwight Howard",
        "LeBron James",
        "Hakeem Olajuwon",
        "Shaquille O'Neal",
      ],
      "Won Defensive Player of the Year": [
        "Dwight Howard",
        "Kevin Garnett",
        "Hakeem Olajuwon",
        "Ben Wallace",
      ],
    },
    hint: "School, Draft, Defense",
    title: "Basketball",
  },
];

let week2: GameList = [
  {
    creator: "Hannah Monis",
    groups: {
      "Commonly Eaten": ["Shrimp", "Rabbit", "Lobster", "Cow"],
      "Often Kept as Pet": ["Shrimp", "Rabbit", "Newt", "Dog"],
      "Lives in Water": ["Shrimp", "Lobster", "Newt", "Box Jellyfish"],
    },
    hint: "Food, Friend, Habitat",
    title: "Animals",
  },
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      "100 Million Physical Records Sold": [
        "Michael Jackson",
        "Eagles",
        "Celine Dion",
        "Led Zeppelin",
      ],
      American: ["Michael Jackson", "Eagles", "Lady Gaga", "Kings of Leon"],
      "Pop Singer": ["Michael Jackson", "Celine Dion", "Lady Gaga", "Dua Lipa"],
    },
    hint: "Sales, Nationality, Genre",
    title: "Musicians",
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
    title: "Cars",
  },
  {
    groups: {
      Book: [
        "The Handmaid's Tale",
        "No Country For Old Men",
        "Big Little Lies",
        "A Confederacy of Dunces",
      ],
      Movie: [
        "The Handmaid's Tale",
        "No Country For Old Men",
        "Fargo",
        "The Big Lebowski",
      ],
      "TV Show": ["The Handmaid's Tale", "Fargo", "Big Little Lies", "Lost"],
    },
    hint: "Bestseller, Premiere, Series",
    title: "Entertainment",
  },
  {
    groups: {
      Italian: ["Michelangelo", "Raphael", "Donatello", "Antonio Vivaldi"],
      Painter: ["Michelangelo", "Raphael", "Pablo Picasso", "Frida Kahlo"],
      Sculptor: ["Michelangelo", "Donatello", "Pablo Picasso", "Auguste Rodin"],
    },
    hint: "Nationality, Canvas, Marble",
    title: "Artists",
  },
  {
    groups: {
      "Led a Nation During Wartime": [
        "Abraham Lincoln",
        "Winston Churchill",
        "Czar Nicholas II",
        "Joseph Stalin",
      ],
      "Killed with a Firearm": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Czar Nicholas II",
        "Franz Ferdinand",
      ],
      "Appears on Modern Currency": [
        "Abraham Lincoln",
        "Mahatma Gandhi",
        "Winston Churchill",
        "Thomas Jefferson",
      ],
    },
    hint: "War, Death, Money",
    title: "Historical Figures",
  },
  {
    groups: {
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"],
    },
    hint: "Throw, Helmet, Clock",
    title: "Sports",
  },
];

let week3: GameList = [
  {
    groups: {
      "Big Cat": ["Leopard", "Cheetah", "Tiger", "Puma"],
      "Has Spots": ["Leopard", "Cheetah", "Spotted Deer", "Giraffe"],
      "Found in India": [
        "Leopard",
        "Tiger",
        "Spotted Deer",
        "Indian Rhinoceros",
      ],
    },
    hint: "Feline, Fur, Region",
    title: "Animals",
  },
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      "Oscar Winner": [
        "Daniel Day-Lewis",
        "Rachel Weisz",
        "Tom Hanks",
        "Emma Stone",
      ],
      British: [
        "Daniel Day-Lewis",
        "Rachel Weisz",
        "Hugh Laurie",
        "Idris Elba",
      ],
      "Born in the 1950s": [
        "Daniel Day-Lewis",
        "Tom Hanks",
        "Hugh Laurie",
        "Bruce Willis",
      ],
    },
    hint: "Academy, Nationality, DOB",
    title: "Actors",
  },
  {
    groups: {
      "Hosted Olympics": ["London", "Tokyo", "Turin", "Rio de Janeiro"],
      "National Capital": ["London", "Tokyo", "Cairo", "Panama City"],
      "Located Within Roman Empire": ["London", "Turin", "Cairo", "Istanbul"],
    },
    hint: "Olympiad, Capital, Rome",
    title: "Cities",
  },
  {
    creator: "Margaret Monis",
    groups: {
      British: [
        "Charlotte Brontë",
        "J. K. Rowling",
        "Charles Dickens",
        "Ian McEwan",
      ],
      Female: [
        "Charlotte Brontë",
        "J. K. Rowling",
        "Louisa May Alcott",
        "Margaret Atwood",
      ],
      "Active in the 19th Century": [
        "Charlotte Brontë",
        "Charles Dickens",
        "Louisa May Alcott",
        "Jules Verne",
      ],
    },
    hint: "Nationality, Gender, Century",
    title: "Authors",
  },
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
    title: "Directors",
  },
  {
    groups: {
      "Happened in 1950s": [
        "Hungarian Revolution",
        "Cuban Revolution",
        "Treaty of Rome",
        "Korean War",
      ],
      "Political Revolution": [
        "Hungarian Revolution",
        "Cuban Revolution",
        "Russian Revolution",
        "Chinese Communist Revolution",
      ],
      "Happened in Europe": [
        "Hungarian Revolution",
        "Treaty of Rome",
        "Russian Revolution",
        "Creation of Berlin Wall",
      ],
    },
    hint: "Decade, Uprising, Region",
    title: "20th Century History",
  },
  {
    groups: {
      "Track & Field Athlete": [
        "Usain Bolt",
        "Merlene Ottey",
        "Carl Lewis",
        "Steve Prefontaine",
      ],
      "Not American": [
        "Usain Bolt",
        "Merlene Ottey",
        "Nadia Comăneci",
        "Elvis Stojko",
      ],
      "Olympic Gold Medalist": [
        "Usain Bolt",
        "Carl Lewis",
        "Michael Phelps",
        "Nadia Comăneci",
      ],
    },
    hint: "Sport, Nationality, Medal",
    title: "Olympians",
  },
];

let week4: GameList = [
  {
    groups: {
      Carnivore: ["Crocodile", "Eagle", "Great White Shark", "Tasmanian Devil"],
      "Lays Eggs": ["Crocodile", "Eagle", "Sea Turtle", "Tortoise"],
      "Lives in Water": [
        "Crocodile",
        "Great White Shark",
        "Sea Turtle",
        "Manatee",
      ],
    },
    hint: "Diet, Reproduction, Habitat",
    title: "Animals",
  },
  {
    creator: "Andrea Alcalá Vásquez",
    groups: {
      British: [
        "Elton John",
        "Jeremy Irons",
        "Andrew Lloyd Webber",
        "Hugh Grant",
      ],
      "Contributed to Disney Soundtrack": [
        "Elton John",
        "Jeremy Irons",
        "Alan Menken",
        "Josh Gad",
      ],
      "EGOT Winner": [
        "Elton John",
        "Andrew Lloyd Webber",
        "Alan Menken",
        "Viola Davis",
      ],
    },
    hint: "Nationality, Disney, Awards",
    title: "Entertainment",
  },
  {
    groups: {
      "Former Vice President": [
        "Richard Nixon",
        "Joe Biden",
        "Theodore Roosevelt",
        "Thomas Jefferson",
      ],
      "Born in the 20th Century": [
        "Richard Nixon",
        "Joe Biden",
        "Ronald Reagan",
        "Barack Obama",
      ],
      Republican: [
        "Richard Nixon",
        "Theodore Roosevelt",
        "Ronald Reagan",
        "Abraham Lincoln",
      ],
    },
    hint: "VP, DOB, Party",
    title: "US Presidents",
  },
  {
    groups: {
      "One-Word Title": ["Believe", "Bad", "Linger", "Clocks"],
      "Billboard Hot 100 #1 Hit": [
        "Believe",
        "Bad",
        "I Will Always Love You",
        "Hey Jude",
      ],
      "Released in the 1990s": [
        "Believe",
        "Linger",
        "Smells Like Teen Spirit",
        "I Will Always Love You",
      ],
    },
    hint: "Title, Peak, Decade",
    title: "Songs",
  },
  {
    groups: {
      "Not Located in the Americas": [
        "Taj Mahal",
        "Great Wall of China",
        "Petra",
        "Colosseum",
      ],
      "Completed After 1400 AD": [
        "Taj Mahal",
        "Great Wall of China",
        "Machu Picchu",
        "Christ the Redeemer",
      ],
      "Name is not Translated": [
        "Taj Mahal",
        "Petra",
        "Machu Picchu",
        "Chichén Itzá",
      ],
    },
    hint: "Region, Completion, Name",
    title: "Wonders of the World",
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
    title: "Movies",
  },
  {
    groups: {
      "3000 Career Hits": [
        "Miguel Cabrera",
        "Albert Pujols",
        "Ichiro Suzuki",
        "Cal Ripken, Jr.",
      ],
      "500 Career Homeruns": [
        "Miguel Cabrera",
        "Albert Pujols",
        "Ted Williams",
        "Mickey Mantle",
      ],
      ".300 Career Batting Average": [
        "Miguel Cabrera",
        "Ichiro Suzuki",
        "Ted Williams",
        "Vladimir Guerrero",
      ],
    },
    hint: "Hits, Homers, Average",
    title: "Baseball",
  },
];

let week5: GameList = [
  {
    groups: {
      "Commonly Ridden": ["Elephant", "Water Buffalo", "Camel", "Horse"],
      "Found in Southeast Asia": [
        "Elephant",
        "Water Buffalo",
        "Orangutan",
        "Bornean Bearded Pig",
      ],
      "No Hooves": ["Elephant", "Camel", "Orangutan", "Raccoon"],
    },
    hint: "Saddle, Region, Feet",
    title: "Animals",
  },
  {
    groups: {
      "One-Word Stage Name": ["Beyoncé", "Cher", "Adele", "Shakira"],
      "Started in a Group/Duo": [
        "Beyoncé",
        "Cher",
        "Paul McCartney",
        "Brandon Flowers",
      ],
      "Has 10+ Grammy Wins": [
        "Beyoncé",
        "Adele",
        "Paul McCartney",
        "Stevie Wonder",
      ],
    },
    hint: "Name, Band, Grammys",
    title: "Musicians",
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
    title: "Billionaires",
  },
  {
    groups: {
      "Published in the 19th Century": [
        "Little Women",
        "Adventures of Huckleberry Finn",
        "Jane Eyre",
        "Crime and Punishment",
      ],
      "Set in the United States": [
        "Little Women",
        "Adventures of Huckleberry Finn",
        "Beloved",
        "The Great Gatsby",
      ],
      "Written by a Woman": [
        "Little Women",
        "Jane Eyre",
        "Beloved",
        "Mrs Dalloway",
      ],
    },
    hint: "Century, Setting, Author",
    title: "Literature",
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
    title: "Movies",
  },
  {
    groups: {
      "Nobel Prize Winner": [
        "Albert Einstein",
        "Alexander Fleming",
        "Richard Feynman",
        "Dorothy Hodgkin",
      ],
      "Born before 1900": [
        "Albert Einstein",
        "Alexander Fleming",
        "James Clerk Maxwell",
        "Gregor Mendel",
      ],
      Physicist: [
        "Albert Einstein",
        "Richard Feynman",
        "James Clerk Maxwell",
        "Stephen Hawking",
      ],
    },
    hint: "Prize, DOB, Field",
    title: "Scientists",
  },
  {
    groups: {
      "60,000 Passing Yards": [
        "Peyton Manning",
        "Brett Favre",
        "Drew Brees",
        "Ben Roethlisberger",
      ],
      "Won MVP": ["Peyton Manning", "Brett Favre", "Joe Montana", "Cam Newton"],
      "Won Super Bowl MVP": [
        "Peyton Manning",
        "Drew Brees",
        "Joe Montana",
        "Eli Manning",
      ],
    },
    hint: "Yards, MVP, SB MVP",
    title: "Quarterbacks",
  },
];

let week6: GameList = [
  {
    groups: {
      "Found in North America": ["Beaver", "Mouse", "Otter", "Raccoon"],
      Rodent: ["Beaver", "Mouse", "Capybara", "Guinea Pig"],
      "Semi-Aquatic": ["Beaver", "Capybara", "Otter", "Hippopotamus"],
    },
    hint: "Region, Teeth, Habitat",
    title: "Animals",
  },
  {
    groups: {
      "Oscar Winner": [
        "Anthony Hopkins",
        "Brie Larson",
        "Kate Winslet",
        "Frances McDormand",
      ],
      "Appeared in the MCU": [
        "Anthony Hopkins",
        "Brie Larson",
        "Tom Hiddleston",
        "Chris Evans",
      ],
      British: [
        "Anthony Hopkins",
        "Kate Winslet",
        "Tom Hiddleston",
        "Hugh Grant",
      ],
    },
    hint: "Academy, Marvel, Nationality",
    title: "Actors",
  },
  {
    groups: {
      Sculpture: [
        "Mount Rushmore",
        "Venus de Milo",
        "Statue of Liberty",
        "The Thinker",
      ],
      "Made of Stone": [
        "Mount Rushmore",
        "Venus de Milo",
        "Great Pyramid of Giza",
        "Rosetta Stone",
      ],
      Commemorative: [
        "Mount Rushmore",
        "Statue of Liberty",
        "Great Pyramid of Giza",
        "Liberty Bell",
      ],
    },
    hint: "Medium, Material, Memorial",
    title: "Works of Art",
  },
  {
    groups: {
      "Majority Muslim": ["Indonesia", "Pakistan", "Maldives", "Afghanistan"],
      "Population Exceeds 100 Million": [
        "Indonesia",
        "Pakistan",
        "Brazil",
        "China",
      ],
      "Touches Equator": ["Indonesia", "Maldives", "Brazil", "Ecuador"],
    },
    hint: "Religion, Population, Latitude",
    title: "Countries",
  },
  {
    groups: {
      British: ["Charles I", "Queen Victoria", "Anne Boleyn", "Charles Darwin"],
      Executed: ["Charles I", "Louis XVI", "Anne Boleyn", "Socrates"],
      Monarch: [
        "Charles I",
        "Queen Victoria",
        "Louis XVI",
        "Suleiman the Magnificent",
      ],
    },
    hint: "Nationality, Death, Throne",
    title: "Historical Figures",
  },
  {
    groups: {
      "Appears in a Novel": [
        "Jay Gatsby",
        "Atticus Finch",
        "Tess Durbeyfield",
        "Elizabeth Bennet",
      ],
      Male: ["Jay Gatsby", "Atticus Finch", "Romeo", "Prospero"],
      "Dies by the End": ["Jay Gatsby", "Tess Durbeyfield", "Romeo", "Ophelia"],
    },
    hint: "Book, Gender, Death",
    title: "Literary Characters",
  },
  {
    groups: {
      "Won Ballon d'Or": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Fabio Cannavaro",
        "Johan Cruyff",
      ],
      "Won Champions League": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Andrés Iniesta",
        "Paolo Maldini",
      ],
      "Won World Cup": [
        "Lionel Messi",
        "Fabio Cannavaro",
        "Andrés Iniesta",
        "Pelé",
      ],
    },
    hint: "MVP, Club, Country",
    title: "Soccer",
  },
];

let week7: GameList = [
  {
    groups: {
      "Can Fly": ["Elf Owl", "Roadrunner", "Fruit Bat", "Swan"],
      "Lives in the Desert": ["Elf Owl", "Roadrunner", "Scorpion", "Camel"],
      Nocturnal: ["Elf Owl", "Fruit Bat", "Scorpion", "Raccoon"],
    },
    hint: "Wings, Habitat, Night",
    title: "Animals",
  },
  {
    groups: {
      Animated: [
        "The Simpsons",
        "SpongeBob SquarePants",
        "Bob's Burgers",
        "Avatar: The Last Airbender",
      ],
      "Aired in the 1990s": [
        "The Simpsons",
        "SpongeBob SquarePants",
        "The X-Files",
        "ER",
      ],
      "Originally Aired on FOX": [
        "The Simpsons",
        "Bob's Burgers",
        "The X-Files",
        "Prison Break",
      ],
    },
    hint: "Animation, Decade, Network",
    title: "TV Shows",
  },
  {
    groups: {
      Spanish: [
        "Salvador Dalí",
        "Francisco Goya",
        "Eduardo Chillida",
        "Miguel de Cervantes",
      ],
      Painter: [
        "Salvador Dalí",
        "Francisco Goya",
        "Jackson Pollock",
        "Jan van Eyck",
      ],
      "Active in the 20th Century": [
        "Salvador Dalí",
        "Eduardo Chillida",
        "Jackson Pollock",
        "Igor Stravinsky",
      ],
    },
    hint: "Nationality, Easel, Century",
    title: "Artists",
  },
  {
    groups: {
      Caribbean: ["Venezuela", "Suriname", "Cuba", "Jamaica"],
      "Contains Amazon Rainforest": ["Venezuela", "Suriname", "Peru", "Brazil"],
      "Spanish is Official Language": ["Venezuela", "Cuba", "Peru", "Spain"],
    },
    hint: "Beaches, Trees, Language",
    title: "Countries",
  },
  {
    groups: {
      "Won an Acting Oscar": [
        "Gary Oldman",
        "Sean Penn",
        "Eddie Redmayne",
        "Julia Roberts",
      ],
      "Has Directed a Feature Film": [
        "Gary Oldman",
        "Sean Penn",
        "Ralph Fiennes",
        "Ben Affleck",
      ],
      British: [
        "Gary Oldman",
        "Eddie Redmayne",
        "Ralph Fiennes",
        "Keira Knightley",
      ],
    },
    hint: "Academy, Director, Nationality",
    title: "Actors",
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
    title: "Languages",
  },
  {
    groups: {
      "Judged Event": [
        "Snowboard Halfpipe",
        "Skateboarding Park",
        "Figure Skating",
        "Diving",
      ],
      "Board Sport": [
        "Snowboard Halfpipe",
        "Skateboarding Park",
        "Snowboard Cross",
        "Windsurfing",
      ],
      "Winter Sport": [
        "Snowboard Halfpipe",
        "Snowboard Cross",
        "Figure Skating",
        "Speed Skating",
      ],
    },
    hint: "Scoring, Board, Season",
    title: "Olympics",
  },
];

let week8: GameList = [
  {
    groups: {
      Venomous: [
        "Inland Taipan",
        "King Cobra",
        "Common Death Adder",
        "Rattlesnake",
      ],
      "Lays Eggs": ["Inland Taipan", "King Cobra", "Emu", "Chicken"],
      "Found in Australia": [
        "Inland Taipan",
        "Common Death Adder",
        "Emu",
        "Koala",
      ],
    },
    hint: "Venom, Eggs, Region",
    title: "Animals",
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
    title: "Movies",
  },
  {
    groups: {
      "UNESCO World Heritage Site": [
        "Mont-Saint-Michel",
        "Acropolis of Athens",
        "Robben Island",
        "Machu Picchu",
      ],
      "Located in Europe": [
        "Mont-Saint-Michel",
        "Acropolis of Athens",
        "Blue Lagoon",
        "Eiffel Tower",
      ],
      "Located on an Island": [
        "Mont-Saint-Michel",
        "Robben Island",
        "Blue Lagoon",
        "Alcatraz",
      ],
    },
    hint: "UNESCO, Region, Island",
    title: "Landmarks",
  },
  {
    groups: {
      "Female Leads": ["Girls", "Insecure", "Broad City", "Charmed"],
      "Aired On HBO": ["Girls", "Insecure", "Succession", "Westworld"],
      "Set in New York City": [
        "Girls",
        "Broad City",
        "Succession",
        "How I Met Your Mother",
      ],
    },
    hint: "Heroines, Network, Metropolis",
    title: "TV Shows",
  },
  {
    groups: {
      "Written by Shakespeare": [
        "The Winter's Tale",
        "A Midsummer Night's Dream",
        "King Lear",
        "Timon of Athens",
      ],
      Comedy: [
        "The Winter's Tale",
        "A Midsummer Night's Dream",
        "The King and I",
        "Noises Off",
      ],
      "Features a Royal Family": [
        "The Winter's Tale",
        "King Lear",
        "The King and I",
        "The Lion in Winter",
      ],
    },
    hint: "Playwright, Tone, Throne",
    title: "Plays",
  },
  {
    groups: {
      Philosopher: ["Plato", "Socrates", "Aristotle", "Thales"],
      "From Athens": ["Plato", "Socrates", "Aristophanes", "Pericles"],
      "Wrote Surviving Works": ["Plato", "Aristotle", "Aristophanes", "Homer"],
    },
    hint: "School, City, Texts",
    title: "Ancient Greeks",
  },
  {
    groups: {
      "Won MVP": ["Larry Bird", "Tim Duncan", "Kevin Garnett", "Derrick Rose"],
      "Won Finals MVP": [
        "Larry Bird",
        "Tim Duncan",
        "Paul Pierce",
        "Andre Iguodala",
      ],
      "Played for Boston Celtics": [
        "Larry Bird",
        "Kevin Garnett",
        "Paul Pierce",
        "Ray Allen",
      ],
    },
    hint: "Russell Trophy, Jordan Trophy, Beantown",
    title: "Basketball",
  },
];

let week9: GameList = [
  {
    groups: {
      "Has Feathers": ["Barn Owl", "Sparrow", "Kākāpō", "Ostrich"],
      "Can Fly": ["Barn Owl", "Sparrow", "Bat", "Dragonfly"],
      "Is Nocturnal": ["Barn Owl", "Kākāpō", "Bat", "Hedgehog"],
    },
    hint: "Feathers, Flight, Night",
    title: "Animals",
  },
  {
    groups: {
      "Appeared in a Quentin Tarantino Film": [
        "Leonardo DiCaprio",
        "Christoph Waltz",
        "Eli Roth",
        "Michael Madsen",
      ],
      "Golden Globe Winner": [
        "Leonardo DiCaprio",
        "Christoph Waltz",
        "Joaquin Phoenix",
        "Meryl Streep",
      ],
      "Born in the 1970s": [
        "Leonardo DiCaprio",
        "Eli Roth",
        "Joaquin Phoenix",
        "Rachel McAdams",
      ],
    },
    hint: "Tarantino, Globes, DOB",
    title: "Actors",
  },
  {
    groups: {
      Italian: [
        "The Creation of Adam",
        "Lamentation (The Mourning of Christ)",
        "Mona Lisa",
        "The Birth of Venus",
      ],
      Religious: [
        "The Creation of Adam",
        "Lamentation (The Mourning of Christ)",
        "Isenheim Altarpiece",
        "Ghent Altarpiece",
      ],
      "16th Century": [
        "The Creation of Adam",
        "Mona Lisa",
        "Isenheim Altarpiece",
        "The Ambassadors",
      ],
    },
    hint: "Country, Faith, Century",
    title: "Works of Art",
  },
  {
    groups: {
      "Happened in the 18th Century": [
        "American Revolution",
        "Boston Tea Party",
        "French Revolution",
        "Cook's First Voyage",
      ],
      "Happened in North America": [
        "American Revolution",
        "Boston Tea Party",
        "Mexican Revolution",
        "California Gold Rush",
      ],
      Revolution: [
        "American Revolution",
        "Mexican Revolution",
        "French Revolution",
        "Russian Revolution",
      ],
    },
    hint: "Century, Continent, Uprising",
    title: "History",
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
    title: "Movies",
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
    title: "Fruits",
  },
  {
    groups: {
      "Won Multiple World Series": [
        "Derek Jeter",
        "David Ortiz",
        "Reggie Jackson",
        "Buster Posey",
      ],
      "Never Won MVP": [
        "Derek Jeter",
        "David Ortiz",
        "Alfonso Soriano",
        "Adrián Beltré",
      ],
      "Played for New York Yankees": [
        "Derek Jeter",
        "Reggie Jackson",
        "Alfonso Soriano",
        "Don Mattingly",
      ],
    },
    hint: "Rings, No MVP, Bronx",
    title: "Baseball",
  },
];

let week10: GameList = [
  {
    groups: {
      "Bird of Prey": [
        "American Kestrel",
        "Common Kestrel",
        "Bald Eagle",
        "Eurasian Eagle-Owl",
      ],
      "Can Hover": [
        "American Kestrel",
        "Common Kestrel",
        "Ruby-throated Hummingbird",
        "Pied Kingfisher",
      ],
      "Native to the Americas": [
        "American Kestrel",
        "Bald Eagle",
        "Ruby-throated Hummingbird",
        "Blue Jay",
      ],
    },
    hint: "Raptor, Hover, Region",
    title: "Birds",
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
    title: "Movies",
  },
  {
    groups: {
      "Highest Point in its Country": [
        "Kilimanjaro",
        "Mount Fuji",
        "Aconcagua",
        "Ben Nevis",
      ],
      Volcanic: [
        "Kilimanjaro",
        "Mount Fuji",
        "Mount Rainier",
        "Mount Vesuvius",
      ],
      "Over 4,000 Meters Tall": [
        "Kilimanjaro",
        "Aconcagua",
        "Mount Rainier",
        "Mount Whitney",
      ],
    },
    hint: "National Record, Lava, Height",
    title: "Mountains",
  },
  {
    groups: {
      "Released in the 1980s": [
        "Careless Whisper",
        "Billie Jean",
        "Love Will Tear Us Apart",
        "Blister in the Sun",
      ],
      "#1 on Billboard Hot 100": [
        "Careless Whisper",
        "Billie Jean",
        "Rolling in the Deep",
        "Please Please Please",
      ],
      "By a British Artist": [
        "Careless Whisper",
        "Love Will Tear Us Apart",
        "Rolling in the Deep",
        "Wonderwall",
      ],
    },
    hint: "Decade, Chart, Nationality",
    title: "Songs",
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
    title: "Philosophers",
  },
  {
    groups: {
      Animated: [
        "Rick and Morty",
        "South Park",
        "Gravity Falls",
        "The Flintstones",
      ],
      "Contain Mature Content": [
        "Rick and Morty",
        "South Park",
        "Fleabag",
        "Breaking Bad",
      ],
      "Premiered in the 2010s": [
        "Rick and Morty",
        "Gravity Falls",
        "Fleabag",
        "Young Sheldon",
      ],
    },
    hint: "Animation, Rating, Decade",
    title: "TV Shows",
  },
  {
    groups: {
      "Led League in Assists Per Game": [
        "LeBron James",
        "James Harden",
        "Magic Johnson",
        "Steve Nash",
      ],
      "Led League in Points Per Game": [
        "LeBron James",
        "James Harden",
        "Michael Jordan",
        "Allen Iverson",
      ],
      "Won Finals MVP": [
        "LeBron James",
        "Magic Johnson",
        "Michael Jordan",
        "Andre Iguodala",
      ],
    },
    hint: "PPG, APG, Finals MVP",
    title: "Basketball",
  },
];

let week11: GameList = [
  {
    groups: {
      "Released in the 1970s": [
        "The Wall",
        "Physical Graffiti",
        "The Rise and Fall of Ziggy Stardust",
        "Rumours",
      ],
      "Double Album": [
        "The Wall",
        "Physical Graffiti",
        "Tommy",
        "The Beatles (White Album)",
      ],
      "Concept Album": [
        "The Wall",
        "The Rise and Fall of Ziggy Stardust",
        "Tommy",
        "Good Kid, M.A.A.D City",
      ],
    },
    hint: "Decade, Length, Theme",
    title: "Albums",
  },
  {
    groups: {
      "Released in the 1980s": [
        "How Will I Know",
        "Billie Jean",
        "Fast Car",
        "In the Air Tonight",
      ],
      "#1 on Billboard Hot 100": [
        "How Will I Know",
        "Billie Jean",
        "Rolling in the Deep",
        "Shape of You",
      ],
      "Female Vocalist": [
        "How Will I Know",
        "Fast Car",
        "Rolling in the Deep",
        "Chandelier",
      ],
    },
    hint: "Decade, Chart, Vocalist",
    title: "Songs",
  },
  {
    groups: {
      British: ["John Lennon", "Freddie Mercury", "Brian May", "John Deacon"],
      "Lead Singer": [
        "John Lennon",
        "Freddie Mercury",
        "Jimi Hendrix",
        "Beyoncé",
      ],
      Guitarist: [
        "John Lennon",
        "Brian May",
        "Jimi Hendrix",
        "Eddie Van Halen",
      ],
    },
    hint: "Nationality, Role, Instrument",
    title: "Musicians",
  },
  {
    groups: {
      "Appears in John Wick Universe": [
        "Keanu Reeves",
        "Lawrence Fishburne",
        "Ana de Armas",
        "Bridget Moynahan",
      ],
      "Appears in The Matrix": [
        "Keanu Reeves",
        "Lawrence Fishburne",
        "Hugo Weaving",
        "Joe Pantoliano",
      ],
      "Not American": [
        "Keanu Reeves",
        "Ana de Armas",
        "Hugo Weaving",
        "Margot Robbie",
      ],
    },
    hint: "Wick, Neo, Nationality",
    title: "Actors",
  },
  {
    groups: {
      Spinoff: ["Frasier", "Better Call Saul", "Angel", "The Jeffersons"],
      "Main Characters are Brothers": [
        "Frasier",
        "Better Call Saul",
        "Everybody Loves Raymond",
        "Arrested Development",
      ],
      "Debuted in the 1990s": [
        "Frasier",
        "Angel",
        "Everybody Loves Raymond",
        "The X-Files",
      ],
    },
    hint: "Spinoff, Siblings, Decade",
    title: "TV Shows",
  },
  {
    groups: {
      "Coen Brothers Film": [
        "Fargo",
        "Raising Arizona",
        "The Big Lebowski",
        "Inside Llewyn Davis",
      ],
      "Features Frances McDormand": [
        "Fargo",
        "Raising Arizona",
        "Primal Fear",
        "Moonrise Kingdom",
      ],
      "Released in the 1990s": [
        "Fargo",
        "The Big Lebowski",
        "Primal Fear",
        "The Mummy",
      ],
    },
    hint: "Coens, Frances, Decade",
    title: "Movies",
  },
  {
    groups: {
      "Won Super Bowl as Coach": [
        "Tony Dungy",
        "Mike Ditka",
        "Chuck Noll",
        "Don Shula",
      ],
      "Won Super Bowl as Player": [
        "Tony Dungy",
        "Mike Ditka",
        "Terry Bradshaw",
        "Emmitt Smith",
      ],
      "Pittsburgh Steeler": [
        "Tony Dungy",
        "Chuck Noll",
        "Terry Bradshaw",
        "Dermontti Dawson",
      ],
    },
    hint: "Coach, Player, Steel City",
    title: "Football",
  },
];

let week12: GameList = [
  {
    groups: {
      "#1 on Billboard 200": [
        "American Idiot",
        "Nevermind",
        "Stadium Arcadium",
        "The Miseducation of Lauryn Hill",
      ],
      "By a Trio": [
        "American Idiot",
        "Nevermind",
        "Try!",
        "Enema of the State",
      ],
      "Released in the 2000s": [
        "American Idiot",
        "Try!",
        "Stadium Arcadium",
        "The College Dropout",
      ],
    },
    hint: "Chart, Trio, Decade",
    title: "Albums",
  },
  {
    groups: {
      "Female Vocalist": [
        "Teenage Dream",
        "Tik Tok",
        "Super Bass",
        "Just Dance",
      ],
      "Written by Benny Blanco": [
        "Teenage Dream",
        "Tik Tok",
        "Castle on the Hill",
        "Don't Trust Me",
      ],
      "Released in the 2010s": [
        "Teenage Dream",
        "Super Bass",
        "Castle on the Hill",
        "DNA",
      ],
    },
    hint: "Gender, Writer, Decade",
    title: "Songs",
  },
  {
    groups: {
      "Born in California": [
        "Kendrick Lamar",
        "Nipsey Hussle",
        "Snoop Dogg",
        "Olivia Rodrigo",
      ],
      "Born in the 1980s": [
        "Kendrick Lamar",
        "Rihanna",
        "Nipsey Hussle",
        "J. Cole",
      ],
      "Performed at Super Bowl Halftime": [
        "Kendrick Lamar",
        "Snoop Dogg",
        "Rihanna",
        "Shakira",
      ],
    },
    hint: "State, DOB, Halftime",
    title: "Musicians",
  },
  {
    groups: {
      "Appeared in Superbad": [
        "Seth Rogen",
        "Michael Cera",
        "Bill Hader",
        "Emma Stone",
      ],
      "Appeared in Pineapple Express": [
        "Seth Rogen",
        "Bill Hader",
        "James Franco",
        "Rosie Perez",
      ],
      "Appeared in This is the End": [
        "Seth Rogen",
        "Michael Cera",
        "James Franco",
        "Paul Rudd",
      ],
    },
    hint: "Superbad, Pineapple, End",
    title: "Actors",
  },
  {
    groups: {
      "Set in Philadelphia": [
        "Abbott Elementary",
        "It's Always Sunny in Philadelphia",
        "Boy Meets World",
        "How to Get Away With Murder",
      ],
      "Stars its Creator(s)": [
        "Abbott Elementary",
        "It's Always Sunny in Philadelphia",
        "Welcome Back, Kotter",
        "Atlanta",
      ],
      "Takes Place Largely in School": [
        "Abbott Elementary",
        "Boy Meets World",
        "Welcome Back, Kotter",
        "Glee",
      ],
    },
    hint: "City, Creator, School",
    title: "TV Shows",
  },
  {
    groups: {
      "Set in Boston": [
        "Good Will Hunting",
        "The Town",
        "The Departed",
        "Spotlight",
      ],
      "Stars Ben Affleck": [
        "Good Will Hunting",
        "The Town",
        "The Last Duel",
        "Gone Girl",
      ],
      "Stars Matt Damon": [
        "Good Will Hunting",
        "The Departed",
        "The Last Duel",
        "The Martian",
      ],
    },
    hint: "City, Ben, Matt",
    title: "Movies",
  },
  {
    groups: {
      Japanese: [
        "Shohei Ohtani",
        "Ichiro Suzuki",
        "Hideki Matsui",
        "Hideo Nomo",
      ],
      "30+ Steals in a Season": [
        "Shohei Ohtani",
        "Ichiro Suzuki",
        "Mike Trout",
        "José Reyes",
      ],
      "30+ Homeruns in a Season": [
        "Shohei Ohtani",
        "Hideki Matsui",
        "Mike Trout",
        "Albert Pujols",
      ],
    },
    hint: "Nationality, Steals, Homers",
    title: "Baseball",
  },
];

let week13: GameList = [
  {
    groups: {
      "Debut Studio Album": [
        "The Miseducation of Lauryn Hill",
        "Are You Experienced",
        "When We All Fall Asleep, Where Do We Go?",
        "Parachutes",
      ],
      "Released Before 2000": [
        "The Miseducation of Lauryn Hill",
        "Are You Experienced",
        "Rumours",
        "OK Computer",
      ],
      "Won Album of the Year Grammy": [
        "The Miseducation of Lauryn Hill",
        "When We All Fall Asleep, Where Do We Go?",
        "Rumours",
        "Golden Hour",
      ],
    },
    hint: "Debut, Era, Grammy",
    title: "Albums",
  },
  {
    groups: {
      "Title Includes Animal Name": [
        "I Am the Walrus",
        "Blackbird",
        "A Horse with No Name",
        "War Pigs",
      ],
      "By the Beatles": [
        "I Am the Walrus",
        "Blackbird",
        "Penny Lane",
        "In My Life",
      ],
      "Released as a Single": [
        "I Am the Walrus",
        "A Horse with No Name",
        "Penny Lane",
        "My Generation",
      ],
    },
    hint: "Animal, Band, Single",
    title: "Songs",
  },
  {
    groups: {
      "Lead Singer also Bassist": [
        "The Police",
        "Rush",
        "Level 42",
        "Thin Lizzy",
      ],
      Trio: ["The Police", "Rush", "Muse", "Green Day"],
      British: ["The Police", "Level 42", "Muse", "Arctic Monkeys"],
    },
    hint: "Bass, Trio, Nationality",
    title: "Bands",
  },
  {
    groups: {
      Australian: [
        "Heath Ledger",
        "Cate Blanchett",
        "Mel Gibson",
        "Rose Byrne",
      ],
      "Won Academy Award for Acting": [
        "Heath Ledger",
        "Cate Blanchett",
        "Chris Cooper",
        "Anne Hathaway",
      ],
      "Appeared in The Patriot": [
        "Heath Ledger",
        "Mel Gibson",
        "Chris Cooper",
        "Jason Isaacs",
      ],
    },
    hint: "Nationality, Academy, Patriot",
    title: "Actors",
  },
  {
    groups: {
      "Set in New York City": [
        "30 Rock",
        "Broad City",
        "Seinfeld",
        "How I Met Your Mother",
      ],
      "Single-Camera": [
        "30 Rock",
        "Broad City",
        "The Office (US)",
        "Arrested Development",
      ],
      "Originally Aired on NBC": [
        "30 Rock",
        "Seinfeld",
        "The Office (US)",
        "Frasier",
      ],
    },
    hint: "City, Format, Network",
    title: "TV Shows",
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
    title: "Movies",
  },
  {
    groups: {
      "Won Triple Crown": [
        "Ted Williams",
        "Carl Yastrzemski",
        "Ty Cobb",
        "Frank Robinson",
      ],
      "Played for Red Sox": [
        "Ted Williams",
        "Carl Yastrzemski",
        "Manny Ramírez",
        "David Ortiz",
      ],
      "Career .300 Hitter": [
        "Ted Williams",
        "Ty Cobb",
        "Manny Ramírez",
        "Roberto Clemente",
      ],
    },
    hint: "Triple Crown, Boston, Career Average",
    title: "Baseball",
  },
];

let week14: GameList = [
  {
    groups: {
      Australian: [
        "Nicole Kidman",
        "Mia Wasikowska",
        "Hugh Jackman",
        "Chris Hemsworth",
      ],
      Female: [
        "Nicole Kidman",
        "Mia Wasikowska",
        "Halle Berry",
        "Saoirse Ronan",
      ],
      "Born in the 1960s": [
        "Nicole Kidman",
        "Hugh Jackman",
        "Halle Berry",
        "Brad Pitt",
      ],
    },
    hint: "Nationality, Gender, DOB",
    title: "Actors",
  },
  {
    groups: {
      "Written by Sia": [
        "Diamonds",
        "Sledgehammer (Rihanna song)",
        "Cheap Thrills",
        "Pretty Hurts",
      ],
      "Originally Performed by Rihanna": [
        "Diamonds",
        "Sledgehammer (Rihanna song)",
        "Umbrella",
        "Pon de Replay",
      ],
      "Billboard Hot 100 #1 Hit": [
        "Diamonds",
        "Cheap Thrills",
        "Umbrella",
        "Not Like Us",
      ],
    },
    hint: "Writer, Artist, Chart",
    title: "Songs",
  },
  {
    groups: {
      "Lives in a Group": ["Orca", "Wolf", "Salmon", "Ant"],
      Aquatic: ["Orca", "Salmon", "Blue Whale", "Tiger Shark"],
      Mammal: ["Orca", "Wolf", "Blue Whale", "Moose"],
    },
    hint: "Sociality, Habitat, Class",
    title: "Animals",
  },
  {
    groups: {
      "Set in New York City": [
        "The Godfather",
        "Birdman",
        "Taxi Driver",
        "Gangs of New York",
      ],
      "Won Best Picture": [
        "The Godfather",
        "Birdman",
        "Gandhi",
        "Slumdog Millionaire",
      ],
      "Released in 20th Century": [
        "The Godfather",
        "Taxi Driver",
        "Gandhi",
        "Jurassic Park",
      ],
    },
    hint: "City, Academy, Century",
    title: "Movies",
  },
  {
    groups: {
      "From the Caribbean": [
        "Gloria Estefan",
        "Bad Bunny",
        "Nicki Minaj",
        "Bob Marley",
      ],
      "Native Spanish Speaker": [
        "Gloria Estefan",
        "Bad Bunny",
        "Rosalía",
        "Alejandro Sanz",
      ],
      Female: ["Gloria Estefan", "Nicki Minaj", "Rosalía", "Billie Eilish"],
    },
    hint: "Region, Language, Gender",
    title: "Musicians",
  },
  {
    groups: {
      "Duke University": [
        "Kyrie Irving",
        "Jayson Tatum",
        "Carlos Boozer",
        "Zion Williamson",
      ],
      "Boston Celtics": [
        "Kyrie Irving",
        "Jayson Tatum",
        "Isaiah Thomas",
        "Jaylen Brown",
      ],
      "Cleveland Cavaliers": [
        "Kyrie Irving",
        "Carlos Boozer",
        "Isaiah Thomas",
        "Donovan Mitchell",
      ],
    },
    hint: "Devils, Cs, Cavs",
    title: "Basketball",
  },
  {
    groups: {
      Landlocked: ["Switzerland", "Burkina Faso", "Austria", "Bolivia"],
      "French Speaking": ["Switzerland", "Burkina Faso", "France", "Senegal"],
      European: ["Switzerland", "Austria", "France", "Spain"],
    },
    hint: "Noncoastal, Language, Continent",
    title: "Countries",
  },
];

let week15: Week = [
  {
    groups: {
      European: ["London", "Vienna", "Saint Petersburg", "Lyon"],
      "National Capital": ["London", "Vienna", "Cairo", "Brasília"],
      "Metro Population over 5 Million": [
        "London",
        "Saint Petersburg",
        "Cairo",
        "São Paulo",
      ],
    },
    hint: "Continent, Government, Population",
    title: "Cities",
  },
  {
    groups: {
      "Oscar Winner": [
        "Will Smith",
        "Rami Malek",
        "Paul McCartney",
        "Katharine Hepburn",
      ],
      "Played the Lead Role in a TV Show": [
        "Will Smith",
        "Rami Malek",
        "Donald Glover",
        "Larry David",
      ],
      "Also a Recording Artist": [
        "Will Smith",
        "Paul McCartney",
        "Donald Glover",
        "Rihanna",
      ],
    },
    hint: "Academy, Television, Music",
    title: "Actors",
  },
  {
    groups: {
      "Title Contains a Color": [
        "Purple Rain",
        "Blue Monday",
        "Brown Eyed Girl",
        "Yellow Submarine",
      ],
      "Released in the 1980s": [
        "Purple Rain",
        "Blue Monday",
        "Billie Jean",
        "Every Breath You Take",
      ],
      "By a Solo Artist": [
        "Purple Rain",
        "Brown Eyed Girl",
        "Billie Jean",
        "Imagine",
      ],
    },
    hint: "Title, Decade, Solo",
    title: "Songs",
  },
  {
    groups: {
      Carnivore: ["Ocelot", "Leopard", "Caiman", "Gray Wolf"],
      "Lives in Trees": ["Ocelot", "Leopard", "Sloth", "Koala"],
      "Native to South America": ["Ocelot", "Caiman", "Sloth", "Capybara"],
    },
    hint: "Diet, Habitat, Continent",
    title: "Animals",
  },
  {
    groups: {
      "Originally Aired on NBC": [
        "The Good Place",
        "Parks and Recreation",
        "Cheers",
        "ER",
      ],
      "Created by Michael Schur": [
        "The Good Place",
        "Parks and Recreation",
        "A Man on the Inside",
        "Brooklyn Nine-Nine",
      ],
      "Stars Ted Danson": [
        "The Good Place",
        "Cheers",
        "A Man on the Inside",
        "Damages",
      ],
    },
    hint: "Network, Creator, Star",
    title: "TV Shows",
  },
  {
    groups: {
      English: ["The Rolling Stones", "Led Zeppelin", "Oasis", "Joy Division"],
      "Founded in the 1960s": [
        "The Rolling Stones",
        "Led Zeppelin",
        "ZZ Top",
        "The Velvet Underground",
      ],
      "Toured in the 21st Century": [
        "The Rolling Stones",
        "ZZ Top",
        "Oasis",
        "Pearl Jam",
      ],
    },
    hint: "Nationality, Decade, Longevity",
    title: "Bands",
  },
  {
    groups: {
      "Los Angeles Lakers": [
        "Shaquille O'Neal",
        "Dwight Howard",
        "LeBron James",
        "Anthony Davis",
      ],
      "Orlando Magic": [
        "Shaquille O'Neal",
        "Dwight Howard",
        "Victor Oladipo",
        "Tracy McGrady",
      ],
      "Miami Heat": [
        "Shaquille O'Neal",
        "LeBron James",
        "Victor Oladipo",
        "Dwyane Wade",
      ],
    },
    hint: "Hollywood, Disney World, Vice City",
    title: "Basketball",
  },
];

let week16: Week = [
  {
    groups: {
      "Lived Before the Common Era": [
        "Alexander the Great",
        "Socrates",
        "Tutankhamun",
        "Confucius",
      ],
      European: [
        "Alexander the Great",
        "Socrates",
        "Charlemagne",
        "Marco Polo",
      ],
      "Ruled an Empire": [
        "Alexander the Great",
        "Tutankhamun",
        "Charlemagne",
        "Genghis Khan",
      ],
    },
    hint: "Era, Continent, Throne",
    title: "Historical Figures",
  },
  {
    groups: {
      "Appeared in Pirates of the Caribbean": [
        "Zoe Saldaña",
        "Stellan Skarsgård",
        "Johnny Depp",
        "Keira Knightley",
      ],
      "Appeared in the MCU": [
        "Zoe Saldaña",
        "Stellan Skarsgård",
        "Scarlett Johansson",
        "Florence Pugh",
      ],
      American: [
        "Zoe Saldaña",
        "Johnny Depp",
        "Scarlett Johansson",
        "Jennifer Aniston",
      ],
    },
    hint: "Black Pearl, Stan Lee, Nationality",
    title: "Actors",
  },
  {
    groups: {
      "Title Includes Bird(s)": [
        "Free Bird",
        "Three Little Birds",
        "Surfin' Bird",
        "I'm Like a Bird",
      ],
      "Released in the 1970s": [
        "Free Bird",
        "Three Little Birds",
        "Hotel California",
        "T.N.T.",
      ],
      American: [
        "Free Bird",
        "Surfin' Bird",
        "Hotel California",
        "Black Hole Sun",
      ],
    },
    hint: "Title, Decade, Nationality",
    title: "Songs",
  },
  {
    groups: {
      "No Legs": ["Rattlesnake", "Black Mamba", "Slug", "Electric Eel"],
      Venomous: ["Rattlesnake", "Black Mamba", "Black Widow", "Platypus"],
      "Found in North America": [
        "Rattlesnake",
        "Black Widow",
        "Slug",
        "Coyote",
      ],
    },
    hint: "Limbless, Toxic, Continent",
    title: "Animals",
  },
  {
    groups: {
      "Set in Outer Space": [
        "Alien",
        "The Martian",
        "2001: A Space Odyssey",
        "Avatar",
      ],
      "Directed by Ridley Scott": [
        "Alien",
        "The Martian",
        "Blade Runner",
        "Kingdom of Heaven",
      ],
      "Released in the 20th Century": [
        "Alien",
        "2001: A Space Odyssey",
        "Blade Runner",
        "The Terminator",
      ],
    },
    hint: "Setting, Director, Century",
    title: "Movies",
  },
  {
    groups: {
      "From Texas": [
        "Willie Nelson",
        "Buddy Holly",
        "George Strait",
        "Stevie Ray Vaughn",
      ],
      "Born in the 1930s": [
        "Willie Nelson",
        "Buddy Holly",
        "Frankie Valli",
        "Elvis Presley",
      ],
      "Active in the 21st Century": [
        "Willie Nelson",
        "George Strait",
        "Frankie Valli",
        "Mariah Carey",
      ],
    },
    hint: "State, Decade, Longevity",
    title: "Musicians",
  },
  {
    groups: {
      "Heisman Trophy Winner": [
        "Marcus Allen",
        "Roger Staubach",
        "Barry Sanders",
        "Herschel Walker",
      ],
      "Super Bowl MVP": [
        "Marcus Allen",
        "Roger Staubach",
        "Kurt Warner",
        "Cooper Kupp",
      ],
      "NFL MVP": ["Marcus Allen", "Barry Sanders", "Kurt Warner", "Matt Ryan"],
    },
    hint: "Awards (one college, two pro)",
    title: "Football",
  },
];

let week17: Week = [
  {
    groups: {
      "Touches the Atlantic Ocean": ["Colombia", "Canada", "Spain", "Portugal"],
      "Touches the Pacific Ocean": ["Colombia", "Canada", "Ecuador", "Japan"],
      "Spanish is Official Language": [
        "Colombia",
        "Spain",
        "Ecuador",
        "Paraguay",
      ],
    },
    hint: "Two Oceans, One Language",
    title: "Countries",
  },
  {
    groups: {
      "From Africa": [
        "Charlize Theron",
        "Lupita Nyong'o",
        "Sharlto Copley",
        "Djimon Hounsou",
      ],
      "Oscar Winner": [
        "Charlize Theron",
        "Lupita Nyong'o",
        "Octavia Spencer",
        "Mikey Madison",
      ],
      "Born in the 1970s": [
        "Charlize Theron",
        "Sharlto Copley",
        "Octavia Spencer",
        "Melissa McCarthy",
      ],
    },
    hint: "Continent, Academy, Decade",
    title: "Actors",
  },
  {
    groups: {
      "About New York": [
        "Empire State of Mind",
        "New York City Cops",
        "N.Y. State of Mind",
        "New York State of Mind",
      ],
      "Released in the 2000s": [
        "Empire State of Mind",
        "New York City Cops",
        "Homecoming",
        "No One",
      ],
      Rap: [
        "Empire State of Mind",
        "N.Y. State of Mind",
        "Homecoming",
        "California Love",
      ],
    },
    hint: "City, Decade, Genre",
    title: "Songs",
  },
  {
    groups: {
      "Has Shell": ["Tortoise", "Armadillo", "Sea Turtle", "Snail"],
      Quadruped: ["Tortoise", "Armadillo", "Elephant", "Mouse"],
      "50+ Year Natural Lifespan": [
        "Tortoise",
        "Sea Turtle",
        "Elephant",
        "Cockatoo",
      ],
    },
    hint: "Armor, Feet, Age",
    title: "Animals",
  },
  {
    groups: {
      British: ["Luther", "Sherlock", "Peaky Blinders", "Fleabag"],
      "Main Character is a Detective": [
        "Luther",
        "Sherlock",
        "Columbo",
        "True Detective",
      ],
      "Also Movie(s)": ["Luther", "Peaky Blinders", "Columbo", "M*A*S*H"],
    },
    hint: "Country, Investigation, Film",
    title: "TV Shows",
  },
  {
    groups: {
      "British Lead Vocalist(s)": ["Cream", "Muse", "The Beatles", "Blur"],
      "Three-Piece": [
        "Cream",
        "Muse",
        "The Jimi Hendrix Experience",
        "Blink-182",
      ],
      "Broke Up Before 1975": [
        "Cream",
        "The Beatles",
        "The Jimi Hendrix Experience",
        "Creedence Clearwater Revival",
      ],
    },
    hint: "Nationality, Members, Breakup",
    title: "Bands",
  },
  {
    groups: {
      "Won MVP": [
        "Clayton Kershaw",
        "Justin Verlander",
        "Bob Gibson",
        "Rollie Fingers",
      ],
      "Played in the 21st Century": [
        "Clayton Kershaw",
        "Justin Verlander",
        "Adam Wainwright",
        "Max Scherzer",
      ],
      "Played for Only One Team": [
        "Clayton Kershaw",
        "Bob Gibson",
        "Adam Wainwright",
        "Jim Palmer",
      ],
    },
    hint: "Award, Century, Lifer",
    title: "Baseball",
  },
];

let week18: Week = [
  {
    groups: {
      "Home to an MLB Team": ["Chicago", "Toronto", "Kansas City", "San Diego"],
      "Home to an NBA Team": [
        "Chicago",
        "Toronto",
        "Indianapolis",
        "San Antonio",
      ],
      "Home to an NFL Team": [
        "Chicago",
        "Kansas City",
        "Indianapolis",
        "Green Bay",
      ],
    },
    hint: "Baseball, Basketball, Football",
    title: "Cities",
  },
  {
    groups: {
      "Married an Athlete": [
        "Hailee Steinfeld",
        "Hilary Duff",
        "Kate Upton",
        "Eva Longoria",
      ],
      "Also a Recording Artist": [
        "Hailee Steinfeld",
        "Hilary Duff",
        "Ariana Grande",
        "Cher",
      ],
      "Born in the 1990s": [
        "Hailee Steinfeld",
        "Kate Upton",
        "Ariana Grande",
        "Saoirse Ronan",
      ],
    },
    hint: "Husband, Music, Decade",
    title: "Actors",
  },
  {
    groups: {
      "Released in the 1980s": [
        "Time After Time",
        "Let's Go Crazy",
        "Gloria",
        "Don't Stop Believin'",
      ],
      "Billboard Hot 100 #1 Hit": [
        "Time After Time",
        "Let's Go Crazy",
        "Good 4 U",
        "Humble",
      ],
      "Female Lead Vocalist": [
        "Time After Time",
        "Gloria",
        "Good 4 U",
        "You Oughta Know",
      ],
    },
    hint: "Decade, Chart, Gender",
    title: "Songs",
  },
  {
    groups: {
      "Looney Toons Character": [
        "Duck",
        "Frog",
        "Roadrunner",
        "Tasmanian Devil",
      ],
      "Lives in Water": ["Duck", "Frog", "Pelican", "Porpoise"],
      Bird: ["Duck", "Roadrunner", "Pelican", "Peregrine Falcon"],
    },
    hint: "Warner Bros, Habitat, Feathers",
    title: "Animals",
  },
  {
    groups: {
      "Features Talking Animals": [
        "Babe",
        "Dolittle",
        "The Lion King",
        "Bambi",
      ],
      "Live Action Film": ["Babe", "Dolittle", "The Piano", "Poor Things"],
      "Released in the 1990s": [
        "Babe",
        "The Lion King",
        "The Piano",
        "The Iron Giant",
      ],
    },
    hint: "Anthropomorphic, Animation, Decade",
    title: "Movies",
  },
  {
    groups: {
      "Has Famous Parent": [
        "Miley Cyrus",
        "Robin Thicke",
        "Liza Minelli",
        "Ziggy Marley",
      ],
      "Has Billboard Hot 100 #1 Hit(s)": [
        "Miley Cyrus",
        "Robin Thicke",
        "Dolly Parton",
        "Elton John",
      ],
      Female: ["Miley Cyrus", "Liza Minelli", "Dolly Parton", "Patti Smith"],
    },
    hint: "Lineage, Chart, Gender",
    title: "Musicians",
  },
  {
    groups: {
      "Won MVP": [
        "Giannis Antetokounmpo",
        "Steph Curry",
        "David Robinson",
        "Steve Nash",
      ],
      "Won Finals MVP": [
        "Giannis Antetokounmpo",
        "Steph Curry",
        "Kawhi Leonard",
        "Tony Parker",
      ],
      "Won DPOY": [
        "Giannis Antetokounmpo",
        "David Robinson",
        "Kawhi Leonard",
        "Draymond Green",
      ],
    },
    hint: "Three Awards",
    title: "Basketball",
  },
];

export let gameList = demo.concat(
  week1,
  week2,
  week3,
  week4,
  week5,
  week6,
  week7,
  week8,
  week9,
  week10,
  week11,
  week12,
  week13,
  week14,
  week15,
  week16,
  week17,
  week18,
);
