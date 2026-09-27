import { Section } from '../components/Section'
import { about, profile } from '../data/content'

export function About() {
  return (
    <Section id="about" title="About Me" subtitle="learn more about me">
      <div className="about">
        <div className="terminal window">
          <p className="term-line">
            <span className="accent">❯</span> cat about.md
          </p>
          {about.text.map((paragraph) => (
            <p key={paragraph} className="term-text">
              {paragraph}
            </p>
          ))}
          <p className="term-line">
            <span className="accent">❯</span>{' '}
            <a href={profile.cv} download className="term-cmd">
              open cv.pdf
            </a>
            <span className="term-hint">← click to download</span>
          </p>
          <p className="term-line">
            <span className="accent">❯</span>
            <span className="caret" aria-hidden="true" />
          </p>
        </div>

        <div className="about-photo">
          <img src={profile.photo} alt={profile.name} />
        </div>
      </div>
    </Section>
  )
}
