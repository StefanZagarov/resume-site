import type { CSSProperties, ReactNode } from 'react'

type TabsProps<T extends string> = {
  label: string
  options: readonly T[]
  labels: Record<T, string>
  value: T
  onChange: (value: T) => void
  children: ReactNode
}

// Terminal-emulator tabs: the tab bar sits on the top edge of a framed panel and the
// active tab opens into it. The panel's content is keyed by the caller, so switching
// remounts it and the cards pop in again.
export function Tabs<T extends string>({ label, options, labels, value, onChange, children }: TabsProps<T>) {
  return (
    <div className="term-tabs reveal" style={{ '--i': -1 } as CSSProperties}>
      <div className="tabbar" role="tablist" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={option === value}
            className={option === value ? 'tab active' : 'tab'}
            onClick={() => onChange(option)}
          >
            {labels[option]}
          </button>
        ))}
      </div>
      <div className="tab-frame" role="tabpanel" aria-label={value}>
        {children}
      </div>
    </div>
  )
}
