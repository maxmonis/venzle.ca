import { chevronLeft } from "lib/svg";
import { gameEvent } from "lib/utils";

export interface GameElements {
  circleContainer: HTMLDivElement;
  creatorText: HTMLParagraphElement;
  draggables: HTMLDivElement;
  gameControls: HTMLDivElement;
  gameSummary: HTMLParagraphElement;
  guessesText: HTMLParagraphElement;
  hintsContainer: HTMLDivElement;
  homeButton: HTMLButtonElement;
  main: HTMLElement;
  pageSubtitle: HTMLHeadingElement;
  pageTitle: HTMLHeadingElement;
  previousGameContainer: HTMLDivElement;
  previousGameSelect: HTMLSelectElement;
  resetButton: HTMLButtonElement;
  submitButtonContainer: HTMLDivElement;
  winAudio: HTMLAudioElement;
}

let circleClasses = [
  "circle-a",
  "circle-b",
  "circle-c",
  "circle-b",
  "circle-c",
  "circle-a",
  "circle-c",
  "circle-b",
  "circle-a",
  "circle-b",
  "circle-a",
  "circle-c",
];

export function createGameElements(main: HTMLElement): GameElements {
  let circleContainer = document.createElement("div");
  circleContainer.classList.add("circle-container");
  circleContainer.append(
    ...circleClasses.map((circleClass) => {
      let circle = document.createElement("span");
      circle.classList.add("circle", circleClass);
      return circle;
    }),
  );

  let creatorText = document.createElement("p");
  creatorText.classList.add("creator-text");

  let draggables = document.createElement("div");
  draggables.classList.add("draggables");

  let gameControls = document.createElement("div");
  gameControls.classList.add("game-controls");

  let instructionText = document.createElement("p");
  instructionText.textContent =
    "Drag and drop all seven items into the puzzle.";
  gameControls.append(instructionText, draggables);

  let gameSummary = document.createElement("p");
  gameSummary.classList.add("game-summary");

  let guessesText = document.createElement("p");
  guessesText.classList.add("guesses-text");

  let hintsContainer = document.createElement("div");
  hintsContainer.classList.add("hints-container");

  let homeButton = document.createElement("button");
  homeButton.classList.add("home-button");
  homeButton.append(chevronLeft, "Back to Today's Puzzle");
  homeButton.addEventListener("click", () => {
    window.gtag("event", "home_button_click");

    let [todayOption, ...options] =
      previousGameSelect.querySelectorAll("option");
    todayOption!.selected = true;

    for (let option of options) {
      option.selected = false;
    }

    gameEvent.post(Number(todayOption!.value));
  });

  let pageSubtitle = document.createElement("h2");
  let pageTitle = document.createElement("h1");

  let previousGameContainer = document.createElement("div");
  previousGameContainer.classList.add("previous-game-container");

  let previousGameLabel = document.createElement("label");
  previousGameLabel.textContent = "Available Puzzles:";

  let previousGameSelect = document.createElement("select");
  previousGameSelect.addEventListener("change", () => {
    window.gtag("event", "previous_game_select");
    gameEvent.post(Number(previousGameSelect.value));
  });

  previousGameLabel.append(previousGameSelect);
  previousGameContainer.append(previousGameLabel);

  let resetButton = document.createElement("button");
  resetButton.classList.add("reset-button");
  resetButton.textContent = "Reset Puzzle";
  resetButton.addEventListener("click", () => {
    window.gtag("event", "reset_puzzle_click");
    gameEvent.post("reset");
  });

  let submitButton = document.createElement("button");
  submitButton.classList.add("btn");
  submitButton.textContent = "Submit Solution";
  submitButton.addEventListener("click", () => {
    window.gtag("event", "submit_solution_click");
    gameEvent.post("submit");
  });

  let submitButtonContainer = document.createElement("div");
  submitButtonContainer.append(guessesText, submitButton);

  let winAudio = document.createElement("audio");
  winAudio.setAttribute("type", "audio/mpeg");
  winAudio.volume = 0.1;
  winAudio.preload = "auto";
  winAudio.src = "/audio/win.mp3";

  main.replaceChildren(
    pageTitle,
    creatorText,
    circleContainer,
    gameControls,
    hintsContainer,
    previousGameContainer,
  );

  return {
    circleContainer,
    creatorText,
    draggables,
    gameControls,
    gameSummary,
    guessesText,
    hintsContainer,
    homeButton,
    main,
    pageSubtitle,
    pageTitle,
    previousGameContainer,
    previousGameSelect,
    resetButton,
    submitButtonContainer,
    winAudio,
  };
}
