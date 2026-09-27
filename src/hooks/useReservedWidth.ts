import { useLayoutEffect, type RefObject } from 'react'

// In compact mode only the active workspace shows its name, so the strip's width
// would change with every section. Reserve room for the longest name up front:
// the strip keeps one width and the numbers stop sliding around.
export function useReservedWidth(listRef: RefObject<HTMLElement | null>, compactQuery: string) {
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const media = window.matchMedia(compactQuery)

    const measure = () => {
      if (!media.matches) {
        list.style.minWidth = ''
        return
      }
      const links = [...list.querySelectorAll<HTMLElement>('a')]
      const labels = links.map((link) => link.querySelector<HTMLElement>('.ws-label')!)
      // Width of everything except the labels (numbers, padding, gaps) — stable even mid-animation
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0
      let numbers = gap * (links.length - 1)
      links.forEach((link, i) => {
        numbers += link.offsetWidth - labels[i].offsetWidth - parseFloat(getComputedStyle(labels[i]).marginLeft)
      })
      // scrollWidth is the label's natural width, even while collapsed to 0
      const longest = Math.max(...labels.map((label) => label.scrollWidth))
      const reserve = numbers + longest + 6

      // Never reserve more than the bar can give without squeezing the prompt or icons
      const nav = list.parentElement!
      const navStyle = getComputedStyle(nav)
      const navGap = parseFloat(navStyle.columnGap) || 0
      const inner = nav.clientWidth - parseFloat(navStyle.paddingLeft) - parseFloat(navStyle.paddingRight)
      const prompt = nav.querySelector<HTMLElement>('.prompt')
      const actions = nav.querySelector<HTMLElement>('.nav-actions')
      const promptMin = prompt ? parseFloat(getComputedStyle(prompt).minWidth) || 0 : 0
      const available = inner - 2 * navGap - promptMin - (actions?.offsetWidth ?? 0)

      list.style.minWidth = `${Math.floor(Math.min(reserve, available))}px`
    }

    measure()
    document.fonts?.ready.then(measure)
    media.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    return () => {
      media.removeEventListener('change', measure)
      window.removeEventListener('resize', measure)
    }
  }, [listRef, compactQuery])
}
