export default class Program {
  constructor({ id }, root, { gl }) {
    this.id = id
    this.program = gl.createProgram()
    this.gl = gl
  }

  appendChild(child) {
    if (child.constructor.name === 'Shader') {
      if (child.shaderType === 'VERTEX_SHADER') {
        this.vertexShader = child
      } else if (child.shaderType === 'FRAGMENT_SHADER') {
        this.fragmentShader = child
      }

      const {vertexShader, fragmentShader, program, gl} = this
      if (vertexShader && fragmentShader) {
        gl.attachShader(program, vertexShader.shader);
        gl.attachShader(program, fragmentShader.shader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          const log = gl.getProgramInfoLog(program)
          gl.deleteProgram(program);
          throw new Error(`Program compile error: ${log}`)
        }
      }
    } else {
      throw new Error(`Invalid child element to <program>.`)
    }
  }
  
  commitUpdate() {

  }
}

Program.tagName = 'program'
Program.shouldSetTextContent = false
