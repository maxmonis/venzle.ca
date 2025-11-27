import type { Game, ImageFormat } from "lib/types";
import { initUI, toast } from "lib/ui";
import {
  imageFormats,
  localFormat,
  localGame,
  localName,
  todayIndex,
} from "lib/utils";
import "./style.css";

initUI();

let main = document.querySelector("main")!;

let storageGame = localGame.get();

if (
  !storageGame ||
  storageGame.status != "solved" ||
  storageGame.index != todayIndex
) {
  location.replace("../");
}

let game = storageGame!;

let emojiMap = {
  a: "🟨",
  ab: "🟩",
  abc: "🟫",
  ac: "🟧",
  b: "🟦",
  bc: "🟪",
  c: "🟥",
};
let emojiOrder = ["a", "ab", "b", "bc", "c", "ac", "abc"] as const;

let clipboardText = `${game.title}
${Object.values(game.hintsUsed).filter(Boolean).length}/3 hints used

${game.guesses
  .map((guess) => {
    return emojiOrder
      .map((key) => {
        return guess[key] == game.currentGuess[key] ? emojiMap[key] : "⬜";
      })
      .join("");
  })
  .join("\n")}`;

let textContainer = document.createElement("pre");
textContainer.textContent = clipboardText;

let copyButton = document.createElement("button");
copyButton.textContent = "Copy to Clipboard";
copyButton.addEventListener("click", () => {
  window.gtag("event", "copy_to_clipboard_click");
  navigator.clipboard.writeText(clipboardText);
  toast.show("Copied to clipboard 😃");
});

let certificateContainer = document.createElement("div");
certificateContainer.classList.add("certificate-container");

let certificateCanvasContainer = document.createElement("div");
certificateCanvasContainer.classList.add("certificate-canvas-container");

let certificateCanvas = document.createElement("canvas");
certificateCanvasContainer.append(certificateCanvas);

let certificateNameLabel = document.createElement("label");
certificateNameLabel.textContent = "Your name:";
let certificateNameInput = document.createElement("input");
certificateNameInput.value = localName.get() ?? "";
certificateNameInput.autofocus = !localName.get();
certificateNameInput.required = true;
certificateNameInput.maxLength = 27;

let nameInputTimeout: null | ReturnType<typeof setTimeout> = null;

certificateNameInput.addEventListener("input", () => {
  if (nameInputTimeout) clearTimeout(nameInputTimeout);
  nameInputTimeout = setTimeout(() => {
    let name = certificateNameInput.value.trim();

    if (name && name != localName.get()) {
      localName.set(name);
      appendCertificate(game);
    }
  }, 1000);
});

certificateNameLabel.append(certificateNameInput);

let downloadForm = document.createElement("form");
downloadForm.classList.add("certificate-form");

let downloadFormatLabel = document.createElement("label");
downloadFormatLabel.textContent = "Format:";

let downloadFormatSelect = document.createElement("select");
downloadFormatSelect.append(
  ...imageFormats.map((format) => {
    let option = document.createElement("option");
    option.value = format;
    option.selected = localFormat.get() == format;
    option.textContent = format.toUpperCase();
    return option;
  }),
);

downloadFormatSelect.addEventListener("change", () => {
  localFormat.set(downloadFormatSelect.value as ImageFormat);
});

downloadFormatLabel.append(downloadFormatSelect);

let downloadButton = document.createElement("button");
downloadButton.textContent = "Download";
downloadButton.classList.add("btn");

downloadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.gtag("event", "download_certificate_click");
  let format = downloadFormatSelect.value as ImageFormat;

  let a = document.createElement("a");
  a.href = certificateCanvas.toDataURL(`image/${format}`);
  a.download = `certificate.${format}`;
  a.click();
  a.remove();

  toast.show("Certificate downloaded 😁");
});

downloadForm.append(downloadFormatLabel, downloadButton);

certificateContainer.append(
  certificateNameLabel,
  certificateCanvasContainer,
  downloadForm,
);

async function appendCertificate(game: Game) {
  await ensureFontsReady();

  let height = 1600;
  let padding = 72;
  let width = 1200;

  let ctx = setupHiDPI(certificateCanvas, height, width);

  let hintsCount = Object.values(game.hintsUsed).filter(Boolean).length;
  let guessesUsed = game.guesses.length;
  let perfect = guessesUsed == 1 && hintsCount == 0;

  ctx.fillStyle = "#fafaf9";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = `700 64px "Georgia", "Times New Roman", serif`;
  ctx.fillText("Certificate of Achievement", width / 2, padding + 20);

  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width * 0.2, padding + 100);
  ctx.lineTo(width * 0.8, padding + 100);
  ctx.stroke();

  let centerX = width / 2;
  let cursorY = padding + 180;

  ctx.textAlign = "center";
  ctx.font = `italic 700 64px "Georgia", "Times New Roman", serif`;
  ctx.fillText(localName.get()?.trim() || "Anonymous", centerX, cursorY);
  cursorY += 96;

  ctx.font = `400 40px "Georgia", "Times New Roman", serif`;
  ctx.fillText("solved today's puzzle", centerX, cursorY);
  cursorY += 72;

  ctx.font = `italic 700 72px "Georgia", "Times New Roman", serif`;
  cursorY = wrapText(ctx, game.title, centerX, cursorY, 800, 80);
  cursorY += 96;

  ctx.font = `400 40px "Georgia", "Times New Roman", serif`;
  ctx.fillText(
    perfect
      ? "with a perfect game"
      : `using ${hintsCount} hint${hintsCount == 1 ? "" : "s"} and ${
          guessesUsed
        } guess${guessesUsed == 1 ? "" : "es"}`,
    centerX,
    cursorY,
  );
  cursorY += 300;

  drawBadge(ctx, centerX, cursorY, 110, perfect);
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.textAlign = "center";
  ctx.font = `900 120px "Georgia", "Times New Roman", serif`;
  ctx.fillStyle = "#111827";
  ctx.fillText("VENZLE", width / 2, cursorY + 36);
  ctx.restore();
  cursorY += 300;

  ctx.font = `400 96px "Georgia", "Times New Roman", serif`;
  ctx.fillText("venzle.ca", centerX, cursorY);

  let footerY = height - padding - 40;
  ctx.strokeStyle = "#a8a29d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.2, footerY);
  ctx.lineTo(width * 0.45, footerY);
  ctx.moveTo(width * 0.55, footerY);
  ctx.lineTo(width * 0.8, footerY);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.font = `500 20px "Georgia", "Times New Roman", serif`;
  ctx.fillStyle = "#44403c";
  ctx.fillText("Puzzle Creator", width * 0.325, footerY + 10);
  ctx.fillText("Date", width * 0.675, footerY + 10);

  ctx.font = `500 32px "Brush Script", "Bradley Hand", "Freestyle Script", serif`;
  ctx.fillText(game.creator, width * 0.325, footerY - 36);
  ctx.fillText(
    new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
    }).format(new Date()),
    width * 0.675,
    footerY - 36,
  );

  certificateCanvas.style.cssText = "";
  main.append(certificateContainer);
}

// Draws a green or gold badge with a check mark
function drawBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  perfect: boolean,
) {
  // circle
  ctx.save();

  let gradient = ctx.createRadialGradient(
    cx - r * 0.3,
    cy - r * 0.3,
    r * 0.3,
    cx,
    cy,
    r,
  );

  if (perfect) {
    gradient.addColorStop(0, "#fcd34d"); // amber-300
    gradient.addColorStop(1, "#f59e0b"); // amber-500
  } else {
    gradient.addColorStop(0, "#34d399"); // emerald-400
    gradient.addColorStop(1, "#059669"); // emerald-600
  }

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // subtle shine
  ctx.beginPath();
  ctx.ellipse(
    cx - r * 0.2,
    cy - r * 0.35,
    r * 0.55,
    r * 0.35,
    -0.35,
    0,
    Math.PI * 2,
  );
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.fill();

  // check mark
  ctx.lineWidth = Math.max(6, r * 0.18);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "white";

  ctx.beginPath();
  ctx.moveTo(cx - r * 0.45, cy + r * 0.05);
  ctx.lineTo(cx - r * 0.12, cy + r * 0.35);
  ctx.lineTo(cx + r * 0.48, cy - r * 0.35);
  ctx.stroke();

  ctx.restore();
}

// Utility: wait for fonts so text metrics are correct
async function ensureFontsReady() {
  if (!document.fonts.ready) {
    return;
  }

  try {
    await document.fonts.ready;
  } catch {
    console.error("Fonts not loaded");
  }
}

// Crisp drawing on HiDPI displays
function setupHiDPI(canvas: HTMLCanvasElement, height: number, width: number) {
  let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  let ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return ctx;
}

// Simple text wrapper
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  let words = text.split(/\s+/);
  let line = "";
  let newY = y;

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let test = line ? line + " " + word : word;

    if (!test) {
      return newY;
    }

    let { width } = ctx.measureText(test);

    if (width > maxWidth && i && word) {
      ctx.fillText(line, x, y);
      newY += lineHeight;
      line = word;
    } else {
      line = test;
    }
  }

  if (line) {
    ctx.fillText(line, x, y);
  }

  return newY;
}

main.append(textContainer, copyButton, certificateContainer);
appendCertificate(game);
