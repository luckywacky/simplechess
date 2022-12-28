import { useState, useEffect } from 'react'

export function useBoardWidth() {
  const [boardWidth, setBoardWidth] = useState(400)

  useEffect(() => {
    function onWindowChange() {
      const width = window.innerWidth
      if (width > 1000) setBoardWidth(900)
      if (width > 700 && width < 1000) setBoardWidth(600)
      if (width > 400 && width < 700) setBoardWidth(400)
    }
    onWindowChange()
    window.addEventListener('resize', onWindowChange)
    return () => window.removeEventListener('resize', onWindowChange)
  }, [window.innerWidth])

  return {
    boardWidth,
  }
}
