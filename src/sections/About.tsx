import { Download } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Section } from '../components/Section'
import { about, profile } from '../data/content'

export function About() {
  return (
    <Section id="about" title="About Me" subtitle="the human behind the code">
      <div className="about">
        <div className="about-main">
          <div className="terminal window reveal" style={{ '--i': 0 } as CSSProperties}>
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
          <img src={profile.photo} alt={profile.name} />
        </div>
      </div>
    </Section>
  )
}
