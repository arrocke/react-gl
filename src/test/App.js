import React from 'react';
import model from './models/f.json'
import DefaultShaderProgram from './DefaultShaderProgram'
import useResolution from './use-resolution'

function App() {
  const { renderer, resolution } = useResolution()

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
