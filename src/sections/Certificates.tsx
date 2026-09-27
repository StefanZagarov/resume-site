import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/Section'
import { Tile } from '../components/Tile'
import { certificates } from '../data/content'

export function Certificates() {
  return (
    <Section id="certificates" title="Certificates" subtitle="find my certificates">
      <ul className="cert-grid">
        {certificates.map((cert) => (
          <Tile key={cert.link} as="li" className={cert.kind === 'Diploma' ? 'cert diploma' : 'cert'}>
            <a href={cert.link} target="_blank" rel="noreferrer" className="cert-media" aria-label={`View ${cert.title} ${cert.kind.toLowerCase()}`}>
              <img src={cert.image} alt="" width={560} height={806} loading="lazy" decoding="async" />
            </a>
            <p className="cert-kind">
              {cert.kind} · {cert.issued}
            </p>
            <h3>{cert.title}</h3>
            <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
              View <ArrowUpRight size={14} />
            </a>
          </Tile>
        ))}
      </ul>
    </Section>
  )
}
