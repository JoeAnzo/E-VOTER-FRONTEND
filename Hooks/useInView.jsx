import { useRef, useState, useEffect, useMemo } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const memoizedOptions = useMemo(
    () => ({
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold ?? 0
    }),
    [options.root, options.rootMargin, options.threshold]
  )

  useEffect(() => {
    const element = ref.current
    if (!element || isVisible) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, memoizedOptions)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [memoizedOptions, isVisible])

  return [ref, isVisible]
}

