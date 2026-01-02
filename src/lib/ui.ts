import { Spinner, Toast } from "htm-elements";
import "htm-elements/styles.css";
import "style/global.css";
import { localAudio, localDark, themeChannel } from "./utils";

export let toast = new Toast();

document.querySelector<HTMLElement>(".site-logo")!.title =
  `Venzle v${import.meta.env.PACKAGE_VERSION}`;

let copyrightYear = document.querySelector(".copyright-year")!;
copyrightYear.textContent = copyrightYear.textContent!.replace(
  "2025",
  `2025-${new Date().getFullYear()}`,
);

let mediaQueryList = matchMedia("(prefers-reduced-motion: reduce)");
export let reduceMotion = mediaQueryList.matches;
mediaQueryList.addEventListener("change", (e) => {
  reduceMotion = e.matches;
});

let audio = localAudio.get();

let defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let dark = localDark.get() ?? defaultDark;

let audioToggle = document.createElement("button");
audioToggle.title = "Toggle audio";

let darkToggle = document.createElement("button");
darkToggle.title = "Toggle dark mode";

audioToggle.addEventListener("click", () => {
  audio = !audio;

  localAudio.set(audio);
  applyAudio();

  themeChannel.post("audio");
});

function applyAudio() {
  audioToggle.innerText = audio ? "🔊" : "🔇";
}

darkToggle.addEventListener("click", () => {
  dark = !dark;

  localDark.set(dark);
  applyDark();

  themeChannel.post("dark");
});

function applyDark() {
  document.body.classList.toggle("dark", dark);
  darkToggle.innerText = dark ? "🌛" : "🌞";
}

themeChannel.listen((data) => {
  if (data == "audio") {
    audio = localAudio.get();
    applyAudio();
  } else if (data == "dark") {
    dark = localDark.get() ?? defaultDark;
    applyDark();
  }
});

let toggleContainer = document.createElement("div");
toggleContainer.classList.add("theme-toggle-container");
toggleContainer.append(darkToggle, audioToggle);

document.querySelector("footer")!.prepend(toggleContainer);

export function initUI() {
  applyAudio();
  applyDark();
}

export let rem = parseInt(getComputedStyle(document.documentElement).fontSize);

window.addEventListener("resize", () => {
  rem = parseInt(getComputedStyle(document.documentElement).fontSize);
});

function domReady(callback: () => void) {
  document.readyState == "complete" || document.readyState == "interactive"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
}

domReady(() => {
  document.body.style.cssText = "";

  let spinner = new Spinner(40);

  for (let link of document.querySelectorAll("a")) {
    if (link.getAttribute("href")?.startsWith(".")) {
      link.addEventListener("click", () => {
        document.body.style.pointerEvents = "none";

        setTimeout(() => {
          document.body.innerHTML = "";
          document.body.append(spinner);
        }, 300);
      });
    }
  }
});

function reloadPage() {
  window.gtag("event", "reload_page");
  document.body.style.pointerEvents = "none";

  let seconds = 3;
  toast.show(`New puzzle available! Reloading in ${seconds}...`);

  let interval = setInterval(() => {
    seconds--;
    toast.textContent = `New puzzle available! Reloading in ${seconds}...`;
  }, 1200);

  setTimeout(() => {
    clearInterval(interval);
    location.reload();
  }, 3500);
}

scheduleMidnightReload();
function scheduleMidnightReload() {
  let now = new Date();
  setTimeout(
    reloadPage,
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0,
    ) - now.getTime(),
  );
}

declare global {
  interface Window {
    gtag: (
      command: "event",
      action: string,
      params?: {
        [key: string]: string | number | boolean | null | undefined;
      },
    ) => void;
  }
}
