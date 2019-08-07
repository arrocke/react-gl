export default class Program {
  constructor(props, root, { gl }) {
    this.program = gl.createProgram()
    this.attributes = []
    this.uniforms = []
    this.gl = gl
  }

  appendChild(child) {
    const { gl, program } = this
    switch(child.constructor.name) {
      case 'Shader': {
        if (child.type === 'VERTEX_SHADER') {
          this.vertexShader = child
          gl.attachShader(program, this.vertexShader.shader);
          child.program = this
        } else if (child.type === 'FRAGMENT_SHADER') {
          this.fragmentShader = child
          gl.attachShader(program, this.fragmentShader.shader);
          child.program = this
        }
        this.link()
        break
      }
      case 'Attribute': {
        this.attributes.push(child)
        break
      }
      case 'Uniform': {
        this.uniforms.push(child)
        break
      }
      default: {
        throw new Error(`Invalid child element to <program>.`)
      }
    }
  }

  link() {
    const {vertexShader, fragmentShader, program, gl} = this
    if (vertexShader && fragmentShader) {
      gl.linkProgram(program);

      // Verify program linked correctly.
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program)
        throw new Error(`Program compile error: ${log}`)
      }
    }
  }
  
  commitUpdate() {
    // TODO: compare shader source to determine if program needs to be recompiled.
  }

  run() {
    const { gl, attributes, uniforms, program } = this

    gl.useProgram(program)

    uniforms.forEach(uniform => uniform.use(program))
    attributes.forEach(attribute => attribute.use(program))
  }
}

Program.tagName = 'program'
Program.shouldSetTextContent = false
