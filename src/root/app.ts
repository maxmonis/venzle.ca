import { createDraggable, initDraggables, initDropzones } from "game/dnd";
import {
  circleContainer,
  creatorText,
  gameControls,
  gameSummary,
  guessesText,
  hintsContainer,
  homeButton,
  main,
  pageSubtitle,
  pageTitle,
  previousGameSelect,
  resetButton,
  submitButtonContainer,
  winAudio,
} from "game/elements";
import { getCenter, initHints } from "game/hints";
import { gameList } from "game/list";
import { Confetti } from "htm-elements";
import type { Game } from "lib/types";
import { initUI, toast } from "lib/ui";
import {
  gameChannel,
  gameEvent,
  localAudio,
  localGames,
  localLoad,
  sessionIndex,
  todayIndex,
} from "lib/utils";
import "./style.css";

// if this is their first visit, show the welcome dialog
if (!localLoad.get()) {
  showWelcomeDialog();
}

// store the load time for future use
localLoad.set(new Date().getTime());

// clear the pathname (vercel redirects to the root route but leaves it intact)
if (location.pathname != "/") {
  location.replace(location.origin);
}

// if there's a session index they're playing a practice puzzle
let game = getGame(sessionIndex.get() ?? todayIndex);

initUI();
initGame();

/**
 * Initializes the active puzzle
 */
function initGame() {
  // scroll to the top
  window.scrollTo({
    behavior: "smooth",
    top: 0,
  });

  // initialize text
  pageTitle.textContent = getGameText(game.title, game.index);
  creatorText.textContent = `Created by ${game.creator}`;

  // initialize game state
  initDropzones(game);
  initDraggables(game);
  initHints(game);
  updateGameState();

  if (game.index == todayIndex) {
    // user is playing the daily puzzle

    // ensure there's no session index since it's not a practice puzzle
    sessionIndex.remove();

    // hide the "Back to Today's Puzzle" button
    homeButton.remove();
  } else {
    // user is playing a practice puzzle

    // store the index in session storage
    sessionIndex.set(game.index);

    // add the "Back to Today's Puzzle" button
    main.prepend(homeButton);
  }

  if (game.status != "pending") {
    // the game has already been either passed or failed
    checkGame(false);
  }
}

// populate the previous game select with available puzzles
let selectedGameIndex = sessionIndex.get() ?? todayIndex;

// we'll add ✅ or ❌ next to completed puzzles
let games = localGames.get() ?? [];

previousGameSelect.append(
  ...gameList
    .slice(0, todayIndex + 1)
    .map((game, index) => {
      let option = document.createElement("option");

      option.selected = index == selectedGameIndex;
      option.value = index.toString();

      option.textContent = getGameText(game.title, index);
      let status = games.find(
        (g) => g.index == index && g.status != "pending",
      )?.status;
      if (status) {
        option.textContent += status == "failed" ? " ❌" : " ✅";
      }

      return option;
    })
    .reverse(),
);

/**
 * Adds titles to a solved/failed puzzle
 */
function appendCircleTitles(titles: [string, string, string]) {
  let keys = ["a", "b", "c"];

  circleContainer.append(
    ...titles.map((text, i) => {
      let title = document.createElement("div");

      title.textContent = text;
      title.classList.add("circle-title", "circle-title-" + keys[i]);

      return title;
    }),
  );
}

/**
 * Checks whether a puzzle is solved, failed, or in progress
 * @param clicked whether the user has submitted this as a guess or we're just
 * checking a puzzle which they've now resumed or commenced
 */
function checkGame(clicked: boolean) {
  toast.hide();

  // get the most recent guess
  let { currentGuess } = game;
  let guessKeys: Record<"a" | "b" | "c", Array<keyof typeof currentGuess>> = {
    a: ["a", "ab", "abc", "ac"],
    b: ["ab", "abc", "b", "bc"],
    c: ["abc", "ac", "bc", "c"],
  };

  // check which circles (if any) are correct
  let groupEntries = Object.entries(game.groups);
  let [titleA] =
    groupEntries.find(([, values]) =>
      guessKeys.a.every((key) => values.includes(currentGuess[key])),
    ) ?? [];
  let [titleB] =
    groupEntries.find(([, values]) =>
      guessKeys.b.every((key) => values.includes(currentGuess[key])),
    ) ?? [];
  let [titleC] =
    groupEntries.find(([, values]) =>
      guessKeys.c.every((key) => values.includes(currentGuess[key])),
    ) ?? [];

  if (titleA && titleB && titleC) {
    // all three are correct, the puzzle has been solved

    // update text
    pageSubtitle.textContent = "You got it! Congratulations 🥳";
    creatorText.after(pageSubtitle);

    // fill in the titles
    appendCircleTitles([titleA, titleB, titleC]);

    // count the hints and guesses
    let hintCount = Object.values(game.hintsUsed).filter(Boolean).length;
    let guessCount = game.guesses.length;

    // display hint and guess info
    gameSummary.innerHTML =
      guessCount == 1 && hintCount == 0
        ? "First try with no hints, that's a perfect game 😎"
        : `You used ${hintCount} hint${
            hintCount == 1 ? "" : "s"
          } and ${guessCount} guess${guessCount == 1 ? "" : "es"} 😄`;

    gameSummary.innerHTML += "<div><a href='./share/'>Share Results</a></div>";

    // display the game summary
    circleContainer.after(gameSummary);

    // ensure they can no longer update the puzzle
    for (let dropzone of document.querySelectorAll(".dropzone")) {
      dropzone.removeAttribute("data-dnd-value");
      dropzone.removeAttribute("draggable");
    }
    gameControls.remove();
    submitButtonContainer.remove();
    resetButton.remove();
    hintsContainer.remove();

    // check whether they've just clicked submit and won
    if (clicked) {
      // log event(s)
      window.gtag("event", "puzzle_solve");
      if (game.index == todayIndex) {
        window.gtag("event", "daily_puzzle_solve");
      }

      // update and save
      game.status = "solved";
      saveGame();

      // show confetti
      new Confetti().start();

      // play audio if enabled
      if (localAudio.get()) {
        document.body.append(winAudio);
        winAudio.play();

        setTimeout(() => {
          winAudio.remove();
        }, 4000);
      }
    }

    return;
  }

  // figure out how many guesses (if any) remain
  let guessCount = game.guesses.length;
  let remainingGuesses = 5 - guessCount;

  if (remainingGuesses) {
    // this is still an active puzzle

    // log event
    if (clicked) {
      window.gtag("event", `incorrect_guess_${guessCount}`);
    }

    // generate remaining guess text
    let guessesTextContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`;

    // display text
    guessesText.textContent = guessesTextContent;

    if (clicked) {
      // the user submitted an incorrect answer, let's provide feedback

      // we'll inform the user if a circle or at least the center is correct
      let correctPart = "";

      if (getCenter(game) == game.currentGuess.abc) {
        // the center is correct, let's check if any entire circle is

        let allItems = Object.values(game.groups).flatMap((v) => v);

        // verify if any entire circle is correct by checking if the title
        // exists (meaning the correct four items are in the circle) and the
        // correct item is in the outermost section (which confirms the whole
        // circle is valid since we already know the center is also correct)
        if (
          titleA &&
          allItems.filter((item) => item == game.currentGuess.a).length == 1
        ) {
          correctPart = "🟡 yellow circle";
        } else if (
          titleB &&
          allItems.filter((item) => item == game.currentGuess.b).length == 1
        ) {
          correctPart = "🔵 blue circle";
        } else if (
          titleC &&
          allItems.filter((item) => item == game.currentGuess.c).length == 1
        ) {
          correctPart = "🔴 red circle";
        } else {
          // if no circle is correct, only the center is
          correctPart = "The center";
        }
      }

      // update the user on their progress with a toast
      toast.show(
        (correctPart
          ? `${correctPart} is correct ✅`
          : "That's not the answer but keep trying!") +
          "<br />You have " +
          guessesTextContent,
        {
          duration: correctPart ? 5000 : 3000,
        },
      );
    }
  } else {
    // they failed this puzzle

    // update text
    pageSubtitle.textContent = "Better luck next time!";
    creatorText.after(pageSubtitle);

    // ensure puzzle not actionable
    submitButtonContainer.remove();
    resetButton.remove();
    hintsContainer.remove();

    // fill in the correct answers for them
    let [titleA, valuesA] = groupEntries[0]!;
    let [titleB, valuesB] = groupEntries[1]!;
    let [titleC, valuesC] = groupEntries[2]!;
    let solution: typeof game.currentGuess = {
      a: valuesA.find((p) => !valuesB.includes(p) && !valuesC.includes(p))!,
      b: valuesB.find((p) => !valuesA.includes(p) && !valuesC.includes(p))!,
      c: valuesC.find((p) => !valuesA.includes(p) && !valuesB.includes(p))!,
      ab: valuesA.find((p) => valuesB.includes(p) && !valuesC.includes(p))!,
      ac: valuesA.find((p) => !valuesB.includes(p) && valuesC.includes(p))!,
      bc: valuesB.find((p) => !valuesA.includes(p) && valuesC.includes(p))!,
      abc: valuesA.find((p) => valuesB.includes(p) && valuesC.includes(p))!,
    };

    // display the answers within the puzzle
    for (let [key, value] of Object.entries(solution)) {
      let dropzone = main.querySelector(`#dropzone-${key}`);

      if (!dropzone) {
        continue;
      }

      dropzone.innerHTML = `<span>${value}</span>`;

      // disable dropzone interaction
      dropzone.removeAttribute("data-dnd-value");
      dropzone.removeAttribute("draggable");
    }

    // display the titles in the puzzle
    appendCircleTitles([titleA, titleB, titleC]);

    // add consolation message
    gameSummary.innerHTML = "This was a tough one and you're out of guesses 😔";
    circleContainer.after(gameSummary);

    if (clicked) {
      // they just used their final guess and it was wrong

      // log event(s)
      window.gtag("event", "puzzle_fail");
      if (game.index == todayIndex) {
        window.gtag("event", "daily_puzzle_fail");
      }

      // update and save
      game.status = "failed";
      saveGame();
    }
  }
}

/**
 * Clears the puzzle state, removing all items they've dragged into it
 */
function clearPuzzle() {
  // remove all items from the active guess
  for (let key in game.currentGuess) {
    game.currentGuess[key as keyof typeof game.currentGuess] = "";
  }

  // display the initial state
  for (let dropzone of document.querySelectorAll<HTMLElement>(".dropzone")) {
    let dropzoneText = dropzone.textContent;
    let dropzoneValue = dropzone.getAttribute("data-dnd-value");

    if (!dropzoneText || !dropzoneValue) {
      continue;
    }

    // reset the dropzone
    dropzone.innerHTML = "";
    dropzone.removeAttribute("data-dnd-value");
    dropzone.removeAttribute("draggable");

    // add it to the initial area
    createDraggable(dropzoneText, dropzoneValue);
  }

  updateGameState();
}

/**
 * Loads a game using its index, checking for an in-progress state in local
 * storage if it's the daily puzzle and session storage if it's not
 */
function getGame(index: number): Game {
  if (index == todayIndex) {
    // we're loading the daily puzzle

    // log event(s)
    window.gtag("event", "puzzle_resume");
    if (index == todayIndex) {
      window.gtag("event", "daily_puzzle_resume");
    }
  }

  // check if they've played this puzzle
  let game = localGames.get()?.find((g) => g.index == index);
  if (game) {
    return game;
  }

  if (!gameList[index]) {
    // something's gone wrong and the index is out of range
    window.gtag("event", "invalid_puzzle_index");
    index = gameList.length - 1;
  }

  // log event(s)
  window.gtag("event", "puzzle_start");
  if (index == todayIndex) {
    window.gtag("event", "daily_puzzle_start");
  }

  // get the game using its index
  let {
    // not all puzzles will have a creator
    creator = "Max Monis",
    ...newGame
  } = gameList[index]!;

  // return the new game with initial state
  return {
    ...newGame,
    creator,
    currentGuess: {
      a: "",
      ab: "",
      abc: "",
      ac: "",
      b: "",
      bc: "",
      c: "",
    },
    guesses: [],
    hintsUsed: {
      a: false,
      b: false,
      c: false,
    },
    index,
    status: "pending",
  };
}

/**
 * Generates text for the puzzle select
 */
function getGameText(title: string, index: number) {
  return `${
    index == 0
      ? // the first puzzle is the demo
        "How to Play"
      : // otherwise we'll just show its number
        `Puzzle ${index}`
  }: ${title}`;
}

/**
 * Clears the game state, resetting the puzzle
 */
function resetGame() {
  pageSubtitle.remove();
  gameSummary.remove();

  for (let element of document.querySelectorAll(
    "[draggable=true],.dropzone,.circle-title",
  )) {
    element.remove();
  }

  hintsContainer.innerHTML = "";
  circleContainer.after(gameControls, hintsContainer);
}

/**
 * Saves to local storage
 */
function saveGame() {
  // ensure there's a timestamp if the game is not pending
  if (game.status != "pending" && !game.timestamp) {
    game.timestamp = new Date().getTime();
  }

  // update it if it's in local storage already
  let games = localGames.get() ?? [];
  let mapped = false;
  games = games.map((g) => {
    if (g.index == game.index) {
      mapped = true;
      return game;
    }

    return g;
  });

  // otherwise add it to local storage
  if (!mapped) {
    games.push(game);
  }

  // save state
  localGames.set(games);
}

/**
 * Shows a welcome dialog which prompts the user to learn to play
 */
function showWelcomeDialog() {
  let dialog = document.createElement("dialog");
  let content = document.createElement("div");

  let heading = document.createElement("h1");
  heading.textContent = "Welcome to Venzle!";

  let text = document.createElement("p");
  text.textContent = "Get started by learning to play";

  let ctaContainer = document.createElement("div");
  ctaContainer.classList.add("dialog-cta-container");

  let button = document.createElement("button");
  button.textContent = "Skip";
  button.classList.add("red-text");

  let link = document.createElement("a");
  link.textContent = "How to Play";
  link.autofocus = true;
  link.setAttribute("href", "./learn/");

  // close and remove the dialog when CTA clicked
  for (let element of [button, link]) {
    element.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });
  }

  ctaContainer.append(button, link);
  content.append(heading, text, ctaContainer);
  dialog.append(content);
  document.body.append(dialog);

  dialog.showModal();
  dialog.addEventListener("keydown", (e) => {
    // prevent closing when the user hits escape key
    if (e.key == "Escape") {
      e.preventDefault();
    }
  });
}

/**
 * Updates the UI to reflect the state of the puzzle
 */
function updateGameState() {
  // update the dropzones
  for (let dropzone of document.querySelectorAll(".dropzone")) {
    let id = dropzone.id.split("-")[1] as keyof typeof game.currentGuess;

    if (id in game.currentGuess) {
      game.currentGuess[id] = dropzone.getAttribute("data-dnd-value") ?? "";
    }
  }

  if (Object.values(game.currentGuess).every(Boolean)) {
    // they've filled out the entire puzzle

    // there are no more draggables, they're all in the puzzle
    gameControls.remove();

    // generate and show the guesses text
    let remainingGuesses = 5 - game.guesses.length;
    guessesText.textContent = `${remainingGuesses} guess${
      remainingGuesses == 1 ? "" : "es"
    } remaining`;

    // ensure the submit button is in the UI
    if (!main.contains(submitButtonContainer)) {
      circleContainer.after(submitButtonContainer);
    }
  } else {
    // they have NOT filled out the entire puzzle

    // ensure the draggables are displayed
    if (!main.contains(gameControls)) {
      circleContainer.after(gameControls);
    }

    // they can't submit since it's incomplete
    submitButtonContainer.remove();
  }

  if (!Object.values(game.currentGuess).some(Boolean)) {
    // nothing to reset if no items in puzzle
    resetButton.remove();
  } else if (!main.contains(resetButton)) {
    // otherwise show the reset button
    gameControls.after(resetButton);
  }

  // save and update
  saveGame();
  gameChannel.post(game);
}

// listen for broadcasts in case the user has multiple tabs open
gameChannel.listen((data) => {
  if (JSON.stringify(data) == JSON.stringify(game)) {
    // no diff, we're good
    return;
  }

  // clear UI and show the broadcasted game
  resetGame();
  game = data;
  initGame();
});

// listen for events
gameEvent.listen((data) => {
  if (data == "update") {
    updateGameState();
  } else if (data == "save") {
    saveGame();
  } else if (data == "reset") {
    clearPuzzle();
  } else if (data == "submit") {
    // show a toast and prevent submission if the guess is a dupe
    if (
      game.guesses.some(
        (guess) => JSON.stringify(guess) == JSON.stringify(game.currentGuess),
      )
    ) {
      toast.show("You already guessed that 😅<br />Please try again");
      return;
    }

    // add the new guess
    game.guesses.push({
      ...game.currentGuess,
    });

    // save, check, and broadcast state
    saveGame();
    checkGame(true);
    gameChannel.post(game);
  } else {
    // data is the index of a newly selected game
    resetGame();
    game = getGame(data);
    initGame();
  }
});
