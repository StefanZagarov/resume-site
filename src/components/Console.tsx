import { useRef, useState } from 'react'
import { profile } from '../data/content'
import { copyText } from '../utils/copyText'

type ConsoleProps = {
  open: boolean
  onClose: () => void
  onToggleTheme: () => void
}

// Drop-down "terminal" under the nav with clickable quick-access commands
export function Console({ open, onClose, onToggleTheme }: ConsoleProps) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const timer = useRef(0)

  const flash = (message: string) => {
    setFeedback(message)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setFeedback(null), 2000)
  }

  const copyEmail = async () => {
    if (await copyText(profile.email)) flash('email copied to clipboard')
    else window.location.href = `mailto:${profile.email}`
  }

  return (
    <div id="console" className={open ? 'console open' : 'console'} aria-hidden={!open} inert={!open}>
      <div className="console-head">
        <span>~/console — quick access</span>
        <span className={feedback ? 'console-feedback' : undefined}>{feedback ?? 'esc to close'}</span>
      </div>
      <div className="console-body">
        <div className="console-col">
          <h4>Commands</h4>
          <a className="cmd" href={profile.cv} download>
            <span>cv --download</span>
            <span>PDF</span>
          </a>
          <button type="button" className="cmd" onClick={copyEmail}>
            <span>email --copy</span>
            <span>clipboard</span>
          </button>
          <a className="cmd" href={profile.github} target="_blank" rel="noreferrer">
            <span>open github</span>
            <span>new tab</span>
          </a>
          <a className="cmd" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span>open linkedin</span>
            <span>new tab</span>
          </a>
          <button type="button" className="cmd" onClick={onToggleTheme}>
            <span>theme --toggle</span>
            <span>light / dark</span>
          </button>
          <a className="cmd" href="#contact" onClick={onClose}>
            <span>cd ~/contact</span>
            <span>get in touch</span>
          </a>
          <a className="cmd" href="#home" onClick={onClose}>
            <span>cd ~</span>
            <span>back to top</span>
          </a>
        </div>
      </div>
    </div>
  )
}
