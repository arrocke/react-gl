import React, { useRef, useEffect, useState } from 'react';
import model from './models/f.json'
import DefaultShaderProgram from './DefaultShaderProgram'

function App() {
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

  return (
    <renderer ref={renderer} clearColor={[0,0,0,1]}>
      <DefaultShaderProgram
        model={<buffer data={model} />}
        translation={[0, 0]}
        resolution={resolution}
      />
    </renderer>
  );
}

export default App;
