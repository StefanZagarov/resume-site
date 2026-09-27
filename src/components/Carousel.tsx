import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, type CSSProperties, type ReactNode } from 'react'
import { useVisibleCount } from '../hooks/useVisibleCount'

type CarouselProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
}

// Shows up to 3 cards side by side, with previous/next buttons
export function Carousel<T>({ items, getKey, renderItem }: CarouselProps<T>) {
  const visible = Math.min(useVisibleCount(), items.length)
  const maxStart = Math.max(0, items.length - visible)
  const [start, setStart] = useState(0)
  const clampedStart = Math.min(start, maxStart)
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
              className="carousel-slot reveal"
              style={
                {
                  flexBasis: `calc((100% - (${visible} - 1) * var(--gap)) / ${visible})`,
                  '--i': index,
                } as CSSProperties
              }
              aria-hidden={index < clampedStart || index >= clampedStart + visible}
              inert={index < clampedStart || index >= clampedStart + visible}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
      {canScroll && (
        <div className="carousel-controls reveal" style={{ '--i': visible } as CSSProperties}>
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
