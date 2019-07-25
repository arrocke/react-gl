function createInstance(
  { vertices, x, y },
  rootContainer,
  { gl, ...hostContext },
  workInProgress
) {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW
  )
  return {
    type: 'model',
    buffer,
    gl,
    vertices,
    x, y
  }
}

export default {
  createInstance
}
