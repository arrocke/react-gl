import { useRef, useEffect, useState } from 'react';

function useResolution() {
  const [resolution, setResolution] = useState([0, 0])
  const renderer = useRef()

  useEffect(() => {
    const handler = () => {
      if (renderer.current) {
        const { canvas } = renderer.current
        setResolution([canvas.width, canvas.height])
      }
    }
    window.addEventListener('resize', handler)
    handler()
    return () => window.removeEventListener('resize', handler)
  }, [renderer])

  return { renderer, resolution }
}

export default useResolution