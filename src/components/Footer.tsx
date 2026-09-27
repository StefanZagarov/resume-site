import { ChevronRight } from 'lucide-react'
import { profile } from '../data/content'
import { NAV_LINKS } from './Nav'

export function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-links">
        {NAV_LINKS.filter((link) => link.id !== 'home').map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`}>
              <ChevronRight size={14} className="accent" /> {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="footer-copy">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}
