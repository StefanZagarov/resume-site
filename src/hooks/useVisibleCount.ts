import { useEffect, useState } from 'react'

// How many cards fit side by side: 1 on phones, 2 on tablets, 3 on desktop
export function useVisibleCount() {
  const get = () => (window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 3)
  const [count, setCount] = useState(get)
  useEffect(() => {
    const onResize = () => setCount(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return count
}
