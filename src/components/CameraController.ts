export type CameraPosition = { x: number; y: number; scale: number }

export const CAMERA_TARGETS = {
  FULL_PLANT: { x: 350, y: 450, scale: 1 },
  SHOOT_TIP: { x: 350, y: 188, scale: 2.45 },
  STEM: { x: 350, y: 438, scale: 1.95 },
  STEM_FOLLOW: { x: 350, y: 394, scale: 1.85 },
  LEAF: { x: 198, y: 383, scale: 2.3 },
  STOMATA: { x: 190, y: 382, scale: 4.4 },
  FRUIT: { x: 542, y: 354, scale: 2.9 },
  FRUIT_INTERNAL: { x: 542, y: 354, scale: 4.25 },
  ROOT: { x: 350, y: 755, scale: 2.1 },
  SHOOT_RESULT: { x: 350, y: 310, scale: 1.48 },
  AUXIN_RESULT: { x: 350, y: 420, scale: 1.05 },
} satisfies Record<string, CameraPosition>

export type CameraTarget = keyof typeof CAMERA_TARGETS

const easeInOutCubic = (progress: number) => progress < 0.5
  ? 4 * progress * progress * progress
  : 1 - Math.pow(-2 * progress + 2, 3) / 2

export class CameraController {
  private frame: number | null = null
  private position: CameraPosition
  private disposed = false

  constructor(private readonly onChange: (position: CameraPosition) => void, initial: CameraPosition = CAMERA_TARGETS.FULL_PLANT) {
    this.position = initial
  }

  animateTo(target: CameraPosition | CameraTarget, duration = 1100) {
    if (this.disposed) return
    this.stop()
    const end = typeof target === 'string' ? CAMERA_TARGETS[target] : target
    const start = { ...this.position }
    const startedAt = performance.now()
    const animate = (now: number) => {
      if (this.disposed) return
      const progress = Math.min(1, (now - startedAt) / Math.max(1, duration))
      const eased = easeInOutCubic(progress)
      this.position = {
        x: start.x + (end.x - start.x) * eased,
        y: start.y + (end.y - start.y) * eased,
        scale: start.scale + (end.scale - start.scale) * eased,
      }
      this.onChange(this.position)
      if (progress < 1) this.frame = requestAnimationFrame(animate)
      else this.frame = null
    }
    this.frame = requestAnimationFrame(animate)
  }

  setPosition(position: CameraPosition) {
    if (this.disposed) return
    this.stop()
    this.position = { ...position }
    this.onChange(this.position)
  }

  stop() {
    if (this.frame !== null) cancelAnimationFrame(this.frame)
    this.frame = null
  }

  dispose() {
    this.stop()
    this.disposed = true
  }
}
