export default class Attribute {
  constructor({
    name,
    buffer,
    size,
    type = 'FLOAT',
    normalize = false,
    stride = 0,
    offset = 0,
    mode
  }, root, { gl, buffers }) {
    this.gl = gl
    this.name = name
    this.bufferName = buffer
    this.size = size
    this.type = type
    this.normalize = normalize
    this.stride = stride
    this.offset = offset
    this.buffers = buffers
    this.mode = mode
  }
  
  commitUpdate() {

  }

  use(program) {
    const { gl, name, bufferName, size, type, normalize, stride, offset, mode } = this
    const { buffer, data } = this.buffers[bufferName]
    const position = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(position)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(position, size, gl[type], normalize, stride, offset)
    gl.drawArrays(gl[mode], 0, Math.floor(data.length / size))
  }
}

Attribute.tagName = 'attribute'
Attribute.shouldSetTextContent = false
