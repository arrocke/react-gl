export default class Attribute {
  constructor({ name }, root, { gl }) {
    this.gl = gl
    this.name = name
  }

  appendChild (child) {
    switch(child.constructor.name) {
      case 'Buffer': {
        console.log('attach buffer')
        this.buffer = child
        break
      }
      default: {
        throw new Error(`Invalid child element to <attribute>.`)
      }
    }
  }
  
  commitUpdate() {

  }

  use(program) {
    const { gl, name, buffer: { buffer, data } } = this
    const position = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(position)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, Math.floor(data.length / 2))
  }
}

Attribute.tagName = 'attribute'
Attribute.shouldSetTextContent = false


