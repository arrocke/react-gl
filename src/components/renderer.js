export default class Renderer {
  constructor({ clearColor = [0, 0, 0, 1] }, root, { gl }) {
    gl.clearColor(...clearColor)
    this.clearColor = clearColor 
    this.programs = []
    this.gl = gl
  }

  appendChild(child) {
    switch(child.constructor.name) {
      case 'Program': {
        this.programs.push(child)
        break
      }
      default: {
        throw new Error(`Invalid child element to <renderer>.`)
      }
    }
  }

  commitUpdate({ clearColor }) {
    this.clearColor = clearColor
    this.gl.clearColor(...this.clearColor)
    this.clearColor = clearColor
  }

  getPublicInstance() {
    return {
      canvas: this.gl.canvas
    }
  }

  start() {
    const { gl, programs } = this
    const { canvas } = gl

    function step(t1, t2) {
      // Resize canvas
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight)

      gl.clear(gl.COLOR_BUFFER_BIT)

      programs.forEach(program => program.run())

      // root.update(t2 - t1)
      requestAnimationFrame(t3 => step(t2, t3))
    } 
    requestAnimationFrame(t => step(t, t))
  }
}

Renderer.tagName = 'renderer'
Renderer.shouldSetTextContent = false