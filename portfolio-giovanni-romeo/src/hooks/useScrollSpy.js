import { useState, useEffect } from 'react'

export function useScrollSpy(ids, offset = 80) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 10
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ids, offset])

  return activeId
}
