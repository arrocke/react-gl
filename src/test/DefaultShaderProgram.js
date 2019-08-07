import React from 'react'

function DefaultShaderProgram ({ model, translation, resolution }) {
  return (
    <program>
      <shader type="VERTEX_SHADER">
        {`
          attribute vec4 a_position;

          uniform vec2 u_resolution;
          uniform vec2 u_translation;
  
          void main() {
            gl_Position = vec4((a_position.xy + u_translation) / u_resolution * vec2(2, -2), 0, 1);
          }
        `}
      </shader>
      <shader type="FRAGMENT_SHADER">
        {`
          precision mediump float;
        
          void main() {
            gl_FragColor = vec4(1, 0, 0.5, 1);
          }
        `}
      </shader>
      <attribute name="a_position">
        { model }
      </attribute>
      <uniform name="u_resolution" value={resolution} type="2f" />
      <uniform name="u_translation" value={translation} type="2f" />
    </program>
  )
}

export default DefaultShaderProgram