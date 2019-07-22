import Reconciler from 'react-reconciler'
import shaderHelper from './helpers/shader'
import programHelper from './helpers/program'
import rendererHelper from './helpers/renderer'
import modelHelper from './helpers/model'

const helperMap = {
  'shader': shaderHelper,
  'program': programHelper,
  'renderer': rendererHelper,
  'model': modelHelper
}

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
    return ['shader', 'model'].includes(type)
  },
  createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress) {
    return null
  },
  createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress) {
    switch(type) {
      case 'renderer':
      case 'model':
      case 'program':
      case 'shader': {
        return helperMap[type].createInstance(
          newProps,
          rootContainerInstance,
          currentHostContext,
          workInProgress
        )
      }
      default: {
        throw new Error(`${type} is not a valid element`)
      }
    }
  },
  appendInitialChild(parent, child) {
    switch(parent.type) {
      case 'renderer':
      case 'program': {
        helperMap[parent.type].appendInitialChild(parent, child)
        break
      }
      default: {
        break
      }
    }
  },
  finalizeInitialChildren(...args) {
    return false
  },
  prepareForCommit(rootContainerInstance) {
  },
  resetAfterCommit(rootContainerInstance) {
  },
  appendChildToContainer(parent, child) {
    rendererHelper.start(parent, child)
  }
}

const instance = Reconciler(HostConfig)

export default {
  render(element, renderDom, callback) {
    const canvas = document.createElement('canvas')
    canvas.style.width = `${renderDom.clientWidth}px`
    canvas.style.height = `${renderDom.clientHeight}px`
    renderDom.appendChild(canvas)

    instance.updateContainer(
      element,
      instance.createContainer(canvas, false),
      null,
      callback
    )
  }
}