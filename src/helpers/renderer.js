function createInstance(
  { clearColor, setup = () => {}, update = () => {} },
  rootContainer,
  { gl, ...hostContext },
  workInProgress
) {
  gl.clearColor(...(clearColor || [0, 0, 0, 1]))
  return {
    type: 'renderer',
    gl,
    models: [],
    setup,
    update
  }
}

function appendInitialChild(parent, child) {
  switch(child.type) {
    case 'program': {
      parent.program = child
      break
    }
    case 'model': {
      parent.models.push(child)
      break
    }
    default: {
      throw new Error(`Element of type ${child.type} cannot be a child of renderer.`)
    }
  }
}

function start(root) {
    const { gl } = root
    const canvas = gl.canvas

    root.setup()

    function step(t1, t2) {
      // Resize canvas
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight)
      gl.clear(gl.COLOR_BUFFER_BIT)

    const posAttrib = gl.getAttribLocation(root.program, "a_position")
    const resUniform = gl.getUniformLocation(root.program, 'u_resolution')
    const transUniform = gl.getUniformLocation(root.program, 'u_translate')
    gl.useProgram(root.program)
    gl.uniform2f(resUniform, gl.canvas.width, gl.canvas.height)
    gl.enableVertexAttribArray(posAttrib)
    root.models.forEach(model => {
      gl.uniform2f(transUniform, model.x, model.y)
      gl.bindBuffer(gl.ARRAY_BUFFER, model.buffer)
      gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, Math.floor(model.vertices.length / 2))
    })

      root.update(t2 - t1)
      requestAnimationFrame(t3 => step(t2, t3))
    } 
    requestAnimationFrame(t => step(t, t))

}

export default {
  createInstance,
  appendInitialChild,
  start
}