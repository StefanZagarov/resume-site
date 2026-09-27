import { useEffect } from 'react'

// Number keys 1–9 jump to the matching section, like switching workspaces
export function useKeyboardNav(ids: string[]) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return
      const index = Number(e.key) - 1
      if (!Number.isInteger(index) || index < 0 || index >= ids.length) return
      document.getElementById(ids[index])?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ids])
}
