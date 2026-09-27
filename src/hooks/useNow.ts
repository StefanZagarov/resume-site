import { useEffect, useState } from 'react'

// Current time, refreshed on whole multiples of the interval (e.g. every minute on the
// minute), so a clock changes exactly when the real minute does
export function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let id = 0
    const schedule = () => {
      id = window.setTimeout(() => {
        setNow(new Date())
        schedule()
      }, intervalMs - (Date.now() % intervalMs) + 50)
    }
    schedule()
    return () => clearTimeout(id)
  }, [intervalMs])
  return now
}
