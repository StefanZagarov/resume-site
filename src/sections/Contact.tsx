import { Check, Copy, Mail, MapPin, Phone, User } from 'lucide-react'
import { useRef, useState, type CSSProperties } from 'react'
import { GithubIcon } from '../components/GithubIcon'
import { Section } from '../components/Section'
import { profile } from '../data/content'
import { copyText } from '../utils/copyText'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  const copyEmail = async () => {
    if (await copyText(profile.email)) {
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } else {
      // Clipboard can be blocked; fall back to opening the mail client
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <Section id="contact" title="Contact Me" subtitle="say hi, I don't bite">
      <div className="contact-info">
        <div className="contact-item reveal" style={{ '--i': 0 } as CSSProperties}>
          <span className="contact-icon">
            <User size={26} className="accent" />
          </span>
          <div>
            <span className="contact-label">Name</span>
            <span>{profile.name}</span>
          </div>
        </div>
        <div className="contact-item reveal" style={{ '--i': 1 } as CSSProperties}>
          <span className="contact-icon">
            <MapPin size={26} className="accent" />
          </span>
          <div>
            <span className="contact-label">Location</span>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="contact-item reveal" style={{ '--i': 2 } as CSSProperties}>
          <span className="contact-icon">
            <Phone size={26} className="accent" />
          </span>
          <div>
            <span className="contact-label">Phone</span>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </div>
        </div>
        <div className="contact-item reveal" style={{ '--i': 3 } as CSSProperties}>
          <span className="contact-icon">
            <Mail size={26} className="accent" />
          </span>
          <div>
            <span className="contact-label">
              E-mail
              <button type="button" className="mini-btn" onClick={copyEmail}>
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'copied' : 'copy'}
              </button>
            </span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
      </div>

      <div className="socials reveal" style={{ '--i': 4 } as CSSProperties}>
        <a href={profile.github} target="_blank" rel="noreferrer" className="social" aria-label="GitHub">
          <GithubIcon size={22} />
        </a>
        <a href={`mailto:${profile.email}`} className="social" aria-label="Email">
          <Mail size={22} />
        </a>
      </div>
    </Section>
  )
}
