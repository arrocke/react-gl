export default class Renderer {
  constructor({ clearColor = [0, 0, 0, 1], onSetup = () => {}, onUpdate = () => {}, viewport }, root, { gl }) {
    gl.clearColor(...clearColor)
    this.clearColor = clearColor 
    this.programs = []
    this.gl = gl

    const canvas = gl.canvas
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    this.viewport = viewport
    this.onSetup = onSetup
    this.onUpdate = onUpdate
  }

  appendChild(child) {
    switch(child.constructor.name) {
      case 'Program': {
        this.programs.push(child)
        break
      }
      case 'Buffer': {
        // Buffers are added to the global context, so the renderer does not need to do anything here.
        break
      }
      default: {
        throw new Error(`Invalid child element to <renderer>.`)
      }
    }
  }

  commitUpdate({ clearColor, onSetup, onUpdate, viewport }) {
    if (this.clearColor !== clearColor) {
      this.clearColor = clearColor
      this.gl.clearColor(...this.clearColor)
    }

    this.onSetup = onSetup
    this.onUpdate = onUpdate
    this.viewport = viewport
    console.log(clearColor)
  }

  getPublicInstance() {
    return {
      canvas: this.gl.canvas
    }
  }

  start() {
    const { gl, programs, viewport } = this
    const { canvas } = gl

    this.onSetup({ gl })

    const step = (t1, t2) => {
      this.onUpdate({ gl, dt: t2 - t1, t: t2 })

      // Resize canvas
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      if (viewport) {
        gl.viewport(...viewport)
      }

      gl.clear(gl.COLOR_BUFFER_BIT)

      programs.forEach(program => program.run())

      requestAnimationFrame(t3 => step(t2, t3))
    } 
    requestAnimationFrame(t => step(t, t))
  }
}

Renderer.tagName = 'renderer'
Renderer.shouldSetTextContent = false