import { useEffect, useRef } from 'react'
import { pointer, subscribePointer } from '../hooks/usePointer'

const SPACING = 22
const RADIUS = 120 // how far the cursor affects dots
const PUSH = 9 // max px a dot is pushed away
const BACKLIGHT_RADIUS = 110

type Palette = { dot: string; dotAlpha: number; glow: string }

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
// on an idle loop, so the frosted tiles above it don't have to re-blur every frame.
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let palette = readPalette()
    let width = 0
    let height = 0
    let backlight = 0
    let frame = 0

    // The idle dot grid is prerendered once (per resize / theme) and blitted each frame;
    // only the few dots around the cursor are drawn individually
    const base = document.createElement('canvas')
    const baseCtx = base.getContext('2d')!

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

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const { x: mx, y: my, hovered } = pointer

      // Backlight behind the hovered tile, clipped to that tile
      backlight += ((hovered ? 1 : 0) - backlight) * 0.12
      if (!reduceMotion && hovered && backlight > 0.01) {
        const r = hovered.getBoundingClientRect()
        ctx.save()
        ctx.beginPath()
        ctx.rect(r.left, r.top, r.width, r.height)
        ctx.clip()
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, BACKLIGHT_RADIUS)
        g.addColorStop(0, `rgba(${palette.glow},${0.16 * backlight})`)
        g.addColorStop(1, `rgba(${palette.glow},0)`)
        ctx.fillStyle = g
        ctx.fillRect(r.left, r.top, r.width, r.height)
        ctx.restore()
      }

      const active = !reduceMotion && mx > -RADIUS && my > -RADIUS && mx < width + RADIUS && my < height + RADIUS
      if (!active) {
        ctx.drawImage(base, 0, 0, width, height)
        return
      }

      // Square around the cursor that holds every dot it can affect
      const reach = RADIUS + PUSH + 2
      const x0 = mx - reach
      const y0 = my - reach

      // Blit the prerendered grid everywhere except that square (even-odd clip)
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, width, height)
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
