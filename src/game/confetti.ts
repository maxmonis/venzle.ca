let confettiCanvas = document.createElement("canvas")
confettiCanvas.style.pointerEvents = "none"
confettiCanvas.style.position = "fixed"
confettiCanvas.style.top = "0"

let animationFrameId: number | null = null
let ctx = confettiCanvas.getContext("2d")!
let particles: Array<Particle> = []

class Particle {
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
  size: number
  speedX: number
  speedY: number
  x: number
  y: number

  constructor() {
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`
    this.opacity = 1
    this.rotation = Math.random() * 360
    this.rotationSpeed = Math.random() * 10 - 5
    this.size = Math.random() * 10 + 5
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 5 + 2
    this.x = Math.random() * confettiCanvas.width
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX
    this.rotation += this.rotationSpeed
    this.opacity = 1 - this.y / confettiCanvas.height
    if (this.opacity < 0) this.opacity = 0
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate((this.rotation * Math.PI) / 180)
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
    ctx.restore()
  }
}

function animate() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
  particles = particles.filter(p => p.opacity && p.y < confettiCanvas.height)
  for (let particle of particles) {
    particle.update()
    particle.draw()
  }
  if (particles.length) animationFrameId = requestAnimationFrame(animate)
  else {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth
  confettiCanvas.height = window.innerHeight
}

export function startConfetti() {
  document.body.prepend(confettiCanvas)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  for (let i = 0; i < window.innerWidth / 3; i++) particles.push(new Particle())
  animate()
  setTimeout(() => {
    confettiCanvas.remove()
  }, 10_000)
}

resizeCanvas()
window.addEventListener("resize", resizeCanvas)
