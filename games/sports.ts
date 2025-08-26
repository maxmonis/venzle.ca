import type { GameListItem } from "../src/lib/types"

export let gameList: Array<GameListItem> = [
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
    title: "Quarterbacks"
  },
  {
    groups: {
      "Won Ballon d'Or": [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Diego Maradona",
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
        "Diego Maradona",
        "Andrés Iniesta",
        "Pelé"
      ]
    },
    hint: "MVP, Club, Country",
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
