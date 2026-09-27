type TabsProps<T extends string> = {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}

export function Tabs<T extends string>({ label, options, value, onChange }: TabsProps<T>) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={option === value}
          className={option === value ? 'tab active' : 'tab'}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
