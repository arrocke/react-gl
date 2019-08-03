export default class Uniform {
  constructor({ name, value, type }, root, { gl }) {
    this.gl = gl
    this.name = name
    this.value = value
    this.type = type
  }
  
  commitUpdate({ name, value, type }) {
    this.name = name
    this.value = value
    this.type = type
  }

  use(program) {
    const { gl, name, type, value } = this
    const position = gl.getUniformLocation(program, name)
    gl[`uniform${type}`](position, ...value)
  }
}

Uniform.tagName = 'uniform'
Uniform.shouldSetTextContent = false


