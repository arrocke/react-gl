import React from 'react';
import model from './models/f.json'

function App() {
  return (
    <renderer clearColor={[0,0,0,1]}>
      <program id="default">
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
        <attribute name="a_position">
          <buffer data={model} />
        </attribute>
      </program>
    </renderer>
  );
}

export default App;
