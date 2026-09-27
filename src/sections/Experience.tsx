import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Carousel } from '../components/Carousel'
import { InfoCard } from '../components/InfoCard'
import { Section } from '../components/Section'
import { Tabs } from '../components/Tabs'
import { educationExperience, workExperience } from '../data/content'

const TABS = ['Work Experience', 'Education'] as const
type Tab = (typeof TABS)[number]
const TAB_LABELS: Record<Tab, string> = { 'Work Experience': '~/work', Education: '~/education' }

export function Experience() {
  const [tab, setTab] = useState<Tab>('Work Experience')
  const items = tab === 'Work Experience' ? workExperience : educationExperience

  return (
    <Section id="experience" title="Experience" subtitle="the story so far">
      <Tabs label="Experience type" options={TABS} value={tab} onChange={setTab} labels={TAB_LABELS}>
        <Carousel
          key={tab}
          items={items}
          getKey={(item) => item.title}
          renderItem={(item) => (
            <InfoCard
              title={item.title}
              meta={
                <>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="accent">
                      {item.org} <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <span className="accent">{item.org}</span>
                  )}
                  <span> · {item.period}</span>
                </>
              }
              description={item.description}
              checklist={item.checklist}
            />
          )}
        />
      </Tabs>
    </Section>
  )
}
