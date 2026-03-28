import { Toast } from "htm-elements";
import "htm-elements/styles.css";
import "style/global.css";
import { localAudio, localDark, themeChannel } from "./utils";

export let toast = new Toast();

let mediaQueryList = matchMedia("(prefers-reduced-motion: reduce)");
export let reduceMotion = mediaQueryList.matches;

let audio = localAudio.get();
let defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let dark = localDark.get() ?? defaultDark;
let initialized = false;
let midnightReloadTimer = 0;

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

let toggleContainer = document.createElement("div");
toggleContainer.classList.add("theme-toggle-container");
toggleContainer.append(darkToggle, audioToggle);

export function initUI() {
  if (!initialized) {
    initialized = true;

    mediaQueryList.addEventListener("change", (e) => {
      reduceMotion = e.matches;
    });

    themeChannel.listen((data) => {
      if (data == "audio") {
        audio = localAudio.get();
        applyAudio();
      } else if (data == "dark") {
        dark = localDark.get() ?? defaultDark;
        applyDark();
      }
    });

    scheduleMidnightReload();
  }

  let siteLogo = document.querySelector<HTMLElement>(".site-logo");
  if (siteLogo) {
    siteLogo.title = `Venzle v${import.meta.env.PACKAGE_VERSION}`;
  }

  let footer = document.querySelector("footer");
  if (footer && toggleContainer.parentElement != footer) {
    footer.prepend(toggleContainer);
  }

  applyAudio();
  applyDark();
  document.body.style.cssText = "";
}

export let rem = parseInt(getComputedStyle(document.documentElement).fontSize);

window.addEventListener("resize", () => {
  rem = parseInt(getComputedStyle(document.documentElement).fontSize);
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

function scheduleMidnightReload() {
  let now = new Date();
  clearTimeout(midnightReloadTimer);
  midnightReloadTimer = window.setTimeout(
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
