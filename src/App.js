import React from 'react';

function App() {
  return (
    <renderer clearColor={[0, 0, 0, 1]}>
      <program>
        <shader type="vertex">
          {`
            attribute vec4 a_position;
    
            void main() {
              gl_Position = a_position;
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
      <model vertices={[
        0, 0,
        0, 0.5,
        0.7, 0,
      ]}/>
      <model vertices={[
        0, 0,
        0, -0.5,
        -0.7, 0,
      ]}/>
    </renderer>
  );
}

export default App;
