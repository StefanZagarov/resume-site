import { useEffect, useRef } from 'react'
import { pointer, subscribePointer, touchOnly } from '../hooks/usePointer'

const SPACING = 22
const RADIUS = 120 // how far the cursor affects dots
const PUSH = 9 // max px a dot is pushed away
const BACKLIGHT_RADIUS = 110

type Palette = { dot: string; dotAlpha: number; glow: string }
type Rect = { x: number; y: number; w: number; h: number }

// Smallest rect holding both (either may be missing)
function union(a: Rect | null, b: Rect | null): Rect | null {
  if (!a) return b
  if (!b) return a
  const x = Math.min(a.x, b.x)
  const y = Math.min(a.y, b.y)
  return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y }
}

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement)
  return {
    dot: cs.getPropertyValue('--dot-rgb').trim(),
    dotAlpha: parseFloat(cs.getPropertyValue('--dot-alpha')) || 0.08,
    glow: cs.getPropertyValue('--accent-rgb').trim(),
  }
}

// Fixed full-screen dot grid: dots near the cursor light up and move away,
// and a soft light shows through the frosted tile under the cursor.
// Draws on demand only (pointer move, fade-out, scroll, resize, theme) — never
// on an idle loop, so the frosted tiles above it don't have to re-blur every frame —
// and only repaints the part of the screen that changed.
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || touchOnly()
    let palette = readPalette()
    let width = 0
    let height = 0
    let backlight = 0
    let frame = 0

    // The idle dot grid is prerendered once (per resize / theme) and blitted each frame;
    // only the few dots around the cursor are drawn individually
    const base = document.createElement('canvas')
    const baseCtx = base.getContext('2d')!

    // Area that differs from the plain grid after the last draw (cursor square + backlight).
    // Each frame repaints only that area and the new one, not the whole screen.
    let dirty: Rect | null = null
    let fullRedraw = true

    const renderBase = () => {
      base.width = canvas.width
      base.height = canvas.height
      baseCtx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0)
      baseCtx.clearRect(0, 0, width, height)
      baseCtx.fillStyle = `rgba(${palette.dot},${palette.dotAlpha})`
      baseCtx.beginPath()
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          baseCtx.moveTo(x + 1, y)
          baseCtx.arc(x, y, 1, 0, Math.PI * 2)
        }
      }
      baseCtx.fill()
      fullRedraw = true
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      renderBase()
      draw()
    }

    // Snap a rect outwards to whole device pixels and clamp it to the screen, so clearing
    // and re-blitting it never leaves half-covered pixels at its edges
    const snap = (r: Rect): Rect | null => {
      const dpr = canvas.width / width
      const x0 = Math.max(0, Math.floor((r.x - 2) * dpr) / dpr)
      const y0 = Math.max(0, Math.floor((r.y - 2) * dpr) / dpr)
      const x1 = Math.min(width, Math.ceil((r.x + r.w + 2) * dpr) / dpr)
      const y1 = Math.min(height, Math.ceil((r.y + r.h + 2) * dpr) / dpr)
      return x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null
    }

    const draw = () => {
      const { x: mx, y: my, hovered } = pointer

      // Backlight behind the hovered tile, clipped to that tile
      backlight += ((hovered ? 1 : 0) - backlight) * 0.12
      const tile = !reduceMotion && hovered && backlight > 0.01 ? hovered.getBoundingClientRect() : null
      const light: Rect | null = tile ? { x: tile.left, y: tile.top, w: tile.width, h: tile.height } : null

      // Square around the cursor that holds every dot it can affect
      const active = !reduceMotion && mx > -RADIUS && my > -RADIUS && mx < width + RADIUS && my < height + RADIUS
      const reach = RADIUS + PUSH + 2
      const x0 = mx - reach
      const y0 = my - reach
      const square: Rect | null = active ? { x: x0, y: y0, w: reach * 2, h: reach * 2 } : null

      const next = union(square, light)
      const target = fullRedraw ? { x: 0, y: 0, w: width, h: height } : union(dirty, next)
      fullRedraw = false
      dirty = next
      const region = target && snap(target)
      if (!region) return

      ctx.save()
      ctx.beginPath()
      ctx.rect(region.x, region.y, region.w, region.h)
      ctx.clip()
      ctx.clearRect(region.x, region.y, region.w, region.h)

      if (light) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(light.x, light.y, light.w, light.h)
        ctx.clip()
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, BACKLIGHT_RADIUS)
        g.addColorStop(0, `rgba(${palette.glow},${0.16 * backlight})`)
        g.addColorStop(1, `rgba(${palette.glow},0)`)
        ctx.fillStyle = g
        ctx.fillRect(light.x, light.y, light.w, light.h)
        ctx.restore()
      }

      if (!square) {
        ctx.drawImage(base, 0, 0, width, height)
        ctx.restore()
        return
      }

      // Blit the prerendered grid everywhere except that square (even-odd clip)
      ctx.save()
      ctx.beginPath()
      ctx.rect(region.x, region.y, region.w, region.h)
      ctx.rect(x0, y0, reach * 2, reach * 2)
      ctx.clip('evenodd')
      ctx.drawImage(base, 0, 0, width, height)
      ctx.restore()

      // Draw the dots inside the square individually, pushed away and lit by the cursor
      const first = (v: number) => SPACING / 2 + Math.max(0, Math.ceil((v - SPACING / 2) / SPACING)) * SPACING
      for (let x = first(x0); x < x0 + reach * 2 && x < width; x += SPACING) {
        for (let y = first(y0); y < y0 + reach * 2 && y < height; y += SPACING) {
          const dx = x - mx
          const dy = y - my
          const d = Math.hypot(dx, dy)
          const k = Math.max(0, 1 - d / RADIUS)
          const px = x + (dx / (d || 1)) * k * PUSH
          const py = y + (dy / (d || 1)) * k * PUSH
          ctx.fillStyle = k > 0 ? `rgba(${palette.glow},${0.2 + k * 0.8})` : `rgba(${palette.dot},${palette.dotAlpha})`
          ctx.beginPath()
          ctx.arc(px, py, 1 + k * 1.3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.restore()
    }

    const tick = () => {
      frame = 0
      draw()
      // Keep animating only while the backlight is still fading in or out
      const target = pointer.hovered ? 1 : 0
      if (Math.abs(target - backlight) > 0.01) frame = requestAnimationFrame(tick)
    }

    const requestDraw = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    // The hovered tile moves under a still cursor while scrolling, so its backlight must follow
    const onScroll = () => {
      if (pointer.hovered || backlight > 0.01) requestDraw()
    }

    // Re-read colours when the theme switches
    const themeObserver = new MutationObserver(() => {
      palette = readPalette()
      renderBase()
      requestDraw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    const unsubscribe = reduceMotion ? () => {} : subscribePointer(requestDraw)

    return () => {
      cancelAnimationFrame(frame)
      unsubscribe()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />
}
