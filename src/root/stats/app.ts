import { initUI, reduceMotion } from "lib/ui";
import { localResults, todayIndex } from "lib/utils";
import "./style.css";

initUI();

// -------------------- Stat Calculation --------------------

let main = document.querySelector("main")!;

// get existing results from local storage
let results = localResults.get() ?? [];

// create a map with each result's index
let map = new Map<number, (typeof results)[number]>();
for (let r of results) {
  map.set(r.index, r);
}

let activePerfectStreak = 0;
let activePlayedStreak = 0;
let activeSolvedStreak = 0;

let longestPerfectStreak = 0;
let longestPlayedStreak = 0;
let longestSolvedStreak = 0;

let guessDistribution: Record<number, number> = {};
let hintDistribution: Record<number, number> = {};

let perfectGames = 0;
let totalGuesses = 0;
let totalHints = 0;
let totalPlayed = results.length;
let totalSolved = 0;

let lastIndex = -1;

for (let { guesses, hints, index, status } of [...results].sort(
  (a, b) => a.index - b.index,
)) {
  // update total guess and hint sums
  totalGuesses += guesses;
  totalHints += hints;

  // update guess distribution
  guessDistribution[guesses] ??= 0;
  guessDistribution[guesses]++;

  // update hint distribution
  hintDistribution[hints] ??= 0;
  hintDistribution[hints]++;

  // check if any active streaks need to be reset
  if (index != lastIndex + 1) {
    activePerfectStreak = 0;
    activePlayedStreak = 0;
    activeSolvedStreak = 0;
  }

  // increment played streak
  activePlayedStreak++;

  // update longest played streak if surpassed
  longestPlayedStreak = Math.max(longestPlayedStreak, activePlayedStreak);

  if (status == "solved") {
    // update solved streak and total
    activeSolvedStreak++;
    totalSolved++;

    // update longest solved streak if surpassed
    longestSolvedStreak = Math.max(longestSolvedStreak, activeSolvedStreak);

    if (guesses == 1 && hints == 0) {
      // update perfect streak and total
      perfectGames++;
      activePerfectStreak++;

      // update longest perfect streak if surpassed
      longestPerfectStreak = Math.max(
        activePerfectStreak,
        longestPerfectStreak,
      );
    } else {
      // reset perfect streak
      activePerfectStreak = 0;
    }
  } else {
    // reset solved and perfect streaks
    activeSolvedStreak = 0;
    activePerfectStreak = 0;
  }

  // update index
  lastIndex = index;
}

// reset streaks, these will now be used for current streaks instead of longest
activePerfectStreak = 0;
activePlayedStreak = 0;
activeSolvedStreak = 0;

// check if yesterday's puzzle is in the results
if (map.has(todayIndex - 1)) {
  let i = todayIndex - 1;

  // calculate the current played streak
  while (map.has(i)) {
    activePlayedStreak++;
    i--;
  }

  // calculate the current solved streak
  i = todayIndex - 1;
  while (map.has(i)) {
    if (map.get(i)!.status == "solved") {
      activeSolvedStreak++;
    } else {
      break;
    }

    i--;
  }

  // calculate the current perfect streak
  i = todayIndex - 1;
  while (map.has(i)) {
    let { guesses, hints, status } = map.get(i)!;
    if (status == "solved" && guesses == 1 && hints == 0) {
      activePerfectStreak++;
    } else {
      break;
    }

    i--;
  }
}

// update the stats if today's puzzle has been submitted as well
let todayResult = map.get(todayIndex);
if (todayResult) {
  activePlayedStreak++;

  if (todayResult.status == "solved") {
    activeSolvedStreak++;

    if (todayResult.guesses == 1 && todayResult.hints == 0) {
      activePerfectStreak++;
    } else {
      activePerfectStreak = 0;
    }
  } else {
    activeSolvedStreak = 0;
    activePerfectStreak = 0;
  }
}

// final stats
let stats = {
  averageGuesses: totalPlayed ? totalGuesses / totalPlayed : 0,
  averageHints: totalPlayed ? totalHints / totalPlayed : 0,

  activePerfectStreak,
  activePlayedStreak,
  activeSolvedStreak,

  guessDistribution,
  hintDistribution,

  longestPerfectStreak,
  longestPlayedStreak,
  longestSolvedStreak,

  perfectGames,

  playedToday: Boolean(todayResult),

  successRate: totalPlayed ? (totalSolved / totalPlayed) * 100 : 0,

  totalPlayed,
  totalSolved,
};

// -------------------- Stat Display --------------------

let totalsList = [
  {
    value: stats.totalPlayed,
    text: "Played",
  },
  {
    value: stats.totalSolved,
    text: "Solved",
  },
  {
    value: stats.perfectGames,
    text: "Perfect",
  },
  {
    value: stats.successRate,
    text: "Win Rate",
    isPercentage: true,
  },
  {
    value: stats.averageGuesses,
    text: "Avg Guesses",
    decimalPlaces: 1,
  },
  {
    value: stats.averageHints,
    text: "Avg Hints",
    decimalPlaces: 1,
  },
];

let streaksList = [
  {
    value: stats.activePlayedStreak,
    text: "Active Played",
  },
  {
    value: stats.activeSolvedStreak,
    text: "Active Solved",
  },
  {
    value: stats.activePerfectStreak,
    text: "Active Perfect",
  },
  {
    value: stats.longestPlayedStreak,
    text: "Best Played",
  },
  {
    value: stats.longestSolvedStreak,
    text: "Best Solved",
  },
  {
    value: stats.longestPerfectStreak,
    text: "Best Perfect",
  },
];

let countsSection = document.createElement("section");
let totalsContainer = document.createElement("div");

let totalsUl = document.createElement("ul");
totalsUl.classList.add("stats-summary");

let totalsHeading = document.createElement("h3");
totalsHeading.textContent = "Summary";

totalsUl.append(
  ...totalsList.map(({ text }) => {
    let li = document.createElement("li");
    let strong = document.createElement("strong");
    let small = document.createElement("small");

    strong.textContent = "0";
    small.textContent = text;

    li.append(strong, small);
    return li;
  }),
);

totalsContainer.append(totalsHeading, totalsUl);

let streaksContainer = document.createElement("div");

let streaksHeading = document.createElement("h3");
streaksHeading.textContent = "Streaks";

let streaksUl = document.createElement("ul");
streaksUl.classList.add("stats-summary");

streaksUl.append(
  ...streaksList.map(({ text }) => {
    let li = document.createElement("li");
    let strong = document.createElement("strong");
    let small = document.createElement("small");

    strong.textContent = "0";
    small.textContent = text;

    li.append(strong, small);
    return li;
  }),
);
streaksContainer.append(streaksHeading, streaksUl);

countsSection.append(totalsContainer, streaksContainer);

let graphContainer = document.createElement("section");

// max count is used to ensure a consistent scale in the hint and guess
// distribution bar graphs which fits inside the available space
let maxCount = Math.max(
  Math.max(
    ...Object.values(stats.hintDistribution),
    ...Object.values(stats.guessDistribution),
    1,
  ),
);

let guessDistributionGraph = document.createElement("div");
guessDistributionGraph.classList.add("distribution");

let guessHeading = document.createElement("h3");
guessHeading.textContent = "Guess Distribution";

guessDistributionGraph.append(guessHeading);

// init at zero since we'll animate in the numbers
for (let i = 1; i <= 5; i++) {
  let bar = document.createElement("div");
  bar.classList.add("bar");

  let label = document.createElement("span");
  label.textContent = i.toString();

  let barFill = document.createElement("div");
  barFill.classList.add("bar-fill");
  barFill.style.width = "0%";
  barFill.textContent = "0";

  bar.append(label, barFill);
  guessDistributionGraph.append(bar);
}

graphContainer.append(guessDistributionGraph);

let hintDistributionGraph = document.createElement("div");
hintDistributionGraph.classList.add("distribution");

let hintHeading = document.createElement("h3");
hintHeading.textContent = "Hint Distribution";

hintDistributionGraph.append(hintHeading);

// init at zero since we'll animate in the numbers
for (let i = 0; i <= 3; i++) {
  let bar = document.createElement("div");
  bar.classList.add("bar");

  let label = document.createElement("span");
  label.textContent = i.toString();

  let barFill = document.createElement("div");
  barFill.classList.add("bar-fill");
  barFill.style.width = "0%";
  barFill.textContent = "0";

  bar.append(label, barFill);
  hintDistributionGraph.append(bar);
}
graphContainer.append(hintDistributionGraph);

main.append(countsSection, graphContainer);

// -------------------- Stat Animation --------------------

/**
 * Animates the bars of the bar graph from left to right, also showing a
 * rapidly increasing number at the end from 0 to the end value
 */
function animateNumber(
  element: HTMLElement,
  endValue: number,
  duration: number,
  isPercentage = false,
  decimalPlaces = 0,
) {
  if (reduceMotion) {
    duration = 1;
  }

  let startTime = -1;

  function step(timestamp: number) {
    if (startTime == -1) {
      startTime = timestamp;
    }

    let progress = Math.min((timestamp - startTime) / duration, 1);
    let currentValue = progress * endValue;

    element.textContent =
      (decimalPlaces
        ? currentValue.toFixed(decimalPlaces)
        : Math.floor(currentValue)) + (isPercentage ? "%" : "");

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

totalsUl.querySelectorAll("li").forEach((li, index) => {
  let strong = li.querySelector("strong")!;

  let { decimalPlaces, isPercentage, value } = totalsList[index]!;

  animateNumber(strong, value, 1000, isPercentage, decimalPlaces);
});

streaksUl.querySelectorAll("li").forEach((li, index) => {
  let strong = li.querySelector("strong")!;

  let { value } = streaksList[index]!;

  animateNumber(strong, value, 1000);
});

guessDistributionGraph
  .querySelectorAll<HTMLElement>(".bar")
  .forEach((bar, i) => {
    let barFill = bar.querySelector<HTMLElement>(".bar-fill")!;
    let count = stats.guessDistribution[i + 1] ?? 0;

    setTimeout(
      () => {
        barFill.style.width = `calc(${(count / maxCount) * 100}% - ${(count / maxCount) * 1.25}rem)`;
        animateNumber(barFill, count, 1000);
      },
      reduceMotion ? 0 : 300,
    );
  });

hintDistributionGraph
  .querySelectorAll<HTMLElement>(".bar")
  .forEach((bar, i) => {
    let barFill = bar.querySelector<HTMLElement>(".bar-fill")!;
    let count = stats.hintDistribution[i] ?? 0;

    setTimeout(
      () => {
        barFill.style.width = `calc(${(count / maxCount) * 100}% - ${(count / maxCount) * 1.25}rem)`;
        animateNumber(barFill, count, 1000);
      },
      reduceMotion ? 0 : 300,
    );
  });
