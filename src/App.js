import React, { useState } from 'react';
import model from './models/f.json'

function App() {
  const [pos, setPos] = useState(0)

  function update(dt) {
    // setPos(p => (p + dt / 100) % 400)
  }

  return (
    <renderer clearColor={[0, 0, 0, 1]} update={update}>
      <program>
        <shader type="vertex">
          {`
            attribute vec4 a_position;

            uniform vec2 u_resolution;
            uniform vec2 u_translate;
    
            void main() {
              gl_Position = vec4((a_position.xy + u_translate) / u_resolution * vec2(2, -2), 0, 1);
            }
          `}
        </shader>
        <shader type="fragment">
          {`
            precision mediump float;

          
            void main() {
              gl_FragColor = vec4(1, 0, 0.5, 1);
            }
          `}
        </shader>
      </program>
      <model vertices={model} x={pos} y={200}/>
    </renderer>
  );
}

export default App;
