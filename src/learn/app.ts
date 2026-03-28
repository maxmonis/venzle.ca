import { sessionIndex } from "lib/utils";
import "./style.css";

export function mountLearnPage(main: HTMLElement) {
  let heading = document.createElement("h1");
  heading.textContent = "How to Play";

  let content = document.createElement("div");
  content.append(
    createParagraph(
      "The puzzle is made up of overlapping yellow, blue, and red circles. Your job is to place all seven items in the puzzle so that the four items in each circle have something in common which no other items do.",
    ),
    createParagraph("Here is an example:"),
    createExamplePuzzle(),
    createParagraph(
      "Orange is in the center because it alone is a fruit, color, and tree. Grape is a fruit and a color but not a tree, apple is a fruit and a tree but not a color, and pine is a tree and a color but not a fruit. The remaining three items each only fit in one category.",
    ),
    createParagraph(
      "In the example above, yellow is Fruit, blue is Color, and red is Tree, but the specific colors are arbitrary. All that matters is that one circle contains all four fruits, another contains all four colors, and the final one contains all four trees.",
    ),
    createParagraph(
      "You can make up to five guesses, and have two hints available in case you get stuck (plus a bonus hint once you've used the other two). A perfect game uses no hints and only one guess, but these puzzles are challenging and it's normal to need the hints and/or a search engine to help you. Good luck and have fun!",
    ),
  );

  // link to play the demo puzzle
  let demoLink = document.createElement("a");
  demoLink.textContent = "Play Demo Puzzle";
  demoLink.setAttribute("href", "/");
  demoLink.addEventListener("click", () => {
    window.gtag("event", "demo_puzzle_click");
    sessionIndex.set(0);
  });

  main.replaceChildren(heading, content, demoLink);

  return () => {};
}

function createParagraph(text: string) {
  let paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}

function createExamplePuzzle() {
  let container = document.createElement("div");
  container.classList.add("circle-container");

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

  container.append(
    ...circleClasses.map((circleClass) => {
      let circle = document.createElement("span");
      circle.classList.add("circle", circleClass);
      return circle;
    }),
    ...(
      [
        ["dropzone dropzone-a", "Watermelon"],
        ["dropzone dropzone-ab", "Grape"],
        ["dropzone dropzone-abc", "Orange"],
        ["dropzone dropzone-ac", "Apple"],
        ["dropzone dropzone-b", "Purple"],
        ["dropzone dropzone-bc", "Pine"],
        ["dropzone dropzone-c", "Cedar"],
        ["circle-title circle-title-a", "Fruit"],
        ["circle-title circle-title-b", "Color"],
        ["circle-title circle-title-c", "Tree"],
      ] as Array<[string, string]>
    ).map(([className, text]) => {
      let element = document.createElement("div");
      element.className = className;
      element.innerHTML = className.startsWith("dropzone")
        ? `<span>${text}</span>`
        : text;
      return element;
    }),
  );

  return container;
}
