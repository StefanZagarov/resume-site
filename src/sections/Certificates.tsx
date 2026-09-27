import { Award, ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { Tile } from '../components/Tile'
import { certificates } from '../data/content'

export function Certificates() {
  return (
    <Section id="certificates" title="Certificates" subtitle="find my certificates">
      <ul className="cert-grid">
        {certificates.map((cert) => (
          <Tile key={cert.link} as="li" className="cert">
            <div className="cert-media" aria-hidden="true">
              {cert.image ? <img src={cert.image} alt="" /> : <Award size={44} className="accent" />}
            </div>
            <h3>{cert.title}</h3>
            <p className="muted">{cert.issuer}</p>
            <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
              View certificate <ArrowUpRight size={14} />
            </a>
          </Tile>
        ))}
      </ul>
    </Section>
  )
}
