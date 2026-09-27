import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { VerticalSlider } from '../components/VerticalSlider'
import { GithubIcon } from '../components/GithubIcon'
import { InfoCard } from '../components/InfoCard'
import { Section } from '../components/Section'
import { Tabs } from '../components/Tabs'
import { personalProjects, workProjects, type Project } from '../data/content'

const TABS = ['Personal Projects', 'Work Projects'] as const
type Tab = (typeof TABS)[number]
const TAB_LABELS: Record<Tab, string> = { 'Personal Projects': '~/personal', 'Work Projects': '~/work' }

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className="project-media" aria-hidden="true">
      {project.image ? (
        <img src={project.image} alt="" width={1200} height={675} loading="lazy" decoding="async" />
      ) : (
        <span>{project.title.slice(0, 1)}</span>
      )}
    </div>
  )
}

export function Projects() {
  const [tab, setTab] = useState<Tab>('Personal Projects')
  const projects = tab === 'Work Projects' ? workProjects : personalProjects

  return (
    <Section id="projects" title="Projects" subtitle="things I built, broke and fixed">
      <Tabs label="Project type" options={TABS} value={tab} onChange={setTab} labels={TAB_LABELS}>
        <VerticalSlider
          key={tab}
          label={tab}
          items={projects}
          getKey={(project) => project.title}
          renderItem={(project) => (
            <InfoCard
              title={project.title}
              media={<ProjectMedia project={project} />}
              description={project.description}
              checklist={project.checklist}
              actions={
                (project.repo || project.live) && (
                  <>
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        <GithubIcon size={14} /> GitHub Repo
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                        Go to Site <ArrowUpRight size={14} />
                      </a>
                    )}
                  </>
                )
              }
            />
          )}
        />
      </Tabs>
    </Section>
  )
}
