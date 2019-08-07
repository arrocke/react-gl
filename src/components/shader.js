export default class Shader {
  constructor({ type, children: source }, root, { gl }) {
    this.gl = gl

    const shader = gl.createShader(gl[type])
    this.shader = shader

    // Set shader source and compile
    gl.shaderSource(shader, source)
    this.compile()

    this.type = type
    this.source = source
  }
  
  commitUpdate({ children: source }, { children: oldSource}) {
    if (source !== oldSource) {
      const { gl, shader } = this

      // Reset shader source and recompile.
      this.source = source
      gl.shaderSource(shader, source)
      this.compile()

      // Relink program attached to the shader.
      this.program && this.program.link()
    }
  }

  getPublicInstance() {
    return this.shader
  }

  compile() {
    const { shader, gl } = this
    gl.compileShader(shader)

    // Throw error if compilation failed.
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader)
      throw new Error(`Shader compilation error: ${log}`)
    }
  }
}

Shader.tagName = 'shader'
Shader.shouldSetTextContent = true
