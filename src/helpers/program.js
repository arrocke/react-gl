function createInstance(
  props,
  rootContainer,
  { gl, ...hostContext },
  workInProgress
) {
  const program = gl.createProgram()
  program.type = 'program'
  program.gl = gl
  return program
}

function appendInitialChild(parent, child) {
  const { gl } = parent
  if (child.type === 'shader') {
    if (child.shaderType === gl.VERTEX_SHADER) {
      if (parent.vertexShader) {
        throw new Error('A program can only have one vertex shader.')
      } else {
        parent.vertexShader = child
      }
    }
    if (child.shaderType === gl.FRAGMENT_SHADER) {
      if (parent.fragmentShader) {
        throw new Error('A program can only have one fragment shader.')
      } else {
        parent.fragmentShader = child
      }
    }

    if (parent.vertexShader && parent.fragmentShader) {
      const gl = parent.gl
      gl.attachShader(parent, parent.vertexShader);
      gl.attachShader(parent, parent.fragmentShader);
      gl.linkProgram(parent);
      if (!gl.getProgramParameter(parent, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(parent)
        gl.deleteProgram(parent);
        throw new Error(log)
      }
    }
  } else {
    throw new Error(`Element of type ${child.type} cannot be a child to ${parent.type}.`)
  }
}

export default {
  createInstance,
  appendInitialChild
}