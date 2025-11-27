import { rem } from "./ui";

export let chevronLeft = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg",
);
chevronLeft.setAttribute("viewBox", "0 0 24 24");

let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M15 6L9 12L15 18");
path.setAttribute("fill", "none");
path.setAttribute("stroke-linecap", "round");
path.setAttribute("stroke-linejoin", "round");
path.setAttribute("stroke-width", "2");
path.setAttribute("stroke", "currentColor");

chevronLeft.appendChild(path);

// when the value of one rem changes, update the size accordingly
handleResize();
window.addEventListener("resize", handleResize);

function handleResize() {
  let size = `${rem == 16 ? 24 : (rem / 16) * 24}px`;

  chevronLeft.setAttribute("height", size);
  chevronLeft.setAttribute("width", size);
}
