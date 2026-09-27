import { ArrowDown, Download } from 'lucide-react'
import type { CSSProperties } from 'react'
import { profile } from '../data/content'

export function Hero() {
  return (
    <section id="home" className="hero">
      <p className="hero-prompt stagger" style={{ '--i': 0 } as CSSProperties}>
        <span className="accent">❯</span> whoami
        <span className="caret" aria-hidden="true" />
      </p>
      <h1 className="stagger" style={{ '--i': 1 } as CSSProperties}>
        {profile.firstName} {profile.lastName}
      </h1>
      <p className="hero-role stagger" style={{ '--i': 2 } as CSSProperties}>I'm a {profile.role}. Welcome to my portfolio!</p>
      <div className="hero-actions stagger" style={{ '--i': 3 } as CSSProperties}>
        <a href={profile.cv} download className="btn btn-primary">
          Download CV <Download size={15} />
        </a>
        <a href="#projects" className="btn btn-ghost">
          View projects
        </a>
      </div>
      <p className="key-hint stagger" style={{ '--i': 4 } as CSSProperties}>
        <kbd>1</kbd>–<kbd>7</kbd> to navigate · <kbd>`</kbd> for the console
      </p>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
