import { useEffect, useState } from 'react'

/**
 * Delayed update data
 */
export function useDelayedData<T>(data: T, delay = 1000) {
  const [delayedData, setDelayedData] = useState<T>(data)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    timeoutId = setTimeout(() => {
      setDelayedData(data)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [data])

  return delayedData
}
