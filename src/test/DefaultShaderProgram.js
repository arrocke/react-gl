import React from 'react'

function DefaultShaderProgram ({ buffer, translation, resolution, color }) {
  return (
    <program>
      <shader type="VERTEX_SHADER">
        {`
          attribute vec4 a_position;

          uniform vec2 u_resolution;
          uniform vec2 u_translation;
  
          void main() {
            gl_Position = vec4((a_position.xy + u_translation - u_resolution / vec2(2, 2)) / u_resolution * vec2(2, -2), 0, 1);
          }
        `}
      </shader>
      <shader type="FRAGMENT_SHADER">
        {`
          precision mediump float;
          uniform vec4 u_color;
        
          void main() {
            gl_FragColor = u_color;
          }
        `}
      </shader>
      <attribute name="a_position" buffer={buffer} size={2} mode="TRIANGLES" />
      <uniform name="u_resolution" value={resolution} type="2f" />
      <uniform name="u_translation" value={translation} type="2f" />
      <uniform name="u_color" value={color} type="4f" />
    </program>
  )
}

export default DefaultShaderProgram