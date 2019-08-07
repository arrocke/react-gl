import Reconciler from 'react-reconciler'
import * as scheduler from 'scheduler';
import Shader from './components/shader'
import Program from './components/program'
import Renderer from './components/renderer'
import Buffer from './components/buffer'
import Attribute from './components/attribute'
import Uniform from './components/uniform'

const components = [Uniform, Attribute, Buffer, Renderer, Shader, Program].reduce((obj, el) => ({ ...obj, [el.tagName]: el }), {})

const HostConfig = {
  supportsMutation: true,
  now: Date.now,
  getRootHostContext(nextRootInstance) {
    return {
      gl: nextRootInstance.getContext('webgl')
    }
  },
  getChildHostContext(parentContext, fiberType, rootInstance) {
    return parentContext
  },
  shouldSetTextContent(type, nextProps) {
    return components[type].shouldSetTextContent
  },
  createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress) {
    return null
  },
  createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress) {
    return new components[type](newProps, rootContainerInstance, currentHostContext)
  },
  appendInitialChild(parent, child) {
    return parent.appendChild(child)
  },
  finalizeInitialChildren(...args) {
    return false
  },
  prepareForCommit(rootContainerInstance) {
  },
  resetAfterCommit(rootContainerInstance) {
  },
  appendChildToContainer(parent, child) {
    child.start()
  },
  prepareUpdate(wordElement, type, oldProps, newProps) {
		return true;
  },
  commitUpdate(element, payload, type, oldProps, newProps){ 
    return element.commitUpdate(newProps, oldProps)
  },
  getPublicInstance(element) {
    return element.getPublicInstance && element.getPublicInstance()
  },
  scheduleDeferredCallback: scheduler.unstable_scheduleCallback,
  cancelDeferredCallback: scheduler.unstable_cancelCallback,
  schedulePassiveEffects: scheduler.unstable_scheduleCallback,
  cancelPassiveEffects: scheduler.unstable_cancelCallback
}

const instance = Reconciler(HostConfig)

export default {
  render(element, renderDom, callback) {
    const canvas = document.createElement('canvas')
    canvas.style.width = `100%`
    canvas.style.height = `100%`
    renderDom.appendChild(canvas)

    instance.updateContainer(
      element,
      instance.createContainer(canvas, false),
      null,
      callback
    )
  }
}