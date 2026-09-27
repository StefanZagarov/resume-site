import { Download } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Section } from '../components/Section'
import { about, profile } from '../data/content'

export function About() {
  // The rotating border animates a custom property, which restyles the whole page every
  // frame. Run it only while the terminal is on screen.
  const terminalRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    const el = terminalRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="about" title="About Me" subtitle="the human behind the code">
      <div className="about">
        <div className="about-main">
          <div
            ref={terminalRef}
            className={onScreen ? 'terminal window reveal' : 'terminal window reveal paused'}
            style={{ '--i': 0 } as CSSProperties}
          >
            <p className="term-line">
              <span className="accent">❯</span> cat about.md
            </p>
            {about.text.map((paragraph) => (
              <p key={paragraph} className="term-text">
                {paragraph}
              </p>
            ))}
          </div>
          <a href={profile.cv} download className="btn btn-primary reveal" style={{ '--i': 1 } as CSSProperties}>
            Download CV <Download size={15} />
          </a>
        </div>

        <div className="about-photo reveal" style={{ '--i': 2 } as CSSProperties}>
          <img src={profile.photo} alt={profile.name} width={860} height={720} decoding="async" />
        </div>
      </div>
    </Section>
  )
}
