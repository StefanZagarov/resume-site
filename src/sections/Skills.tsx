import { memo, type CSSProperties } from 'react'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { Tile } from '../components/Tile'
import { skills } from '../data/content'

// Static list: memo keeps it from re-rendering when anything above it changes
export const Skills = memo(function Skills() {
  return (
    <Section id="skills" title="My Skills" subtitle="the tools on the shelf">
      <ul className="skills-grid">
        {skills.map((skill, index) => (
          <Tile key={skill.name} as="li" className="skill reveal" style={{ '--i': index } as CSSProperties}>
            <TechIcon skill={skill} />
            <span>{skill.name}</span>
          </Tile>
        ))}
      </ul>
    </Section>
  )
})
