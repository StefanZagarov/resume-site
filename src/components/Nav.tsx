import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useKeyboardNav } from '../hooks/useKeyboardNav'
import { useNow } from '../hooks/useNow'
import { useReservedWidth } from '../hooks/useReservedWidth'
import { useTheme } from '../hooks/useTheme'
import { Console } from './Console'

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
const IDS = NAV_LINKS.map((link) => link.id)

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && !!target.closest('input, textarea, select, [contenteditable="true"]')
}

export function Nav() {
  const active = useActiveSection(IDS)
  const { theme, toggle } = useTheme()
  const [consoleOpen, setConsoleOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const now = useNow(15_000)
  useKeyboardNav(IDS)
  useReservedWidth(linksRef, '(max-width: 1200px)')

  // ` toggles the console (like a game console), Esc closes it, clicking outside closes it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // e.code is the physical key, so this also works on layouts where it types another
      // character (e.g. Bulgarian)
      const backquote = e.code === 'Backquote' || e.key === '`'
      if (backquote && !isTyping(e.target)) {
        e.preventDefault()
        setConsoleOpen((open) => !open)
      }
      if (e.key === 'Escape') setConsoleOpen(false)
    }
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setConsoleOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  const path = active === 'home' ? '~' : `~/${active}`

  return (
    <header className="topbar" ref={headerRef}>
      <nav className="nav">
        <button
          type="button"
          className="prompt"
          onClick={() => setConsoleOpen((open) => !open)}
          aria-expanded={consoleOpen}
          aria-controls="console"
          title="Open console ( ` )"
        >
          {/* Only this part may shorten (with …) when space runs out; the icons never move */}
          <span className="prompt-text">
            <span className="prompt-user">
              stefan
              <span className="prompt-host">
                <span className="prompt-at">@</span>portfolio
              </span>
            </span>
            :<span className="prompt-path">{path}</span>
          </span>
          <span className="muted">&nbsp;❯</span>
          <span className="caret" aria-hidden="true" />
        </button>

        {/* On narrow screens only the active workspace shows its name, like Waybar */}
        <ul className="nav-links" ref={linksRef}>
          {NAV_LINKS.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? 'active' : undefined}
                aria-label={link.label}
                aria-current={active === link.id ? 'true' : undefined}
                title={link.label}
              >
                <span className="ws-num">{index + 1}</span>
                <span className="ws-label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <time className="nav-clock" dateTime={now.toISOString()}>
            {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </time>
          <button type="button" className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </nav>

      <Console open={consoleOpen} onClose={() => setConsoleOpen(false)} onToggleTheme={toggle} />
    </header>
  )
}
