import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type SectionProps = {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}

// Sections "pop in" like a Hyprland window opening the first time they scroll into view.
// The animation runs on an inner wrapper so the <section> itself is never transformed —
// jumps (nav links, 1–7 keys) then aim at its real position, not the scaled one.
export function Section({ id, title, subtitle, children }: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <section id={id} ref={ref} className="section">
      <div className={inView ? 'popin in' : 'popin'}>
        <header className="section-head">
          <h2 className="reveal" style={{ '--i': -3 } as CSSProperties}>
            {title}
          </h2>
          <p className="section-sub reveal" style={{ '--i': -2 } as CSSProperties}>
            {'// '}
            {subtitle}
          </p>
        </header>
        {children}
      </div>
    </section>
  )
}
