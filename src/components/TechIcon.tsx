import type { Skill } from '../data/content'

// Static SVG logo: decoded once by the browser and cached, no React re-render cost
export function TechIcon({ skill, size = 40 }: { skill: Skill; size?: number }) {
  return (
    <img
      className={skill.darkInvert ? 'tech-icon dark-invert' : 'tech-icon'}
      src={`/icons/${skill.icon}`}
      width={size}
      height={size}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
