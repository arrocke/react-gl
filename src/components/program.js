export default class Program {
  constructor({ id }, root, { gl }) {
    this.id = id
    this.program = gl.createProgram()
    this.attributes = []
    this.gl = gl
  }

  appendChild(child) {
    switch(child.constructor.name) {
      case 'Shader': {
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
        break
      }
      case 'Attribute': {
        this.attributes.push(child)
        break
      }
      default: {
        throw new Error(`Invalid child element to <program>.`)
      }
    }
  }
  
  commitUpdate() {

  }

  run() {
    const { gl, attributes, program } = this


    const resUniform = gl.getUniformLocation(program, 'u_resolution')
    const transUniform = gl.getUniformLocation(program, 'u_translate')

    gl.useProgram(program)
    gl.uniform2f(resUniform, gl.canvas.width, gl.canvas.height)
    gl.uniform2f(transUniform, 0, 0)

    attributes.forEach(attribute => attribute.use(program))

  }
}

Program.tagName = 'program'
Program.shouldSetTextContent = false
