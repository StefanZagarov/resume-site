import { Check, Copy, Eye, EyeOff, Mail, MapPin, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { GithubIcon } from '../components/GithubIcon'
import { Section } from '../components/Section'
import { profile } from '../data/content'
import { copyText } from '../utils/copyText'

// Keeps only the country code visible until the visitor reveals the number
function maskPhone(phone: string) {
  return phone.replace(/(\+\d{3})(.*)/, (_, code: string, rest: string) => code + rest.replace(/\d/g, '*'))
}

export function Contact() {
  const [showPhone, setShowPhone] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    if (await copyText(profile.email)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      // Clipboard can be blocked; fall back to opening the mail client
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <Section id="contact" title="Contact Me" subtitle="get in touch">
      <p className="contact-intro">
        Feel free to get in touch with me. I'm always open to discussing new projects, ideas or opportunities to be
        part of your team. Email or call me with any questions.
      </p>

      <div className="contact-info">
        <div className="contact-item">
          <User size={22} className="accent" />
          <div>
            <span className="contact-label">Name</span>
            <span>{profile.name}</span>
          </div>
        </div>
        <div className="contact-item">
          <MapPin size={22} className="accent" />
          <div>
            <span className="contact-label">Location</span>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="contact-item">
          <Phone size={22} className="accent" />
          <div>
            <span className="contact-label">
              Phone
              <button type="button" className="mini-btn" onClick={() => setShowPhone((v) => !v)}>
                {showPhone ? <EyeOff size={12} /> : <Eye size={12} />} {showPhone ? 'hide' : 'show'}
              </button>
            </span>
            {showPhone ? (
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            ) : (
              <span>{maskPhone(profile.phone)}</span>
            )}
          </div>
        </div>
        <div className="contact-item">
          <Mail size={22} className="accent" />
          <div>
            <span className="contact-label">
              E-mail
              <button type="button" className="mini-btn" onClick={copyEmail}>
                {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'copied' : 'copy'}
              </button>
            </span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
      </div>

      <div className="socials">
        <a href={profile.github} target="_blank" rel="noreferrer" className="social" aria-label="GitHub">
          <GithubIcon size={20} />
        </a>
        <a href={`mailto:${profile.email}`} className="social" aria-label="Email">
          <Mail size={20} />
        </a>
      </div>
    </Section>
  )
}
