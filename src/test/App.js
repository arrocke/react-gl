import React, { useState, useCallback } from 'react';
import model from './models/f.json'
import DefaultShaderProgram from './DefaultShaderProgram'
import useResolution from './use-resolution'

function App() {
  const { renderer, resolution } = useResolution()
  const [on, setOn] = useState(false)
  const [pos, setPos] = useState(0)

  const onUpdate = useCallback(({ gl, dt, t }) => {
    setOn((t / 1000) % 2 <= 1)
    setPos(pos => {
      const newPos = pos + dt / 2
      return newPos > resolution[0] ? -50 : newPos
    })
  }, [resolution])

  return (
    <renderer ref={renderer} clearColor={[0,0,0,1]} onUpdate={onUpdate}>
      <buffer name="model" data={model} />
      <DefaultShaderProgram
        buffer="model"
        translation={[pos, 0]}
        resolution={resolution}
        color={on ? [0.5, 0, 0, 1] : [0, 0.5, 0, 1]}
      />
    </renderer>
  );
}

export default App;
