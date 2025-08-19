import type { Game } from "../lib/types"
import { localSettings } from "../lib/utils"
import {
  certificateCanvas,
  certificateCanvasContainer,
  certificateDownloadButton,
  gameSummary
} from "../ui/elements"

export async function appendCertificate(game: Game) {
  await ensureFontsReady()

  let height = 1600
  let padding = 72
  let width = 1200

  let ctx = setupHiDPI(certificateCanvas, height, width)

  let hintsCount = Object.values(game.hintsUsed).filter(Boolean).length
  let guessesUsed = game.guesses.length
  let perfect = guessesUsed == 1 && hintsCount == 0

  ctx.fillStyle = "#fafaf9"
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = "#111827"
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  ctx.font = `700 64px "Georgia", "Times New Roman", serif`
  ctx.fillText("Certificate of Achievement", width / 2, padding + 20)

  ctx.strokeStyle = "#cbd5e1"
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(width * 0.2, padding + 100)
  ctx.lineTo(width * 0.8, padding + 100)
  ctx.stroke()

  let centerX = width / 2
  let cursorY = padding + 180

  ctx.textAlign = "center"
  ctx.font = `400 40px "Georgia", "Times New Roman", serif`
  ctx.fillText("This officially certifies that the honorable", centerX, cursorY)
  cursorY += 72

  ctx.font = `italic 700 64px "Georgia", "Times New Roman", serif`
  ctx.fillText(
    localSettings.get()?.name.trim() || "Your Name Here",
    centerX,
    cursorY
  )
  cursorY += 96

  ctx.font = `400 40px "Georgia", "Times New Roman", serif`
  ctx.fillText(
    perfect
      ? "has achieved a perfect game on"
      : `has used ${hintsCount} hint${hintsCount == 1 ? "" : "s"} and ${
          guessesUsed
        } guess${guessesUsed == 1 ? "" : "es"} to solved`,
    centerX,
    cursorY
  )
  cursorY += 72

  ctx.font = `italic 700 72px "Georgia", "Times New Roman", serif`
  wrapText(ctx, game.title, centerX, cursorY, 800, 72)
  cursorY += 360

  drawBadge(ctx, centerX, cursorY, 110, perfect)
  ctx.save()
  ctx.globalAlpha = 0.08
  ctx.textAlign = "center"
  ctx.font = `900 120px "Georgia", "Times New Roman", serif`
  ctx.fillStyle = "#111827"
  ctx.fillText("VENN", width / 2, cursorY + 40)
  ctx.restore()
  cursorY += 320

  ctx.font = `400 32px "Georgia", "Times New Roman", serif`
  ctx.fillText(
    "Issued by the authority of Maxwell Monis, Supreme Puzzle Master",
    centerX,
    cursorY
  )
  cursorY += 64
  ctx.fillText("venn.maxmonis.com", centerX, cursorY)

  let footerY = height - padding - 40
  ctx.strokeStyle = "#a8a29d"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(width * 0.2, footerY)
  ctx.lineTo(width * 0.45, footerY)
  ctx.moveTo(width * 0.55, footerY)
  ctx.lineTo(width * 0.8, footerY)
  ctx.stroke()

  ctx.textAlign = "center"
  ctx.font = `500 20px "Georgia", "Times New Roman", serif`
  ctx.fillStyle = "#44403c"
  ctx.fillText("Puzzle Master", width * 0.325, footerY + 10)
  ctx.fillText("Date", width * 0.675, footerY + 10)

  ctx.font = `500 32px "Brush Script", "Bradley Hand", "Freestyle Script", serif`
  ctx.fillText("Maxwell Monis", width * 0.325, footerY - 36)
  ctx.fillText(
    new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
      new Date()
    ),
    width * 0.675,
    footerY - 36
  )

  certificateCanvas.style.cssText = ""
  gameSummary.after(certificateCanvasContainer, certificateDownloadButton)
}

// Draws a green or gold badge with a check mark
function drawBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  perfect: boolean
) {
  // circle
  ctx.save()
  let gradient = ctx.createRadialGradient(
    cx - r * 0.3,
    cy - r * 0.3,
    r * 0.3,
    cx,
    cy,
    r
  )
  if (perfect) {
    gradient.addColorStop(0, "#fcd34d") // amber-300
    gradient.addColorStop(1, "#f59e0b") // amber-500
  } else {
    gradient.addColorStop(0, "#34d399") // emerald-400
    gradient.addColorStop(1, "#059669") // emerald-600
  }
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()

  // subtle shine
  ctx.beginPath()
  ctx.ellipse(
    cx - r * 0.2,
    cy - r * 0.35,
    r * 0.55,
    r * 0.35,
    -0.35,
    0,
    Math.PI * 2
  )
  ctx.fillStyle = "rgba(255,255,255,0.25)"
  ctx.fill()

  // check mark
  ctx.lineWidth = Math.max(6, r * 0.18)
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.strokeStyle = "white"
  ctx.beginPath()
  ctx.moveTo(cx - r * 0.45, cy + r * 0.05)
  ctx.lineTo(cx - r * 0.12, cy + r * 0.35)
  ctx.lineTo(cx + r * 0.48, cy - r * 0.35)
  ctx.stroke()

  ctx.restore()
}

// Utility: wait for fonts so text metrics are correct.
async function ensureFontsReady() {
  if (!document.fonts.ready) return
  try {
    await document.fonts.ready
  } catch {
    console.error("Fonts not loaded")
  }
}

// Crisp drawing on HiDPI displays.
function setupHiDPI(canvas: HTMLCanvasElement, height: number, width: number) {
  let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3))
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  let ctx = canvas.getContext("2d")!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}

// Simple text wrapper
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let words = text.split(/\s+/)
  let line = ""
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    let test = line ? line + " " + word : word
    if (!test) return
    let { width } = ctx.measureText(test)
    if (width > maxWidth && i > 0 && word) {
      ctx.fillText(line, x, y)
      y += lineHeight
      line = word
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, y)
  return y
}
