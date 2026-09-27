import { useEffect, useState } from 'react'

// Current time, refreshed on an interval (for the clock and the uptime readout)
export function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
