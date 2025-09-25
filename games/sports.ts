import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
  {
    groups: {
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"]
    },
    hint: "Throw, Helmet, Clock",
    published: true,
    title: "Sports"
  },
  {
    creator: "Evan Williams",
    groups: {
      "Drafted Out of High School": [
        "Dwight Howard",
        "LeBron James",
        "Kevin Garnett",
        "Kobe Bryant"
      ],
      "Drafted First Overall": [
        "Dwight Howard",
        "LeBron James",
        "Hakeem Olajuwon",
        "Shaquille O'Neal"
      ],
      "Won Defensive Player of the Year": [
        "Dwight Howard",
        "Kevin Garnett",
        "Hakeem Olajuwon",
        "Ben Wallace"
      ]
    },
    hint: "School, Draft, Defense",
    published: true,
    title: "Basketball"
  },
  {
    groups: {
      "Track & Field Athlete": [
        "Usain Bolt",
        "Merlene Ottey",
        "Carl Lewis",
        "Steve Prefontaine"
      ],
      "Not American": [
        "Usain Bolt",
        "Merlene Ottey",
        "Nadia Comăneci",
        "Elvis Stojko"
      ],
      "Olympic Gold Medalist": [
        "Usain Bolt",
        "Carl Lewis",
        "Michael Phelps",
        "Nadia Comăneci"
      ]
    },
    hint: "Sport, Nationality, Medal",
    published: true,
    title: "Olympians"
  },
  {
    groups: {
      "3000 Career Hits": [
        "Miguel Cabrera",
        "Albert Pujols",
        "Ichiro Suzuki",
        "Cal Ripken, Jr."
      ],
      "500 Career Homeruns": [
        "Miguel Cabrera",
        "Albert Pujols",
        "Ted Williams",
        "Mickey Mantle"
      ],
      ".300 Career Batting Average": [
        "Miguel Cabrera",
        "Ichiro Suzuki",
        "Ted Williams",
        "Vladimir Guerrero"
      ]
    },
    hint: "Hits, Homers, Average",
    published: true,
    title: "Baseball"
  },
  {
    groups: {
      "60,000 Passing Yards": [
        "Peyton Manning",
        "Brett Favre",
        "Drew Brees",
        "Ben Roethlisberger"
      ],
      "Won MVP": ["Peyton Manning", "Brett Favre", "Joe Montana", "Cam Newton"],
      "Won Super Bowl MVP": [
        "Peyton Manning",
        "Drew Brees",
        "Joe Montana",
        "Eli Manning"
      ]
    },
    hint: "Yards, MVP, SB MVP",
    published: true,
    title: "Quarterbacks"
  },
  {
    groups: {
      "Won Ballon d'Or": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Fabio Cannavaro",
        "Johan Cruyff"
      ],
      "Won Champions League": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Andrés Iniesta",
        "Paolo Maldini"
      ],
      "Won World Cup": [
        "Lionel Messi",
        "Fabio Cannavaro",
        "Andrés Iniesta",
        "Pelé"
      ]
    },
    hint: "MVP, Club, Country",
    published: false,
    title: "Soccer"
  },
  {
    groups: {
      "Judged Event": [
        "Snowboard Halfpipe",
        "Skateboarding Park",
        "Figure Skating",
        "Diving"
      ],
      "Uses a Board": [
        "Snowboard Halfpipe",
        "Skateboarding Park",
        "Snowboard Cross",
        "Windsurfing"
      ],
      "Winter Sport": [
        "Snowboard Halfpipe",
        "Snowboard Cross",
        "Figure Skating",
        "Speed Skating"
      ]
    },
    hint: "Scoring, Board, Season",
    published: false,
    title: "Olympics"
  },
  {
    groups: {
      "Won MVP": ["Larry Bird", "Kevin Garnett", "Tim Duncan", "Derrick Rose"],
      "Won Finals MVP": [
        "Larry Bird",
        "Paul Pierce",
        "Tim Duncan",
        "Andre Iguodala"
      ],
      "Played for Boston Celtics": [
        "Larry Bird",
        "Kevin Garnett",
        "Paul Pierce",
        "Ray Allen"
      ]
    },
    hint: "Russell Trophy, Jordan Trophy, Red Auerbach",
    published: false,
    title: "Basketball 2"
  }
]

//   {
//   groups: {
//   "Net at Each End": ["Soccer", "Ringette", "Lacrosse", "Ice Hockey"],
//   "Played on Ice": ["Figure Skating", "Ringette", "Ice Cross Downhill", "Ice Hockey"],
//   "Allows Body Checking": ["Rugby", "Ice Cross Downhill", "Lacrosse", "Ice Hockey"]
//   },
//   hint: "Goals, Ice, Contact",
//   title: "Sports"
//   },
