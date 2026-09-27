import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type SectionProps = {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}

// Sections "pop in" like a Hyprland window opening the first time they scroll into view
export function Section({ id, title, subtitle, children }: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <section id={id} ref={ref} className={inView ? 'section popin in' : 'section popin'}>
      <header className="section-head">
        <h2>{title}</h2>
        <p className="section-sub"># {subtitle}</p>
      </header>
      {children}
    </section>
  )
}
