import { initUI } from "lib/ui";
import { sessionIndex } from "lib/utils";
import "./style.css";

initUI();

let demoLink = document.createElement("a");
demoLink.textContent = "Play Demo Puzzle";
demoLink.setAttribute("href", "../");
demoLink.addEventListener("click", () => {
  window.gtag("event", "demo_puzzle_click");
  sessionIndex.set(0);
});

document.querySelector("main")!.append(demoLink);
