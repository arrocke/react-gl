import { useRef, useEffect, useState, useCallback } from 'react';

function useResolution() {
  const [resolution, setResolution] = useState([0, 0])
  const rendererRef = useRef()

  function updateResolution (renderer) {
    const { canvas } = renderer
    setResolution([canvas.width, canvas.height])
  }

  const renderer = useCallback((renderer) => {
    rendererRef.current = renderer
    if (renderer) {
      updateResolution(renderer)
    }
  }, [])

  useEffect(() => {
    function handler () {
      if (rendererRef.current) {
        updateResolution(rendererRef.current)
      }
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [rendererRef])

  return { renderer, resolution }
}

export default useResolution