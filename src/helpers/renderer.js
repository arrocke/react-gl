function createInstance(
  { clearColor },
  rootContainer,
  { gl, ...hostContext },
  workInProgress
) {
  gl.clearColor(...(clearColor || [0, 0, 0, 1]))
  return {
    type: 'renderer',
    gl,
    models: []
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

function start(canvas, root) {
    const { gl } = root
    console.log(canvas)
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const posAttrib = gl.getAttribLocation(root.program, "a_position")
    gl.useProgram(root.program)
    gl.enableVertexAttribArray(posAttrib)
    root.models.forEach(model => {
      gl.bindBuffer(gl.ARRAY_BUFFER, model.buffer)
      gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, Math.floor(model.vertices.length / 2))
    })
}

export default {
  createInstance,
  appendInitialChild,
  start
}