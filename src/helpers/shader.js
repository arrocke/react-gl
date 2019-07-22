function createInstance(
  { type, children: source } = {},
  rootContainer,
  { gl, ...hostContext },
  workInProgress
) {
  const shaderType = gl[`${type.toUpperCase()}_SHADER`]
  const shader = gl.createShader(shaderType)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    throw new Error('Invalid shader')
  }

  shader.type = 'shader'
  shader.gl = gl
  shader.shaderType = shaderType

  return shader
}

export default {
  createInstance
}