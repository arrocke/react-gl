export default class Shader {
  constructor({ type, children: source }, root, { gl }) {
    this.gl = gl

    const shader = gl.createShader(gl[type])
    this.shader = shader

    gl.shaderSource(shader, source)
    this.compile()

    this.type = type
    this.source = source
  }
  
  commitUpdate({ children: source }, { children: oldSource}) {
    if (source !== oldSource) {
      const { gl, shader } = this

      gl.shaderSource(shader, source)
      this.source = source

      this.compile()
      this.program && this.program.link()
    }
  }

  compile() {
    const { shader, gl } = this
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader)
      throw new Error(`Shader compilation error: ${log}`)
    }
  }
}

Shader.tagName = 'shader'
Shader.shouldSetTextContent = true
