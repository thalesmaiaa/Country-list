/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback, useEffect } from 'react'

type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): DebouncedFunction<T> {
  const timeoutRef = useRef<number | null>(null)

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(timeoutRef.current!)
      timeoutRef.current = window.setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay],
  )

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current!)
    }
  }, [])

  return debouncedFn
}
