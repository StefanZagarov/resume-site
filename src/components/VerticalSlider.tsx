import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useVisibleCount } from '../hooks/useVisibleCount'

type VerticalSliderProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  label: string
}

// Cards are grouped into rows ("lines"); the viewport shows one line at a time.
// A rail on the right (up / dots / down) moves between lines by sliding a track with a
// transform (GPU-composited, same easing as the carousel). The viewport doesn't capture
// the mouse wheel, so scrolling the page is never hijacked.
export function VerticalSlider<T>({ items, getKey, renderItem, label }: VerticalSliderProps<T>) {
  const perRow = useVisibleCount()
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow))

  const viewportRef = useRef<HTMLDivElement>(null)
  const [rowHeight, setRowHeight] = useState(0)
  const [current, setCurrent] = useState(0)
  const line = Math.min(current, rows.length - 1)

  // Every line gets the height of the tallest one, so each position shows exactly one line
  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const measure = () => {
      // Drop the forced height for a moment to read each line's natural height
      viewport.style.setProperty('--row-h', 'auto')
      const rowEls = [...viewport.querySelectorAll<HTMLElement>('.vslider-row')]
      const height = Math.max(0, ...rowEls.map((row) => row.offsetHeight))
      viewport.style.setProperty('--row-h', `${height}px`)
      setRowHeight(height)
    }
    measure()
    const observer = new ResizeObserver(measure)
    viewport.querySelectorAll('.vslider-card').forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [perRow, items])

  const goTo = (index: number) => setCurrent(Math.max(0, Math.min(rows.length - 1, index)))

  return (
    <div className={rows.length > 1 ? 'vslider' : 'vslider single'}>
      <div
        ref={viewportRef}
        className="vslider-viewport"
        style={{ '--row-h': rowHeight ? `${rowHeight}px` : 'auto' } as CSSProperties}
        role="region"
        aria-label={`${label}, row ${line + 1} of ${rows.length}`}
      >
        <div className="vslider-track" style={{ transform: `translateY(${-line * rowHeight}px)` }}>
          {rows.map((row, rowIndex) => (
            <div
              key={row.map(getKey).join('|')}
              className="vslider-row"
              style={{ gridTemplateColumns: `repeat(${perRow}, minmax(0, 1fr))` }}
              aria-hidden={rowIndex !== line}
              inert={rowIndex !== line}
            >
              {row.map((item, index) => (
                <div key={getKey(item)} className="vslider-card reveal" style={{ '--i': index } as CSSProperties}>
                  {renderItem(item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {rows.length > 1 && (
        <div className="vslider-rail reveal" style={{ '--i': perRow } as CSSProperties}>
          <button type="button" className="round-btn" onClick={() => goTo(line - 1)} disabled={line === 0} aria-label="Previous row">
            <ChevronUp size={18} />
          </button>
          <div className="vslider-dots" role="tablist" aria-label={`${label} rows`}>
            {rows.map((row, index) => (
              <button
                key={row.map(getKey).join('|')}
                type="button"
                role="tab"
                aria-selected={index === line}
                aria-label={`Show row ${index + 1} of ${rows.length}`}
                className={index === line ? 'dot active' : 'dot'}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="round-btn"
            onClick={() => goTo(line + 1)}
            disabled={line === rows.length - 1}
            aria-label="Next row"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
