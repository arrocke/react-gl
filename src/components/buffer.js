export default class Buffer {
  constructor({ data, name }, root, { gl, buffers }) {
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(data),
      gl.STATIC_DRAW
    )

    this.gl = gl
    this.buffer = buffer
    this.data = data
    this.name = name

    buffers[name] = this
  }
  
  commitUpdate() {

  }
}

Buffer.tagName = 'buffer'
Buffer.shouldSetTextContent = true

