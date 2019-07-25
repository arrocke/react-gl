export default class Shader {
  constructor({ type, children: source }, root, { gl }) {
    const shaderType = `${type.toUpperCase()}_SHADER`

    const shader = gl.createShader(gl[shaderType])
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader)
      throw new Error(`Shader compilation error: ${log}`)
    }

    this.gl = gl
    this.shaderType = shaderType
    this.source = source
    this.shader = shader
  }
  
  commitUpdate() {

  }
}

Shader.tagName = 'shader'
Shader.shouldSetTextContent = true
