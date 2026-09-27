// Shared pointer state read by the background canvas.
// Kept outside React so pointer movement never triggers re-renders.
export const pointer = {
  x: -9999,
  y: -9999,
  hovered: null as HTMLElement | null,
}

// How far outside a tile's edge the cursor still lights its border
const GLOW_RANGE = 260

const listeners = new Set<() => void>()

// Lets the canvas redraw only when the pointer actually changes
export function subscribePointer(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

let started = false

// Phones and tablets: there is no cursor to follow, so the effects would only cost battery
export const touchOnly = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches

// One global listener: updates the pointer and the border-glow position of nearby tiles
export function startPointerTracking() {
  if (started || touchOnly()) return
  started = true

  let frame = 0
  let lastEvent: PointerEvent | null = null
  // Set when the page scrolled under a still cursor: the tile under it has to be looked up again
  let scrolled = false
  let lit = new Set<HTMLElement>()

  const apply = () => {
    frame = 0
    const e = lastEvent
    if (!e) return
    const { clientX: x, clientY: y } = e
    pointer.x = x
    pointer.y = y
    const under = scrolled ? document.elementFromPoint(x, y) : (e.target as Element | null)
    scrolled = false
    pointer.hovered = under?.closest?.<HTMLElement>('.tile') ?? null

    // Read phase: measure every tile before writing anything, so the style writes
    // below can't force a recalculation per tile (layout thrashing)
    const near: [HTMLElement, number, number][] = []
    for (const tile of document.querySelectorAll<HTMLElement>('.tile')) {
      const r = tile.getBoundingClientRect()
      const inRange =
        x > r.left - GLOW_RANGE && x < r.right + GLOW_RANGE && y > r.top - GLOW_RANGE && y < r.bottom + GLOW_RANGE
      if (inRange) near.push([tile, x - r.left, y - r.top])
    }

    // Write phase: only tiles near the cursor get a glow position; the rest are reset once
    const next = new Set<HTMLElement>()
    for (const [tile, localX, localY] of near) {
      tile.style.setProperty('--x', `${localX}px`)
      tile.style.setProperty('--y', `${localY}px`)
      next.add(tile)
    }
    for (const tile of lit) {
      if (!next.has(tile)) {
        tile.style.removeProperty('--x')
        tile.style.removeProperty('--y')
      }
    }
    lit = next

    for (const listener of listeners) listener()
  }

  window.addEventListener('pointermove', (e) => {
    lastEvent = e
    if (!frame) frame = requestAnimationFrame(apply)
  })
  // Tiles move under a still cursor while scrolling; keep their glow on the cursor.
  // Once scrolling stops, aim once more: a card that just came under the cursor lifts on
  // :hover (0.3 s), which moves it after the last scroll frame.
  let settle = 0
  const reaim = () => {
    if (!lastEvent) return
    scrolled = true
    if (!frame) frame = requestAnimationFrame(apply)
  }
  window.addEventListener(
    'scroll',
    () => {
      reaim()
      clearTimeout(settle)
      settle = window.setTimeout(reaim, 350)
    },
    { passive: true },
  )
  document.addEventListener('pointerleave', () => {
    lastEvent = null
    pointer.x = pointer.y = -9999
    pointer.hovered = null
    for (const listener of listeners) listener()
  })
}
