import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Tile } from './Tile'

type InfoCardProps = {
  title: string
  meta?: ReactNode
  media?: ReactNode
  description: string
  checklist?: string[]
  actions?: ReactNode
}

// Card used by the Projects and Experience carousels: title, optional media,
// description, a checklist and action buttons
export function InfoCard({ title, meta, media, description, checklist, actions }: InfoCardProps) {
  return (
    <Tile className="info-card">
      <h3>{title}</h3>
      {meta && <p className="info-meta">{meta}</p>}
      {media}
      <p className="info-desc">{description}</p>
      {checklist && checklist.length > 0 && (
        <ul className="checklist">
          {checklist.map((item) => (
            <li key={item}>
              <span>{item}</span>
              <Check size={16} className="accent" />
            </li>
          ))}
        </ul>
      )}
      {actions && <div className="info-actions">{actions}</div>}
    </Tile>
  )
}
