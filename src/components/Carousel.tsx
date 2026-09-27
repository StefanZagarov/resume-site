import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'

function useVisibleCount() {
  const get = () => (window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 3)
  const [count, setCount] = useState(get)
  useEffect(() => {
    const onResize = () => setCount(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return count
}

type CarouselProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T, highlighted: boolean) => ReactNode
}

// Shows up to 3 cards; the middle visible card is highlighted, like the reference site
export function Carousel<T>({ items, getKey, renderItem }: CarouselProps<T>) {
  const visible = Math.min(useVisibleCount(), items.length)
  const maxStart = Math.max(0, items.length - visible)
  const [start, setStart] = useState(0)
  const clampedStart = Math.min(start, maxStart)
  const highlighted = clampedStart + Math.floor((visible - 1) / 2)
  const canScroll = items.length > visible

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(calc(${-clampedStart} * (100% + var(--gap)) / ${visible}))` }}
        >
          {items.map((item, index) => (
            <div
              key={getKey(item)}
              className="carousel-slot"
              style={{ flexBasis: `calc((100% - (${visible} - 1) * var(--gap)) / ${visible})` }}
              aria-hidden={index < clampedStart || index >= clampedStart + visible}
            >
              {renderItem(item, index === highlighted)}
            </div>
          ))}
        </div>
      </div>
      {canScroll && (
        <div className="carousel-controls">
          <button
            type="button"
            className="round-btn"
            onClick={() => setStart(Math.max(0, clampedStart - 1))}
            disabled={clampedStart === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="round-btn"
            onClick={() => setStart(Math.min(maxStart, clampedStart + 1))}
            disabled={clampedStart === maxStart}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
