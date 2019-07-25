export default class Model {
  constructor({ vertices }, root, { gl }) {
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      gl.STATIC_DRAW
    )

    this.vertexBuffer = vertexBuffer
    this.gl = gl
    this.vertices = vertices
  }
  
  commitUpdate() {

  }

  appendChild(child) {
    switch(child.constructor.name) {
      case 'Program': {
        this.program = child
        break
      }
      default: {
        throw new Error(`Invalid child element to <model>.`)
      }
    }
  }

  render() {
    const { gl, vertices, vertexBuffer, program: { program } } = this

    const posAttrib = gl.getAttribLocation(program, "a_position")
    const resUniform = gl.getUniformLocation(program, 'u_resolution')
    const transUniform = gl.getUniformLocation(program, 'u_translate')
    gl.useProgram(program)
    gl.uniform2f(resUniform, gl.canvas.width, gl.canvas.height)
    gl.uniform2f(transUniform, 0, 0)

    gl.enableVertexAttribArray(posAttrib)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, Math.floor(vertices.length / 2))
  }
}

Model.tagName = 'model'
Model.shouldSetTextContent = false

