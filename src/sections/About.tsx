import { Download } from 'lucide-react'
import { Section } from '../components/Section'
import { about, profile } from '../data/content'

export function About() {
  return (
    <Section id="about" title="About Me" subtitle="learn more about me">
      <div className="about">
        <div className="about-main">
          <div className="terminal window">
            <p className="term-line">
              <span className="accent">❯</span> cat about.md
            </p>
            {about.text.map((paragraph) => (
              <p key={paragraph} className="term-text">
                {paragraph}
              </p>
            ))}
          </div>
          <a href={profile.cv} download className="btn btn-primary">
            Download CV <Download size={15} />
          </a>
        </div>

        <div className="about-photo">
          <img src={profile.photo} alt={profile.name} />
        </div>
      </div>
    </Section>
  )
}
